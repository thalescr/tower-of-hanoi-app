import React, {useEffect, useState} from 'react';
import {Modal, Text, Button, View, StyleSheet, Image} from 'react-native';

const images = [
  require('../assets/intro/frame1.png'),
  require('../assets/intro/frame2.png'),
  require('../assets/intro/frame3.png'),
  require('../assets/intro/frame4.png'),
  require('../assets/intro/frame5.png'),
  require('../assets/intro/frame6.png'),
  require('../assets/intro/frame7.png'),
  require('../assets/intro/frame8.png'),
  require('../assets/intro/frame9.png'),
];

export default function Instructions({visible, setVisible}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 600);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyle}>
        <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 8}}>
          Instruções
        </Text>

        <Text style={{fontSize: 16, textAlign: 'center'}}>
          Toque em um pilar para levantar um disco e em seguida toque no pilar
          para onde deseja deslocá-lo.
        </Text>

        <Image
          style={{width: 380, height: 148}}
          source={images[currentImage]}
        />

        <Text style={{fontSize: 16, textAlign: 'center'}}>
          O objetivo é empilhar todos os discos no segundo ou terceiro pilar sem
          colocar um disco maior sobre um disco menor.
        </Text>

        <View style={{marginTop: 10}}>
          <Button title="Continuar" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  alignItems: 'center',
  backgroundColor: '#eee',
  height: '90%',
  width: '80%',
  borderRadius: 10,
  padding: 12,
  marginTop: '2%',
  marginHorizontal: '10%',
});
