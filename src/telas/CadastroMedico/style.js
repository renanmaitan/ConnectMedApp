import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    select: {
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        marginBottom: 10,
    },
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#DFEDEB",
        paddingTop: "10%",
        width: "100%",
    },
    button:{
        padding: "4%",
    },
    input: {
        borderWidth: 1,
        borderColor: '#086972',
        borderRadius: 20,
        padding: "2%",
        marginBottom: "3.5%",
        width: '82%',
        backgroundColor: '#FEFEFE',
        paddingStart: "10%",
        marginTop: "3.5%",
    },
});

export default styles;