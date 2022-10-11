import React, {  useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker, } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { selectUser } from "../../slice/userSlice";

export default () => {

    const [tipoTransacao, setTipoTransacao] = useState('entrada')
    const [valor, setValor] = useState(0)
    const { email } = useSelector(selectUser)

    const reqTransacao = async () => {

        await fetch(`http://192.168.3.108:3000/financas`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        tipo_transacao: tipoTransacao,
        valor
      })
    } )
    .then(async (response) => await response.json())
    .then( async (json) => {
      alert(json.message)
    })
    .catch((error) => {
      console.error(error);
    });

    }

    return(

        <View style={styles.container}>

            <Text style={styles.title}>Cadastre uma transação</Text>

            <Picker style={styles.picker} selectedValue={tipoTransacao} onValueChange={(itemValue, itemIndex) => {
                
                console.log(itemValue)
                setTipoTransacao(itemValue)
                console.log(tipoTransacao)
                }} >
                <Picker.Item label="Entrada" value={'entrada'} />
                <Picker.Item label="Saida" value={'saida'} />
            </Picker>

            <TextInput style={styles.input} value={valor} onChangeText={(text) => {

                setValor(Number(text))

            }}/>

            <TouchableOpacity style={styles.btn} onPress={ () => {

                console.log(tipoTransacao, valor)
                reqTransacao()
            }
            }>
                <Text style={styles.btnTexto}>Cadastrar Nova Transação</Text>
            </TouchableOpacity>
        </View>

    )

}

const styles= StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#011627',
    },
    btnTexto: {
        color: '#FF9F1C',
        fontSize: 18
      },
    btn: {
        borderWidth: 2,
        borderColor: '#FF9F1C',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
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
     picker: {
        paddingLeft: 10,
        width: 300,
        height: 50,
        borderRadius: 30,
        fontSize: 18,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
      },
      title: {
        color: '#f9f9f9',
        fontSize: 30,
        marginBottom: 30
      }

})