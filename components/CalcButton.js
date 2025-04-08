// components/CalcButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CalcButton = ({ label, onPress, type }) => {
  const buttonStyle = [styles.button];
  const textStyle = [styles.text];

  switch (type) {
    case 'gray':
      buttonStyle.push(styles.gray);
      textStyle.push(styles.blackText);
      break;
    case 'orange':
      buttonStyle.push(styles.orange);
      break;
    case 'wide':
      buttonStyle.push(styles.wide);
      break;
    default:
      buttonStyle.push(styles.dark);
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => onPress(label)}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const buttonSize = screenWidth / 4 - 10;

const styles = StyleSheet.create({
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 28,
    color: '#fff',
  },
  blackText: {
    color: '#000',
  },
  dark: {
    backgroundColor: '#333',
  },
  gray: {
    backgroundColor: '#a5a5a5',
  },
  orange: {
    backgroundColor: '#fe9505',
  },
  wide: {
    width: buttonSize * 2 + 10,
    borderRadius: buttonSize,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
});

export default CalcButton;
