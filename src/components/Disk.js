import { View, StyleSheet } from 'react-native';

const colorMap = {
  1: '#24698F',
  2: '#FEDC58',
  3: '#09448F',
  4: '#DB7C00',
  5: '#17420A',
  6: '#A63824',
  7: '#6DDB4D'
};

export default function Disk({ number }) {
  const styles = StyleSheet.create({
    width: 28 * number,
    height: 22,
    borderRadius: 8,
    marginLeft: 12,
    backgroundColor: colorMap[number],
  });

  return (
    <View style={styles} />
  );
}
