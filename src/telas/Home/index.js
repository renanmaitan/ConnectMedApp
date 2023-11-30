import React, { useEffect, useState, useContext } from "react";

import { Text, View, TouchableOpacity, RefreshControl, SafeAreaView } from "react-native";
import styles from "./style";
import ListaHorizontal from "../../components/ListaHorizontal";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../../contexts/userData";
import Loading from "../../components/Loading";
import { ScrollView } from "react-native";
import { disjoinData, orderData, getScheduling, getUser, handleToSelectData, deleteScheduling } from "./utils";
import { Modal } from "react-native";
import Select from "../../components/Select";

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [dataNormal, setDataNormal] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);
    const { userDatas } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (userDatas.uid == null || userDatas.uid == undefined) {
            return;
        }
        const fetchData = async () => {
            try {
                if (Object.keys(userDatas).length > 0) {
                    const res = await getScheduling(userDatas.isDoctor ? "doctorUid" : "patientUid", userDatas);
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
                            docId: appointment.id,
                            address: user.address ? user.address : "Consulta Online",
                            id: null,
                        });
                    }
                    const [newData, newData2] = disjoinData(appointments);
                    setDataNormal(orderData(newData));
                    setDataHistory(orderData(newData2));
                    setLoading(false);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [userDatas, refreshing]);

    const onRefresh = () => {    
        setRefreshing(true);
        if (userDatas.uid == null || userDatas.uid == undefined) {
            setRefreshing(false);
            return;
        }
        getScheduling(userDatas.isDoctor ? "doctorUid" : "patientUid", userDatas).then(async (res) => {
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
                    docId: appointment.id,
                    id: null,
                    address: user.address ? user.address : "Consulta Online",
                });
            }
            const [newData, newData2] = disjoinData(appointments);
            setDataNormal(orderData(newData));
            setDataHistory(orderData(newData2));
        });
        setRefreshing(false);
    }


    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Selecione o agendamento que deseja cancelar:</Text>
                        <Select options={handleToSelectData(dataNormal)} text={"Agendamentos"} onChangeSelect={(item) => {
                            const appointment = dataNormal.filter((element) => element.id == item)[0];
                            setSelected(appointment.docId);
                        }} />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                if (selected) {
                                    deleteScheduling(selected);
                                    onRefresh();
                                }
                                else {
                                    alert("Nenhum agendamento selecionado", "Selecione um agendamento para continuar");
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Cancelar Agendamento</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backModal} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
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
                        {userDatas.isDoctor ? <TouchableOpacity style={styles.button} onPress={() => alert("Tela indisponivel no momento")/*navigation.navigate('MinhaAgenda')*/}><Text style={styles.textButton}>Minha agenda</Text></TouchableOpacity> :
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Médicos')}>
                                <Text style={styles.textButton}>Agendar Consulta</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            style={styles.buttonRed}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.textButton}>Cancelar Agendamento</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}
