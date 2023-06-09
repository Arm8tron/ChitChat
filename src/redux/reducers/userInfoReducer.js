import { SET_USER_INFO } from "../constants/userInfoConstants";

export default function userInfoReducer(state = {}, action) {
	switch (action.type) {
		case SET_USER_INFO:
			return action.payload;	
		default:
			return state
	}
}