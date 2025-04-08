import { View, StyleSheet } from 'react-native';
import React from 'react';
import Button from './CalcButton';

const ButtonGrid = ({ buttons, onButtonPress }) => {
  return (
    <View style={styles.grid}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((label, index) => (
            <Button key={index} label={label} onPress={onButtonPress} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default ButtonGrid
