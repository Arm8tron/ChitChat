import React from "react";
import {View, Text, StyleSheet} from "react-native"
import CustomColors from "../CustomColors";

export default function ContactSectionHeader({section: {firstLetter}}){
    return <View style={styles.container}>
        <Text style={styles.firstLetter}>
            {firstLetter}
        </Text>
        <View style={styles.line}>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        height: 40,
        paddingLeft: 4,
        paddingVertical: 12, 
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: CustomColors.background
    },
    firstLetter: {
        marginLeft: 36,
        marginRight: 32,
        color: CustomColors.textColor
    },
    line: {
        backgroundColor: CustomColors.textColor,
        height: 1, 
        flex: 1
    }

})




