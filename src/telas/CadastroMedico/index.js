import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { db } from "../../Config";
import { collection, getDocs } from "firebase/firestore";
import Select from "../../components/Select";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

export default function App({ route }) {

    const form = route.params.form

    const [specialities, setSpecialities] = useState([])
    const [specialty, setSpecialty] = useState("")

    const getSpecialty = async () => {
        const q = collection(db, "specialty");
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list
    }

    useState(() => {
        getSpecialty().then((res) => {
            setSpecialities(res)
        })
    }, [])


    const catchList = (id) => {
        setSpecialty(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.select}>
                <Text style={styles.text}>Selecione a sua especialidade: </Text>
                <Select options={specialities} onChangeSelect={(id) => catchList(id)} text="Selecione a sua especialidade"></Select>
                {/* <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <FontAwesome5 name="plus" size={20} color="black" />
                </TouchableOpacity> */}
            </View>
            {specialty === "Dentista" ? <TextInput
                placeholder="Digite o seu CRO"
                style={styles.input}
            /> : (specialty === "Psicólogo" ? <TextInput
                placeholder="Digite o seu CRP"
                style={styles.input}
            /> : (specialty === "Nutricionista" ? <TextInput
                placeholder="Digite o seu CRN"
                style={styles.input}
            /> : (specialty === "Fisioterapeuta" ? <TextInput
                placeholder="Digite o seu CREFITO"
                style={styles.input}
            /> : (specialty === "Fonoaudiólogo" ? <TextInput
                placeholder="Digite o seu CREFONO"
                style={styles.input}
            /> : (specialty !== "" ? <TextInput
                style={styles.input}
                placeholder="Digite o seu CRM"
            />: null)))))}
        </View>
    )
}