import React, { useEffect, useState, useContext } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import styles from "./style";
import ListaHorizontal from "../../components/ListaHorizontal";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../../contexts/userData";
import Loading from "../../components/Loading";
import { ScrollView } from "react-native";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../Config";

export default function Login({ navigation }) {
    const dataHistory = [
        {
            id: 1,
            name: "Doutor Fran",
            specialty: "Cardiologisto",
            day: "25",
            month: "10",
            year: "2022",
            hour: "14",
            minute: "00",
            address: "Rua dos Bobos, 0",
            present: true,
        },
        {
            id: 2,
            name: "Doutura Fran",
            specialty: "Cardiologista",
            day: "24",
            month: "9",
            year: "2022",
            hour: "15",
            minute: "10",
            address: "Rua dos Bobos, 1",
            present: false,
        },
        {
            id: 3,
            name: "Doutore Fran",
            specialty: "Cardiologiste",
            day: "23",
            month: "8",
            year: "2023",
            hour: "16",
            minute: "20",
            address: "Rua dos Bobos, 2",
            present: true,
        },
    ]
    // const data = [
    //     {
    //         id: 1,
    //         name: "Doutor Fran",
    //         specialty: "Cardiologisto",
    //         day: "25",
    //         month: "10",
    //         year: "2023",
    //         hour: "14",
    //         minute: "00",
    //         address: "Rua dos Bobos, 0",
    //     },
    //     {
    //         id: 2,
    //         name: "Doutura Fran",
    //         specialty: "Cardiologista",
    //         day: "24",
    //         month: "9",
    //         year: "2024",
    //         hour: "15",
    //         minute: "10",
    //         address: "Rua dos Bobos, 1",
    //     },
    //     {
    //         id: 3,
    //         name: "Doutore Fran",
    //         specialty: "Cardiologiste",
    //         day: "23",
    //         month: "8",
    //         year: "2025",
    //         hour: "16",
    //         minute: "20",
    //         address: "Rua dos Bobos, 2",
    //     },
    // ];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { userDatas } = useContext(UserContext);

    useEffect(() => {
        if (Object.keys(userDatas).length > 0) {
            setLoading(false);
            getScheduling().then((res) =>{
                const appointments = []
                const json = JSON.parse(JSON.stringify(res))
                json.forEach((appointment, index) => {
                    getUser(userDatas.isDoctor ? appointment.patientUid : appointment.doctorUid).then((res) => {
                        appointments.push({
                            name: res.name,
                            specialty: res.specialty,
                            day: appointment.date.split("-")[0],
                            month: appointment.date.split("-")[1],
                            year: appointment.date.split("-")[2],
                            hour: appointment.time.split(":")[0],
                            minute: appointment.time.split(":")[1],
                            id: index+1,
                            address: res.address? res.address : "Consulta Online",
                        })
                    }).then(() => {
                        console.log(appointments)
                        setData(appointments)
                    })
                })
            })
        }
    }, [userDatas])

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

    if (loading) {
        return <Loading />
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <LinearGradient
                    colors={['#086972', 'transparent']}
                    style={styles.scrollview}
                >
                    <Text style={styles.title}>Olá, {userDatas?.name.split(" ")[0]}!</Text>
                    <View style={styles.carousel}>
                        <Text style={styles.carouselTitle}>Seus agendamentos:</Text>
                        <View style={styles.carouselBody}>
                            <ListaHorizontal data={data} />
                        </View>
                    </View>
                    <View style={styles.carousel}>
                        <Text style={styles.carouselTitle}>Seu histórico:</Text>
                        <View style={styles.carouselBody}>
                            <ListaHorizontal data={dataHistory} type='history' />
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Médicos')}>
                            {userDatas.isDoctor ? <Text style={styles.textButton}>Minha agenda</Text> :
                                <Text style={styles.textButton}>Agendar Consulta</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRed}>
                            <Text style={styles.textButton}>Cancelar Agendamento</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </ScrollView>
    );
}
