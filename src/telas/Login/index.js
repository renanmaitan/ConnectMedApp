import React, { useState } from "react"

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "../../Config"

import styles from "./style"
import Title from "./Title/"
import Logo from "./Logo"

export default function Login({ navigation }) {

    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, user, password)
            .catch((error) => {
                console.log(error)
                Alert.alert(error.message)
            });
    }


    function validation() {
        if (user == null || password == null) {
            setError('Preencha os campos')
        } else if (user == "" || password == "") {
            setError('Preencha os campos')
        } else if (user.indexOf(' ') >= 0 || password.indexOf(' ') >= 0) {
            setError('Não use espaços em branco')
        } else {
            setError(null);
            handleLogin();
        }
    }

    return (
        <View style={styles.container}>
            <Logo />
            <View><Title /></View>
            <View>
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.boxInput}>
                <TextInput
                    placeholder='CPF ou E-mail'
                    onChangeText={(text) => setUser(text.replace(' ', ''))}
                    value={user}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder='Senha'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text.replace(' ', ''))}
                    value={password}
                    style={styles.input}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.boxMessage}>
                <Text
                    onPress={() => navigation.navigate('Home')}
                    style={styles.message}
                >Esqueci minha senha</Text>
            </View>
            <View style={styles.boxButton}>
                <TouchableOpacity
                    onPress={validation}
                    style={styles.button}
                ><Text style={styles.textButton}>Entrar</Text></TouchableOpacity>
            </View>
            <View style={styles.boxMessage}>
                <Text
                    onPress={() => navigation.navigate('Cadastro')}
                    style={styles.message}
                >Ainda não possui conta? Cadastre-se</Text>
            </View>
        </View>
    );
}
