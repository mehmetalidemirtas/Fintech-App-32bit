import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const Password = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(
    t('button.completeRegistration'),
  );
  const theme = useContext(ThemeContext);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^(\+90|90)?([0-9]{10})$/, t('error.phoneMustBe'))
      .required(t('error.enterPhone')),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const navigation = useNavigation();

  const updatePhoneNumber = async phone => {
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
    navigation.navigate('Setting');
  };
  const handleFormSubmit = async values => {
    updatePhoneNumber(values.phone);
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
              Yeni telefon numaranızı belirleyin
            </Text>

            <View>
              <Input
                placeholder={t('input.phone')}
                iconName="phone"
                onType={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error_message}>{errors.phone}</Text>
              )}
            </View>
            <View style={styles.button_container}>
              <Button
                contained
                onPress={handleSubmit}
                title="Tamamla"
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
