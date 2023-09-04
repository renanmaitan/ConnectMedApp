import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    cards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.6,
        alignItems: 'center',
        height: width / 2.6,
        marginHorizontal: width * 0.025,
    },
    emptyListStyle: {   
        width: width,
    },
    emptyListText: {
        fontFamily: 'sans-serif-light',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    cardOne: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.6,
        alignItems: 'center',
        height: width / 2.6,
        marginHorizontal: width * 0.025,
        marginLeft: width * 0.2,
    },
    cardLast: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.6,
        alignItems: 'center',
        height: width / 2.6,
        marginHorizontal: width * 0.025,
        marginRight: width * 0.2,
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

export default styles;