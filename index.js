/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';

const RNRedux = ({ isHeadless }) => {
	if (isHeadless) return null;

	return (
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	)

}

AppRegistry.registerComponent(appName, () => RNRedux);
