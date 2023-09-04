import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Select({ options, onChangeSelect, text }) {
    const [txt, setTxt] = useState(text)
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    function renderOption ( item ) {
        return (
            <TouchableOpacity style={[styles.optionContainer,{backgroundColor:item.id==selected? '#eee':'#fff'}]} onPress={() => {
                onChangeSelect(item.id)
                setTxt(item.label)
                setModalVisible(false)
                setSelected(item.id)
            }}>
                <Text style={[styles.optionTxt, {fontWeight:item.id==selected? 'bold':'normal'}]}>{item.label}</Text>
                {item.id == selected && (
                <FontAwesome5 name="check" size={16} color="green" style={{ alignSelf: "center" }} />
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
                <FontAwesome5 name="chevron-down" size={16} color="#555" style={{ alignSelf: "center" }} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <FontAwesome5 name="chevron-left" size={20} color="#555"/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{text}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => renderOption(item)}
                    />
                </SafeAreaView>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        backgroundColor: "#fff",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        borderRadius: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: "row",
    },
    txt: {
        color: "#555",
        fontSize: 16,
        width: "100%",
        textAlign: "center",
    },
    headerModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#555",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: "#555",
    },
    modalCancel: {
        fontSize: 14,
        color: "#086972",
        fontWeight: "bold",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionTxt: {
        fontSize: 16,
        color: "#555",
    },
});
