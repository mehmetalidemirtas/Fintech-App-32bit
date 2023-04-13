import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import styles from './Summary.style';
import {ThemeContext} from '../../../context/ThemeContext';

const Exchange = props => {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text>Trade</Text>
      <Text></Text>
    </SafeAreaView>
  );
};
export default Exchange;
