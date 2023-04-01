import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import { ThemeContext } from '../../context/ThemeContext';

function Splash(){
  const theme = useContext(ThemeContext);

    return (
      <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>           
        <Lottie style={styles.animation} source={require('../../assets/fintech_splash.json')} autoPlay loop />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    animation: {
      width: 250,
      height: 250,
    },
  });

export default Splash;