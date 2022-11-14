import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import Sound from 'react-native-sound';
import {queryRank, create} from '../firestore';
import MyModal from './MyModal';
import MyButton from './MyButton';

const sound = new Sound('claps.mp3', Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log('error playing sound:', err);
  }
});

export default function WinAlert({
  visible,
  level,
  movements,
  elapsedTime,
  onContinue,
}) {
  const [rank, setRank] = useState([]);

  const getRankData = async () => {
    try {
      const {docs} = await queryRank(level);
      const tableData = docs.map((value, index) => {
        const data = value.data();
        return [
          `${index + 1}`,
          data.name.slice(0, 12),
          data.movements,
          `${parseFloat(data.time).toFixed(1)} s`,
        ];
      });
      setRank(tableData);
    } catch (err) {
      console.log('error quering ranks:', err);
    }
  };

  useEffect(() => {
    if (visible) {
      sound.setVolume(1);
      sound.play();

      AsyncStorage.multiGet(
        ['id', 'name', 'age', 'gender', 'grade'],
        (error, result) => {
          if (!error) {
            create('plays', {
              player: result[0][1],
              name: result[1][1],
              age: result[2][1],
              gender: result[3][1],
              grade: result[4][1],
              level,
              movements,
              time: elapsedTime,
            }).then(() => getRankData());
          }
        },
      );
    }
  }, [visible]);

  return (
    <MyModal visible={visible} modalStyle={modalStyle}>
      <Text style={titleStyle}>Parabéns!</Text>
      <Text style={{paddingBottom: 4}}>
        Você concluiu o nível {level} em {movements} movimentos em{' '}
        {elapsedTime.toFixed(1)} segundos.
      </Text>
      <View style={{width: '100%', height: 180}}>
        <View style={rankTable}>
          <Table
            style={{marginHorizontal: 5}}
            borderStyle={{borderWidth: 2, borderColor: '#444'}}>
            <Row
              data={['#', 'Nome', 'Movimentos', 'Tempo']}
              style={{height: 30, backgroundColor: '#96866f'}}
              textStyle={{margin: 6}}
            />
            {rank.map((play, index) => (
              <Row
                key={index}
                data={play}
                textStyle={{margin: 6}}
                style={{height: 30, backgroundColor: '#e4d5c0'}}
              />
            ))}
          </Table>
        </View>
      </View>
      <View style={{marginVertical: 8}}>
        <MyButton
          onPress={onContinue}
          title={level !== 5 ? 'Continuar' : 'Jogar novamente'}
        />
      </View>
    </MyModal>
  );
}

const modalStyle = StyleSheet.create({
  height: '80%',
  width: '70%',
  marginTop: '5%',
  marginHorizontal: '15%',
});

const titleStyle = StyleSheet.create({
  lineHeight: 26,
  fontSize: 20,
  textAlign: 'center',
});

const rankTable = StyleSheet.create({
  flex: 1,
  width: '100%',
});
