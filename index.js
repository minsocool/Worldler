/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import setup from './setup';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
