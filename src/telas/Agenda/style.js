import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#086972",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollview: {
        backgroundColor: '#DFEDEB',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 2,
    },
    local: {
        backgroundColor: '#DFEDEB',
        width: '90%',
        height: '20%',
        borderRadius: 10,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3.84,
        elevation: 20,
    },
    online: {
        width: '90%',
        height: '20%',
        borderRadius: 10,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3.84,
        elevation: 20,
        backgroundColor: '#FFF',
    },
    optionText: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
    selectContainer: {
        alignItems: "center",
        width: "95%",
        marginVertical: "2%",
    },
})