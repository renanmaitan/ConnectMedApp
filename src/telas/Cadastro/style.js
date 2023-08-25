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
        paddingStart: "10%",
    },
    boxInput:{
        width: '75%',
    },
    boxButton:{
        marginBottom: "3%",
        marginTop: "3%",
        width: '40%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
        marginBottom: "3.5%",
    },
    boxMessage:{
        marginBottom: "10%",
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
    },
    logoImg: {
        flex: 1,
        width: "100%",
        height: undefined,
    },

    logo: {
        marginTop: "2%",
        width: "40%",
        alignItems: 'center',
        aspectRatio: 1,
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
    }
});

export default styles;