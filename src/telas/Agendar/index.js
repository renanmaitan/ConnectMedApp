import React from "react";

import { View, Text } from "react-native";
import styles from "./style";

export default function Agendar({route}){
    return(
        <View>
            <Text>{route.params.itemId}</Text>
            <Text>{route.params.itemName}</Text>
            <Text>{route.params.itemSpecialty}</Text>
            <Text>{route.params.itemCrm}</Text>
            <Text>{route.params.itemPrice}</Text>
            <Text>{route.params.itemAddress}</Text>
            <Text>{route.params.itemCity}</Text>
            <Text>{route.params.itemCep}</Text>
            <Text>{route.params.itemBairro}</Text>
            <Text>{route.params.itemPhone}</Text>
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