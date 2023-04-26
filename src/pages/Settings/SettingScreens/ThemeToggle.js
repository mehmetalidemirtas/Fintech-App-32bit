import React, {useContext} from 'react';
import {Pressable, View, Text} from 'react-native';
import {ThemeContext} from '../../../context/ThemeContext';
import styles from '../Settings.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

const ToggleButton = () => {
  const {theme, toggleAppTheme} = useContext(ThemeContext);
  const {t} = useTranslation();

  return (
    <Pressable onPress={toggleAppTheme}>
      <View
        style={[styles.bottom_container, {backgroundColor: theme.itemColor}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t('settings.changeTheme')}
        </Text>
        <Icon
          name="theme-light-dark"
          size={20}
          style={{marginRight: 5}}
          color={theme.iconColor}
        />
      </View>
    </Pressable>
  );
};
export default ToggleButton;
