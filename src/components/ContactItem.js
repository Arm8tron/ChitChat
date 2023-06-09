import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import CustomColors from "../CustomColors";
import { useNavigation } from '@react-navigation/native';

export default function ContactItem({ item }) {
    const navigation = useNavigation();

    function navigateToPersonalChatsScreen() {
        const chatId = item.phoneNumber?.replaceAll(" ", "").slice(1);
        const displayText = item.displayText;
        navigation.push('PersonalChat', {
            chatId, displayText
        });
    }


    return (
        <TouchableOpacity onPress={navigateToPersonalChatsScreen} style={styles.container}>
            <View style={styles.circle}></View>
            <Text>
                {item.displayText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: 64,
            paddingLeft: 4,
            alignItems: "center",
            flexDirection: "row"
        },
        circle: {
            marginLeft: 16,
            marginRight: 16,
            height: 48,
            width: 48,
            backgroundColor: CustomColors.secondary,
            borderRadius: 9999
        }
    }
)
