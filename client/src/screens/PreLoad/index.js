import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,  ActivityIndicator, Image } from 'react-native';
import logo from '../../images/logo.png'
import { useNavigation } from '@react-navigation/native';

const PreLoad = () => {

  const navigation = useNavigation()

  useEffect(() => {

        navigation.navigate('Login')

  }, [])

  return (
    <View style={styles.container}>

        <Image source={logo} style={styles.logo} />
        <ActivityIndicator size='large' color='#f9f9f9' style={styles.loading} />
      <StatusBar style="light"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011627',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 220,
    height: 180
  },
  loading: {
   marginTop: 30
  }
});

export default PreLoad