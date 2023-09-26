import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DFEDEB",
        alignItems: "center",
    },
    changeZip: {
        color: "#1E90FF",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: "1%",
        marginBottom: "1%",
        textDecorationLine: "underline",
    },
    select: {
        width: "100%",
        alignItems: "center",

    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: "1%",
    },
    flatList:{
        width: "100%",
    },
    item: {
        backgroundColor: "#DFEDEB",
        width: "80%",
        marginVertical: "3%",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        elevation: 8,
    },
    itemContainer: {
        width: "100%",
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        marginTop: "2%",
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 2,
        width: "100%",
        paddingBottom: "5%",
    },
    itemGradient: {
        padding: "5%",
        borderRadius: 10,
        width: "100%",
    },
    itemText: {
        color: "#fff",
        marginLeft: "5%",
    },
    itemTitle: {
        color: "#fff",
        fontSize: 16,
    },
    itemSubTitle: {
        color: "#fff",
        fontSize: 12,
    },
    bodyCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: "2%",
        marginTop: "5%",
        marginHorizontal: "2%",
        marginBottom: "5%",
    },
    bodyContainer: {
        width: "60%",
    },
    bodyContent:{
        flexDirection: "row",
        marginRight: "2%",
    },
    itemFooter:{
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
    },
    topCard: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});