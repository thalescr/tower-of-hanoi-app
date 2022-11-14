import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MyModal from './MyModal';
import MyButton from './MyButton';

export default function UserInfo() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [grade, setGrade] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      if (id === null) {
        setVisible(true);
      }
    });
  }, []);

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
    <MyModal visible={visible} modalStyle={modalStyle}>
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
      <View style={selectStyle}>
        <Picker
          style={{
            width: 240,
            height: 46,
            marginTop: -10,
            color: !gender ? '#888' : '#000',
          }}
          mode="dropdown"
          selectedValue={gender}
          onValueChange={value => setGender(value)}>
          <Picker.Item label="Sexo" enabled={false} />
          <Picker.Item label="Feminino" value="feminino" />
          <Picker.Item label="Masculino" value="masculino" />
        </Picker>
      </View>
      <View style={selectStyle}>
        <Picker
          style={{
            width: 240,
            height: 46,
            marginTop: -10,
            color: !grade ? '#888' : '#000',
          }}
          mode="dropdown"
          selectedValue={grade}
          onValueChange={value => setGrade(value)}>
          <Picker.Item label="Série" enabled={false} />
          <Picker.Item value="6ofund" label="6º ano E. Fundamental" />
          <Picker.Item value="7o_fund" label="7º ano E. Fundamental" />
          <Picker.Item value="8o_fund" label="8º ano E. Fundamental" />
          <Picker.Item value="9o_fund" label="9º ano E. Fundamental" />
          <Picker.Item value="1o_medio" label="1º ano E. Médio" />
          <Picker.Item value="2o_medio" label="2º ano E. Médio" />
          <Picker.Item value="3o_medio" label="3º ano E. Médio" />
        </Picker>
      </View>
      <View style={{marginTop: 6, marginBottom: 16}}>
        <MyButton
          disabled={!name || !age || !gender || !grade}
          title="Jogar"
          onPress={() => saveUserInfo()}
        />
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

const titleStyle = StyleSheet.create({
  fontSize: 18,
  paddingVertical: 12,
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
  marginBottom: 6,
  width: 240,
});
