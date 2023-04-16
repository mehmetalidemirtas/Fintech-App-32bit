import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, View, Text, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './AllBankAccounts.syle';
const AllBankAccounts = ({navigation}) => {
  const [bank, setBank] = useState([]);
  const theme = useContext(ThemeContext);
  const abortController = new AbortController();

  const getBankData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
      const identityNo = await AsyncStorage.getItem('currentUser');
      const filterKey = `${identityNo}_bankAccount_`;
      const bankAccountKeys = keys.filter(key => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
      const bankAccounts = await Promise.all(
        bankAccountKeys.map(async key => {
          const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
          return JSON.parse(bankAccount);
        }),
      );
      setBank(bankAccounts);
    } catch (e) {
      console.error('Error loading bank accounts from async storage:', e);
    }
  };
  useEffect(() => {
    getBankData();
    return () => {};
  }, []);

  const renderItem = ({item}) => (
    <View style={{padding: 5, margin: 5}}>
      <Text>bankType: {item.bankType}</Text>
      <Text>currencyType: {item.currencyType}</Text>
      <Text>branchName: {item.branchName}</Text>
      <Text>accountNo: {item.accountNo}</Text>
      <Text>iban: {item.iban}</Text>
      <Text>Amount: {item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <FlatList data={bank} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default AllBankAccounts;
