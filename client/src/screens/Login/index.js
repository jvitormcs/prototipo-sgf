import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectUser, set_email, set_name } from '../../slice/userSlice';

const Login = () => {
  const [emailD, setEmailD] = useState('')
  const [senha, setSenha] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {email, nome} = useSelector(selectUser)

  const handleLogin = async  () => {
    
    dispatch(set_email(emailD))

    const requestLogin = async () => {

    await fetch(`http://192.168.3.108:3000/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailD,
        senha
      })
    } )
    .then(async (response) => await response.json())
    .then( async (json) => {
      let nomeD = json.dadosUser.nome
      dispatch(set_name(nomeD))
    })
    .catch((error) => {
      console.error(error);
    });
  }
  await requestLogin()



    navigation.reset({
      routes:[{name: 'MainTab'}]
    })

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder={'Digite seu email'} onChangeText={(text) => setEmailD(text.toLocaleLowerCase())} />
      <TextInput style={styles.input} placeholder={'Digite sua senha'} secureTextEntry={true}  onChangeText={(text) => setSenha(text)} />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnTexto}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.redi} onPress={() => {

      

          navigation.reset({
            routes: [{name: 'SingIn'}]
          })

      }}>
        <Text style={styles.texto}>Não tem uma conta?</Text>
        <Text style={styles.texto}><Text style={styles.destaque}>Clique aqui</Text> para se registrar</Text>
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
    marginBottom: 60
  },
  redi: {
    marginTop: 20
  },
  destaque:{
    color: '#F71735',
  }
});

export default Login