import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

function Splash(){
    return (
        <View style={styles.container}>
        <Lottie style={styles.animation} source={require('../../assets/fintech_splash.json')} autoPlay loop />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    animation: {
      width: 250,
      height: 250,
    },
  });

export default Splash;