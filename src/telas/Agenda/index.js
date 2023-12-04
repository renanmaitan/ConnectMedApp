import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { getFreeDays, getFreeMonths, getFreeYears } from './utils';
import auth from '../../Config';
import { db } from '../../Config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import styles from "./style";
import Select from '../../components/Select';
import Loading from '../../components/Loading';

export default function Agenda({ navigation }) {
    const [item, setItem] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [freeDays, setFreeDays] = useState([]);
    const [freeMonths, setFreeMonths] = useState([]);
    const [freeYears, setFreeYears] = useState([]);
    const [year, setYear] = useState({ id: null, label: "Selecione um ano" });
    const [month, setMonth] = useState({ id: null, label: "Selecione um mês" });
    const [day, setDay] = useState({ id: null, label: "Selecione um dia" });

    const handleGetFreeDays = (mes, ano) => {
        const freeDays = getFreeDays(mes, ano, item);
        const localFreeDays = [];
        if (freeDays.length === 0) {
            localFreeDays.push({ id: null, label: "Não há dias disponíveis para este mês" })
            setFreeDays(localFreeDays);
            return;
        }
        freeDays.forEach((day, i) => {
            localFreeDays.push({ id: i, label: day });
        });
        setFreeDays(localFreeDays);
    }

    const handleGetFreeMonths = (ano) => {
        const freeMonths = getFreeMonths(ano);
        const localFreeMonths = [];
        if (freeMonths.length === 0) {
            localFreeMonths.push({ id: null, label: "Não há meses disponíveis para este ano" })
            setFreeMonths(localFreeMonths);
            return;
        }
        freeMonths.forEach((month, i) => {
            localFreeMonths.push({ id: i, label: month });
        });
        setFreeMonths(localFreeMonths);
    }

    const handleGetFreeYears = () => {
        const freeYears = getFreeYears();
        const localFreeYears = [];
        if (freeYears.length === 0) {
            localFreeYears.push({ id: null, label: "Não há anos disponíveis" })
            setFreeYears(localFreeYears);
            return;
        }
        freeYears.forEach((year, i) => {
            localFreeYears.push({ id: i, label: year });
        });
        setFreeYears(localFreeYears);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
        setYear({ id: null, label: "Selecione um ano" });
        setMonth({ id: null, label: "Selecione um mês" });
        setDay({ id: null, label: "Selecione um dia" });
    }

    useEffect(() => {
        async function getDados() {
            const userUid = auth.currentUser.uid;
            const userRef = collection(db, "users");
            const q = query(userRef, where("uid", "==", userUid));
            const querySnapshot = await getDocs(q);
            const item = querySnapshot.docs[0].data();
            setItem(item);
        }
        getDados();
        handleGetFreeYears()
    }, [])

    if (loading) {
        return <Loading />
    }

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
                        <Text style={styles.modalText}>Selecione o dia que deseja excluir da sua agenda:</Text>
                        <View style={styles.selectContainer}>
                            <Select
                                options={freeYears}
                                text={year.label}
                                onChangeSelect={(value) => {
                                    setLoading(true)
                                    const selected = freeYears.find((item) => item.id == value)
                                    setYear(selected)
                                    handleGetFreeMonths(selected.label)
                                    setLoading(false)
                                }}
                            />
                        </View>
                        {year.id != null && <View style={styles.selectContainer}>
                            <Select
                                options={freeMonths}
                                text={month.label}
                                onChangeSelect={(value) => {
                                    setLoading(true)
                                    const selected = freeMonths.find((item) => item.id == value)
                                    setMonth(selected)
                                    handleGetFreeDays(selected.label, year.label)
                                    setLoading(false)
                                }}
                            />
                        </View>}
                        {month.id != null && <View style={styles.selectContainer}>
                            <Select
                                options={freeDays}
                                text={day.label}
                                onChangeSelect={(value) => {
                                    setLoading(true)
                                    const selected = freeDays.find((item) => item.id == value)
                                    setDay(selected)
                                    setLoading(false)
                                }}
                            />
                        </View>}
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                if (day.id != null && month.id != null && year.id != null) {
                                    console.log("Data selecionada", "A data selecionada foi: " + day.label + "/" + month.label + "/" + year.label)
                                }
                                else {
                                    alert("Nenhuma data selecionada", "Selecione uma data para continuar a exlusão do dia")
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Excluir data da agenda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backModal} onPress={() => handleCloseModal()}>
                            <Text style={styles.textStyle}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <LinearGradient
                colors={['#086972', 'transparent']}
                style={styles.scrollview}
            >
                <Text style={styles.title}>Manipulação da sua agenda</Text>
                <TouchableOpacity
                    style={styles.local}
                    onPress={() => setModalVisible(true)}
                >
                    <LinearGradient
                        start={{ x: 0.0, y: 1 }} end={{ x: 1.2, y: 1.0 }}
                        colors={['#086972', 'transparent']}
                        style={styles.gradient}>
                        <Text style={styles.optionText}>Exlcuir dia livre da agenda</Text>
                        <Text style={[styles.optionText, { fontSize: 16, marginTop: "2%" }]}>(remover determinado dia de seus dias livres para agendamento)</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.online} onPress={() => navigation.navigate('Presencial', { filter: 'Online' })}>
                    <LinearGradient
                        colors={['green', 'transparent']}
                        style={styles.gradient}
                        start={{ x: 0.0, y: 1 }} end={{ x: 1.2, y: 1.0 }}
                    >
                        <Text style={styles.optionText}>Excluir horário livre da agenda</Text>
                        <Text style={[styles.optionText, { fontSize: 16, marginTop: "2%" }]}>(remover determinado horário ou intervalo de horários de seus horários livres para agendamento)</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}