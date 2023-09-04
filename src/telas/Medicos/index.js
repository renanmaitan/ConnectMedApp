import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import styles from "./style";

export default function Medicos({navigation}) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#086972', 'transparent']}
                style={styles.scrollview}
            >
                <Text style={styles.title}>Agendamento de consulta</Text>
                <TouchableOpacity 
                style={styles.local}
                onPress={() => navigation.navigate('Presencial')}
                >
                    <LinearGradient 
                    start={{x: 0.0, y: 1}} end={{x: 1.2, y: 1.0}}
                    colors={['#086972', 'transparent']}
                    style={styles.gradient}>
                        <Text style={styles.optionText}>Marcar consulta presencial</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.online}>
                    <LinearGradient 
                    colors={['green', 'transparent']} 
                    style={styles.gradient}
                    start={{x: 0.0, y: 1}} end={{x: 1.2, y: 1.0}}
                    >
                        <Text style={styles.optionText}>Marcar consulta online</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}