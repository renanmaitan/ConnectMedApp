import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { getFreeDays, getFreeMonths, getFreeYears, getFreeHours } from '../../utils/scheduling';
import { addDeleteDay, addDeleteHour } from '../../services/services';
import UserContext from '../../contexts/userData';

import styles from "./style";
import Select from '../../components/Select';
import Loading from '../../components/Loading';

export default function Agenda({ navigation }) {
    const [item, setItem] = useState({});
    const [modalDayVisible, setModalDayVisible] = useState(false);
    const [modalHourVisible, setModalHourVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [freeDays, setFreeDays] = useState([]);
    const [freeMonths, setFreeMonths] = useState([]);
    const [freeYears, setFreeYears] = useState([]);
    const [freeHours, setFreeHours] = useState([]);
    const [year, setYear] = useState({ id: null, label: "Selecione um ano" });
    const [month, setMonth] = useState({ id: null, label: "Selecione um mês" });
    const [day, setDay] = useState({ id: null, label: "Selecione um dia" });
    const [hour, setHour] = useState({ id: null, label: "Selecione uma hora" });
    const { userDatas } = useContext(UserContext);

    const handleGetFreeHours = (dia, mes, ano) => {
        getFreeHours(dia, mes, ano, item)
            .then((localFreeHours) => {
                if (localFreeHours.length === 0) {
                    localFreeHours.push({ id: null, label: "Não há horários disponíveis para esse dia" })
                }
                setFreeHours(localFreeHours)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleGetFreeDays = (mes, ano) => {
        getFreeDays(mes, ano, item)
            .then((freeDays) => {
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
            })
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
        setModalDayVisible(false);
        setModalHourVisible(false);
        setYear({ id: null, label: "Selecione um ano" });
        setMonth({ id: null, label: "Selecione um mês" });
        setDay({ id: null, label: "Selecione um dia" });
        setHour({ id: null, label: "Selecione uma hora" });
    }

    useEffect(() => {
        setLoading(false)
        setItem(userDatas)
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
                visible={modalDayVisible}
                onRequestClose={() => {
                    setModalDayVisible(false);
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
                                    addDeleteDay(day.label, month.label, year.label, item).then(() => {
                                        alert("Data excluída com sucesso", "A data selecionada foi excluída da sua agenda")
                                        handleCloseModal()
                                    })
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalHourVisible}
                onRequestClose={() => {
                    setModalHourVisible(false);
                }}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Selecione a hora que deseja excluir da sua agenda:</Text>
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
                                    handleGetFreeHours(selected.label, month.label, year.label)
                                    setLoading(false)
                                }}
                            />
                        </View>}
                        {day.id != null && <View style={styles.selectContainer}>
                            <Select
                                options={freeHours}
                                text={hour.label}
                                onChangeSelect={(value) => {
                                    setLoading(true)
                                    const selected = freeHours.find((item) => item.id == value)
                                    setHour(selected)
                                    setLoading(false)
                                }}
                            />
                        </View>}
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                if (day.id != null && month.id != null && year.id != null && hour.id != null) {
                                    addDeleteHour(day.label, month.label, year.label, hour.label, item).then(() => {
                                        alert("Horário excluído com sucesso", "O horário selecionado foi excluído da sua agenda")
                                        handleCloseModal()
                                    })
                                }
                                else {
                                    alert("Nenhum horário selecionado", "Selecione um horário para continuar a exlusão do horário")
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Excluir horário da agenda</Text>
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
                    onPress={() => setModalDayVisible(true)}
                >
                    <LinearGradient
                        start={{ x: 0.0, y: 1 }} end={{ x: 1.2, y: 1.0 }}
                        colors={['#086972', 'transparent']}
                        style={styles.gradient}>
                        <Text style={styles.optionText}>Exlcuir dia livre da agenda</Text>
                        <Text style={[styles.optionText, { fontSize: 16, marginTop: "2%" }]}>(remover determinado dia de seus dias livres para agendamento)</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.online}
                    onPress={() => setModalHourVisible(true)}
                >
                    <LinearGradient
                        colors={['green', 'transparent']}
                        style={styles.gradient}
                        start={{ x: 0.0, y: 1 }} end={{ x: 1.2, y: 1.0 }}
                    >
                        <Text style={styles.optionText}>Excluir horário livre da agenda</Text>
                        <Text style={[styles.optionText, { fontSize: 16, marginTop: "2%" }]}>(remover determinado horário de seus horários livres para agendamento)</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}