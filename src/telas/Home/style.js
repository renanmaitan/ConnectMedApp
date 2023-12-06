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
    title: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
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
        textShadowOffset: { width: -1, height: 1 },
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
    buttons: {
        width: '100%',
        marginTop: "4%",
        alignItems: 'center',
    },
    buttonRed: {
        backgroundColor: 'rgba(150, 0, 0, 1)',
        borderRadius: 10,
        padding: "3%",
        marginTop: "4%",
        width: '60%',
        alignItems: 'center',
        marginBottom: "10%",
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.89)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#086972",
        borderRadius: 20,
        padding: "5%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    modalText: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: "5%",
    },
    textStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: 'rgba(150, 0, 0, 1)',
        borderRadius: 10,
        padding: "3%",
        marginTop: "4%",
        alignItems: 'center',
    },
    backModal: {
        marginTop: "4%",
        alignItems: 'center',
    },
    versionDetails: {
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: "5%",
        marginTop: "1%",
    },
});

export default styles;