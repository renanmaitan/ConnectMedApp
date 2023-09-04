import React from "react";
import { FlatList, View, Text, Dimensions } from "react-native";
import styles from "./style";

const { width } = Dimensions.get("window");

const ListaHorizontal = ({ data, type }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            horizontal
            snapToOffsets={[...Array(data.length)].map((x, i) => (i * (width * 0.6 + width * 0.025 * 2)))}
            snapToAlignment="center"
            scrolEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={item.id == 1 ? styles.cardOne : (item.id == data.length ? styles.cardLast : styles.cards)}>
                    <View style={styles.card}>
                        <View style={type == 'history' ? (item.present ? styles.cardTopCinzaTrue : styles.cardTopCinzaFalse) : styles.cardTop}>
                            <Text style={styles.cardTitle}>{item.day}/{item.month}/{item.year}</Text>
                            <Text style={styles.cardTitle}>{item.hour}:{item.minute}</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardContent}>{item.name}{'\n'}{item.specialty}</Text>
                            <Text style={styles.cardContentUnderline}>{item.address}</Text>
                        </View>
                    </View>
                </View>
            )}
            ListEmptyComponent={type == 'history' ? emptyHistory : emptySchedule}
        />
    )
};

const emptyHistory = () => {
    return (
        <View style={styles.emptyListStyle}>
            <Text style={styles.emptyListText}>
                Histórico Vazio
            </Text>
        </View>
    );
};

const emptySchedule = () => {
    return (
        <View style={styles.emptyListStyle}>
            <Text style={styles.emptyListText}>
                Você não tem agendamentos
            </Text>
        </View>
    );
};

export default ListaHorizontal;