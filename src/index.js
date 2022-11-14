import React, {useState} from 'react';
import {View} from 'react-native';
import HomeScreen from './components/HomeScreen';
import Game from './components/Game';

export default function MainWindow() {
  const [homeScreenVisible, setHomeScreenVisible] = useState(true);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      {!homeScreenVisible && <Game />}
      {homeScreenVisible && (
        <HomeScreen
          visible={homeScreenVisible}
          onContinue={() => setHomeScreenVisible(false)}
        />
      )}
    </View>
  );
}
