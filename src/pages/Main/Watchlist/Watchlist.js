import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import Button from '../../../components/Button';
import UserContext from '../../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Watchlist = ({navigation}) => {
  const [user, setUser] = useState([]);

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
    getUserData();
  }, []);

  return(
      <SafeAreaView>            
          <Text>Watchlist</Text>
          <Button title="New Account"  onPress={()=> navigation.navigate('NewAccount')} />   
          <Button title="History"   onPress={()=> navigation.navigate('HistoryScreen')} />  
          <Text>name: {user.name}</Text>
          <Text>surname: {user.surname}</Text>
          <Text>birthDate: {user.birthDate}</Text>
          <Text>identityNumber: {user.identityNumber}</Text>
          <Text>photo: {user.photo}</Text>
          <Text>phone: {user.phone}</Text>
          <Text>password: {user.password}</Text>
          <Text>confirmPassword: {user.confirmPassword}</Text> 
      </SafeAreaView>
  )
}

export default Watchlist;