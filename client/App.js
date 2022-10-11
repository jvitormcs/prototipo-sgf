import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import Store from './src/store';
import MainStack from './src/routes/MainStack';

export default function App() {
  return (

    <Provider store={Store}>

      <NavigationContainer>

        <MainStack />

      </NavigationContainer>
    
    </Provider>
       
  );
}

