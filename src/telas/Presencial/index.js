import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./style";

export default function Presencial() {
    return (
        <View style={styles.container}>
            <Text>Seu CEP: 18950-654</Text>
            <Text>Rua da Flores, 284 - Jd. Jardim</Text>
            <Text>Alterar CEP</Text>
            
        </View>
    );
}

