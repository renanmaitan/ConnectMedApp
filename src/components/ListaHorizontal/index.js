import React from "react";
import { FlatList, View, Dimensions, StyleSheet, Text } from "react-native";

const { width } = Dimensions.get("window");

const ListaHorizontal = ({ data, estilo }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            horizontal
            snapToOffsets={[...Array(data.length)].map((x, i) => (i * (width*0.6 + width*0.025*2)))}
            snapToAlignment="center"
            scrolEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={item.id == 1? styles.cardOne : (item.id == data.length? styles.cardLast : styles.cards)}>
                    <View style={styles.card}>
                        <View style={estilo=='cinza'? (item.present ? styles.cardTopCinzaTrue:styles.cardTopCinzaFalse) : styles.cardTop}>
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
        />
    )
};

const styles = StyleSheet.create({
    cards:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width*0.6,
        alignItems: 'center',
        height: width/2.6,
        marginHorizontal: width*0.025,
    },
    cardOne:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width*0.6,
        alignItems: 'center',
        height: width/2.6,
        marginHorizontal: width*0.025,
        marginLeft: width*0.2,
    },
    cardLast:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width*0.6,
        alignItems: 'center',
        height: width/2.6,
        marginHorizontal: width*0.025,
        marginRight: width*0.2,
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(200, 230, 250, 1)',
        borderRadius: 10,
        alignItems: 'center',
    },
    cardTop: {
        width: '100%',
        backgroundColor: 'rgba(8, 105, 114, 1)',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: "3%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    cardTopCinzaTrue: {
        width: '100%',
        backgroundColor: 'rgba(8, 150, 200, 1)',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: "3%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    cardTopCinzaFalse: {
        width: '100%',
        backgroundColor: 'rgba(150, 0, 0, 1)',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: "3%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    cardBody: {
        width: '100%',
        padding: "3%",
        alignItems: 'left',
        marginLeft: "5%",
    },
    cardTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
    },
    cardContentUnderline: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    cardContent: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: "5%",
    },
});

export default ListaHorizontal;