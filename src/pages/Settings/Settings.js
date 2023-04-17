import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './Settings.style';
import LanguageButton from '../../locales/LanguageButton';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const {t} = useTranslation();
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
    return () => {};
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView>
        <View style={styles.image_container}>
          <Image style={styles.image} source={{uri: user.photo}} />
          <View style={styles.text_container}>
            <Text style={styles.name_text}>
              {user.name} {user.surname}
            </Text>
            <View style={styles.title_container}>
              <Text style={styles.title}>Date of birth:</Text>
              <Text style={styles.text}>{user.birthDate}</Text>
            </View>
            <View style={styles.title_container}>
              <Text style={styles.title}>Identity No:</Text>
              <Text style={styles.text}>{user.identityNumber}</Text>
            </View>
            <View style={styles.title_container}>
              <Text style={styles.title}>Phone No:</Text>
              <Text style={styles.text}>{user.phone}</Text>
            </View>
            <View style={styles.title_container}>
              <Text style={styles.title}>Password</Text>
              <Text style={styles.text}>{user.password}</Text>
            </View>
          </View>
        </View>
        <LanguageButton />
        <Pressable onPress={() => null}>
          <View style={styles.bottom_container}>
            <Text style={styles.title}>Change language</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
