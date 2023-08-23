import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#086972',
        borderRadius: 20,
        padding: "3.5%",
        marginBottom: "3.5%",
        width: '100%',
        backgroundColor: '#F2F2F2',
        textAlign: 'center',
    },
    boxInput:{
        width: '75%',
    },
    boxButton:{
        marginBottom: "3%",
        width: '40%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
        marginBottom: "3.5%",
    },
    boxMessage:{
        marginBottom: "3%",
        alignItems: 'center',
    },
    message:{
        textDecorationLine: 'underline',
        color: '#086972',
        marginVertical: '1%',
    },
    button:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "7%",
        backgroundColor: '#086972',
        borderRadius: 20,
    },
    textButton:{
        color: '#FFF',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default styles;