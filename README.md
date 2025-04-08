# 🧠 SolveMate

**SolveMate** is a sleek, modern mobile app built with **React Native**, designed to help you:

- ✏️ Perform basic arithmetic with a clean calculator interface
- 📉 Plot 2D graphs of equations
- 🔁 Convert between units like length, weight, and volume

---

## 🚀 Features

### 🔢 Calculator
- iOS-style dark calculator
- Supports standard operators (`+`, `-`, `×`, `÷`, `%`, `±`)
- Backspace and decimal point handling

### 📊 Graphing Calculator
- Real 2D x-y plane with all four quadrants
- Plot equations like `x*x`, `3x-2`, `Math.sin(x)`
- Zoom in/out and clear graph
- Handles `x` or `X` inputs with implicit multiplication (`3x → 3*x`)

### 🔁 Unit Converter
- Convert Length (cm, m, km), Weight (g, kg, lb), and Volume (ml, l, gal)
- Clean dropdown UI with category switching
- Light and fast

---

## 📱 Screens

- `LogoScreen`: App splash screen with animated logo
- `CalculatorScreen`: Main calculator interface
- `GraphingScreen`: SVG-powered equation plotting
- `ConversionScreen`: Unit conversions with dropdowns
- `MainScreen`: Navigation hub to switch tools

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [react-native-dropdown-picker](https://github.com/hossein-zare/react-native-dropdown-picker)

---

## 📦 Setup

```bash
git clone https://github.com/its-yuvi-bhalla/SolveMate.git
cd SolveMate
npm install
npx expo start
