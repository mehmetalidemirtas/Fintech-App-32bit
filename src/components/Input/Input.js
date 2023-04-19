import React, {useState, useContext} from 'react';
import {View, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import styles from './Input.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import {ThemeContext} from '../../context/ThemeContext';

const Input = ({
  placeholder,
  value,
  onType,
  iconName,
  isPassword,
  editable,
  loading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {theme} = useContext(ThemeContext);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.textInputContainer,
          isFocused && [
            styles.focusedTextInputContainer,
            {borderColor: theme.primary},
          ],
        ]}>
        <View style={styles.bottom_container}>
          <Icon
            name={iconName}
            size={25}
            color={isFocused ? theme.primary : '#ccc'}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            onFocus={handleFocus}
            value={value}
            selectable={!loading}
            editable={!editable}
            onChangeText={onType}
            secureTextEntry={isPassword}
            onBlur={handleBlur}
          />
        </View>
      </View>
    </View>
  );
};

export default Input;
