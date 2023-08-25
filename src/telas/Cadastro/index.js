import React, {useState} from "react"

import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native"

import { TextInputMask } from 'react-native-masked-text'

import styles from "./style"
import Title from "./Title/"
import Logo from "./Logo"

export default function Login({navigation}) {

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

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
          ...currentForm,
          [key]: value,
        }));
    };

    const submitForm = () => {
        console.log('submit this form =>', JSON.stringify(form, false, 2));
    };

    const [error, setError] = useState(null)

    function validation(){
        if (user == null || password == null){
            setError('Preencha os campos*')
        }else if(user == "" || password == ""){
            setError('Preencha os campos')
        }else if(user.indexOf(' ') >= 0 || password.indexOf(' ') >= 0){
            setError('Não use espaços em branco')
        }else{
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
                <Logo/>
                <View><Title/></View>
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
                    <TextInputMask
                    style={styles.input}
                    type={'cel-phone'}
                    options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                    }}
                    placeholder="Telefone"
                    onChangeText={(value) => handleForm('phone', value)}
                    keyboardType="numeric"
                    />
                    <TextInputMask
                    style={styles.input}
                    type={"cpf"}
                    name="cpf"
                    placeholder="CPF"
                    onChangeText={(value) => handleForm('cpf', value)}
                    />
                    <TextInputMask
                    style={styles.input}
                    type={'datetime'}
                    options={{
                    format: 'DD/MM/YYYY',
                    }}
                    placeholder="Data de nascimento"
                    onChangeText={(value) => handleForm('birthDate', value)}
                    keyboardType="numeric"
                    />
                    <TextInputMask
                    style={styles.input}
                    type={'zip-code'}
                    options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                    }}
                    placeholder="CEP"
                    onChangeText={(value) => handleForm('cep', value)}
                    keyboardType="numeric"
                    />
                    <TextInput
                    style={styles.input}
                    name="password"
                    placeholder='Senha'
                    secureTextEntry={true}
                    onChangeText={(value) => handleForm('password', value)}
                    />
                    <TextInput
                    style={styles.input}
                    name="confirmPassword"
                    placeholder='Confirme sua Senha'
                    secureTextEntry={true}
                    onChangeText={(value) => handleForm('confirmPassword', value)}
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
