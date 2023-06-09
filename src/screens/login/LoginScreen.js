import React, { useState } from "react"
import { View, Text, StatusBar, StyleSheet, TextInput, Pressable } from "react-native"
import { MapPinIcon, PhoneIcon, IdentificationIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomColors from "../../CustomColors";

function LoginScreen(props) {
    const [location, setLocation] = useState("Singapore");
    const [phoneNumber, setPhoneNumber] = useState("");

    function navigateToValidateCodeScreen() {
        props.navigation.push('ValidateCode', { location, phoneNumber: `+65${phoneNumber}` })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.mainContent}>
                <View style={styles.form}>
                    <MapPinIcon color={CustomColors.primary} />
                    <TextInput
                        value={location}
                        onChangeText={setLocation}
                        style={styles.formTextInput}
                        placeholder="Location"
                        placeholderTextColor={"#818181"}
                        editable={false}
                    />
                </View>
                <View style={[styles.form, { justifyContent: "space-between" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <PhoneIcon color={CustomColors.primary} />
                        <Text style={styles.formText}>+65</Text>
                    </View>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.formTextInput}
                        placeholder="Enter Phone number"
                        placeholderTextColor={"#818181"}
                        keyboardType="number-pad"
                        maxLength={8}
                    />
                </View>
                <View style={[styles.form, { justifyContent: "space-between" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IdentificationIcon color={CustomColors.primary} />
                        <Text style={styles.formText}>User ID</Text>
                    </View>
                    <TextInput
                        value={phoneNumber.length > 0 ? `65${phoneNumber}` : ""}
                        style={styles.formTextInput}
                        placeholder="User ID"
                        placeholderTextColor={"#818181"}
                        editable={false}
                    />
                </View>
                <Pressable 
                    testID="next-btn"
                    disabled={phoneNumber.length !== 8}
                    onPress={navigateToValidateCodeScreen} 
                    style={[styles.submitBtn, { backgroundColor: phoneNumber.length == 8 ? CustomColors.primary : "#4C505A" }]}>
                    <Text style={styles.submitBtnText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        alignSelf: "center",
        width: "80%",
        marginTop: 100
    },
    form: {
        borderBottomWidth: 1,
        borderColor: "#818181",
        width: "100%",
        paddingBottom: 5,
        flexDirection: "row",
        marginVertical: 15,
        alignItems: "center",
    },
    formText: {
        fontSize: 16,
        marginLeft: 5
    },
    formTextInput: {
        marginLeft: 10,
        fontSize: 16,
        marginBottom: 6,
        textAlign: "left",
    },
    submitBtn: {
        backgroundColor: "#4C505A",
        width: "100%",
        height: 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: 500
    }
})


export default LoginScreen