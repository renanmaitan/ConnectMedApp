import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { db } from "../../Config";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Select from "../../components/Select";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import auth from "../../Config";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

export default function App(routes) {

    const form = routes.route.params
    const [specialities, setSpecialities] = useState([])
    //const [specialty, setSpecialty] = useState("")
    //const [modality, setModality] = useState("")
    const [doctorForm, setDoctorForm] = useState({
        specialty: "",
        register: "",
        value: "",
        modality: "",
        address: "",
        bairro: "",
        city: "",
        cep: "",
        startHour: undefined,
        endHour: undefined
    })
    const modalities = [
        {
            id: "Presencial",
            label: "Presencial"
        },
        {
            id: "Online",
            label: "Online"
        },
        {
            id: "Presencial e Online",
            label: "Presencial e Online"
        }
    ]

    const handleCreateUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            const docRef = await addDoc(collection(db, "users"), {
                name: form.name,
                birthDate: form.birthDate,
                cpf: form.cpf,
                phone: form.phone,
                cep: form.cep,
                uid: user.uid,
                isDoctor: form.isDoctor,
                specialty: doctorForm.specialty,
                register: doctorForm.register,
                value: doctorForm.value,
                modality: doctorForm.modality,
                address: doctorForm.address,
                bairro: doctorForm.bairro,
                city: doctorForm.city,
                cep: doctorForm.cep,
                points: 5,
                price: doctorForm.value,
                startHour: doctorForm.startHour,
                endHour: doctorForm.endHour
            });

        } catch (error) {
            console.error(error);
            Alert.alert(error.message);
        }
    };

    const getSpecialty = async () => {
        const q = collection(db, "specialty");
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        return list
    }

    useState(() => {
        getSpecialty().then((res) => {
            setSpecialities(res)
        })
    }, [])

    const catchList = (id) => {
        setDoctorForm({
            ...doctorForm,
            specialty: id
        })
    }

    const catchModality = (id) => {
        setDoctorForm({
            ...doctorForm,
            modality: id
        })
    }

    return (
        <ScrollView style={{backgroundColor: "#DFEDEB"}}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Digite o valor da sua consulta:
                </Text>
                <TextInput
                    placeholder="Ex: 150"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            value: text
                        })
                    }}
                    value={doctorForm.value}
                    keyboardType="numeric"
                />
                <Text style={[styles.text, { marginBottom: "2%" }]}>
                    Selecione a sua modalidade de consulta:
                </Text>
                <Select options={modalities} onChangeSelect={(id) => catchModality(id)} text="Selecione uma modalidade de consulta"></Select>
                {doctorForm.modality === "Presencial" || doctorForm.modality === "Presencial e Online" ? (
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <TextInput
                            placeholder="Endereço. Ex: Rua, Número, Complemento"
                            style={styles.input}
                            onChangeText={(text) => {
                                setDoctorForm({
                                    ...doctorForm,
                                    address: text
                                })
                            }}
                            value={doctorForm.address}
                        />
                        <TextInput
                            placeholder="Digite o seu bairro"
                            style={styles.input}
                            onChangeText={(text) => {
                                setDoctorForm({
                                    ...doctorForm,
                                    bairro: text
                                })
                            }}
                            value={doctorForm.bairro}
                        />
                        <TextInput
                            placeholder="Digite a sua cidade"
                            style={styles.input}
                            onChangeText={(text) => {
                                setDoctorForm({
                                    ...doctorForm,
                                    city: text
                                })
                            }}
                            value={doctorForm.city}
                        />
                        <TextInput
                            placeholder="Digite o seu CEP"
                            style={styles.input}
                            onChangeText={(text) => {
                                setDoctorForm({
                                    ...doctorForm,
                                    cep: text
                                })
                            }}
                            value={doctorForm.cep}
                            keyboardType="numeric"
                        />
                    </View>
                ) : null}
                <Text style={[styles.text, { marginBottom: "2%", marginTop: "2%" }]}>Selecione a sua especialidade: </Text>
                <Select options={specialities} onChangeSelect={(id) => catchList(id)} text="Selecione uma especialidade"></Select>
                {doctorForm.specialty === "Dentista" ? <TextInput
                    placeholder="Digite o seu CRO"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : (doctorForm.specialty === "Psicólogo" ? <TextInput
                    placeholder="Digite o seu CRP"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : (doctorForm.specialty === "Nutricionista" ? <TextInput
                    placeholder="Digite o seu CRN"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : (doctorForm.specialty === "Fisioterapeuta" ? <TextInput
                    placeholder="Digite o seu CREFITO"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : (doctorForm.specialty === "Fonoaudiólogo" ? <TextInput
                    placeholder="Digite o seu CREFONO"
                    style={styles.input}
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : (doctorForm.specialty !== "" ? <TextInput
                    style={styles.input}
                    placeholder="Digite o seu CRM"
                    onChangeText={(text) => {
                        setDoctorForm({
                            ...doctorForm,
                            register: text
                        })
                    }}
                    value={doctorForm.register}
                    keyboardType="numeric"
                /> : null)))))}
                <Text style={[styles.text, { marginBottom: "2%", marginTop: "2%" }]}>Selecione o seu horário de atendimento: </Text>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TextInput
                        placeholder="Digite o seu horário de início. Ex: 7"
                        style={styles.input}
                        onChangeText={(text) => {
                            setDoctorForm({
                                ...doctorForm,
                                startHour: text
                            })
                        }}
                        value={doctorForm.startHour}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Digite o seu horário de término. Ex: 18"
                        style={styles.input}
                        onChangeText={(text) => {
                            setDoctorForm({
                                ...doctorForm,
                                endHour: text
                            })
                        }}
                        value={doctorForm.endHour}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { handleCreateUser() }}>
                    <Text style={{ color: "white", fontSize: 16 }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}