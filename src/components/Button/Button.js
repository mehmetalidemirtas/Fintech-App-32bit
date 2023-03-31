import React, {useContext} from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator  } from 'react-native';
import styles from './Button.style';
import { ThemeContext } from '../../context/ThemeContext';

const CustomButton = ({ onPress, style, textStyle, contained,marginLeft,marginRight, title, border, loading }) => {
  const theme = useContext(ThemeContext);
  console.log(theme);
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
    <TouchableOpacity style={[buttonStyle,localStyles.button, style, {backgroundColor: theme.backgroundColor}]} onPress={onPress} disabled={loading}>
      {
            loading ?
               ( <ActivityIndicator color="white" />)
      : (<Text style={[buttonTextStyle, textStyle, { color: theme.textColor }]}>{title}</Text>)
    }

    </TouchableOpacity>
  );
};

export default CustomButton;