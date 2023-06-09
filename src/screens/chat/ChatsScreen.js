import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChatHistoryItem from "../../components/ChatHistoryItem";


function ChatsScreen({ navigation }) {
	const chatsObject = useSelector(state => state.chatsObjectReducer);

	const [chatHistory, setChatHistory] = useState([]);


	useEffect(() => {
		let newChatHistory = [];
		for ([chatId, chatData] of Object.entries(chatsObject)) {
			try {
				const chatMessagesLength = chatData.chatMessages.length;
				const { message, unformattedTime } = chatData.chatMessages[chatMessagesLength - 1];
				const displayText = chatData.displayText;
				if (message && unformattedTime && displayText) {
					newChatHistory.push({ chatId, message, displayText, unformattedTime });					
				}
			} catch (error) {
				//console.log(error);
			}
		}

		newChatHistory.sort((a, b) => b.unformattedTime - a.unformattedTime);

		setChatHistory(newChatHistory);
	}, [chatsObject]);

	return (
		<SafeAreaView>
			<FlatList
				data={chatHistory}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <ChatHistoryItem item={item} navigation={navigation}/>}
				bounces={false}
			/>
			{
				chatHistory.length == 0 &&
				<View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: "#818181" }}>No chats present</Text>
				</View>
			}
		</SafeAreaView>
	)
}



export default ChatsScreen;
