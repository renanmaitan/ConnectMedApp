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
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#F2F2F2',
        textAlign: 'center',
    },
    boxInput:{
        width: '75%',
    },
    boxButton:{
        marginBottom: 20,
        width: '40%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boxMessage:{
        marginBottom: 20,
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
        padding: 10,
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