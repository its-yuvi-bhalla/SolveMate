import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const conversionData = {
  Length: {
    units: ['cm', 'm', 'km'],
    factors: { cm: 0.01, m: 1, km: 1000 }, 
  },
  Weight: {
    units: ['g', 'kg', 'lb'],
    factors: { g: 1, kg: 1000, lb: 453.592 }, 
  },
  Volume: {
    units: ['ml', 'l', 'gal'],
    factors: { ml: 0.001, l: 1, gal: 3.785 }, 
  },
};

const ConversionScreen = () => {
  const [category, setCategory] = useState('Length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('m');
  const [result, setResult] = useState('');

  const handleCategoryChange = (newCategory) => {
    const defaultUnit = conversionData[newCategory].units[0];
    setCategory(newCategory);
    setFromUnit(defaultUnit);
    setToUnit(conversionData[newCategory].units[1] || defaultUnit);
    setResult('');
    setValue('');
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    const { factors } = conversionData[category];
    const base = val * factors[fromUnit];
    const converted = base / factors[toUnit];
    setResult(converted.toFixed(4));
  };

  const currentUnits = conversionData[category].units;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Unit Converter</Text>

          <Picker
            selectedValue={category}
            onValueChange={handleCategoryChange}
            style={styles.typePicker}
            dropdownIconColor="#fff"
          >
            {Object.keys(conversionData).map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} color="#fff" />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder="Enter value"
            placeholderTextColor="#888"
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fromUnit}
              onValueChange={(itemValue) => setFromUnit(itemValue)}
              dropdownIconColor="#fff"
              style={styles.picker}
            >
              {currentUnits.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} color="#fff" />
              ))}
            </Picker>

            <Text style={styles.toText}>to</Text>

            <Picker
              selectedValue={toUnit}
              onValueChange={(itemValue) => setToUnit(itemValue)}
              dropdownIconColor="#fff"
              style={styles.picker}
            >
              {currentUnits.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} color="#fff" />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.convertButton} onPress={convert}>
            <Text style={styles.convertText}>Convert</Text>
          </TouchableOpacity>

          {result !== '' && (
            <Text style={styles.resultText}>
              Result: {result} {toUnit}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,

  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  typePicker: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#222',
    borderRadius: 8,
  },
  picker: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#222',
    borderRadius: 8,
  },
  toText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  convertButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 999,
    alignItems: 'center',
    marginVertical: 10,
  },
  convertText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ConversionScreen;
