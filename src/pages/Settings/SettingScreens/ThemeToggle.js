import React, {useContext} from 'react';
import {Pressable, View, Text} from 'react-native';
import {ThemeContext} from '../../../context/ThemeContext';
import styles from '../Settings.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ToggleButton = () => {
  const {theme, toggleAppTheme} = useContext(ThemeContext);

  return (
    <Pressable onPress={toggleAppTheme}>
      <View
        style={[styles.bottom_container, {backgroundColor: theme.itemColor}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          Change theme
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
