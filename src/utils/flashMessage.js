import {showMessage} from 'react-native-flash-message';
import colors from '../styles/colors';

export const showFlashMessage = message => {
  showMessage({
    message: message,
    type: 'danger',
    backgroundColor: colors.primary,
  });
};
