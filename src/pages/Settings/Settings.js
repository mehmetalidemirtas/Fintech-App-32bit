import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './Settings.style';
import LanguageButton from '../../locales/LanguageButton';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemeToggle from './SettingScreens/ThemeToggle';

const Settings = () => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    try {
      const identityNo = await AsyncStorage.getItem('currentUser');
      const key = `${identityNo}_userAccount`;
      const userData = await AsyncStorage.getItem(key);
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }
    } catch (e) {
      console.log('Hata oluştu: ', e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation, user]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView>
        {loading ? (
          <View
            style={{
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 50,
            }}>
            <ActivityIndicator color="black" size="large" />
            <Text style={{marginTop: 10}}>{t('english')}</Text>
          </View>
        ) : (
          <>
            <View
              style={[
                styles.image_container,
                {backgroundColor: theme.itemColor},
              ]}>
              <Image style={styles.image} source={{uri: user.photo}} />
              <View style={styles.text_container}>
                <Text style={[styles.name_text, {color: theme.textColor}]}>
                  {user.name} {user.surname}
                </Text>
                <View style={styles.title_container}>
                  <Text style={[styles.title, {color: theme.textColor}]}>
                    {t('text.dateOfBirth')}
                  </Text>
                  <Text style={[styles.text, {color: theme.textColor}]}>
                    {user.birthDate}
                  </Text>
                </View>
                <View style={styles.title_container}>
                  <Text style={[styles.title, {color: theme.textColor}]}>
                    {t('text.identityNo')}
                  </Text>
                  <Text style={[styles.text, {color: theme.textColor}]}>
                    {user.identityNumber}
                  </Text>
                </View>
                <View style={styles.title_container}>
                  <Text style={[styles.title, {color: theme.textColor}]}>
                    {t('text.phoneNo')}
                  </Text>
                  <Text style={[styles.text, {color: theme.textColor}]}>
                    {user.phone}
                  </Text>
                </View>
                <View style={styles.title_container}>
                  <Text style={[styles.title, {color: theme.textColor}]}>
                    {t('text.password')}
                  </Text>
                  <Text style={[styles.text, {color: theme.textColor}]}>
                    {user.password}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        <LanguageButton />
        <ThemeToggle />
        <Pressable onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <View
            style={[
              styles.bottom_container,
              {backgroundColor: theme.itemColor},
            ]}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('settings.changePassword')}
            </Text>
            <Icon name="chevron-right" size={30} color={theme.iconColor} />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChangePhoneScreen')}>
          <View
            style={[
              styles.bottom_container,
              {backgroundColor: theme.itemColor},
            ]}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('settings.changePhoneNumber')}
            </Text>
            <Icon name="chevron-right" size={30} color={theme.iconColor} />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChangePhotoScreen')}>
          <View
            style={[
              styles.bottom_container,
              {backgroundColor: theme.itemColor},
            ]}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('settings.changeProfilePhoto')}
            </Text>
            <Icon name="chevron-right" size={30} color={theme.iconColor} />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
