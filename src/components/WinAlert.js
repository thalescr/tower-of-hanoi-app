import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Modal, Text, Button, StyleSheet} from 'react-native';
import {create} from '../firestore';

export default function WinAlert({
  visible,
  level,
  movements,
  startedTime,
  onContinue,
}) {
  useEffect(() => {
    if (visible) {
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
              time: (new Date() - startedTime) / 1000,
            });
          }
        },
      );
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent>
      <View style={modalStyle}>
        {level !== 5 && (
          <Text style={textStyle}>
            Parabéns! {'\n'} Você concluiu o nível {level} em {movements}{' '}
            movimentos.
          </Text>
        )}
        {level === 5 && (
          <Text style={textStyle}>Você concluiu o jogo. {'\n'} Parabéns!</Text>
        )}
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
  justifyContent: 'center',
  backgroundColor: '#eee',
  height: '60%',
  width: '60%',
  borderRadius: 10,
  padding: 30,
  marginTop: '10%',
  marginHorizontal: '20%',
});

const textStyle = StyleSheet.create({
  lineHeight: 26,
  fontSize: 20,
  marginBottom: 24,
  textAlign: 'center',
});
