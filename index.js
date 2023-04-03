/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Wrapper from './src/Wrapper';
import {name as appName} from './app.json';
import i18n from './src/locales/i18n';

AppRegistry.registerComponent(appName, () => Wrapper);
