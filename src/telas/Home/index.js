import React from "react";

import { Text, View } from "react-native";
import styles from "./style";
import ListaHorizontal from "../../components/ListaHorizontal";

export default function Login() {

    const data = [
        {
            id: 1,
            nome: "Doutor Fran",
            specialty: "Cardiologista",
            day: "25",
            month: "10",
            year: "2023",
            hour: "14",
            minute: "00",
        },
        {
            id: 2,
            nome: "Doutura Fran",
            specialty: "Cardiologista",
            day: "24",
            month: "9",
            year: "2024",
            hour: "15",
            minute: "10",
        },
        {
            id: 3,
            nome: "Doutore Fran",
            specialty: "Cardiologista",
            day: "23",
            month: "8",
            year: "2025",
            hour: "16",
            minute: "20",
        },
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Olá, Renan!</Text>
            <View style={styles.carousel}>
                <Text style={styles.carouselTitle}>Seus agendamentos:</Text>
                <View style={styles.carouselBody}>
                    <ListaHorizontal data={data} />
                </View>
            </View>
        </View>
    );
}
