import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RatingRead from "../../components/RatingRead";
import createScheduling from "../../services/createScheduling";
import auth from "../../Config";
import { useNavigation } from "@react-navigation/native";
import Select from "../../components/Select";
import Loading from "../../components/Loading";
import { getFreeHours, getFreeDays, getFreeMonths, getFreeYears } from "../../utils/scheduling";

export default function Agendar({ route }) {
    const item = route.params.item
    const filter = route.params.filter
    const [time, setTime] = useState({ id: null, label: "Selecione um horário" })
    const [month, setMonth] = useState({ id: null, label: "Selecione um mês" })
    const [year, setYear] = useState({ id: null, label: "Selecione um ano" })
    const [day, setDay] = useState({ id: null, label: "Selecione um dia" })
    const navigation = useNavigation()
    const [freeHours, setFreeHours] = useState([])
    const [freeDays, setFreeDays] = useState([])
    const [freeMonths, setFreeMonths] = useState([])
    const [freeYears, setFreeYears] = useState([])
    const [loading, setLoading] = useState(false)

    const data = {
        doctorUid: item.uid,
        date: `${day.label}-${month.label}-${year.label}`,
        time: time.label,
        modality: item.modality,
        specialty: item.specialty,
        value: item.value,
        patientUid: auth.currentUser.uid
    }

    const handleGetFreeHours = async (dia, mes, ano) => {
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

    useEffect(() => {
        handleGetFreeYears()
    }, [])

    const handleCreateScheduling = () => {
        if (time.label == "Não há horários disponíveis para hoje") {
            return alert("Não há horários disponíveis para hoje")
        } else if (time.id == null) {
            return alert("Selecione um horário")
        }
        setLoading(true)
        createScheduling(data)
            .then(() => {
                navigation.navigate("HomeTab")
                alert("Agendamento criado com sucesso!")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (time.id != null) {
            setLoading(false)
        }
        if (time.label == "Não há horários disponíveis para hoje") {
            setLoading(false)
        }
    }, [time])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.item}>
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
                                    <Text style={styles.itemText}>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                </View>
                            </View>
                        </View>
                        <Text
                            style={styles.itemFooter}
                            multiline={true}
                        >{filter == "Presencial" ? `${item.address} - ${item.bairro} - ${item.city} - CEP: ${item.cep}` : "Atendimento Online"}</Text>
                    </LinearGradient>
                </View>
            </View>
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
            {year.id!=null && <View style={styles.selectContainer}>
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
            {month.id!=null && <View style={styles.selectContainer}>
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
            {day.id!=null && <View style={styles.selectContainer}>
                <Select
                    options={freeHours}
                    text={time.label}
                    onChangeSelect={(value) => {
                        setLoading(true)
                        const selected = freeHours.find((item) => item.id == value)
                        setTime(selected)
                    }}
                />
            </View>}
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleCreateScheduling()}
            >
                <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    )
}