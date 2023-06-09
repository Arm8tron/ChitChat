import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, StyleSheet, Text, ActivityIndicator } from 'react-native'
import CustomColors from '../../CustomColors'
import { UserCircleIcon } from 'react-native-heroicons/solid';

import config from '../../config';

import { useDispatch, useSelector } from "react-redux";

const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");
import xmppClientConstants from '../../redux/constants/xmppClientConstants';
import userInfoConstants from '../../redux/constants/userInfoConstants';
import chatsObjectConstants from '../../redux/constants/chatsObjectConstants';

const testCreds = {
	'6587654321': "OBMMU9QI",
	'6581234567': "L29VGXXL",
	'6588888888': "58L5LE3I",
	'6587777777': "SLG1Q4UN",
	'6586666666': "Y6EUK2GX",
	'6585555555': "07FWW50D",
	'6584444444': "YVF245DX",
	'6583333333': "85U3ETRY",
	'6582222222': "W61UJ6Z7"
}

export default function ConfirmLoginScreen(props) {
	const dispatch = useDispatch();
	const userId = useRef(props.route.params.phoneNumber.slice(1));
	const [isXmppClientLoading, setXmppClientLoading] = useState(false);


	function navigateToHomeScreen() {
		setXmppClientLoading(true);
		const xmppClient = client({
			service: config.service, // Replace with your XMPP server URL
			domain: config.domain, // Replace with your XMPP server domain
			username: userId.current, // Replace with your XMPP account username
			password: testCreds[userId.current],// Replace with your XMPP account password
		});

		debug(xmppClient, false);

		xmppClient.start().catch(console.log);

		xmppClient.on("online", async (address) => {
			console.log("ONLINE as ", address.toString());
			await xmppClient.send(xml("presence"));
			setXmppClientLoading(false);
			props.navigation?.push('Home');
		});

		dispatch({
			type: xmppClientConstants.SET_XMPPCLIENT,
			payload: xmppClient,
		});

		dispatch({
			type: userInfoConstants.SET_USER_INFO,
			payload: {
				userName: userId.current
			}
		});

		dispatch({
			type: chatsObjectConstants.RESET_CHAT,
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<UserCircleIcon size={96} color={"#818181"} />
			<Text style={styles.phoneNumberText}>{userId.current}</Text>
			<Pressable disabled={isXmppClientLoading} testID='done-btn' onPress={navigateToHomeScreen} style={styles.submitBtn}>
				{
					isXmppClientLoading ?
						<ActivityIndicator color={"white"}/>
						:
						<Text style={styles.submitBtnText}>Done</Text>
				}
			</Pressable>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

	},
	phoneNumberText: {
		fontSize: 18,
		marginVertical: 20
	},
	submitBtn: {
		backgroundColor: CustomColors.primary,
		width: "60%",
		height: 40,
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	submitBtnText: {
		color: "white",
		fontSize: 16,
		fontWeight: 500
	}
})