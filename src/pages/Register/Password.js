import React, {useState, useContext} from 'react';
import UserContext from '../../context/UserContext';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import {passwordValidationSchema} from '../../utils/validationSchema';
import {formatPhoneNumber} from '../../utils/formatPhoneNumber';
const Password = () => {
  const {t} = useTranslation();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(
    t('button.completeRegistration'),
  );
  const {theme} = useContext(ThemeContext);

  const initialValues = {
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const navigation = useNavigation();

  const saveUserToAsyncStorage = async () => {
    setIsLoading(true);
    const {
      name,
      surname,
      birthDate,
      identityNumber,
      photo,
      phone,
      password,
      confirmPassword,
    } = user;
    const data = {
      name,
      surname,
      birthDate,
      identityNumber,
      photo,
      phone,
      password,
      confirmPassword,
    };

    try {
      const key = `${identityNumber}_userAccount`;
      console.log('key: ' + key);
      console.log(data);
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('User data saved to async storage.');
      setIsLoading(false);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error saving user data to async storage: ', error);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async values => {
    if (buttonText === t('button.completeRegistration')) {
      try {
        await setUser({...user, ...values, phone: phone});
        console.log(user);
      } catch (error) {
        console.log(error);
      }
      setButtonText(t('button.goToSignUp'));
    } else {
      await saveUserToAsyncStorage();
    }
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleTextChange = phoneInput => {
    const {showAlert, phoneNumber, phone} = formatPhoneNumber(phoneInput);
    setShowAlert(showAlert);
    setPhoneNumber(phoneNumber);
    setPhone(phone);
  };

  const validate = () => {
    const errors = {};
    if (phoneNumber == '') {
      errors.phoneNumber = t('error.enterPhone');
    }
    if (phoneNumber.length < 10) {
      errors.phoneNumberLength = t('error.phoneNumberLength');
    }
    return errors;
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidationSchema(t)}
        validate={validate}
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
            <Text style={[styles.title, {color: theme.primary}]}>
              {t('title.setPassword')}
            </Text>
            <View>
              <Input
                iconName="phone"
                value={phoneNumber}
                onType={handleTextChange}
                maxLengthValue={14}
                keyboardType="numeric"
                placeholder={t('input.phone')}
                onBlur={handleBlur('phone')}
              />
              {errors.phoneNumber && (
                <Text style={styles.error_message}>{errors.phoneNumber}</Text>
              )}
              {errors.phoneNumberLength && (
                <Text style={styles.error_message}>
                  {errors.phoneNumberLength}
                </Text>
              )}
              {showAlert && (
                <Text style={styles.error_message}>
                  {t('error.numberFormat')}
                </Text>
              )}
            </View>
            <View>
              <Input
                placeholder={t('input.password')}
                iconName="lock"
                onType={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword
              />
              {touched.password && errors.password && (
                <Text style={styles.error_message}>{errors.password}</Text>
              )}
              <Input
                placeholder={t('input.confirmPassword')}
                iconName="lock-check"
                onType={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                isPassword
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error_message}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
            <View style={styles.button_container}>
              <Button
                onPress={() => navigation.goBack()}
                title={t('button.previous')}
                loading={isLoading}
              />
              <Button
                contained
                onPress={handleSubmit}
                title={buttonText}
                loading={isLoading}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  error_message: {
    fontSize: 12,
    color: 'red',
    marginLeft: 30,
    padding: 1,
  },
});

export default Password;
