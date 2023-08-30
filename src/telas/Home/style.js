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
    carouselBody: {
        width: '100%',
    },
});

export default styles;