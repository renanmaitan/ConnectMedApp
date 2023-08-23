import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Title from '../Title/';
import styles from './style';

export default function Form(){

const [user, setUser] = useState(null);
const [password, setPassword] = useState(null);
const [error, setError] = useState(null);

function validation(){
    if (user == null || password == null){
        setError('Preencha os campos');
    }else if(user == "" || password == ""){
        setError('Preencha os campos');
    }else if(user.indexOf(' ') >= 0 || password.indexOf(' ') >= 0){
        setError('Não use espaços em branco');
    }else{
        setError(null);
    }
}
    return(
        <View style={styles.container}>
            <View><Title/></View>
            <View>
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.boxInput}>
                <TextInput
                placeholder='Usuário'
                onChangeText={setUser}
                value={user}
                style={styles.input}
                />
                <TextInput
                placeholder='Senha'
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                />
            </View>
            <View style={styles.boxMessage}>
                <Text style={styles.message}>Esqueci minha senha</Text>
            </View>
            <View style={styles.boxButton}>
                <TouchableOpacity
                onPress={validation}
                style={styles.button}
                ><Text style={styles.textButton}>Entrar</Text></TouchableOpacity>
            </View>
            <View style={styles.boxMessage}>
                <Text style={styles.message}>Ainda não possui conta? Cadastre-se</Text>
            </View>
        </View>
    )
}