import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import Instructions from './Instructions';
import Pad from './Pad';
import UserInfo from './UserInfo';
import WinAlert from './WinAlert';

let NUMBER_OF_DISKS;

const backgrounds = [
  require('../assets/backgrounds/level1.png'),
  require('../assets/backgrounds/level2.png'),
  require('../assets/backgrounds/level3.png'),
  require('../assets/backgrounds/level4.png'),
  require('../assets/backgrounds/level5.png'),
];

export default function Game() {
  const [level, setLevel] = useState(1);
  const [raisedPad, setRaisedPad] = useState(null);
  const [movements, setMovements] = useState(0);
  const [startedTime, setStartedTime] = useState(new Date());
  const [winAlertVisible, setWinAlertVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const [disks0, setDisks0] = useState([]);
  const [disks1, setDisks1] = useState([]);
  const [disks2, setDisks2] = useState([]);
  const disks = [
    {get: disks0, set: setDisks0},
    {get: disks1, set: setDisks1},
    {get: disks2, set: setDisks2},
  ];

  const resetGame = () => {
    setStartedTime(new Date());
    const startingDisks = [...Array(NUMBER_OF_DISKS).keys()].map(number => ({
      number: ++number,
      raised: false,
    }));
    setRaisedPad(null);
    setMovements(0);
    setDisks0(startingDisks);
    setDisks1([]);
    setDisks2([]);
  };

  useEffect(() => {
    NUMBER_OF_DISKS = level + 2;
    resetGame();
  }, [level]);

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

  const onContinue = () => {
    setLevel(level < 5 ? level + 1 : 1);
    setWinAlertVisible(false);
  };

  useEffect(() => {
    if (
      disks1.length === NUMBER_OF_DISKS ||
      disks2.length === NUMBER_OF_DISKS
    ) {
      setWinAlertVisible(true);
    }
  }, [disks1, disks2]);

  return (
    <ImageBackground source={backgrounds[level - 1]}>
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
        <View
          style={{
            paddingTop: 22,
          }}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              fontWeight: '800',
              color: '#000000',
            }}>
            Nível {level} {'\n'}
            Movimentos: {movements}
          </Text>
        </View>
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
        <UserInfo />
        <Instructions
          visible={instructionsVisible}
          setVisible={setInstructionsVisible}
        />
        <WinAlert
          level={level}
          movements={movements}
          startedTime={startedTime}
          onContinue={onContinue}
          visible={winAlertVisible}
        />
      </View>
    </ImageBackground>
  );
}
