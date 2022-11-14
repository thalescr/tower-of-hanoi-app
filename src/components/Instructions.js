import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import MyButton from './MyButton';
import MyModal from './MyModal';

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
    <MyModal visible={visible} modalStyle={modalStyle}>
      <Text style={{fontSize: 18, fontWeight: '800'}}>Instruções</Text>

      <Text style={{fontSize: 16, textAlign: 'center'}}>
        Toque em um pilar para levantar um disco e em seguida toque no pilar
        para onde deseja deslocá-lo.
      </Text>

      <Image style={{width: 380, height: 148}} source={images[currentImage]} />

      <Text style={{fontSize: 16, textAlign: 'center'}}>
        O objetivo é empilhar todos os discos no segundo ou terceiro pilar sem
        colocar um disco maior sobre um disco menor.
      </Text>

      <View style={{marginTop: 2, marginBottom: 7}}>
        <MyButton title="Jogar agora" onPress={() => setVisible(false)} />
      </View>
    </MyModal>
  );
}

const modalStyle = StyleSheet.create({
  height: '90%',
  width: '80%',
  marginTop: '2%',
  marginHorizontal: '10%',
});
