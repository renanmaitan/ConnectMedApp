import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./style";
import Select from "../../components/Select";

export default function Presencial() {

    const specialities = [
        { label: "Todas", value: "", id:0},
        { label: "Clínico Geral", value: "clinico_geral", id:1 },
        { label: "Dentista", value: "dentista", id:2 },
        { label: "Dermatologista", value: "dermatologista", id:3 },
        { label: "Ginecologista", value: "ginecologista", id:4 },
        { label: "Nutricionista", value: "nutricionista", id:5 },
        { label: "Oftalmologista", value: "oftalmologista", id:6 },
        { label: "Ortopedista", value: "ortopedista", id:7 },
        { label: "Pediatra", value: "pediatra", id:8 },
        { label: "Psicólogo", value: "psicologo", id:9 },
        { label: "Psiquiatra", value: "psiquiatra", id:10 },
        { label: "Urologista", value: "urologista", id:11},
        { label: "Cardiologista", value: "cardiologista", id:12},
        { label: "Otorrinolaringologista", value: "otorrinolaringologista", id:13},
        { label: "Fisioterapeuta", value: "fisioterapeuta", id:14},
        { label: "Fonoaudiólogo", value: "fonoaudiologo", id:15},
        { label: "Neurologista", value: "neurologista", id:16},
        { label: "Endocrinologista", value: "endocrinologista", id:17},
    ];

    return (
        <View style={styles.container}>
            <Text>Seu CEP: 18950-654</Text>
            <Text>Rua da Flores, 284 - Jd. Jardim</Text>
            <Text style={styles.changeZip}>Alterar CEP</Text>
            <View style={styles.select}>
                <Text style={styles.text}>Filtrar busca por especialidade:</Text>
                <Select options={specialities} onChangeSelect={(id)=> console.log(id)} text="Selecione uma especialidade"></Select>
            </View>
        </View>
    );
}

