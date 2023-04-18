import React, {useState, useContext} from 'react';
import UserContext from '../../context/UserContext';
import {SafeAreaView, View, Alert, Text, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const Identity = () => {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('error.enterName')),
    surname: Yup.string().required(t('error.enterSurname')),
    birthDate: Yup.string()
      .required(t('error.enterDate'))
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/,
        t('error.invalidDate'),
      ),
    identityNumber: Yup.string()
      .required(t('error.enterIdentityNo'))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t('error.invalidId'))
      .min(11, t('error.minIdentity'))
      .max(11, t('error.minIdentity')),
  });

  const initialValues = {
    name: '',
    surname: '',
    birthDate: '',
    identityNumber: '',
  };

  const handleFormSubmit = async values => {
    setIsLoading(true);
    try {
      const key = `${values.identityNumber}_userAccount`;
      const userAccount = await AsyncStorage.getItem(key);
      if (userAccount) {
        showMessage({
          message: t('error.userExist'),
          type: 'danger',
          backgroundColor: colors.primary,
        });
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(values));
        await setUser({...user, ...values});
        navigation.navigate('PhotoScreen');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
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
            <Text style={[styles.title, {color: theme.primary}]}>
              {t('title.enterYourCredentials')}
            </Text>
            <Input
              placeholder={t('input.name')}
              iconName="account"
              onType={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error_message}>{errors.name}</Text>
            )}
            <Input
              placeholder={t('input.surname')}
              iconName="account-multiple"
              onType={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
            />
            {touched.surname && errors.surname && (
              <Text style={styles.error_message}>{errors.surname}</Text>
            )}
            <Input
              placeholder={t('input.date')}
              label="Doğum tarihi"
              iconName="calendar-range"
              onType={handleChange('birthDate')}
              onBlur={handleBlur('birthDate')}
              value={values.birthDate}
            />
            {touched.birthDate && errors.birthDate && (
              <Text style={styles.error_message}>{errors.birthDate}</Text>
            )}
            <Input
              placeholder={t('input.identityNo')}
              label="Kimlik Numarası"
              iconName="card-account-details"
              onType={handleChange('identityNumber')}
              value={values.identityNumber}
              onBlur={handleBlur('identityNumber')}
            />
            {touched.identityNumber && errors.identityNumber && (
              <Text style={styles.error_message}>{errors.identityNumber}</Text>
            )}
            <View style={styles.button_container}>
              <Button
                text
                onPress={() => navigation.goBack()}
                title={t('button.alreadyHaveAccount')}
                loading={isLoading}
              />
              <Button
                contained
                onPress={handleSubmit}
                title={t('button.next')}
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
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 15,
    padding: 10,
  },
  error_message: {
    fontSize: 12,
    color: 'red',
    marginLeft: 30,
    padding: 0.5,
  },
});

export default Identity;
