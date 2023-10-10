import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RatingRead from "../../components/RatingRead";

export default function Agendar({ route }) {
    const item = route.params.item
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
                                >{item.address} - {item.bairro} - {item.city} - CEP: {item.cep}</Text>

                            </LinearGradient>
                        </View>
                    </View>
            
        </View>
    )
}

// itemId: item.id,
// itemName: item.name,
// itemSpecialty: item.specialty,
// itemCrm: item.crm,
// itemPrice: item.price,
// itemAddress: item.address,
// itemCity: item.city,
// itemCep: item.cep,
// itemBairro: item.bairro,
// itemPhone: item.phone,