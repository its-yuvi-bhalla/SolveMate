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
const scale = 10;

export default function GraphingScreen() {
  const [equation, setEquation] = useState('');
  const [points, setPoints] = useState([]);

  const preprocess = (eq, x) => {
    return eq
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/(\d)(x)/g, '$1*$2')
      .replace(/(x)(\d)/g, '$1*$2')
      .replace(/(\))(?=\()/g, ')*(')
      .replace(/(\d)\(/g, '$1*(')
      .replace(/\)(\d)/g, ')*$1')
      .replace(/x\^([\d]+)/g, (_, p1) => `Math.pow(x, ${p1})`)
      .replace(/x²/g, 'Math.pow(x, 2)')
      .replace(/x³/g, 'Math.pow(x, 3)')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/x/g, `(${x})`);
  };

  const generateGraph = () => {
    if (!equation.toLowerCase().includes('x')) {
      alert('Invalid Equation: missing "x"');
      return;
    }

    try {
      const coords = [];
      for (let x = -mid / scale; x <= mid / scale; x += 0.2) {
        const expr = preprocess(equation, x);
        if (!expr.includes('(') || (expr.match(/\(/g) || []).length !== (expr.match(/\)/g) || []).length) {
          throw new Error('Unmatched brackets');
        }
        const y = eval(expr);
        if (isNaN(y)) continue;

        const px = mid + x * scale;
        const py = mid - y * scale;
        coords.push({ x: px, y: py });
      }

      setPoints(coords);
    } catch (error) {
      alert('Invalid equation or unmatched brackets');
    }
  };

  const clearGraph = () => {
    setPoints([]);
    setEquation('');
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
            placeholder="Try x², x^2, 2x, sin(x), etc"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={generateGraph}>
            <Text style={styles.buttonText}>Plot Graph</Text>
          </TouchableOpacity>

          <View style={styles.graphBox}>
            <Svg width={size} height={size}>
              {Array.from({ length: size / scale }, (_, i) => {
                const x = i * scale;
                return (
                  <Line
                    key={`v-${i}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={size}
                    stroke="#444"
                    strokeWidth="0.5"
                  />
                );
              })}
              {Array.from({ length: size / scale }, (_, i) => {
                const y = i * scale;
                return (
                  <Line
                    key={`h-${i}`}
                    x1={0}
                    y1={y}
                    x2={size}
                    y2={y}
                    stroke="#444"
                    strokeWidth="0.5"
                  />
                );
              })}
              <Line x1={mid} y1={0} x2={mid} y2={size} stroke="#fff" strokeWidth="1" />
              <Line x1={0} y1={mid} x2={size} y2={mid} stroke="#fff" strokeWidth="1" />

              <SvgText x={mid + 4} y={12} fill="#fff" fontSize="12">Y</SvgText>
              <SvgText x={size - 16} y={mid - 4} fill="#fff" fontSize="12">X</SvgText>

              {points.length > 0 && (
                <Polyline
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="lime"
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  inner: { padding: 20, paddingBottom: 40 },
  title: { color: '#fff', fontSize: 24, marginBottom: 16, textAlign: 'center' },
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
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButton: { backgroundColor: '#ff8c00' },
  buttonText: { color: '#000', fontSize: 18 },
  graphBox: {
    alignSelf: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    marginTop: 20,
  },
});