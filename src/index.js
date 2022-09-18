import React from 'react';
import { View } from 'react-native';
import Game from './components/Game';

export default function MainWindow() {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#4DA9DB',
      }}
    >
      <Game />
    </View>
  );
}
