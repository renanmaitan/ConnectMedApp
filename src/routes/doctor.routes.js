import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons"

import Home from "../telas/Home"
import Account from "../telas/Account"
import Agenda from "../telas/Agenda"


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
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Minha Conta"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}


export default function AppDoctor() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Tabs} />
      
      {/* <Stack.Screen name="Agendar" component={Agendar}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTintColor: '#FFF',
        }}
      /> */}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#086972",
  },
})
