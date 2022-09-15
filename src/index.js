import React from 'react';
import { View, Text } from 'react-native';
import Disk from './components/Disk';

export default function MainWindow() {
  return (
    <View style={{ backgroundColor: '#4DA9DB', height: '100%'}}>
      <View style={{ display: 'flex', alignItems: 'center'}}>
        <Text>Aaaaaaa</Text>
        <Disk number={1} />
        <Disk number={2} />
        <Disk number={3} />
        <Disk number={4} />
        <Disk number={5} />
        <Disk number={6} />
      </View>
    </View>
  );
}
