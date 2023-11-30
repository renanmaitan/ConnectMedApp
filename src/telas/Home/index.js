import React, { useEffect, useState, useContext } from "react";

import { Text, View, TouchableOpacity, RefreshControl } from "react-native";
import styles from "./style";
import ListaHorizontal from "../../components/ListaHorizontal";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../../contexts/userData";
import Loading from "../../components/Loading";
import { ScrollView } from "react-native";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../Config";

export default function Login({ navigation }) {
    
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [dataNormal, setDataNormal] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);

    const { userDatas } = useContext(UserContext);

    const disjoinData = (data) => {
        const date = new Date();
        const newData = [];
        const newData2 = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].year > date.getFullYear()) {
                newData.push(data[i]);
            } else if (data[i].year == date.getFullYear()) {
                if (data[i].month > date.getMonth() + 1) {
                    newData.push(data[i]);
                } else if (data[i].month == date.getMonth() + 1) {
                    if (data[i].day > date.getDate()) {
                        newData.push(data[i]);
                    } else if (data[i].day == date.getDate()) {
                        if (data[i].hour > date.getHours()) {
                            newData.push(data[i]);
                        } else if (data[i].hour == date.getHours()) {
                            if (data[i].minute > date.getMinutes()) {
                                newData.push(data[i]);
                            } else {
                                newData2.push(data[i]);
                            }
                        } else {
                            newData2.push(data[i]);
                        }
                    } else {
                        newData2.push(data[i]);
                    }
                }
            }
        }
        return [newData, newData2];
    };

    const orderData = (data) => {
        const newData = data.sort((a, b) => {
            if (a.year > b.year) {
                return 1;
            } else if (a.year < b.year) {
                return -1;
            } else {
                if (a.month > b.month) {
                    return 1;
                } else if (a.month < b.month) {
                    return -1;
                } else {
                    if (a.day > b.day) {
                        return 1;
                    } else if (a.day < b.day) {
                        return -1;
                    } else {
                        if (a.hour > b.hour) {
                            return 1;
                        } else if (a.hour < b.hour) {
                            return -1;
                        } else {
                            if (a.minute > b.minute) {
                                return 1;
                            } else if (a.minute < b.minute) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                    }
                }
            }
        });
        for (let i = 0; i < newData.length; i++) {
            newData[i].id = i + 1;
        }
        return newData;
    };

    useEffect(() => {
        if (Object.keys(userDatas).length > 0) {
            setLoading(false);
            getScheduling().then(async (res) => {
                const appointments = [];
                const json = JSON.parse(JSON.stringify(res));
                for (const appointment of json) {
                    const user = await getUser(userDatas.isDoctor ? appointment.patientUid : appointment.doctorUid);
                    appointments.push({
                        name: user.name,
                        specialty: user.specialty,
                        day: appointment.date.split("-")[0],
                        month: appointment.date.split("-")[1],
                        year: appointment.date.split("-")[2],
                        hour: appointment.time.split(":")[0],
                        minute: appointment.time.split(":")[1],
                        id: appointments.length + 1,
                        address: user.address ? user.address : "Consulta Online",
                    });
                }
                const [newData, newData2] = disjoinData(appointments);
                setDataNormal(orderData(newData));
                setDataHistory(orderData(newData2));
            });
        }
    }, [userDatas]);

    async function getUser(uid) {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list[0]
    }

    async function getScheduling() {
        const q = query(collection(db, "scheduling"), where("patientUid", "==", userDatas.uid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        return list
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getScheduling().then(async (res) => {
            const appointments = [];
            const json = JSON.parse(JSON.stringify(res));
            if (json.length == 0) {
                setRefreshing(false);
                return;
            }
            for (const appointment of json) {
                const user = await getUser(userDatas.isDoctor ? appointment.patientUid : appointment.doctorUid);
                appointments.push({
                    name: user.name,
                    specialty: user.specialty,
                    day: appointment.date.split("-")[0],
                    month: appointment.date.split("-")[1],
                    year: appointment.date.split("-")[2],
                    hour: appointment.time.split(":")[0],
                    minute: appointment.time.split(":")[1],
                    id: appointments.length + 1,
                    address: user.address ? user.address : "Consulta Online",
                });
            }
            const [newData, newData2] = disjoinData(appointments);
            setDataNormal(orderData(newData));
            setDataHistory(orderData(newData2));
        });
        setRefreshing(false);
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <LinearGradient
                    colors={['#086972', 'transparent']}
                    style={styles.scrollview}
                >
                    <Text style={styles.title}>Olá, {userDatas?.name.split(" ")[0]}!</Text>
                    <View style={styles.carousel}>
                        <Text style={styles.carouselTitle}>Seus agendamentos:</Text>
                        <View style={styles.carouselBody}>
                            <ListaHorizontal data={dataNormal} />
                        </View>
                    </View>
                    <View style={styles.carousel}>
                        <Text style={styles.carouselTitle}>Seu histórico:</Text>
                        <View style={styles.carouselBody}>
                            <ListaHorizontal data={dataHistory} type='history' />
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        {userDatas.isDoctor ? <TouchableOpacity style={styles.button} onPress={() => alert("Tela indisponivel no momento")/*navigation.navigate('MinhaAgenda')*/}><Text style={styles.textButton}>Minha agenda</Text></TouchableOpacity>:
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Médicos')}>
                                <Text style={styles.textButton}>Agendar Consulta</Text>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity style={styles.buttonRed}>
                                <Text style={styles.textButton}>Cancelar Agendamento</Text>
                            </TouchableOpacity>
                        </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}
