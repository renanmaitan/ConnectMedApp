import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons"
import { collection, getDocs } from "firebase/firestore";

import styles from "./style";
import Select from "../../components/Select";
import RatingRead from "../../components/RatingRead";
import { db } from "../../Config";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Presencial({ navigation }) {

    const [data, setData] = useState(null)

    const getData = async (colecao) => {
        const list = []
        const querySnapshot = await getDocs(collection(db, colecao));
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        setData(list)
        return list
    }

    const flatlistRef = useRef()

    const specialities = [
        { label: "Todas (Selecione para ver todos os profissionais disponíveis)", value: "", id: "todos" },
        { label: "Clínico Geral", value: "clinico_geral", id: "clinico" },
        { label: "Dentista", value: "dentista", id: "dentista" },
        { label: "Dermatologista", value: "dermatologista", id: 3 },
        { label: "Ginecologista", value: "ginecologista", id: 4 },
        { label: "Nutricionista", value: "nutricionista", id: 5 },
        { label: "Oftalmologista", value: "oftalmologista", id: 6 },
        { label: "Ortopedista", value: "ortopedista", id: 7 },
        { label: "Pediatra", value: "pediatra", id: 8 },
        { label: "Psicólogo", value: "psicologo", id: 9 },
        { label: "Psiquiatra", value: "psiquiatra", id: 10 },
        { label: "Urologista", value: "urologista", id: 11 },
        { label: "Cardiologista", value: "cardiologista", id: "cardiologista" },
        { label: "Otorrinolaringologista", value: "otorrinolaringologista", id: 13 },
        { label: "Fisioterapeuta", value: "fisioterapeuta", id: 14 },
        { label: "Fonoaudiólogo", value: "fonoaudiologo", id: 15 },
        { label: "Neurologista", value: "neurologista", id: 16 },
        { label: "Endocrinologista", value: "endocrinologista", id: 17 },
    ];

    const endereco = {
        cep: "12345678",
        rua: "Rua das Flores",
        numero: "284",
        points: 4.5,
        bairro: "Jd. Jardim",
        cidade: "São Paulo",
        estado: "SP",
        complemento: "",
    };

    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    //     function validarCrm(numCrm) {

    //     }

    function catchList(filtro) {
        let vazio = false
        if (filtro == "todos") {
            getData("todos")
        }
        else{
            getData(filtro)
        }
        data == null ? vazio = true : vazio = false
        if (vazio == false) {
            flatlistRef.current.scrollToIndex({ animated: true, index: 0 })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Seu CEP: {endereco.cep}</Text>
                <Text>{endereco.rua}, {endereco.numero} - {endereco.bairro}</Text>
                <Text>{endereco.cidade}/{endereco.estado}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Minha Conta")}>
                    <Text style={styles.changeZip}>Alterar CEP (Dados cadastrais)</Text>
                </TouchableOpacity>
                <View style={styles.select}>
                    <Text style={styles.text}>Filtrar busca por especialidade:</Text>
                    <Select options={specialities} onChangeSelect={(id) => catchList(id)} text="Selecione uma especialidade"></Select>
                </View>
            </View>
            <FlatList
                ref={flatlistRef}
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Agendar", {
                            item: item
                        })}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                locations={[0, 0.2, 0.8]}
                                colors={["#68a4b3", "#0c6577", "#11687c"]}
                                style={styles.itemGradient}
                            >
                                <View style={styles.topCard}>
                                    <View>
                                        <Text style={styles.itemTitle}>{item.name}</Text>
                                        <Text style={styles.itemSubTitle}>{item.specialty} | {item.cro ? `CRO: ${item.cro}` : item.crm ? `CRM: ${item.crm}` : ''}</Text>
                                    </View>
                                    <RatingRead points={item.points} />
                                </View>
                                <View style={styles.bodyCard}>
                                    <FontAwesome5 name="user-md" size={50} color="#4aacc4" />
                                    <View style={styles.bodyContainer}>
                                        <View style={styles.bodyContent}>
                                            <FontAwesome5 name="whatsapp" size={16} color="#fff" />
                                            <Text style={styles.itemText}>{item.phone}</Text>
                                        </View>
                                        <View style={styles.bodyContent}>
                                            <FontAwesome5 name="coins" size={16} color="#fff" />
                                            <Text style={styles.itemText}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                        </View>
                                        <View style={styles.bodyContent}>
                                            <FontAwesome5 name="map-marker-alt" size={16} color="#fff" />
                                            <Text style={styles.itemText} numberOfLines={1}>{item.address}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.itemFooter}>Clique nesse cartão para agendar e/ou ver mais detalhes</Text>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )
                }
                style={styles.flatList}
            />
        </View>
    );
}

