import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons"

import styles from "./style";
import Select from "../../components/Select";
import RatingRead from "../../components/RatingRead";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config";

export default function Presencial({ navigation, route }) {

    const filter = route.params.filter

    const [data, setData] = useState(null)

    const getDoctorsSpecialty = async (specialty) => {
        const q = query(collection(db, "users"), where("specialty", "==", specialty), where("modality", "in", [filter, "Presencial e Online"]));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list
    }

    const getDoctors = async () => {
        const q = query(collection(db, "users"), where("modality", "in", [filter, "Presencial e Online"]));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list
    }

    const flatlistRef = useRef()

    const getSpecialty = async () => {
        const q = collection(db, "specialty");
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list
    }

    const [specialities, setSpecialities] = useState([])

    useState(() => {
        getSpecialty().then((res) => {
            setSpecialities(res)
        })
        if (filter == "Presencial") {
            navigation.setOptions({
                title: "Presencial",
            })
        }
        else {
            navigation.setOptions({
                title: "Online",
            })
        }
    }, [])

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
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    async function catchList(filtro) {
        let vazio = false
        if (filtro == "todos") {
            setData(shuffle(await getDoctors()))
        }
        else {
            setData(await getDoctorsSpecialty(filtro))
        }
        data == null ? vazio = true : vazio = false
        if (vazio == false) {
            if (flatlistRef.current) {
                flatlistRef.current.scrollToIndex({ animated: true, index: 0 })
            }
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
            {data && data.length > 0 ? (
                <FlatList
                    ref={flatlistRef}
                    data={data}
                    keyExtractor={(item) => String(item.uid)}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Agendar", {
                                item: item,
                                filter: filter,
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
                                            <Text style={styles.itemSubTitle}>{item.specialty} | {item.register}</Text>
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
                                            {filter == "Presencial" && <View style={styles.bodyContent}>
                                                <FontAwesome5 name="map-marker-alt" size={16} color="#fff" />
                                                <Text style={styles.itemText} numberOfLines={1}>{item.address}</Text>
                                            </View>}
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
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}
                    >Não há médicos disponíveis para a especialidade selecionada na modalidade presencial</Text>
                </View>
            )}
        </View>
    );
}

