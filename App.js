import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons"

// import { AppLoading } from "expo"
// import { useFonts } from "expo-font"

import Home from "./src/telas/Home/"
import Login from "./src/telas/Login/"
import Cadastro from "./src/telas/Cadastro/"
import Medicos from "./src/telas/Medicos"
import Presencial from "./src/telas/Presencial"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const options = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "#086972",
  },
  tabBarActiveTintColor: "#FFF",
  tabBarInactiveTintColor: "rgba(177, 177, 177, 1)",
  tabBarActiveBackgroundColor: "#086972",
  tabBarInactiveBackgroundColor: "#086972",
  tabBarLabelStyle: {
    fontSize: 14,
  },
  tabBarIconStyle: {
    marginTop: 5,
  },
}

function MedicosStack() {
  return (
    <Stack.Navigator initialRouteName="Medicos" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Medicos" component={Medicos} />
      <Stack.Screen 
      name="Presencial" 
      component={Presencial} 
      options={
        {
          headerShown: true,
          headerStyle: styles.header,
          headerTintColor: '#FFF',
        }
      }
      />
    </Stack.Navigator>
  )
}

function Tabs() {
  return (
    <Tab.Navigator 
    initialRouteName="HomeTab" 
    backBehavior="history" 
    screenOptions={options}
    >
      <Tab.Screen 
      name="HomeTab" 
      component={Home} 
      options={{
        tabBarLabel: "Ínicio",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Médicos" 
      component={MedicosStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user-md" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen
        name="Minha Conta"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#086972" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Tabs} />
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
