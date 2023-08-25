import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar, StyleSheet } from "react-native"

import Home from "./src/telas/Home/"
import Login from "./src/telas/Login/"
import Cadastro from "./src/telas/Cadastro/"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#086972" />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen 
        options={{ 
          headerShown: true,
          headerStyle: styles.header,
          headerTintColor: '#FFF',
        }}
        name="Cadastro" component={Cadastro}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#086972",
  },
})
