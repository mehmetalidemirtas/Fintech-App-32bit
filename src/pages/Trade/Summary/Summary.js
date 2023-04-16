import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import styles from './Summary.style';
import {ThemeContext} from '../../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import TradeHistoryContext from '../../../context/TradeHistoryContext';

const saveTradeHistoryToStorage = async () => {
  console.log('trade history saved:: ' + tradeHistory);
  try {
    await AsyncStorage.setItem('tradeHistory', JSON.stringify(tradeHistory));
  } catch (error) {
    console.log(error);
  }
};
const Exchange = props => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const {tradeHistory, setTradeHistory} = useContext(TradeHistoryContext);
  useEffect(() => {
    //Bir önceki aşamada seçilen branchName bir sonraki render işleminde context'e kaydolacağı için useEffect kullandımm.
  }, [tradeHistory]);
  const handleSubmit =  () => {    
      navigation.navigate('WatchlistScreen');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View>        
        <View style={styles.bottom_container}>
        <Text style={[styles.title, {color: theme.primary}]}>İŞLEMİNİZ BAŞARIYLA GERÇEKLEŞTİRİLMİŞTİR</Text>
        <Text style={[styles.text, {color: theme.textColor}]}>Yeni hesap bakiyeniz: {tradeHistory.outputValue}</Text>
        </View>
        <View style={styles.button}>
        <Button
          contained
          buttonColor="#7286D3"
          textColor="white"
          onPress={handleSubmit}
          title="Ana sayfaya git"
        />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Exchange;
