import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function MyButton({title, large, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyle}>
        <Text style={large ? textStyleLarge : textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  backgroundColor: '#96866f',
  paddingVertical: 4,
  paddingHorizontal: 14,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
});

const textStyle = StyleSheet.create({
  textAlign: 'center',
  color: '#eee',
  fontSize: 15,
  lineHeight: 26,
});

const textStyleLarge = StyleSheet.create({
  textAlign: 'center',
  color: '#eee',
  fontSize: 24,
  lineHeight: 46,
});
