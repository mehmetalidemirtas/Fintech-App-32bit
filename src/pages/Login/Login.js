import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Login.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../styles/colors';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import {Vibration} from 'react-native';
import {showFlashMessage} from '../../utils/flashMessage';
import {loginValidationSchema} from '../../utils/validationSchema';

const Login = ({navigation, handleLogin}) => {
  const {t} = useTranslation();

  const initialValues = {
    identityNumber: '',
    password: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useContext(ThemeContext);

  const checkIsLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      console.log('Kullanıcı daha önce giriş yapmış, ana sayfaya yönlendir');
      //navigation.navigate('MainTabs');
    }
  };

  useEffect(() => {
    checkIsLoggedIn();

    return () => {
      setIsLoading(false); // isLoading durumunu temizle
    };
  }, []);

  const handleFormSubmit = async values => {
    setIsLoading(true);

    try {
      const userAccountKey = `${values.identityNumber}_userAccount`;
      console.log('userAccountKey: ' + userAccountKey);

      const isUserAccountExists = await AsyncStorage.getItem(userAccountKey);

      if (isUserAccountExists) {
        console.log('kullanıcı bulundu');
        const userAccount = JSON.parse(isUserAccountExists);
        if (userAccount.password === values.password) {
          console.log('şifre doğru, giriş başarılı');
          await handleLogin();
          AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('currentUser', values.identityNumber);
          //navigation.navigate('MainTabs');
        } else {
          console.log('şifre yanlış');
          showFlashMessage(t('error.wrongPassword'));
          Vibration.vibrate(500);
        }
      } else {
        console.log('kullanıcı kayıtlı değil');
        showFlashMessage(t('error.wrongIdentity'));
        Vibration.vibrate(500);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require('../../assets/login-logo.png')}
        />
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema(t)}
        onSubmit={handleFormSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.body_container}>
              <Input
                placeholder={t('input.identityNo')}
                iconName="account"
                onType={handleChange('identityNumber')}
                onBlur={handleBlur('identityNumber')}
                value={values.identityNumber}
                maxLengthValue={11}
                keyboardType="numeric"
                loading={isLoading}
              />
              {touched.identityNumber && errors.identityNumber && (
                <Text style={styles.error_message}>
                  {errors.identityNumber}
                </Text>
              )}
              <Input
                placeholder={t('input.password')}
                iconName="lock"
                onType={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword
                loading={isLoading}
              />
              {touched.password && errors.password && (
                <Text style={styles.error_message}>{errors.password}</Text>
              )}
              <View style={styles.forgot_pw_container}>
                <Button title={''} border={0} onPress={() => null} />
              </View>
            </View>

            <View style={{marginBottom: 70}}>
              <Button
                contained
                marginRight={25}
                marginLeft={25}
                title={t('login.buttonTitle')}
                onPress={handleSubmit}
                loading={isLoading}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  title={t('login.dontHaveAccount')}
                  marginRight={25}
                  marginLeft={25}
                  border={0}
                  onPress={() => navigation.navigate('IdentityScreen')}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
