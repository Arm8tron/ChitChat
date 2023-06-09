import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, PaperAirplaneIcon, CheckIcon } from 'react-native-heroicons/solid';
import CustomColors from '../../CustomColors';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config';
const { client, xml } = require("@xmpp/client");


/* 
	STATUS: 
		0 - Sending
		1 - Sent
		2 - Received
		3 - Seen
*/

export default function PersonalChatsScreen(props) {
	const bottom = useSafeAreaInsets().bottom;
	const dispatch = useDispatch();

	const chatsObject = useSelector(state => state.chatsObjectReducer);
	const xmppClient = useSelector(state => state.xmppClientReducer);
	const userInfo = useSelector(state => state.userInfoReducer);

	const flatlistRef = useRef();

	const [chatMessage, setChatMessage] = useState('');

	const chatId = props.route.params.chatId;

	useEffect(() => {
		try {
			flatlistRef.current.scrollToEnd({ animated: true });
		} catch (error) {
			
		}
	}, [chatsObject]);

	function goBack() {
		props.navigation.goBack();
	}

	async function sendMessage() {
		if (!chatId) {
			console.log("Invalid phone number");
			return;
		}

		if (chatMessage.trim() == "") return;

		const messageId = Math.floor(Math.random() * Math.floor(999999999));

		const recipients = [`${chatId}@${config.domain}`, `${userInfo.userName}@${config.domain}`]; //Recipients should be JID of self and the other user

		const stanzas = recipients.map((address) => {
			const messageStanza = xml("message", {
				from: `${userInfo.userName}@${config.domain}`,
				to: address,
				type: "chat",
				id: messageId,
			});

			const body = {
				"arguments": {
					"command": "messageReceived",
					"silent": false,
					"important": false,
					"text": chatMessage,
					"messageId": messageId,
					"relatedMsgID": "",
					"messagetype": "textmessage",
					"signature": "ikt8SFliz77DoetqCNpr3g4hrM/B8v1f3iS6GDJQXIarCBbIbA66K0thnCsT3RXhq/wgXXo+3BJ39rJF+WIThA==",
					"iv": "zX7nU0A7+SKAIUiEfnUuxg==",
					"burn": false,
					"time": Date.now(),
					"chatId": chatId,
					"displayText": props.route.params.displayText
				}
			}

			messageStanza.c("body", {
				xmlns: "jabber:client"
			})
			.t(JSON.stringify(body)).up()
			.c("onechat", {
				xmlns: "jabber:onechat"
			}).c('stamp');

			return messageStanza
		});

		//console.log("Sending:- ", stanzas.toString());
		await xmppClient.sendMany(stanzas).catch(console.error);

		setChatMessage("");
	}

	function RenderChatMessage({ item }) {
		return (
			<View style={[
				styles.parentMessageView,
				{
					alignSelf: item.isSelf ? "flex-end" : "flex-start",
				}
			]}>
				<View style={[styles.mainMessageView, {
					backgroundColor: item.isSelf ? "#E8FCD0" : "transparent",
				}]}>
					<Text style={styles.mainMessageText}>{item.message}</Text>
				</View>
				<View style={styles.messageInfoView}>
					<Text style={styles.timeText}>{item.time}</Text>
					{
						item.isSelf && <MessageStatus status={item.status} />
					}
				</View>
			</View>
		)
	}


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={goBack}>
					<ChevronLeftIcon color="white" />
				</Pressable>
				<Text style={styles.headerText}>{props.route.params.displayText}</Text>
			</View>
			<FlatList
				ref={flatlistRef}
				data={chatsObject[chatId]?.chatMessages}
				renderItem={RenderChatMessage}
				style={{ marginBottom: 80 }}
			/>
			<View style={[styles.textInputView, { paddingBottom: bottom }]}>
				<TextInput
					value={chatMessage}
					onChangeText={setChatMessage}
					style={styles.textInput}
				/>
				<Pressable onPress={sendMessage}
					disabled={chatMessage.trim() == ""}
					style={{ opacity: chatMessage.trim() != "" ? 1 : 0.4 }}>
					<PaperAirplaneIcon color={CustomColors.primary} />
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

function MessageStatus({ status }) {
	switch (status) {
		case 1:
			return <View style={styles.sentView}><CheckIcon color={"white"} size={10} /></View>
		case 2:
			return <View style={styles.receivedView}><CheckIcon color={"white"} size={8} /><CheckIcon color={"white"} size={8} /></View>
		case 3:
			return <View style={styles.seenView}><CheckIcon color={"white"} size={8} /><CheckIcon color={"white"} size={8} /></View>
		default:
			break;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		backgroundColor: CustomColors.primary,
		width: '100%',
		height: 48,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingLeft: 10
	},
	headerText: {
		color: "white",
		fontSize: 18,
		marginLeft: 20
	},
	textInputView: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 90,
		backgroundColor: "#e0e0e0",
		paddingHorizontal: 20,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		width: "80%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: 4,
		marginRight: 20
	},
	parentMessageView: {
		padding: 10,
		borderRadius: 8,
		marginHorizontal: 10,
	},
	mainMessageView: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	mainMessageText: {
		fontSize: 16
	},
	timeText: {
		color: "#818181",
		fontSize: 12,
		marginRight: 2
	},
	messageInfoView: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5
	},
	sentView: {
		height: 16,
		width: 16,
		borderRadius: 9999,
		backgroundColor: "#818181",
		alignItems: "center",
		justifyContent: "center"
	},
	receivedView: {
		height: 16,
		width: 16,
		borderRadius: 9999,
		backgroundColor: "#818181",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row"
	},
	seenView: {
		height: 16,
		width: 16,
		borderRadius: 9999,
		backgroundColor: "#77CF72",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row"
	}
})
