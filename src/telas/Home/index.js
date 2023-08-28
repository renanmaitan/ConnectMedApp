import React from "react";

import { Text, View } from "react-native";
import styles from "./style";

export default function Login() {
    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Olá, Renan!</Text>
            <View style={styles.carousel}>
                <Text style={styles.carouselTitle}>Seus agendamentos:</Text>
                <View style={styles.cards}>
                    <View style={styles.card}>
                        <View style={styles.cardTop}>
                            <Text style={styles.cardTitle}>27/10/2023 14:00</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardContent}>Nenhum agendamento ainda</Text>
                            <Text style={styles.cardContentUnderline}>Lista de Médicos</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardTop}>
                            <Text style={styles.cardTitle}>27/10/2023 14:00</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardContent}>Nenhum agendamento ainda</Text>
                            <Text style={styles.cardContentUnderline}>Lista de Médicos</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
    }
