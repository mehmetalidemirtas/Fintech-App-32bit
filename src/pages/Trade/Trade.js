import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import styles from './Trade.style';
import {ThemeContext} from '../../context/ThemeContext';

const Trade = props => {
  const theme = useContext(ThemeContext);
  const currencyName = props.route.params.currency;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text>Trade</Text>
      <Text>{currencyName}</Text>
    </SafeAreaView>
  );
};
export default Trade;
