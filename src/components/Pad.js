import React from 'react';
import { View } from 'react-native';
import Disk from './Disk';

export default function Pad({ disks, diskAction }) {
  return (
    <View
      onTouchStart={() => diskAction()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 180,
        width: '28%',
      }}
    > 
      {disks.filter((disk) => disk.raised).map(({ number: diskNumber }) => (
        <Disk key={diskNumber} number={diskNumber} />
      ))}
      <View
        style={{
          backgroundColor: '#550000',
          height: '100%',
          width: 10,
          marginLeft: '7%',
          height: 150 - (disks.length * 22),
          bottom: 0,
        }}
      />
      {disks.filter((disk) => !disk.raised).map(({ number: diskNumber, raised }) => 
        <Disk
          key={diskNumber}
          number={diskNumber}
        />
      )}
      <View
        style={{
          backgroundColor: '#550000',
          height: 10,
          width: '100%',
          marginLeft: '7%',
        }}
      />
    </View>
  );
}
