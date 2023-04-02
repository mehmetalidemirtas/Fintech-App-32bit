import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView,View,Text,FlatList, Image } from 'react-native';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import styles from './Watchlist.style';
const Watchlist = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState([]);
  const theme = useContext(ThemeContext);
  const abortController = new AbortController();

  /*****************************************
   * // Bütün verileri sil
    AsyncStorage.clear().then(() => {
    console.log('Tüm veriler silindi');
    }).catch(error => {
    console.log(error);
    });  
   *****************************************/
  useEffect(() => {
    const getUserData = async () => {
      try {
        const identityNo = await AsyncStorage.getItem('currentUser');
        const key = `${identityNo}_userAccount`; 
        const userData = await AsyncStorage.getItem(key);
        if (userData !== null) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } else {
        }
      } catch (e) {
        console.log('Hata oluştu: ', e);
      }
    };
    const getBankData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
        const identityNo = await AsyncStorage.getItem('currentUser');
        const filterKey = `${identityNo}_bankAccount_`; 
        const bankAccountKeys = keys.filter((key) => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
        const bankAccounts = await Promise.all(bankAccountKeys.map(async (key) => {
          const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
          return JSON.parse(bankAccount);
        }));
        setBank(bankAccounts);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };
    getUserData();
    getBankData();  
    return () => { //Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
      // Temizleme işlevi içinde asenkron işlevleri veya abonelikleri iptal etmek için kullanılır.
      abortController.abort();
    };
  }, [bank]);

const getIdentity=()=>{
AsyncStorage.getItem('currentUser').then(userData => {
  const user = JSON.parse(userData);  
  //setIdentityNo(user.identityNumber);
}).catch(error => {
  console.log(error);
});
}

  const renderItem = ({ item }) => (
    <View style={{padding:5, margin:5}}>
      <Text>bankType: {item.bankType}</Text>
      <Text>currencyType: {item.currencyType}</Text>
      <Text>branchName: {item.branchName}</Text>
      <Text>accountNo: {item.accountNo}</Text>
      <Text>iban: {item.iban}</Text>
    </View>
  );

  return(
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>            
          <Text>Watchlist</Text>
          <Button title="Yeni hesap oluştur"  onPress={()=> navigation.navigate('BankAccountTypeScreen')} />   
          <Button title="History"   onPress={()=> navigation.navigate('HistoryScreen')} />  
          <Text>name: {user.name}</Text>
          <Text>surname: {user.surname}</Text>
          <Text>birthDate: {user.birthDate}</Text>
          <Text>identityNumber: {user.identityNumber}</Text>
          <Text>photo: {user.photo}</Text>
          <Image style={styles.image} source={{uri: user.photo}} />
          <Text>phone: {user.phone}</Text>
          <Text>password: {user.password}</Text>
          <Text>confirmPassword: {user.confirmPassword}</Text> 
          <FlatList
      data={bank}
      renderItem={renderItem}
    />
      </SafeAreaView>
  )
}

export default Watchlist;