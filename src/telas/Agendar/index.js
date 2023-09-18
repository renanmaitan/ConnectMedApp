import React from "react";

import { View, Text, Touchable } from "react-native";
import styles from "./style";

export default function Agendar({ route }) {
    const item = route.params
    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{item.itemName}</Text>
                <Text style={styles.headerText}>{item.itemAddress}</Text>
                <Text style={styles.headerText}>CEP: {item.itemCep}</Text>
            </View>
            <Text>{item.itemId}</Text>

            <Text>{item.itemSpecialty}</Text>
            <Text>{item.itemCrm}</Text>
            <Text>{item.itemPrice}</Text>
            
            <Text>{item.itemCity}</Text>
            
            <Text>{item.itemBairro}</Text>
            <Text>{item.itemPhone}</Text>
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