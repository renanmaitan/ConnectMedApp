import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#DFEDEB',
        height: '100%',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#086972',
        borderRadius: 10,
        padding: "3.5%",
        marginBottom: "3.5%",
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingStart: "10%",
    },
    boxInput:{
        width: '75%',
    },
    boxButton:{
        marginBottom: "2%",
        marginTop: "3.5%",
        width: '40%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
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
        borderRadius: 10,
    },
    textButton:{
        color: '#FFF',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoImg: {
        height: "100%",
        width: "100%",
    },

    logo: {
        marginTop: "7%",
        height: "34%",
        width: "100%",
    },
    label: {
        color: '#086972',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: "3.5%",
    },
});

export default styles;