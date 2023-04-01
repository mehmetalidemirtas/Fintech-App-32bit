import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import styles from './Trade.style';
import { ThemeContext } from '../../../context/ThemeContext';

const Trade = () => {    
  const theme = useContext(ThemeContext);

  return (    
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>            
    <Text>Trade</Text>
    </SafeAreaView>        
  );
}
export default Trade;