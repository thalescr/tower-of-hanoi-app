import React from 'react';
import {View, Modal, StyleSheet, ImageBackground} from 'react-native';

export default function MyModal({children, visible, modalStyle}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyle}>
        <ImageBackground
          source={require('../assets/wall.png')}
          style={{padding: 12}}
          imageStyle={{resizeMode: 'repeat'}}>
          <View style={modalInner}>{children}</View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const modalInner = StyleSheet.create({
  alignItems: 'center',
  backgroundColor: '#e4d5c0',
  padding: 0,
});
