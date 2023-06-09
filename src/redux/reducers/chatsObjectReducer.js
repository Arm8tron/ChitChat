import { ADD_CHAT, RESET_CHAT } from "../constants/chatsObjectConstants";

const initialState = {
	['global']: {
		id: 'global',
		displayText: 'Global',
		chatMessages: []
	}
}

export default function chatsObjectReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CHAT:
			const { messageData, chatId, displayText } = action.payload;
			if (chatId in state) {
				if(state[chatId].chatMessages.find(chat => chat.messageId == messageData.messageId)) {
					return state;
				}


				return Object.assign({}, state, {
					[chatId]: Object.assign({}, state[chatId], {
						chatMessages: [...state[chatId].chatMessages, messageData],
					}),
				});
			} else {
				return Object.assign({}, state, {
					[chatId]: {
						id: chatId,
						displayText: displayText ?? chatId,
						chatMessages: [messageData]
					}
				})
			}
		case RESET_CHAT:
			return initialState;
		default:
			return state;
	}
}