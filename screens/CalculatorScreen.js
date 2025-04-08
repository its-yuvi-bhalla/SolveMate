import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')
const BUTTON_SIZE = width * 0.22
const BUTTON_MARGIN = width * 0.02

const CalculatorScreen = () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [expression, setExpression] = useState('')

  const handlePress = (value) => {
    if (value === '⌫') {
      setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (value === '±') {
      setDisplayValue((prev) =>
        prev.startsWith('-') ? prev.slice(1) : `-${prev}`
      )
    } else if (value === '%') {
      setDisplayValue((prev) => (parseFloat(prev) / 100).toString())
    } else if (value === '.') {
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.')
      }
    } else if (['÷', '×', '−', '+'].includes(value)) {
      setPreviousValue(displayValue)
      setOperator(value)
      setExpression(`${displayValue} ${value}`)
      setDisplayValue('0')
    } else if (value === '=') {
      const a = parseFloat(previousValue)
      const b = parseFloat(displayValue)
      let result = 0

      switch (operator) {
        case '+': result = a + b; break;
        case '−': result = a - b; break;
        case '×': result = a * b; break;
        case '÷': result = a / b; break;
        default: return
      }

      const fullExpr = `${expression} ${displayValue} =`
      setDisplayValue(result % 1 === 0 ? result.toString() : result.toFixed(2))
      setExpression(fullExpr)
      setPreviousValue(null)
      setOperator(null)
    } else {
      setDisplayValue((prev) => (prev === '0' ? value : prev + value))
    }
  }

  const buttons = [
    ['⌫', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        {expression !== '' && (
          <Text style={styles.expressionText}>{expression}</Text>
        )}
        <Text
          style={styles.displayText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {displayValue}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((label, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(label)}
                style={[
                  styles.button,
                  label === '0' && row.length === 3 && index === 0 && styles.doubleButton,
                  isOperator(label) && styles.operatorButton,
                  isFunction(label) && styles.functionButton,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isFunction(label) && styles.functionText,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

const isOperator = (val) => ['÷', '×', '−', '+', '='].includes(val)
const isFunction = (val) => ['⌫', '±', '%'].includes(val)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  expressionText: {
    color: '#888',
    fontSize: 28,
    textAlign: 'right',
  },
  displayText: {
    color: '#fff',
    fontSize: 72,
    textAlign: 'right',
    fontWeight: '400',
  },
  buttonsContainer: {
    paddingHorizontal: BUTTON_MARGIN,
    paddingBottom: BUTTON_MARGIN,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: BUTTON_MARGIN,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: BUTTON_MARGIN / 2,
    backgroundColor: '#333',
  },
  doubleButton: {
    width: BUTTON_SIZE * 2 + BUTTON_MARGIN,
    alignItems: 'flex-start',
    paddingLeft: BUTTON_SIZE * 0.3,
  },
  operatorButton: {
    backgroundColor: '#32cd32',
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '400',
  },
  functionText: {
    color: '#000',
  },
})

export default CalculatorScreen
