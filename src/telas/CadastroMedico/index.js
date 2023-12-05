import React, { useState } from "react";
import { View, Text } from "react-native";
import Select from "../../components/Select";
import styles from "./style";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { createDoctorUser } from "../../services/services";
import { getSpecialties } from "../../services/services";

export default function App(routes) {

    const form = routes.route.params
    const [specialities, setSpecialities] = useState([])
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
        endHour: undefined,
        workDays: "" //"0,1,2,3,4,5,6" // 0 = domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sábado
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

    const validateForm = () => {
        if (doctorForm.value === "") {
            Alert.alert("Campo obrigatório", "Digite o valor da sua consulta")
            return false
        }
        if (doctorForm.modality === "") {
            Alert.alert("Campo obrigatório", "Selecione uma modalidade de consulta")
            return false
        }
        if (doctorForm.modality === "Presencial" || doctorForm.modality === "Presencial e Online") {
            if (doctorForm.address === "") {
                Alert.alert("Campo obrigatório", "Digite o seu endereço")
                return false
            }
            if (doctorForm.bairro === "") {
                Alert.alert("Campo obrigatório", "Digite o seu bairro")
                return false
            }
            if (doctorForm.city === "") {
                Alert.alert("Campo obrigatório", "Digite a sua cidade")
                return false
            }
            if (doctorForm.cep === "") {
                Alert.alert("Campo obrigatório", "Digite o seu CEP")
                return false
            }
        }
        if (doctorForm.specialty === "") {
            Alert.alert("Campo obrigatório", "Selecione uma especialidade")
            return false
        }
        if (doctorForm.register === "") {
            Alert.alert("Campo obrigatório", "Digite o seu registro")
            return false
        }
        if (doctorForm.startHour === undefined) {
            Alert.alert("Campo obrigatório", "Digite o seu horário de início")
            return false
        }
        if (doctorForm.endHour === undefined) {
            Alert.alert("Campo obrigatório", "Digite o seu horário de término")
            return false
        }
        if (doctorForm.workDays === "") {
            Alert.alert("Campo obrigatório", "Digite os dias que você trabalha")
            return false
        }
        const workDaysPattern = /^([0-6],)*[0-6](,[0-6])*$/;
        if (!workDaysPattern.test(doctorForm.workDays)) {
            Alert.alert('Formato inválido', 'O campo "dias que você trabalha" deve seguir o padrão "0,1,2,3,4,5,6" - variando de 0 a 6, separados por vírgula e não terminando com vírgula')
            return false
        }
        return true
    }
    
    useState(() => {
        getSpecialties().then((res) => {
            const newList = res.filter((item) => item.id !== "todos")
            setSpecialities(newList)
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

    const handleWorkDays = (days) => {
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
            }else if(day !== ""){
                invalid = true
                daysString.push("")
            }
        })
        if (daysString.length === 0) {
            return "Nenhum dia selecionado"
        }
        if(invalid){
            return "Dia inválido - intervalo permitido: 0 a 6"
        }
        if (daysString.length === 1) {
            return daysString[0].replace(", ", "")
        }
        daysString[daysString.length - 2] = daysString[daysString.length - 2].replace(", ", " e ")
        daysString[daysString.length - 1] = daysString[daysString.length - 1].replace(", ", "")
        return daysString
    }


    return (
        <ScrollView style={{ backgroundColor: "#DFEDEB" }}>
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
                <Text style={[styles.text, {marginTop: "2%" }]}>Selecione os dias que você trabalha: </Text>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TextInput
                        placeholder="Ex: 0,1,2,3,4,5,6 (domingo a sábado)"
                        style={styles.input}
                        onChangeText={(text) => {
                            setDoctorForm({
                                ...doctorForm,
                                workDays: text
                            })
                        }}
                        value={doctorForm.workDays}
                        keyboardType="numeric"
                    />
                </View>
                {/* mostrar os dias até então selecionados (Segunda, Quarta e Quinta*/}
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={[styles.text, {margin: "2%" }]}>Dias selecionados: </Text>
                    <Text style={[styles.text, {marginHorizontal: "2%", textAlign: "center" }]}>{handleWorkDays(doctorForm.workDays)}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { 
                    if(validateForm()){
                        createDoctorUser(form, doctorForm)
                    }
                 }} >
                    <Text style={{ color: "white", fontSize: 16 }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}