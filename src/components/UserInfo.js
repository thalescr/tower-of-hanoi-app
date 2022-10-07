import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal, Text, TextInput, Button, View} from 'react-native';

export default function UserInfo({startVisible}) {
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(startVisible || false);

  const saveUserInfo = () => {
    AsyncStorage.setItem('name', name);
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <Text>Seu nome</Text>
        <TextInput value={name} onChangeText={setName} />
        <Button title="Enviar" onPress={() => saveUserInfo()} />
      </View>
    </Modal>
  );
}
