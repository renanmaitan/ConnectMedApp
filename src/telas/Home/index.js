import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import styles from "./style";
import ListaHorizontal from "../../components/ListaHorizontal";
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation }) {
    const dataHistory = [
        {
            id: 1,
            name: "Doutor Fran",
            specialty: "Cardiologisto",
            day: "25",
            month: "10",
            year: "2022",
            hour: "14",
            minute: "00",
            address: "Rua dos Bobos, 0",
            present: true,
        },
        {
            id: 2,
            name: "Doutura Fran",
            specialty: "Cardiologista",
            day: "24",
            month: "9",
            year: "2022",
            hour: "15",
            minute: "10",
            address: "Rua dos Bobos, 1",
            present: false,
        },
        {
            id: 3,
            name: "Doutore Fran",
            specialty: "Cardiologiste",
            day: "23",
            month: "8",
            year: "2023",
            hour: "16",
            minute: "20",
            address: "Rua dos Bobos, 2",
            present: true,
        },
    ]
    const data = [
        {
            id: 1,
            name: "Doutor Fran",
            specialty: "Cardiologisto",
            day: "25",
            month: "10",
            year: "2023",
            hour: "14",
            minute: "00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 2,
            name: "Doutura Fran",
            specialty: "Cardiologista",
            day: "24",
            month: "9",
            year: "2024",
            hour: "15",
            minute: "10",
            address: "Rua dos Bobos, 1",
        },
        {
            id: 3,
            name: "Doutore Fran",
            specialty: "Cardiologiste",
            day: "23",
            month: "8",
            year: "2025",
            hour: "16",
            minute: "20",
            address: "Rua dos Bobos, 2",
        },
    ];
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#086972', 'transparent']}
                style={styles.scrollview}
            >
                <Text style={styles.title}>Olá, Renan!</Text>
                <View style={styles.carousel}>
                    <Text style={styles.carouselTitle}>Seus agendamentos:</Text>
                    <View style={styles.carouselBody}>
                        <ListaHorizontal data={data} />
                    </View>
                </View>
                <View style={styles.carousel}>
                    <Text style={styles.carouselTitle}>Seu histórico:</Text>
                    <View style={styles.carouselBody}>
                        <ListaHorizontal data={dataHistory} type='history' />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Médicos')}>
                        <Text style={styles.textButton}>Agendar Consulta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRed}>
                        <Text style={styles.textButton}>Cancelar Agendamento</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}
