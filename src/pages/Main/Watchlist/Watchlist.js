import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import Button from '../../../components/Button';
import UserContext from '../../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Watchlist = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } else {
          console.log('AsyncStorage boş');
        }
      } catch (e) {
        console.log('Hata oluştu: ', e);
      }
    };
    const getBankData = async () => {
      try {
        const BankData = await AsyncStorage.getItem('bank');
        if (BankData !== null) {
          const parsedBankData = JSON.parse(BankData);
          setBank(parsedBankData);
        } else {
          console.log('AsyncStorage boş');
        }
      } catch (e) {
        console.log('Hata oluştu: ', e);
      }
    };
    getUserData();
    getBankData();
    return () => { //Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
      // Temizleme işlevi içinde asenkron işlevleri veya abonelikleri iptal etmek için kullanılır.
      abortController.abort();
    };
  }, [bank]);

  return(
      <SafeAreaView style={{flex:1,backgroundColor:"white"}}>            
          <Text>Watchlist</Text>
          <Button title="Yeni hesap oluştur"  onPress={()=> navigation.navigate('BankAccountTypeScreen')} />   
          <Button title="History"   onPress={()=> navigation.navigate('HistoryScreen')} />  
          <Text>name: {user.name}</Text>
          <Text>surname: {user.surname}</Text>
          <Text>birthDate: {user.birthDate}</Text>
          <Text>identityNumber: {user.identityNumber}</Text>
          <Text>photo: {user.photo}</Text>
          <Text>phone: {user.phone}</Text>
          <Text>password: {user.password}</Text>
          <Text>confirmPassword: {user.confirmPassword}</Text> 
          <Text>bankType: {bank.bankType}</Text> 
          <Text>currencyType: {bank.currencyType}</Text> 
          <Text>branchName: {bank.branchName}</Text> 
          <Text>accountNo: {bank.accountNo}</Text> 
          <Text>iban: {bank.iban}</Text> 
      </SafeAreaView>
  )
}

export default Watchlist;