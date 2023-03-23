import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

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
    const navigation = useNavigation();

    const handleFormSubmit = async (values) => {
        try {
            await setUser({...user, ...values});
            console.log(user);
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.log(error);
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
            <Button  onPress={() => navigation.goBack()} title="Önceki adım"/>
            <Button contained onPress={handleSubmit} title="Kaydı tamamla"/>
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
