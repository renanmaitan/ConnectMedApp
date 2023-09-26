import React, { useRef, useState } from "react"

import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc, doc } from "firebase/firestore";
import auth from "../../Config"

import MaskInput, { Masks } from 'react-native-mask-input'
import * as validate from "./utils";

import { db } from "../../Config";
import styles from "./style"
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
    const [error, setError] = useState(null)
    const scrollViewRef = useRef();

    const handleCreateUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            const docRef = await addDoc(collection(db, "users"), {
                name: form.name,
                birthDate: form.birthDate,
                cpf: form.cpf,
                phone: form.phone,
                cep: form.cep,
                uid: user.uid,
            });
        } catch (error) {
            console.error(error);
            Alert.alert(error.message);
        }
    };

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };

    const submitForm = () => {
        if (validation()) {
            handleCreateUser();
        }
    };

    const doctorRegister = async () => {
        if (validation()) {
            navigation.navigate('CadastroMedico', { form: form });
        }
    }

    function validation() {
        setError(null);
        const errors = [];
        if (form.name === "") {
            errors.push('*Preencha o campo "Nome Completo"');
        }
        if (form.email === "") {
            errors.push('*Preencha o campo "E-mail"');
        } else if (!validate.validateEmail(form.email)) {
            errors.push('*E-mail inválido');
        }
        if (form.birthDate === "" || !validate.validateDate(form.birthDate)) {
            errors.push('*Data de nascimento inválida');
        }
        if (form.cpf === "" || !validate.validateCpf(form.cpf)) {
            errors.push('*CPF inválido');
        }
        if (form.phone === "" || !validate.validatePhone(form.phone)) {
            errors.push('*Telefone inválido');
        }
        if (form.cep === "" || !validate.validateCep(form.cep)) {
            errors.push('*CEP inválido');
        }
        if (form.password === "" || !validate.validatePassword(form.password)) {
            errors.push('*Senha inválida');
        }
        if (!validate.validateConfirmPassword(form.password, form.confirmPassword)) {
            errors.push('*As senhas não conferem');
        }
        if (errors.length > 0) {
            setError(errors.join('\n'));
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}
        >
            <View style={styles.container}>
                <Logo />
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
                    ><Text style={styles.textButton}>Cadastrar como paciente</Text></TouchableOpacity>
                </View>
                <View style={styles.boxButton}>
                    <TouchableOpacity
                        onPress={doctorRegister}
                        style={[styles.button, { backgroundColor: '#064f14' }]}
                    ><Text style={styles.textButton}>Continuar cadastro como médico</Text></TouchableOpacity>
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
