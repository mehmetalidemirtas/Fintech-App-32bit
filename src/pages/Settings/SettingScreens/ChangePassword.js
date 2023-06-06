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
import {passwordValidationSchema} from '../../../utils/validationSchema';

const Password = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const uptadePassword = async newPassword => {
    setIsLoading(true);
    const identityNumber = await AsyncStorage.getItem('currentUser');
    const userAccount = await AsyncStorage.getItem(
      `${identityNumber}_userAccount`,
    );
    const parsedUserAccount = JSON.parse(userAccount);
    parsedUserAccount.password = newPassword;

    await AsyncStorage.setItem(
      `${identityNumber}_userAccount`,
      JSON.stringify(parsedUserAccount),
    );
    setIsLoading(false);
    navigation.navigate('Setting');
  };
  const handleFormSubmit = async values => {
    uptadePassword(values.password);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidationSchema(t)}
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
              {t('settings.setNewPassword')}
            </Text>

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
