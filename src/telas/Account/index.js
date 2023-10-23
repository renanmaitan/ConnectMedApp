import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import auth from '../../Config';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteUser } from 'firebase/auth';
import UserContext from '../../contexts/userData';
import Loading from '../../components/Loading';

import styles from "./style";

export default function Account({ navigation }) {

    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const { userDatas } = useContext(UserContext)
    const { delUser } = useContext(UserContext)

    useEffect(() => {
        if (Object.keys(userDatas).length > 0) {
            setLoading(false);
        }
    }, [userDatas])

    if (loading) {
        return <Loading />
    }

    const handleLogout = () => {
        auth.signOut()
            .catch((error) => {
                console.log(error)
            });
    }

    const handleDeleteUser = async () => {
        await delUser()
        deleteUser(auth.currentUser)
            .then(() => {
                handleLogout()
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
                <FontAwesome5 name="user-circle" color="#B1B1B1" size={100} style={{ marginBottom: "5%", marginTop: "5%" }} />
                <Text style={styles.title}>Alterar Dados</Text>
                <TouchableOpacity style={styles.containerField}>
                    <View style={styles.labelField}>
                        <Text style={styles.titleField}>Nome</Text>
                        <Text style={styles.contentField}>{userDatas.name}</Text>
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
                        <Text style={styles.titleField}>CEP</Text>
                        <Text style={styles.contentField}>{userDatas.cep}</Text>
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
                    style={{ marginTop: "5%", marginBottom: "10%" }}
                    onPress={handleDeleteUser}
                >
                    <Text style={[styles.buttonText, { color: "red", fontSize: 16, textDecorationLine: "underline" }]}>Excluir Conta</Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    )
}