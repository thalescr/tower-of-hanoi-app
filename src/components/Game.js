import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import Pad from './Pad';

const NUMBER_OF_DISKS = 7;

const startingDisks = [...Array(NUMBER_OF_DISKS).keys()].map(number => ({
  number: ++number,
  raised: false,
}));

export default function Game() {
  const [raisedPad, setRaisedPad] = useState(null);
  const [movements, setMovements] = useState(0);
  const [disks0, setDisks0] = useState(startingDisks);
  const [disks1, setDisks1] = useState([]);
  const [disks2, setDisks2] = useState([]);
  const disks = [
    {get: disks0, set: setDisks0},
    {get: disks1, set: setDisks1},
    {get: disks2, set: setDisks2},
  ];

  const resetGame = () => {
    setRaisedPad(null);
    setMovements(0);
    setDisks0(startingDisks);
    setDisks1([]);
    setDisks2([]);
  };

  const raiseDisk = currentIndex => {
    const currentDisks = disks[currentIndex].get;
    if (currentDisks[0] && !currentDisks[0].raised) {
      const {number} = currentDisks.shift();
      currentDisks.unshift({
        number: number,
        raised: true,
      });
      disks[currentIndex].set(Array.from(currentDisks));
      setRaisedPad(currentIndex);
    }
  };

  const unraiseDisk = currentIndex => {
    const currentDisks = disks[currentIndex].get;
    if (currentDisks[0] && currentDisks[0].raised) {
      const {number} = currentDisks.shift();
      currentDisks.unshift({
        number: number,
        raised: false,
      });
      disks[currentIndex].set(Array.from(currentDisks));
      setRaisedPad(null);
    }
  };

  const shiftDisk = currentIndex => {
    const toDisks = Array.from(disks[currentIndex].get);
    const fromDisks = Array.from(disks[raisedPad].get);
    const popped = fromDisks.shift();
    const topDisk = Array.from(toDisks).shift();
    if (!topDisk || popped.number < topDisk.number) {
      disks[raisedPad].set(fromDisks);
      toDisks.unshift({
        number: popped.number,
        raised: false,
      });
      disks[currentIndex].set(toDisks);
      setRaisedPad(null);
      setMovements(movements + 1);
    }
  };

  const diskAction = currentIndex => {
    if (raisedPad === null) {
      raiseDisk(currentIndex);
    } else {
      if (raisedPad === currentIndex) {
        unraiseDisk(currentIndex);
      }
      shiftDisk(currentIndex);
    }
  };

  useEffect(() => {
    if (
      disks1.length === NUMBER_OF_DISKS ||
      disks2.length === NUMBER_OF_DISKS
    ) {
      console.log('Won!', movements);
    }
  }, [disks1, disks2]);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingHorizontal: '2%',
        width: '100%',
        height: '100%',
      }}>
      <Text>{movements}</Text>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginRight: 12,
          width: '100%',
          height: 1200,
        }}>
        <Pad disks={disks0} diskAction={() => diskAction(0)} />
        <Pad disks={disks1} diskAction={() => diskAction(1)} />
        <Pad disks={disks2} diskAction={() => diskAction(2)} />
      </View>
    </View>
  );
}
