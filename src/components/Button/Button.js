import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator  } from 'react-native';
import styles from './Button.style';

const CustomButton = ({ onPress, style, textStyle, contained,marginLeft,marginRight, title, border, loading }) => {
  const buttonStyle = contained ? styles.buttonContained : styles.buttonText;
  const buttonTextStyle = contained ? styles.containedButtonText : styles.textButtonText;
  const localStyles = StyleSheet.create({
    button: {
      borderWidth: border,
      marginLeft: marginLeft,
      marginRight: marginRight,
    },
  });

  return (
    <TouchableOpacity style={[buttonStyle,localStyles.button, style]} onPress={onPress} disabled={loading}>
      {
            loading ?
               ( <ActivityIndicator color="white" />)
      : (<Text style={[buttonTextStyle, textStyle]}>{title}</Text>)
    }

    </TouchableOpacity>
  );
};

export default CustomButton;