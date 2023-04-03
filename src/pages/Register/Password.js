import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';


const Password = () => {
  const { t } = useTranslation();
  const{user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(t('button.completeRegistration'));
  const theme = useContext(ThemeContext);
  
  const validationSchema = Yup.object().
  shape({
      phone: Yup.string()
          .matches(/^(\+90|90)?([0-9]{10})$/, t('error.phoneMustBe'))
          .required(t('error.enterPhone')),
      password: Yup.string()
        .min(8, t('error.minPassword'))
        .required(t('error.enterPassword')), 
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], t('error.passwordsNotSame'))
          .required(t('error.enterConfirmPassword')),
  });
  
  const initialValues = {
      phone: '',
      password: '',
      confirmPassword: '',    
  };
  
    const navigation = useNavigation();

    const saveUserToAsyncStorage = async () => {
      setIsLoading(true);
        const {name, surname, birthDate,identityNumber, photo,phone, password, confirmPassword} = user;
      const data = {
        name,
        surname,
        birthDate,
        identityNumber,
        photo,
        phone, 
        password, 
        confirmPassword
      };

        try {
          const key = `${identityNumber}_userAccount`; // Her bir kullanıcı hesabı için ayrı bir anahtar oluşturun
          console.log("key: " + key);
          console.log(data);
          await AsyncStorage.setItem(key, JSON.stringify(data));
          //await AsyncStorage.setItem('isLoggedIn', 'false');
          console.log('User data saved to async storage.');  
          setIsLoading(false);
          navigation.navigate('LoginScreen');
        } catch (error) {
          console.log('Error saving user data to async storage: ', error);
          setIsLoading(false);
        }        
      }
      
    const handleFormSubmit = async (values) => {

        if (buttonText === t('button.completeRegistration')) {
            // İlk kez tıklama durumu
            try {
                await setUser({...user, ...values});    //setUser() fonksiyonu asenkron bir fonksiyon değildir. Bu nedenle, await kullanarak setUser()'ın tamamlanmasını bekleyemiyoruz.        
                console.log(user);            
                //await saveUserToAsyncStorage(); 
            } catch (error) {
                console.log(error);
            }   
            setButtonText(t('button.goToSignUp'));
        } else {
            // İkinci kez tıklama durumu
            await saveUserToAsyncStorage();             
          }
             
      };

    return(
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >       
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>           
        <Text style={[styles.title,{color: theme.primary}]}>{t('title.setPassword')}</Text>

            <View>
            <Input 
                placeholder={t('input.phone')}
                iconName="phone"
                onType={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                
            />
            {touched.phone && errors.phone &&
              <Text style={styles.error_message}>{errors.phone}</Text>
            }
            <Input 
                placeholder={t('input.password')}
                iconName="lock"
                onType={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword
            />
            {touched.password && errors.password &&
              <Text style={styles.error_message}>{errors.password}</Text>
            }
            <Input 
                placeholder={t('input.confirmPassword')}
                iconName="lock-check"
                onType={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                isPassword
            />
            {touched.confirmPassword && errors.confirmPassword &&
              <Text style={styles.error_message}>{errors.confirmPassword}</Text>
            }
            </View>
            <View style={styles.button_container}>
            <Button  onPress={() => navigation.goBack()} title={t('button.previous')} loading={isLoading}/>
            <Button contained onPress={handleSubmit} title={buttonText} loading={isLoading}/>
            </View>
            </>
            )}
            </Formik>                       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
    },
    title:{
        textAlign: 'center', 
        fontSize:25, 
        fontWeight:"bold", 
        padding:20, 
    },
    button_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
    },
    error_message:{
        fontSize: 12, 
        color: 'red',
        marginLeft:30,
        padding:1,
    }
})

export default Password;