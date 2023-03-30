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

const validationSchema = Yup.object().
shape({
    phone: Yup.string()
        .matches(/^(\+90|90)?([0-9]{10})$/, 'Telefon numaranız +905xxxxxxxxx olmalıdır')
        .required('Lütfen telefon numaranızı giriniz'),
    password: Yup.string()
        .min(8, 'Şifreniz en az 8 karakter olmalıdır')
        .required('Lütfen şifrenizi giriniz'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifreler aynı değil')
        .required('Lütfen şifrenizi tekrar giriniz'),
});

const initialValues = {
    phone: '',
    password: '',
    confirmPassword: '',    
};

const Password = () => {

    const{user, setUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Kaydı tamamla');

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

        if (buttonText === "Kaydı tamamla") {
            // İlk kez tıklama durumu
            try {
                await setUser({...user, ...values});    //setUser() fonksiyonu asenkron bir fonksiyon değildir. Bu nedenle, await kullanarak setUser()'ın tamamlanmasını bekleyemiyoruz.        
                console.log(user);            
                //await saveUserToAsyncStorage(); 
            } catch (error) {
                console.log(error);
            }   
            setButtonText('Giriş sayfasına git');
        } else {
            // İkinci kez tıklama durumu
            await saveUserToAsyncStorage();             
          }
             
      };

    return(
        <SafeAreaView style={styles.container}> 
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >       
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>           
        <Text style={styles.title}>Şifre Belirle</Text>

            <View>
            <Input 
                placeholder="Telefon numaranızı giriniz..."
                iconName="phone"
                onType={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                
            />
            {touched.phone && errors.phone &&
              <Text style={styles.error_message}>{errors.phone}</Text>
            }
            <Input 
                placeholder="Yeni şifrenizi giriniz..."
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
                placeholder="Yeni şifrenizi tekrar giriniz..."
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
            <Button  onPress={() => navigation.goBack()} title="Önceki adım" loading={isLoading}/>
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
        backgroundColor:"#FFF",
        flex:1,
        justifyContent:"center",
    },
    title:{
        textAlign: 'center', 
        fontSize:25, 
        fontWeight:"bold", 
        padding:20, 
        color:colors.primary,
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