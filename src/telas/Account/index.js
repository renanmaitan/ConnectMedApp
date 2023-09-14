import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import auth from '../../Config';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteUser } from 'firebase/auth';

import styles from "./style";

export default function Account({ navigation }) {

    const user = auth.currentUser;

    const handleLogout = () => {
        auth.signOut()
            .catch((error) => {
                console.log(error)
            });
    }

    const handleDeleteUser = () => {
        deleteUser(auth.currentUser)
            .then(() => {
                console.log("Usuário excluído com sucesso!")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#086972', 'transparent']}
                style={styles.scrollview}
            >
                <FontAwesome5 name="user-circle" color="#B1B1B1" size={100} style={{ marginBottom: "15%", marginTop: "15%" }} />
                <TouchableOpacity style={styles.containerField}>
                    <View style={styles.labelField}>
                        <Text style={styles.titleField}>Nome</Text>
                        <Text style={styles.contentField}>{user.displayName}</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerField}>
                    <View style={styles.labelField}>
                        <Text style={styles.titleField}>Email</Text>
                        <Text style={styles.contentField}>{user.email}</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerField}>
                    <View style={styles.labelField}>
                        <Text style={[styles.titleField, { paddingVertical: "3%" }]}>Senha</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: "5%" }}
                    onPress={handleDeleteUser}
                >
                    <Text style={[styles.buttonText, { color: "red", fontSize: 16, textDecorationLine: "underline" }]}>Excluir Conta</Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    )
}