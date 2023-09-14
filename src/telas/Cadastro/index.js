import React, { useState } from "react"

import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../../Config"

import MaskInput, { Masks } from 'react-native-mask-input'

import styles from "./style"
import Title from "./Title/"
import Logo from "./Logo"

export default function Login({ navigation }) {

    const [form, setForm] = React.useState({
        name: '',
        email: '',
        birthDate: '',
        cpf: '',
        phone: '',
        cep: '',
        password: '',
        confirmPassword: '',
    });

    const handleCreateUser = () => {
        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(error.message)
            });
    }

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };

    const submitForm = () => {
        console.log('submit this form =>', JSON.stringify(form, false, 2));
        handleCreateUser()
    };

    const [error, setError] = useState(null)

    function validation() {
        if (user == null || password == null) {
            setError('Preencha os campos*')
        } else if (user == "" || password == "") {
            setError('Preencha os campos')
        } else if (user.indexOf(' ') >= 0 || password.indexOf(' ') >= 0) {
            setError('Não use espaços em branco')
        } else {
            setError(null);
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        }
    }

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}
        >
            <View style={styles.container}>
                <Logo />
                <Title />
                <View>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.boxInput}>
                    <TextInput
                        style={styles.input}
                        id="name"
                        name="name"
                        placeholder="Nome Completo"
                        onChangeText={(value) => handleForm('name', value)}
                    />
                    <TextInput
                        style={styles.input}
                        name="email"
                        keyboardType="email-address"
                        placeholder='E-mail'
                        onChangeText={(value) => handleForm('email', value)}
                        autoCapitalize="none"
                    />
                    <MaskInput
                        style={styles.input}
                        placeholder="Telefone"
                        onChangeText={(value) => {
                            handleForm('phone', value)
                        }}
                        keyboardType="numeric"
                        mask={Masks.BRL_PHONE}
                        value={form.phone}
                        maxLength={15}
                    />
                    <MaskInput
                        style={styles.input}
                        name="cpf"
                        placeholder="CPF"
                        onChangeText={(value) => handleForm('cpf', value)}
                        value={form.cpf}
                        mask={Masks.BRL_CPF}
                        keyboardType="numeric"
                        maxLength={14}
                    />
                    <MaskInput
                        style={styles.input}
                        name="birthDate"
                        placeholder="Data de nascimento"
                        onChangeText={(value) => handleForm('birthDate', value)}
                        value={form.birthDate}
                        keyboardType="numeric"
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        maxLength={10}
                    />
                    <MaskInput
                        style={styles.input}
                        placeholder="CEP"
                        onChangeText={(value) => handleForm('cep', value)}
                        value={form.cep}
                        keyboardType="numeric"
                        mask={Masks.ZIP_CODE}
                        maxLength={9}
                    />
                    <TextInput
                        style={styles.input}
                        name="password"
                        placeholder='Senha'
                        secureTextEntry={true}
                        onChangeText={(value) => handleForm('password', value)}
                        maxLength={32}
                    />
                    <TextInput
                        style={styles.input}
                        name="confirmPassword"
                        placeholder='Confirme sua Senha'
                        secureTextEntry={true}
                        onChangeText={(value) => handleForm('confirmPassword', value)}
                        maxLength={32}
                    />
                </View>
                <View style={styles.boxButton}>
                    <TouchableOpacity
                        onPress={submitForm}
                        style={styles.button}
                    ><Text style={styles.textButton}>Cadastrar</Text></TouchableOpacity>
                </View>
                <View style={styles.boxMessage}>
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={styles.message}
                    >Já possui conta? Logar</Text>
                </View>
                <View style={styles.copyright}>
                    <Text style={styles.copyrightText}>© 2023 - Todos os direitos reservados - ConnectMed</Text>
                </View>
            </View>
        </ScrollView>
    );
}
