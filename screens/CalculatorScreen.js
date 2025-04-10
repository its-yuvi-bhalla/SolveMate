import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const GAP = width * 0.02;
const BTN_SIZE = (width - GAP * 5) / 4;

const CalculatorScreen = () => {
  const [value, setValue] = useState('');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [expression, setExpression] = useState('');
  const [justOp, setJustOp] = useState(false);
  const [justEqual, setJustEqual] = useState(false);
  const [showExpr, setShowExpr] = useState(false);

  const evaluate = () => {
    const a = parseFloat(prev);
    const b = parseFloat(value);
    if (isNaN(a) || isNaN(b)) return '';

    let result = 0;
    if (op === '+') result = a + b;
    else if (op === '−') result = a - b;
    else if (op === '×') result = a * b;
    else if (op === '÷') result = b !== 0 ? a / b : 'Err';

    return isFinite(result) ? result.toString() : 'Err';
  };

  const handlePress = (key) => {
    if (key === 'AC') {
      setValue('');
      setPrev(null);
      setOp(null);
      setExpression('');
      setJustOp(false);
      setJustEqual(false);
      setShowExpr(false);
      return;
    }

    if (key === '⌫') {
      setValue(prev => (prev.length > 1 ? prev.slice(0, -1) : ''));
      return;
    }

    if (key === '±') {
      setValue(prev => (parseFloat(prev) === 0 || prev === '') ? '' : (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
      return;
    }

    if (key === '%') {
      setValue(prev => (parseFloat(prev) / 100).toFixed(4));
      return;
    }

    if (key === '.') {
      setValue(prev => {
        if (justOp) {
          setJustOp(false);
          return '0.';
        }
        if (justEqual) {
          setJustEqual(false);
          return prev.includes('.') ? prev : prev + '.';
        }
        if (prev.includes('.')) return prev;
        return prev === '' ? '0.' : prev + '.';
      });
      return;
    }

    if (['÷', '×', '−', '+'].includes(key)) {
      if (value === '') return;
      if (op && !justOp) {
        const result = evaluate();
        setPrev(result);
        setValue('');
        setOp(key);
        setExpression(result + ' ' + key);
        setShowExpr(true);
        setJustOp(true);
        return;
      }

      if (!op) {
        setPrev(value);
        setValue('');
        setOp(key);
        setExpression(value + ' ' + key);
        setShowExpr(true);
        setJustOp(true);
        return;
      }

      setOp(key);
      setValue('');
      setExpression(prev + ' ' + key);
      setShowExpr(true);
      return;
    }

    if (key === '=') {
      if (!op || prev === null || value === '') return;
      const result = evaluate();
      setValue(result);
      setExpression(prev + ' ' + op + ' ' + value + ' =');
      setPrev(result);
      setOp(null);
      setJustOp(false);
      setJustEqual(true);
      setShowExpr(true);
      return;
    }

    setValue(prev => {
      if (justOp) {
        setJustOp(false);
        return key;
      }
      if (justEqual) {
        setJustEqual(false);
        return prev + key;
      }
      return prev + key;
    });
  };

  const keys = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        {showExpr && expression !== '' && (
          <Text style={styles.expression}>{expression}</Text>
        )}
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
      </View>

      <View style={styles.buttonGrid}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn, btnIndex) => (
              <TouchableOpacity
                key={btnIndex}
                onPress={() => handlePress(btn)}
                style={[styles.key, isOp(btn) && styles.opKey, isFunc(btn) && styles.funcKey]}
              >
                <Text style={[styles.keyText, isFunc(btn) && styles.funcText]}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const isOp = (val) => ['÷', '×', '−', '+', '='].includes(val);
const isFunc = (val) => ['AC', '±', '%', '⌫'].includes(val);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  expression: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'right',
  },
  result: {
    color: '#fff',
    fontSize: 72,
    textAlign: 'right',
    fontWeight: '400',
  },
  buttonGrid: {
    paddingHorizontal: GAP,
    paddingBottom: GAP,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  key: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  opKey: {
    backgroundColor: '#ff8c00',
  },
  funcKey: {
    backgroundColor: '#a5a5a5',
  },
  keyText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '400',
  },
  funcText: {
    color: '#000',
  },
});

export default CalculatorScreen;