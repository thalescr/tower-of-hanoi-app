import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal, Text, Button, View, StyleSheet, TextInput} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default function UserInfo() {
  const hasFilled = AsyncStorage.getItem('id');
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [grade, setGrade] = useState();
  const [visible, setVisible] = useState(!hasFilled);

  const saveUserInfo = () => {
    if (name && age && gender && grade) {
      AsyncStorage.setItem('id', uuid.v4());
      AsyncStorage.setItem('name', name);
      AsyncStorage.setItem('age', age);
      AsyncStorage.setItem('gender', gender);
      AsyncStorage.setItem('grade', grade);
    }
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyle}>
        <Text style={titleStyle}>Por favor, preencha seus dados:</Text>
        <TextInput
          style={inputStyle}
          placeholder="Nome"
          value={name}
          onChangeText={value => setName(value)}
        />
        <TextInput
          style={inputStyle}
          placeholder="Idade"
          keyboardType="numeric"
          value={age}
          onChangeText={value => setAge(value)}
        />
        <ModalSelector
          initValue="Sexo"
          initValueTextStyle={selectInitValueStyle}
          selectStyle={selectStyle}
          onChange={({key}) => setGender(key)}
          data={[
            {key: 'masculino', label: 'Masculino'},
            {key: 'feminino', label: 'Feminino'},
          ]}
        />
        <ModalSelector
          initValue="Série"
          initValueTextStyle={selectInitValueStyle}
          selectStyle={selectStyle}
          onChange={({key}) => setGrade(key)}
          data={[
            {key: '6o_fund', label: '6º ano E. Fundamental'},
            {key: '7o_fund', label: '7º ano E. Fundamental'},
            {key: '8o_fund', label: '8º ano E. Fundamental'},
            {key: '9o_fund', label: '9º ano E. Fundamental'},
            {key: '1o_medio', label: '1º ano E. Médio'},
            {key: '2o_medio', label: '2º ano E. Médio'},
            {key: '3o_medio', label: '3º ano E. Médio'},
          ]}
        />
        <Button
          disabled={!name || !age || !gender || !grade}
          title="Jogar"
          onPress={() => saveUserInfo()}
        />
      </View>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  alignItems: 'center',
  backgroundColor: '#eee',
  height: '80%',
  width: '80%',
  borderRadius: 10,
  padding: 30,
  marginTop: '5%',
  marginHorizontal: '10%',
});

const titleStyle = StyleSheet.create({
  fontSize: 18,
  paddingBottom: 8,
});

const inputStyle = StyleSheet.create({
  borderColor: '#333',
  borderWidth: 2,
  borderRadius: 5,
  width: 240,
  marginBottom: 8,
  paddingVertical: 5,
  paddingHorizontal: 18,
});

const selectStyle = StyleSheet.create({
  borderColor: '#333',
  borderWidth: 2,
  borderRadius: 5,
  paddingHorizontal: 20,
  paddingVertical: 8,
  marginBottom: 6,
  width: 240,
});

const selectInitValueStyle = StyleSheet.create({
  color: '#888',
  textAlign: 'left',
});
