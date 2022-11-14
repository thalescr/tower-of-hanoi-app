import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MyButton from './MyButton';
import MyModal from './MyModal';

export default function GameOver({visible, onContinue}) {
  return (
    <MyModal visible={visible} modalStyle={modalStyle}>
      <Text style={{fontSize: 18, fontWeight: '800'}}>Você perdeu</Text>

      <Text style={{fontSize: 16, textAlign: 'center'}}>
        Você atingiu o limite máximo de movimentos. Tente novamente.
      </Text>

      <View style={{marginTop: 2, marginBottom: 7}}>
        <MyButton title="Jogar novamente" onPress={onContinue} />
      </View>
    </MyModal>
  );
}

const modalStyle = StyleSheet.create({
  height: '60%',
  width: '50%',
  marginTop: '15%',
  marginHorizontal: '25%',
});
