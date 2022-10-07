import React from 'react';
import {View, Modal, Text, Button} from 'react-native';

export default function WinAlert({visible, level, movements, onContinue}) {
  return (
    <Modal visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <Text style={{lineHeight: 36}}>
          Parabéns! Você concluiu o nível {level} em {movements} movimentos.
        </Text>
        <Button onPress={onContinue} title="Continuar" />
      </View>
    </Modal>
  );
}
