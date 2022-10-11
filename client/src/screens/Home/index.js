import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slice/userSlice';

const Home = () => {


  const [total, setTotal] = useState(0)
  const [dados, setDados] = useState([])
  const {email, nome} = useSelector(selectUser)

  const [refresh, setRefresh] = useState(0)

  const calcTotal = () => {
    let totalEntrada = 0;
    let totalSaida = 0;

    dados?.map((dado)=> {
      
      if(dado.tipo_transacao == 'entrada'){
       
        totalEntrada += dado.valor
        
      }else{
        totalSaida += dado.valor
      }

    })

    console.log(totalEntrada)
    console.log(totalSaida)

    const calc = totalEntrada - totalSaida

    console.log(calc)
    
    setTotal(calc)

  }
  
  useEffect(() => {

    const requestData = async () => {
    const req = await fetch(`http://192.168.3.108:3000/getFinancas/${email}`);
    const json = await req.json();

    if(json){

      setDados(json);
      console.log(dados)

    }}

    requestData()


  } ,[refresh])

  return (
    <View style={styles.containerP}>
      <Text style={styles.textoNome}>Bem Vindo: {nome}</Text>
    <View style={styles.container}>
      <Text style={[styles.textoTotal, total >= 0 ? styles.positivo : styles.negativo]}>R$ {total}</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>{
        calcTotal()
        setRefresh(refresh + 1)
      }}>
        <Text style={styles.btnTexto}>Verificar</Text>
      </TouchableOpacity>

      <FlatList style={styles.list}
      data={dados}
      renderItem={({item}) => (
        <View style={styles.transacao}>
          <Text style={[styles.textoList ,item.tipo_transacao == 'entrada' ? styles.entrada : styles.saida]}>{item.tipo_transacao}</Text>
          <Text style={styles.textoListValor}>{item.valor}</Text>
        </View>
      )}
      keyExtractor={item => item.id_transacao}
      />

      <StatusBar style="light" hidden={true}/>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  containerP: {
    flex: 1,
    backgroundColor: '#011627',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btn:{
    borderWidth: 2,
    borderColor: '#FF9F1C',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  btnTexto: {
    color: '#FF9F1C',
    fontSize: 18
  },
  texto: {
    color: '#f9f9f9',
    fontSize: 18
  },
  list :{
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 25,
    margin: 10,
    width: 350,
    borderRadius: 15
  },
  transacao:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
  },
  textoList: {
    color: '#011627',
    fontSize: 18,
  },
  saida: {
    backgroundColor: '#F71735',
    color: '#f9f9f9',
    width: 100,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10
  },
  entrada: {
    backgroundColor: '#44cf6c',
    color: '#f9f9f9',
    width: 100,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10
  },
  textoTotal: {
    color: '#f9f9f9',
    fontSize: 22,
  },
  negativo: {
    color: '#F71735'
  },
  textoListValor: {
    fontSize: 20,
    color: '#011627'
  },
  textoNome: {
    fontSize: 26,
    color: '#f9f9f9',
    marginTop: 20,
    marginLeft: 15
  }

});

export default Home