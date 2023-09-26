import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { UserProvider } from "./src/contexts/userData"
import Routes from "./src/routes"

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#086972" />
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  )
}