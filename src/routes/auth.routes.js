import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"

import Login from "../telas/Login"
import Cadastro from "../telas/Cadastro"

const AuthStack = createStackNavigator()

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen
                options={{
                    headerShown: true,
                    headerStyle: styles.header,
                    headerTintColor: '#FFF',
                }}
                name="Cadastro" component={Cadastro}
            />
        </AuthStack.Navigator>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#086972",
    },
})