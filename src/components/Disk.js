import {View, Text, StyleSheet} from 'react-native';

const colorMap = {
  1: '#D80010', // #24698F
  2: '#00AD26', // #FEDC58
  3: '#FCC721', // #09448F
  4: '#F27591', // #DB7C00
  5: '#8E2DF0', // #17420
  6: '#0031F4', // #A63824
  7: '#78372A', // #6DDB4D
};

export default function Disk({number}) {
  const styles = StyleSheet.create({
    width: 18 * (number + 1),
    height: 22,
    borderRadius: 8,
    marginLeft: 12,
    backgroundColor: colorMap[number],
  });

  return (
    <View style={styles}>
      <Text style={{textAlign: 'center'}}>{number}</Text>
    </View>
  );
}
