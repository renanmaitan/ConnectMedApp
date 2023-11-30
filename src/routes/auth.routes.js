import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"

import Login from "../telas/Login"
import Cadastro from "../telas/Cadastro"
import CadastroMedico from "../telas/CadastroMedico"
import RecoverPassword from "../telas/RecoverPassword";

const AuthStack = createStackNavigator()
const RegisterStack = createStackNavigator()

export function RegisterRoutes() {
    return (
        <RegisterStack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
            <RegisterStack.Screen name="Cadastro" component={Cadastro} />
            <RegisterStack.Screen name="CadastroMedico" component={CadastroMedico} />
        </RegisterStack.Navigator>
    )
}

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen
                options={{
                    headerShown: true,
                    headerStyle: styles.header,
                    headerTintColor: '#FFF',
                    title: 'Cadastro',
                }}
                name="CadastroRoutes" component={RegisterRoutes}
            />
            <AuthStack.Screen
                options={{
                    headerShown: true,
                    headerStyle: styles.header,
                    headerTintColor: '#FFF',
                    title: 'Recuperar senha',
                }}
                name="RecoverPassword" component={RecoverPassword}
            />
        </AuthStack.Navigator>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#086972",
    },
})