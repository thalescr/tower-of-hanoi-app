import React from 'react';
import {View} from 'react-native';
import Disk from './Disk';

export default function Pad({disks, diskAction}) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      }}>
      <View
        style={{
          height: 30,
        }}>
        {disks
          .filter(disk => disk.raised)
          .map(({number: diskNumber}) => (
            <Disk key={diskNumber} number={diskNumber} />
          ))}
      </View>
      <View
        onTouchStart={() => diskAction()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 240,
          width: '28%',
        }}>
        <View
          style={{
            backgroundColor: '#550000',
            height: '100%',
            width: 6,
            marginLeft: '7%',
            height: 168 - disks.filter(disk => !disk.raised).length * 22,
            bottom: 0,
          }}
        />
        {disks
          .filter(disk => !disk.raised)
          .map(({number: diskNumber, raised}) => (
            <Disk key={diskNumber} number={diskNumber} />
          ))}
        <View
          style={{
            backgroundColor: '#550000',
            height: 10,
            width: '100%',
            marginLeft: '7%',
          }}
        />
      </View>
    </View>
  );
}
