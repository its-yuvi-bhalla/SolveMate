import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CalculatorScreen from './CalculatorScreen';
import ConversionScreen from './ConversionScreen';
import GraphingScreen from './GraphingScreen';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111' },
        tabBarActiveTintColor: '#32cd32',
        tabBarInactiveTintColor: '#fff',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Calculator') {
            iconName = 'calculator';
          } else if (route.name === 'Conversion') {
            iconName = 'swap-horizontal';
          } else if (route.name === 'Graphing') {
            iconName = 'stats-chart';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Conversion" component={ConversionScreen} />
      <Tab.Screen name="Graphing" component={GraphingScreen} />
    </Tab.Navigator>
  );
}
