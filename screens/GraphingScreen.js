import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Line, Text as SvgText, Polyline } from 'react-native-svg';

const { width } = Dimensions.get('window');
const size = width - 40;
const mid = size / 2;

export default function GraphingScreen() {
  const [equation, setEquation] = useState('');
  const [points, setPoints] = useState([]);

  const generateGraph = () => {
    if (!equation.toLowerCase().includes('x')) {
      alert('Invalid Equation');
      return;
    }

    const coords = [];
    const scale = 10

    for (let x = -10; x <= 10; x += 0.2) {
      try {
        const cleaned = equation
          .toLowerCase()
          .replace(/(\d)(x)/g, '$1*$2')         
          .replace(/(\))(\()/g, '$1*($2')       
          .replace(/(\d)\(/g, '$1*(')           
          .replace(/\)(\d)/g, ')*$1');          

        const expr = cleaned.replace(/x/g, `(${x})`)
        let y = eval(expr)
        if (isNaN(y)) continue

        const px = mid + x * scale
        const py = mid - y * scale
        coords.push(`${px},${py}`)
      } catch {
        continue;
      }
    }

    setPoints(coords)
  };

  const clearGraph = () => {
    setPoints([])
    setEquation('')
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>Graphing Calculator</Text>

          <TextInput
            style={styles.input}
            value={equation}
            onChangeText={setEquation}
            placeholder="Enter equation"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={generateGraph}>
            <Text style={styles.buttonText}>Plot Graph</Text>
          </TouchableOpacity>

          <View style={styles.graphBox}>
            <Svg width={size} height={size}>

              <Line x1={mid} y1={0} x2={mid} y2={size} stroke="#fff" strokeWidth="1" />
              <Line x1={0} y1={mid} x2={size} y2={mid} stroke="#fff" strokeWidth="1" />

              <SvgText x={mid + 4} y={12} fill="#fff" fontSize="12">Y</SvgText>
              <SvgText x={size - 16} y={mid - 4} fill="#fff" fontSize="12">X</SvgText>

              {points.length > 0 && (
                <Polyline
                  points={points.join(' ')}
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                />
              )}
            </Svg>
          </View>

           <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearGraph}>
            <Text style={styles.buttonText}>Clear Graph</Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#32cd32',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  graphBox: {
    alignSelf: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    marginTop: 20,
  },
})
