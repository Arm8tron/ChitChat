import { SET_XMPPCLIENT, REMOVE_XMPPCLIENT} from "../constants/xmppClientConstants";

export default function xmppClientReducer(state = null, action) {
	switch (action.type) {
		case SET_XMPPCLIENT:
			return action.payload;
		case REMOVE_XMPPCLIENT:
			return null;
		default:
			return state;
	}
}
