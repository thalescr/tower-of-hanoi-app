import React from 'react';
import {ImageBackground, View} from 'react-native';
import Game from './components/Game';

export default function MainWindow() {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <ImageBackground source={require('./assets/background.png')}>
        <Game />
      </ImageBackground>
    </View>
  );
}
