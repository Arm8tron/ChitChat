import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CustomColors from "../CustomColors";
import { getFormattedTime } from "../utils";

export default function ChatHistoryItem({ item, navigation }) {

	function navigateToPersonalChatsScreen() {
		navigation.push('PersonalChat', {
			chatId: item.chatId,
			displayText: item.displayText
		});
	}


	return (
		<Pressable onPress={navigateToPersonalChatsScreen} style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<View style={styles.circle}></View>
				<View>
					<Text>{item.displayText}</Text>
					<Text style={styles.message}>{item.message}</Text>
				</View>
			</View>
			<View>
				<Text style={styles.time}>{getFormattedTime(item.unformattedTime)}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 64,
		paddingLeft: 4,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	circle: {
		marginLeft: 16,
		marginRight: 16,
		height: 48,
		width: 48,
		backgroundColor: CustomColors.secondary,
		borderRadius: 9999
	},
	message: {
		color: "#818181",
		fontSize: 12
	},
	time: {
		marginRight: 10
	}
});