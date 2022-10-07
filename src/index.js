import React, {useState} from 'react';
import {View} from 'react-native';
import Game from './components/Game';

export default function MainWindow() {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#e5bc7f',
      }}>
      <Game />
    </View>
  );
}
