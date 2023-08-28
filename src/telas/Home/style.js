import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#DFEDEB',
        flex: 1,
    },
    scrollview: {
        backgroundColor: '#DFEDEB',
    },
    copyright: {
        position: 'absolute', // Use absolute em vez de fixed
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyrightText:{
        fontFamily: 'sans-serif-light',
        fontSize: 12,
    },
    title: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#086972',
        marginTop: "10%",
    },
    carousel: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: "5%",
    },
    carouselTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "2%",
    },
    cards:{
        backgroundColor: '#BBD7D9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        marginTop: "5%",
    },
    card: {
        width: '45%',
        backgroundColor: 'rgba(8, 105, 114, 0.2)',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: "5%",
        marginBottom: "5%",
    },
    cardTop: {
        width: '100%',
        backgroundColor: 'rgba(8, 105, 114, 1)',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: "3%",
        alignItems: 'center',
    },
    cardBody: {
        width: '100%',
        padding: "3%",
        alignItems: 'left',
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "5%",
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
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default styles;