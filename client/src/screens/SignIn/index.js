import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const SingIn = () => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const handleRegister = async () => {
    console.log({nome, senha, email})
    
    const requestSingIn = async () => {

      await fetch(`http://192.168.3.108:3000/singin`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    } )
    .then((response) => response.json())
    .then((json) => {
      setToken(json.token)
      alert(json.message)
    })
    .catch((error) => {
      console.error(error);
    });
  }
    requestSingIn()

    


  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registar</Text>

      <TextInput style={styles.input} placeholder={'Digite seu nome'} onChangeText={(text) => setNome(text)} />
      <TextInput style={styles.input} placeholder={'Digite seu email'} onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.input} placeholder={'Digite sua senha'} secureTextEntry={true}  onChangeText={(text) => setSenha(text)} />

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnTexto}>Registar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.redi}  onPress={() => {

        navigation.reset({
          routes: [{name: 'Login'}]
        })
}}>
  <Text style={styles.texto}>Já tem uma conta?</Text>
  <Text style={styles.texto}><Text style={styles.destaque}>Clique aqui</Text> para logar</Text>
</TouchableOpacity>

      <StatusBar style="light" hidden={true}/>
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
  btnTexto: {
    color: '#FF9F1C',
    fontSize: 18
  },
  texto: {
    color: '#F9F9F9',
    fontSize: 18
  },
  input: {
    paddingLeft: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  btn:{
    borderWidth: 2,
    borderColor: '#FF9F1C',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  title:{
    fontSize: 45,
    color: '#f9f9f9',
    marginBottom: 50
  },
  redi: {
    marginTop: 20
  },
  destaque:{
    color: '#F71735',
  }
});

export default SingIn