import React, { useState } from "react"

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import auth from "../../Config"
import { sendPasswordResetEmail } from "firebase/auth"
import styles from "./style"

export default function RecoverPassword({ navigation }) {

    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)

    const recoverPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Sucesso','Você receberá um email com as instruções para recuperar sua senha caso tenha informado um email cadastrado')
            })
            .catch((error) => {
                Alert.alert('Erro', error.message)
            })
    }


    function validation() {
        if (email == null) {
            setError('Preencha o campo')
        } else if (email == "") {
            setError('Preencha o campo')
        } else {
            setError(null);
            recoverPassword();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Digite seu email</Text>
            <View style={styles.boxInput}>
                <TextInput
                    placeholder='E-mail'
                    onChangeText={(text) => setEmail(text.replace(' ', ''))}
                    value={email}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.boxButton}>
                <TouchableOpacity
                    onPress={validation}
                    style={styles.button}
                ><Text style={styles.textButton}>Recuperar</Text></TouchableOpacity>
            </View>
            <View>
                <Text style={styles.error}>{error}</Text>
            </View>
        </View>
    );
}
