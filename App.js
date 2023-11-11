import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen'; // Make sure to create this screen
import HomeScreen from './screens/HomeScreen'; // Import HomeScreen
import OrderOptionsScreen from './screens/OrderOptionsScreen'; // Import OrderOptionsScreen
import MenuScreen from './screens/MenuScreen';
import ConfirmOrderScreen from './screens/ConfirmOrderScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
