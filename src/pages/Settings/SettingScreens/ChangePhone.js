import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import {formatPhoneNumber} from '../../../utils/formatPhoneNumber';

const Password = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useContext(ThemeContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const initialValues = {
    phone: '',
  };

  const navigation = useNavigation();

  const updatePhoneNumber = async phone => {
    setIsLoading(true);
    const identityNumber = await AsyncStorage.getItem('currentUser');
    const userAccount = await AsyncStorage.getItem(
      `${identityNumber}_userAccount`,
    );
    const parsedUserAccount = JSON.parse(userAccount);
    parsedUserAccount.phone = phone;

    await AsyncStorage.setItem(
      `${identityNumber}_userAccount`,
      JSON.stringify(parsedUserAccount),
    );
    setIsLoading(false);
    navigation.navigate('Setting');
  };
  const handleFormSubmit = async () => {
    console.log(phone);
    updatePhoneNumber(phone);
  };

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
        validate={validate}
        onSubmit={handleFormSubmit}>
        {({handleBlur, handleSubmit, errors}) => (
          <>
            <Text style={[styles.title, {color: theme.primary}]}>
              {t('settings.setNewPhoneNumber')}
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
            <View style={styles.button_container}>
              <Button
                contained
                onPress={handleSubmit}
                title={t('button.complete')}
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
