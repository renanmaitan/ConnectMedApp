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
        width: '100%',
        alignItems: 'center',
        flex: 1,
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
        color: '#FFF',
        marginTop: "10%",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 2,
    },
    carousel: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: "6%",
        marginBottom: "5%",
    },
    carouselTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: "2%",
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
    },
    carouselBody: {
        width: '100%',
    },
    button: {
        backgroundColor: '#086972',
        borderRadius: 10,
        padding: "3%",
        marginTop: "2%",
        width: '60%',
        alignItems: 'center',
    },
    buttonRed: {
        backgroundColor: 'rgba(150, 0, 0, 1)',
        borderRadius: 10,
        padding: "3%",
        marginTop: "2%",
        width: '60%',
        alignItems: 'center',
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
});

export default styles;