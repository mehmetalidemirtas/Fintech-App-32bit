import React, {useState, useContext, useEffect} from 'react';
import { SafeAreaView,View,Text, Image } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Settings.style';
import LanguageButton from "../../locales/LanguageButton";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);
    const [user, setUser] = useState([]);

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
      getUserData();
      return () => {
      };
    }, []);
    return (    
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>           
            <Text>{t('settings')}</Text>  
            <Image style={styles.image} source={{uri: user.photo}} />
            <Text>name: {user.name}</Text>
      <Text>surname: {user.surname}</Text>
      <Text>birthDate: {user.birthDate}</Text>
      <Text>identityNumber: {user.identityNumber}</Text>
      <Text>phone: {user.phone}</Text>
      <Text>password: {user.password}</Text>

          <LanguageButton />
                
        </SafeAreaView>
    )
}

export default Settings;