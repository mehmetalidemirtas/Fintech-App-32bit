import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import styles from './Input.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

const Input = ({placeholder,value,onType, iconName, isPassword}) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
  
    return (
      
      <View style={styles.container}>
        <View style={[styles.textInputContainer, isFocused && styles.focusedTextInputContainer]}>
            <View style={styles.bottom_container}>
            <Icon name={iconName} size={25} color={isFocused ? colors.primary : '#ccc'} />
            <TextInput style={styles.textInput}
            placeholder={placeholder}
            onFocus={handleFocus}
            value={value}
            onChangeText={onType}
            secureTextEntry={isPassword}
            onBlur={handleBlur}  />
            </View>          
        </View>        
      </View>
      
  
      
    );
}

export default Input;