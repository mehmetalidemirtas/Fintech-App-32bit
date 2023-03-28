import React, {useEffect,useCallback } from 'react';
import { SafeAreaView,View,Text,Image } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Login.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import colors from '../../styles/colors';

const validationSchema = Yup.object().
shape({
    identityNumber: Yup.string()
        .required('Lütfen T.C. kimlik numaranızı giriniz')
        .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, 'TC Kimlik Numarası geçersiz')
        .min(11,"Tc Kimlik numarası 11 haneli olmalıdır")
        .max(11,"Tc Kimlik numarası 11 haneli olmalıdır"),
    password: Yup.string()
        .min(8, 'Şifreniz en az 8 karakter olmalıdır')
        .required('Lütfen şifrenizi giriniz'), 
});

const initialValues = {
    identityNumber: '',
    password: '',
};

const Login = ({navigation}) => {
      //Bu işlem belki splash ekranında yapılabilir????
      const checkIsLoggedIn = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
           console.log("Kullanıcı daha önce giriş yapmış, ana sayfaya yönlendir")
          navigation.navigate('MainTabs');
        }
      };
      
      useEffect(() => {
        checkIsLoggedIn();
      }, []);

    const handleFormSubmit = async (values) => {
        try {
            console.log("id: " + values.identityNumber)
            console.log("pw: " + values.password)
            const userAccountKey = `${values.identityNumber}_userAccount`;
            console.log("userAccountKey: " + userAccountKey)

            const isUserAccountExists = await AsyncStorage.getItem(userAccountKey);

            if (isUserAccountExists) {
                console.log("kullanıcı bulundu")
                // Kullanıcının hesabı kayıtlıdır, giriş işlemini gerçekleştirin
                const userAccount = JSON.parse(isUserAccountExists);
                if (userAccount.password === values.password) {
                    console.log("şifre doğru, giriş başarılı")
                    AsyncStorage.setItem('isLoggedIn', 'true')
                    await AsyncStorage.setItem('currentUser', values.identityNumber);;
                    navigation.navigate('MainTabs');
                } else {
                    console.log("şifre yanlış");
                    showMessage({
                      message: "Hatalı şifre girdiniz!",
                      type: "danger",
                      backgroundColor: colors.primary
                    });
                }
              } else {
                console.log("kullanıcı kayıtlı değil");
                showMessage({
                  message: "Kimlik numaranızı yanlış girdiniz!",
                  type: "danger",
                  backgroundColor: colors.primary
                });
              }
        } catch (error) {
            console.log(error);
        }
      };
    
    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.logo_container}>
            <Image style={styles.logo} source={require("../../assets/login-logo.png")} />
            </View>  
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            >   
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <> 
           <View style={styles.body_container}>
                <Input 
                    placeholder="Kimlik numaranızı giriniz..."
                    iconName="account"
                    onType={handleChange('identityNumber')}
                onBlur={handleBlur('identityNumber')}
                value={values.identityNumber}
                    />
                    {touched.identityNumber && errors.identityNumber &&
              <Text style={styles.error_message}>{errors.identityNumber}</Text>
                }                     
                 <Input 
                    placeholder="Şifrenizi giriniz..." 
                    iconName="lock"
                    onType={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    isPassword
                    />
                {touched.password && errors.password &&
              <Text style={styles.error_message}>{errors.password}</Text>
            }  
            <View style={styles.forgot_pw_container}>
                <Button title="Forgot password?" border={0} onPress={()=> navigation.navigate('ForgotPasswordScreen')}/>
            </View>
            </View>

            <View style={{marginBottom:70}}>
            <Button contained marginRight={25} marginLeft={25} title="Giriş Yap" onPress={handleSubmit} />
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>                
                    <Button  title="Dont you have an account? Sign up" marginRight={25} marginLeft={25} border={0} onPress={()=> navigation.navigate('IdentityScreen')} />                    
                </View>
            </View>
            </>
            )}
            </Formik>                                                         
        </SafeAreaView>                  
    )
}

export default Login;