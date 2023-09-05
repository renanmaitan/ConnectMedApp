import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons"

import styles from "./style";
import Select from "../../components/Select";


export default function Presencial({ navigation }) {

    const [data, setData] = useState(null)

    const flatlistRef = useRef()

    const specialities = [
        { label: "Todas (Selecione para ver todos os profissionais disponíveis)", value: "", id: 0 },
        { label: "Clínico Geral", value: "clinico_geral", id: 1 },
        { label: "Dentista", value: "dentista", id: 2 },
        { label: "Dermatologista", value: "dermatologista", id: 3 },
        { label: "Ginecologista", value: "ginecologista", id: 4 },
        { label: "Nutricionista", value: "nutricionista", id: 5 },
        { label: "Oftalmologista", value: "oftalmologista", id: 6 },
        { label: "Ortopedista", value: "ortopedista", id: 7 },
        { label: "Pediatra", value: "pediatra", id: 8 },
        { label: "Psicólogo", value: "psicologo", id: 9 },
        { label: "Psiquiatra", value: "psiquiatra", id: 10 },
        { label: "Urologista", value: "urologista", id: 11 },
        { label: "Cardiologista", value: "cardiologista", id: 12 },
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
        bairro: "Jd. Jardim",
        cidade: "São Paulo",
        estado: "SP",
        complemento: "",
    };

    const dataClinicoGeral = [
        {
            id: 1,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
        },
        {
            id: 2,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 3,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 4,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 5,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 6,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 7,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
        },
        {
            id: 8,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 9,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
        },
        {
            id: 10,
            name: "Doutor Fran",
            specialty: "Clinico Geral",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
        },
    ];

    const dataCardiologista = [
        {
            id: 11,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 12,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 13,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
        {
            id: 14,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            crm: "123456",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 15,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 16,
            name: "Doutor Fran",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            crm: "123456",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 17,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            crm: "123456",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
        },
        {
            id: 18,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
        },
        {
            id: 19,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 20,
            name: "Doutor Fran",
            specialty: "Cardiologista",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
    ];

    const dataDentista = [
        {
            id: 21,
            name: "Doutor Fran",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            crm: "123456",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Ruaaa dos Bo b o oo o oos, 0000",
        },
        {
            id: 22,
            name: "Doutor Fran",
            specialty: "Dentista",
            crm: "123456",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 23,
            name: "Doutor Fran",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            crm: "123456",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 24,
            name: "Doutor Fran",
            specialty: "Dentista",
            crm: "123456",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 25,
            name: "Doutor Fran",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            crm: "123456",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 26,
            name: "Doutor Fran",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            crm: "123456",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 27,
            name: "Doutor Fran",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            crm: "123456",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
        },
        {
            id: 28,
            name: "Doutor Fran",
            crm: "123456",
            specialty: "Dentista",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 29,
            name: "Doutor Fran",
            crm: "123456",
            specialty: "Dentista",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
        },
        {
            id: 30,
            name: "Doutor Fran",
            specialty: "Dentista",
            city: "São Paulo",
            cep: "12345678",
            bairro: "Jd. Jardim",
            phone: "(11) 99999-9999",
            price: "R$ 100,00",
            address: "Rua dos Bobos, 0",
            crm: "123456",
        },
    ];

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

    function catchList(id) {
        let vazio = false
        if (id == 0) {
            const dataShuffle = shuffle(dataClinicoGeral.concat(dataCardiologista, dataDentista))
            setData(dataShuffle)
        }
        else if (id == 1) {
            setData(dataClinicoGeral)
        } else if (id == 12) {
            setData(dataCardiologista)
        } else if (id == 2) {
            setData(dataDentista)
        } else {
            setData(null)
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
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Agendar", item.id)}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                locations={[0, 0.2, 0.8]}
                                colors={["#68a4b3", "#0c6577", "#11687c"]}
                                style={styles.itemGradient}
                            >
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text style={styles.itemSubTitle}>{item.specialty} | CRM {item.crm}</Text>
                                <View style={styles.bodyCard}>
                                    <FontAwesome5 name="user-md" size={50} color="#4aacc4"/>
                                    <View style={styles.bodyContainer}>
                                        <View style={styles.bodyContent}>
                                            <FontAwesome5 name="whatsapp" size={16} color="#fff" />
                                            <Text style={styles.itemText}>{item.phone}</Text>
                                        </View>
                                        <View style={styles.bodyContent}>
                                            <FontAwesome5 name="coins" size={16} color="#fff" />
                                            <Text style={styles.itemText}>{item.price}</Text>
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

