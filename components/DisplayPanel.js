import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DisplayPanel = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 32,
    color: '#fff',
  },
});

export default DisplayPanel
