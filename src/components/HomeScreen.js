import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MyButton from './MyButton';
import MyModal from './MyModal';

export default function HomeScreen({visible, onContinue}) {
  return (
    <MyModal visible={visible} modalStyle={modalStyle}>
      <View style={{height: '100%'}}>
        <Text style={titleStyle}>Torre de{'\n'}Hanoi</Text>
        <MyButton large title="Jogar" onPress={onContinue} />
      </View>
    </MyModal>
  );
}

const modalStyle = StyleSheet.create({
  height: '100%',
  width: '100%',
});

const titleStyle = StyleSheet.create({
  color: '#96866f',
  textAlign: 'center',
  paddingVertical: '4%',
  fontSize: 68,
  fontFamily: 'Ancient Hellenic',
  textShadowColor: '#000',
  textShadowOffset: {width: 2, height: 2},
  textShadowRadius: 16,
});
