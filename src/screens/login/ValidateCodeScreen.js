import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Button } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomColors from '../../CustomColors';

export default function ValidateCodeScreen(props) {
	const phoneNumber = useRef(props.route.params.phoneNumber);
	const [pinCode, setPinCode] = useState("");

	function navigateToConfirmLoginScreen() {
		props.navigation.push('ConfirmLogin', props.route.params)
	}


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mainContent}>
				<Text style={styles.headerText}>Validation Code</Text>
				<Text style={styles.subHeaderText}>Your SMS validation code has been sent to:</Text>
				<Text style={styles.phoneNumberText}>{phoneNumber.current}</Text>
				<View style={[styles.form, { justifyContent: "space-between" }]}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<LockClosedIcon color={CustomColors.primary} />
						<Text style={styles.formText}>PIN</Text>
						<TextInput
							value={pinCode}
							onChangeText={setPinCode}
							style={styles.formTextInput}
							placeholder="Enter Pin Code"
							placeholderTextColor={"#818181"}
							keyboardType='number-pad'
						/>
					</View>
					<Button title='Resend' />
				</View>
				<Pressable 
					testID='send-btn'
					disabled={pinCode.length != 6}
					onPress={navigateToConfirmLoginScreen} 
					style={[styles.submitBtn, { backgroundColor: pinCode.length == 6 ? CustomColors.primary : "#4C505A" }]}>
					<Text style={styles.submitBtnText}>Send</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mainContent: {
		alignSelf: "center",
		marginTop: 50,
		width: "80%"
	},
	headerText: {
		fontSize: 22,
		fontWeight: 500,
		alignSelf: "center",
		marginBottom: 20
	},
	subHeaderText: {
		alignSelf: "center",
		width: "60%",
		fontSize: 16,
		textAlign: "center"
	},
	phoneNumberText: {
		alignSelf: "center",
		fontSize: 16,
		color: "#818181"
	},
	form: {
		borderBottomWidth: 1,
		borderColor: "#818181",
		width: "100%",
		paddingBottom: 5,
		flexDirection: "row",
		marginTop: 50,
		marginBottom: 75,
		alignItems: "center",
	},
	formText: {
		fontSize: 16,
		marginLeft: 5
	},
	formTextInput: {
		marginLeft: 10,
		fontSize: 16,
	},
	submitBtn: {
		backgroundColor: CustomColors.primary,
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
