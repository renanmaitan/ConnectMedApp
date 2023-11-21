import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RatingRead from "../../components/RatingRead";
import createScheduling from "../../services/createScheduling";
import auth from "../../Config";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config";
import Select from "../../components/Select";
import Loading from "../../components/Loading";

export default function Agendar({ route }) {
    const item = route.params.item
    const filter = route.params.filter
    const date = new Date()
    const startHour = parseInt(item.startHour)
    const endHour = parseInt(item.endHour)
    const dateNow = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const [time, setTime] = useState({ id: null, label: "Selecione um horário" })
    const navigation = useNavigation()
    const [freeHours, setFreeHours] = useState([])
    const [loading, setLoading] = useState(false)

    const data = {
        doctorUid: item.uid,
        date: dateNow,
        time: time.label,
        modality: item.modality,
        specialty: item.specialty,
        value: item.price,
        patientUid: auth.currentUser.uid
    }

    async function getFreeHours() {
        const schedules = await getSchedules()
        const localFreeHours = []
        const busyHours = []
        const pastHours = []
        const notPastHours = []
        const notAvailableHours = []
        for (let i = startHour; i < endHour; i++) {
            const hour00 = `${i}:00`
            const hour30 = `${i}:30`
            if (i <= date.getHours()) {
                pastHours.push(hour00, hour30)
                if (i === date.getHours() && date.getMinutes() >= 30) {
                    pastHours.push(`${i + 1}:00`)
                    notPastHours.push(`${i + 1}:30`)
                    i++
                }
            } else {
                notPastHours.push(hour00, hour30)
            }
        }
        schedules.forEach((schedule) => {
            let day = schedule.date.split("-")[0]
            let month = schedule.date.split("-")[1]
            let year = schedule.date.split("-")[2]
            let hour = schedule.time.split(":")[0]
            let minute = schedule.time.split(":")[1]
            if (day == date.getDate() && month == date.getMonth() + 1 && year == date.getFullYear()) {
                busyHours.push(`${hour}:${minute}`)
            }
        })
        notPastHours.forEach((hour, i) => {
            if (!busyHours.includes(hour)) {
                localFreeHours.push({ id: i, label: hour })
            } else {
                notAvailableHours.push(hour)
            }
        })
        return localFreeHours
    }

    useEffect(() => {
        getFreeHours()
            .then((localFreeHours) => {
                if (localFreeHours.length === 0) {
                    localFreeHours.push({ id: null, label: "Não há horários disponíveis para hoje" })
                }
                setFreeHours(localFreeHours)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    async function getSchedules() {
        const schedulesRef = collection(db, "scheduling")
        const q = query(schedulesRef, where("doctorUid", "==", item.uid))
        const querySnapshot = await getDocs(q)
        const schedules = []
        querySnapshot.forEach((doc) => {
            schedules.push(doc.data())
        })
        return schedules
    }

    const handleCreateScheduling = () => {
        if (time.label == "Não há horários disponíveis para hoje") {
            return alert("Não há horários disponíveis para hoje")
        }else if (time.id == null) {
            return alert("Selecione um horário")
        }
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
                                    <Text style={styles.itemText}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
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
                    options={freeHours}
                    text={time.label}
                    onChangeSelect={(value) => {
                        setLoading(true)
                        const selected = freeHours.find((item) => item.id == value)
                        setTime(selected)
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleCreateScheduling()}
            >
                <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    )
}