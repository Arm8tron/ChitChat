import { render, fireEvent, screen} from "@testing-library/react-native";
import { Provider as StoreProvider } from 'react-redux';
import configureStore from 'redux-mock-store';
import store from "../src/redux/store"

import LoginScreen from '../src/screens/login/LoginScreen';
import ValidateCodeScreen from "../src/screens/login/ValidateCodeScreen";
import ConfirmLoginScreen from "../src/screens/login/ConfirmLoginScreen";
import rootReducer from "../src/redux/reducers/root";

const mockStore = configureStore();

it('LoginScreen: Next button enabled when phonenumber is length == 8', () => {
	const { getByPlaceholderText, getByTestId } =  render(<LoginScreen/>);

	const phoneNumberInput = getByPlaceholderText("Enter Phone number");
	const submitBtn = getByTestId("next-btn");

	expect(submitBtn.props.children[0].props.children).toBe("Next");
	expect(submitBtn.props.accessibilityState.disabled).toBe(true);

	fireEvent.changeText(phoneNumberInput, "87654321");

	expect(submitBtn.props.accessibilityState.disabled).toBe(false);
});



it('ValidateCodeScreen: Check if Login screen phone number is visible', () => {
	const { queryByText } = render(<ValidateCodeScreen route={{ params: {
		phoneNumber: "87654321"
	} }}/>)

	const textComponent = queryByText(/87654321/);

	expect(textComponent).toBeTruthy();
})

it('ValidateCodeScreen: Send button enabled when pinCode is length = 6', () => {
	const { getByPlaceholderText, getByTestId } =  render(<ValidateCodeScreen route={{ params: {
		phoneNumber: "87654321"
	} }}/>);

	const pinCodeInput = getByPlaceholderText("Enter Pin Code");
	const submitBtn = getByTestId("send-btn");

	expect(submitBtn.props.accessibilityState.disabled).toBe(true);

	fireEvent.changeText(pinCodeInput, "123456");

	expect(submitBtn.props.accessibilityState.disabled).toBe(false);
});

it('ConfirmLoginScreen: Check if user id is rendered properly', () => {
	const testStore = mockStore({});
	const { queryByText, getByTestId } = render(
		<StoreProvider store={testStore}>
			<ConfirmLoginScreen route={{
				params: {
					phoneNumber: "+6587654321"
				}
			}} />
		</StoreProvider>
	)

	const textComponent = queryByText(/6587654321/);
	expect(textComponent).toBeTruthy();
});