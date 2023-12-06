import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, SafeAreaView, TextInput, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import auth from '../../Config';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteUser } from 'firebase/auth';
import UserContext from '../../contexts/userData';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, updateUserEmail, updateUserPassword } from '../../services/services';
import Select from '../../components/Select';
import { getSpecialties } from '../../services/services';

import styles from "./style";

export default function Account({ navigation }) {

    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const { userDatas, setUserDatas } = useContext(UserContext)
    const { delUser } = useContext(UserContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalItem, setModalItem] = useState(null);
    const [modalText, setModalText] = useState("Nenhum dia selecionado");
    const [modalValue, setModalValue] = useState("");
    const [specialities, setSpecialities] = useState([])
    const [modalStartHour, setModalStartHour] = useState("")

    useEffect(() => {
        if (Object.keys(userDatas).length > 0) {
            setLoading(false);
        }
    }, [userDatas])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSpecialties();
            setSpecialities(res);
        };
        fetchData();
    }, []);

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

    const handleUpdate = async (item, value) => {
        setLoading(true);
        try {
            if (item.name === "Nome") {
                await updateUser({ name: value });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, name: value }));
            } else if (item.name === "Email") {
                await updateUserEmail(value);
                Alert.alert("Email de verificação enviado", "Para efetivar a alteração, é necessário confirmar o novo email");
                setModalVisible(false);
                setLoading(false);
                return;
            } else if (item.name === "Senha") {
                await updateUserPassword(value);
            } else if (item.name === "CEP") {
                await updateUser({ cep: value });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, cep: value }));
            } else if (item.name === "Especialidade") {
                await updateUser({ specialty: value });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, specialty: value }));
            } else if (item.name === "CRM") {
                await updateUser({ register: value });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, register: value }));
            } else if (item.name === "Valor") {
                await updateUser({ value: value });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, value: value }));
            } else if (item.name === "Dias de Atendimento") {
                const trimmedValue = value.trim().replace(/^,|,$/g, '');
                const workDaysPattern = /^([0-6],)*[0-6](,[0-6])*$/;
                if (!workDaysPattern.test(trimmedValue)) {
                    Alert.alert('Formato inválido', 'O campo "dias que você trabalha" deve seguir o padrão "0,1,2,3,4,5,6" - variando de 0 a 6 e separados por vírgula');
                    setLoading(false);
                    return;
                }
                await updateUser({ workDays: trimmedValue });
                setUserDatas((prevUserDatas) => ({ ...prevUserDatas, workDays: trimmedValue }));
            } else if (item.name === "Horário de Atendimento") {
                const start_hour = parseInt(value.split("-")[0]);
                const end_hour = parseInt(value.split("-")[1]);
                if (start_hour > end_hour) {
                    alert("O horário de início não pode ser maior que o horário de fim");
                    setLoading(false);
                    return;
                }
                if (start_hour < 0 || start_hour > 23) {
                    alert("O horário de início deve ser entre 0 e 23");
                    setLoading(false);
                    return;
                }
                if (end_hour < 0 || end_hour > 23) {
                    alert("O horário de fim deve ser entre 0 e 23");
                    setLoading(false);
                    return;
                }
                await updateUser({ startHour: value.split("-")[0], endHour: value.split("-")[1] });
                setUserDatas((prevUserDatas) => ({
                    ...prevUserDatas,
                    startHour: value.split("-")[0],
                    endHour: value.split("-")[1]
                }));
            } else {
                Alert.alert("Erro ao atualizar dados", "O campo não foi reconhecido");
                setLoading(false);
                setModalVisible(false);
                return null;
            }
            Alert.alert("Alteração realizada com sucesso");
            setLoading(false);
            setModalVisible(false);
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                Alert.alert("Faça login novamente", "Para alterar esse tipo de dado, é necesário que o login seja recente")
                handleLogout()
                return
            }
            console.error("Erro ao atualizar dados do usuário:", error.message);
            Alert.alert("Erro ao atualizar dados", error.message);
            setLoading(false);
        }
    };

    const handleWorkDaysInput = (days) => {
        const daysArray = days.split(",")
        const daysString = []
        let invalid = false
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
            } else if (day !== "") {
                invalid = true
                daysString.push("")
            }
        })
        if (daysString.length === 0) {
            return "Nenhum dia selecionado"
        }
        if (invalid) {
            return "Dia inválido - intervalo permitido: 0 a 6"
        }
        if (daysString.length === 1) {
            return daysString[0].replace(", ", "")
        }
        daysString[daysString.length - 2] = daysString[daysString.length - 2].replace(", ", " e ")
        daysString[daysString.length - 1] = daysString[daysString.length - 1].replace(", ", "")
        return daysString
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
            { id: 5, name: "Especialidade", content: userDatas.specialty },
            { id: 6, name: "CRM", content: userDatas.register },
            { id: 7, name: "Valor", content: userDatas.value },
            { id: 8, name: "Dias de Atendimento", content: handleWorkDays(userDatas.workDays) },
            { id: 9, name: "Horário de Atendimento", content: "Das " + userDatas.startHour + " às " + userDatas.endHour }
        ] : []),
        { id: 2, name: "Email", content: user.email },
        { id: 3, name: "CEP", content: userDatas.cep ? userDatas.cep : "Nenhum CEP cadastrado" },
        { id: 4, name: "Senha", content: "********" },
    ]

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalTitle}</Text>
                        {modalItem?.name !== "Especialidade" ? (
                            <>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={modalContent}
                                    secureTextEntry={modalItem?.name === "Senha" ? true : false}
                                    keyboardType={modalItem?.name === "Email" ? "email-address" : "default"}
                                    autoCapitalize={modalItem?.name === "Email" ? "none" : "sentences"}
                                    {...(modalItem?.name === "Dias de Atendimento"
                                        ? {
                                            onChangeText: (text) => {
                                                setModalText(handleWorkDaysInput(text));
                                                setModalValue(text);
                                            }
                                        }
                                        : modalItem?.name === "Horário de Atendimento"
                                        ? { onChangeText: (text) => setModalStartHour(text)}
                                        : { onChangeText: (text) => setModalValue(text)})}
                                    {...(modalItem?.name === "Horário de Atendimento" ? { keyboardType: "numeric" } : null)}
                                />
                                {modalItem?.name === "Horário de Atendimento" ? (
                                    <TextInput style={styles.modalInput}
                                        placeholder="Digite o horário final"
                                        keyboardType='numeric'
                                        onChangeText={(text) => {
                                            setModalValue(modalStartHour + "-" + text)
                                            console.log(modalValue)
                                        }}
                                    />
                                ) : null}
                            </>
                        ) : (
                            <Select
                                options={specialities}
                                onChangeSelect={(id) => setModalValue(id)}
                                text="Selecione uma especialidade"
                            />
                        )}
                        {modalItem?.name == "Dias de Atendimento" ? <Text style={[styles.modalText,{fontSize: 16, marginBottom: 0}]}>{modalText}</Text> : null}
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                handleUpdate(modalItem, modalValue)
                                setModalText("Nenhum dia selecionado")
                                setModalVisible(false)
                                setModalValue("")
                                setModalStartHour("")
                            }}
                        >
                            <Text style={styles.textStyle}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backModal} onPress={() => {
                            setModalVisible(false)
                            setModalText("Nenhum dia selecionado")
                            setModalValue("")
                            setModalStartHour("")
                        }}>
                            <Text style={styles.textStyle}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
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
                            <TouchableOpacity
                                key={item.id}
                                style={styles.containerField}
                                onPress={() => {
                                    setModalItem(item)
                                    setModalTitle(`Alterar ${item.name}`)
                                    {item.name == "Dias de Atendimento"?setModalContent("Ex: 0,1,2,3,4,5,6 (domingo a sábado)") : item.name == "Horário de Atendimento"?setModalContent("Digite o horário inicial"):setModalContent(`Digite o novo ${item.name.toLowerCase()}`)}
                                    setModalVisible(true)
                                }}
                            >
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
                        onPress={handleDeleteUser}
                        style={{ marginBottom: "5%" }}
                    >
                        <Text style={[styles.buttonText, { color: "red", fontSize: 16, textDecorationLine: "underline" }]}>Excluir Conta</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </ScrollView>
        </View>
    )
}