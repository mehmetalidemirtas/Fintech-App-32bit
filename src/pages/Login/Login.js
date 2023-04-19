import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Login.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import colors from '../../styles/colors';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import {Vibration} from 'react-native';

const Login = ({navigation, handleLogin}) => {
  const {t} = useTranslation();

  const validationSchema = Yup.object().shape({
    identityNumber: Yup.string()
      .required(t('error.enterIdentityNo'))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t('error.invalidId'))
      .min(11, t('error.minIdentity'))
      .max(11, t('error.minIdentity')),
    password: Yup.string()
      .min(8, t('error.minPassword'))
      .required(t('error.enterPassword')),
  });

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
          showMessage({
            message: t('error.wrongPassword'),
            type: 'danger',
            backgroundColor: colors.primary,
          });
          Vibration.vibrate(500);
        }
      } else {
        console.log('kullanıcı kayıtlı değil');
        showMessage({
          message: t('error.wrongIdentity'),
          type: 'danger',
          backgroundColor: colors.primary,
        });
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
        validationSchema={validationSchema}
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
                <Button
                  title={t('login.forgotPassword')}
                  border={0}
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}
                />
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
