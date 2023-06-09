import React, { useEffect } from "react";

import { View, Text, SafeAreaView, StatusBar } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsScreen from "./chat/ChatsScreen";
import ContactsScreen from "./contacts/ContactsScreen";
import CustomColors from "../CustomColors";
import { useDispatch, useSelector } from "react-redux";
import chatsObjectConstants from "../redux/constants/chatsObjectConstants";
import { getFormattedTime } from "../utils";
import config from "../config";
const { client, xml } = require("@xmpp/client");


function HomeScreen() {
    const Tab = createBottomTabNavigator();
    const dispatch = useDispatch();
    const xmppClient = useSelector(state => state.xmppClientReducer);
    const userInfo = useSelector(state => state.userInfoReducer);

    useEffect(() => {
        if (!xmppClient) return;

        xmppClient.on("stanza", async (stanza) => {
            //console.log("============================ ", stanza);

            if (stanza.is("message")) {
                const body = stanza?.getChildText('body');
                if (body) {
                    try {
                        const parsedBody = JSON.parse(body);
                        const { text: message, messageId, time, chatId, displayText } = parsedBody?.arguments;
                        if (message && displayText) {
                            const { from, type } = stanza.attrs;
                            if(type == "chat") {
                                const isSelf = from.includes(`${userInfo.userName}@${config.domain}`); //Self JID 
                                storeMessage(message, chatId, messageId, isSelf, time, displayText)
                            }
                        }
                    } catch (error) {

                    }
                }
            }
        });

        xmppClient.on("error", (err) => {
            console.log("Error: ")
            console.log(err);
        });

        xmppClient.on("offline", () => {
            console.log("Connection offline");
        });

    }, [xmppClient])

    function storeMessage(message, chatId, messageId, isSelf, time, displayText) {
        console.log(`Storing message: ${message} in chatId: ${chatId}`);
        const messageData = {
            isSelf,
            message,
            messageId,
            time: getFormattedTime(time),
            unformattedTime: time
        }

        dispatch({
            type: chatsObjectConstants.ADD_CHAT,
            payload: {
                messageData, chatId, displayText
            }
        })
    }


    return <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content"
            backgroundColor={CustomColors.secondary} />
        <Tab.Navigator>
            <Tab.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Contacts" component={ContactsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    </View>
}
export default HomeScreen