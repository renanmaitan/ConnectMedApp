import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import auth from '../../Config';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteUser } from 'firebase/auth';
import UserContext from '../../contexts/userData';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./style";

export default function Account({ navigation }) {

    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const { userDatas, setUserDatas } = useContext(UserContext)
    const { delUser } = useContext(UserContext)

    useEffect(() => {
        if (Object.keys(userDatas).length > 0) {
            setLoading(false);
        }
    }, [userDatas])

    if (loading) {
        return <Loading />
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            await auth.signOut();
            setUserDatas({});
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async () => {
        await delUser()
        deleteUser(auth.currentUser)
            .then(() => {
                handleLogout()
            })
            .catch((error) => {
                console.log(error)
                if (error.code === "auth/requires-recent-login") {
                    alert("Para excluir sua conta, faça login novamente")
                    handleLogout()
                }
            });
    }

    const handleWorkDays = (days) => {
        const daysArray = days.split(",")
        const daysString = []
        daysArray.forEach((day) => {
            if (parseInt(day) === 0) {
                daysString.push("Domingo, ")
            } else if (parseInt(day) === 1) {
                daysString.push("Segunda, ")
            } else if (parseInt(day) === 2) {
                daysString.push("Terça, ")
            } else if (parseInt(day) === 3) {
                daysString.push("Quarta, ")
            } else if (parseInt(day) === 4) {
                daysString.push("Quinta, ")
            } else if (parseInt(day) === 5) {
                daysString.push("Sexta, ")
            } else if (parseInt(day) === 6) {
                daysString.push("Sábado, ")
            }
        })
        if (daysString.length === 1) {
            return daysString[0].replace(", ", "")
        }
        daysString[daysString.length - 2] = daysString[daysString.length - 2].replace(", ", " e ")
        daysString[daysString.length - 1] = daysString[daysString.length - 1].replace(", ", "")
        return daysString
    }

    const list = [
        { id: 1, name: "Nome", content: userDatas.name },
        ...(userDatas.isDoctor ? [
            { id: 2, name: "Especialidade", content: userDatas.specialty },
            { id: 3, name: "CRM", content: userDatas.register },
            { id: 7, name: "Valor", content: userDatas.value },
            { id: 8, name: "Dias de Atendimento", content: handleWorkDays(userDatas.workDays) },
        ] : []),
        { id: 4, name: "Email", content: user.email },
        { id: 5, name: "CEP", content: userDatas.cep ? userDatas.cep : "Nenhum CEP cadastrado" },
        { id: 6, name: "Senha", content: "********" },
    ]

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ width: "100%" }}
            >
                <LinearGradient
                    colors={['#086972', 'transparent']}
                    style={styles.scrollview}
                >
                    <FontAwesome5 name="user-circle" color="#B1B1B1" size={100} style={{ marginBottom: "5%", marginTop: "5%" }} />
                    <Text style={styles.title}>Alterar Dados</Text>
                    {list.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.containerField}>
                                <View style={styles.labelField}>
                                    <Text style={styles.titleField}>{item.name}</Text>
                                    <Text style={styles.contentField}>{item.content}</Text>
                                </View>
                                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: "5%", marginBottom: "10%" }}
                        onPress={handleDeleteUser}
                    >
                        <Text style={[styles.buttonText, { color: "red", fontSize: 16, textDecorationLine: "underline" }]}>Excluir Conta</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </ScrollView>
        </View>
    )
}