import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    select: {
        margin: "20%",
    },
    text: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#DFEDEB",
        paddingTop: "10%",
        width: "100%",
    },
    button:{
        backgroundColor: "#086972",
        borderRadius: 20,
        padding: "4%",
        width: "82%",
        alignItems: "center",
        marginVertical: "10%",
    },
    input: {
        borderWidth: 1,
        borderColor: '#086972',
        borderRadius: 20,
        padding: "2%",
        width: '82%',
        backgroundColor: '#FEFEFE',
        paddingStart: "5%",
        marginVertical: "2%",
    },
});

export default styles;