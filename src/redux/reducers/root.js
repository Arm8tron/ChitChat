import chatsObjectReducer from "./chatsObjectReducer";
import xmppClientReducer from "./xmppClientReducer";
import userInfoReducer from "./userInfoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	chatsObjectReducer, 
	xmppClientReducer,
	userInfoReducer
})

export default rootReducer;