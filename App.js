/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PersonalChatsScreen from './src/screens/contacts/PersonalChatsScreen';
import ValidateCodeScreen from './src/screens/login/ValidateCodeScreen';
import ConfirmLoginScreen from './src/screens/login/ConfirmLoginScreen';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ValidateCode" component={ValidateCodeScreen} />
        <Stack.Screen name="ConfirmLogin" component={ConfirmLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PersonalChat" component={PersonalChatsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
