import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainWindow from './src';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <MainWindow />
    </SafeAreaView>
  );
};

export default App;
