import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Modal, Text, Button, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Sound from 'react-native-sound';
import {queryRank, create} from '../firestore';

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
          data.name,
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
    <Modal visible={visible} transparent>
      <View style={modalStyle}>
        <Text style={titleStyle}>Parabéns!</Text>
        <Text style={{paddingBottom: 4}}>
          Você concluiu o nível {level} em {movements} movimentos em{' '}
          {elapsedTime.toFixed(1)} segundos.
        </Text>
        <View style={rankTable}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#888'}}>
            <Row
              data={['#', 'Nome', 'Movimentos', 'Tempo']}
              style={{height: 30, backgroundColor: '#ccc'}}
              textStyle={{margin: 6}}
            />
            {rank.map((play, index) => (
              <Row
                key={index}
                data={play}
                style={{height: 30}}
                textStyle={{margin: 6}}
              />
            ))}
          </Table>
        </View>
        <Button
          onPress={onContinue}
          title={level !== 5 ? 'Continuar' : 'Jogar novamente'}
        />
      </View>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: '#eee',
  height: '80%',
  width: '60%',
  borderRadius: 10,
  padding: 10,
  marginTop: '5%',
  marginHorizontal: '20%',
});

const titleStyle = StyleSheet.create({
  lineHeight: 26,
  fontSize: 20,
  textAlign: 'center',
});

const rankTable = StyleSheet.create({
  flex: 1,
  backgroundColor: '#eee',
  width: '100%',
});
