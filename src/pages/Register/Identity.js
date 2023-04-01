import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { ThemeContext } from '../../context/ThemeContext';


const validationSchema = Yup.object().
shape({
    name: Yup.string()
        .required('Lütfen adınızı giriniz'),
    surname: Yup.string()
        .required('Lütfen soyadınızı giriniz'),
    birthDate: Yup.string()
    .required('Lütfen doğum tarihinizi giriniz')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/, 'Tarih formatı dd/mm/yyyy olmalıdır.'),          
    identityNumber: Yup.string()
        .required('Lütfen T.C. kimlik numaranızı giriniz')
        .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, 'TC Kimlik Numarası geçersiz')
        .min(11,"Tc Kimlik numarası 11 haneli olmalıdır")
        .max(11,"Tc Kimlik numarası 11 haneli olmalıdır"),
});

const initialValues = {
    name: '',
    surname: '',
    birthDate: '',
    identityNumber: '',
};

const Identity = () => {

    const{user, setUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        try {
            await setUser({...user, ...values});
            console.log(user);
            navigation.navigate('PhotoScreen');
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
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
            <Text style={[styles.title,{color: theme.primary}]}>Kimlik Bigileri</Text>
            <Input 
                placeholder="İsminizi giriniz..."
                iconName="account"
                onType={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
            />
            {touched.name && errors.name &&
              <Text style={styles.error_message}>{errors.name}</Text>
            }
            <Input 
                placeholder="Soyisminizi giriniz..."
                iconName="account-multiple"
                onType={handleChange('surname')}
                onBlur={handleBlur('surname')}
                value={values.surname}
            />
            {touched.surname && errors.surname &&
              <Text style={styles.error_message}>{errors.surname}</Text>
            }
            <Input 
                placeholder="Doğum tarihinizi giriniz..."
                label="Doğum tarihi"  
                iconName="calendar-range"   
                onType={handleChange('birthDate')}
                onBlur={handleBlur('birthDate')}
                value={values.birthDate}       
            />
            {touched.birthDate && errors.birthDate &&
              <Text style={styles.error_message}>{errors.birthDate}</Text>
            }
            <Input 
                placeholder="Kimlik numaranızı giriniz..."
                label="Kimlik Numarası"
                iconName="card-account-details"
                onType={handleChange('identityNumber')}
                value={values.identityNumber}
                onBlur={handleBlur('identityNumber')}
            />    
            {touched.identityNumber && errors.identityNumber &&
              <Text style={styles.error_message}>{errors.identityNumber}</Text>
            }       
            <View style={styles.button_container}>
            <Button  text  onPress={() => navigation.goBack()} title="Zaten hesabınız var mı?" loading={isLoading}/>         
            <Button contained onPress={handleSubmit} title="Sonraki adım" loading={isLoading}/> 
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
        justifyContent:"space-between",
        marginLeft:10,
        marginRight:15,
        padding:10,
    },
    error_message:{
        fontSize: 12, 
        color: 'red',
        marginLeft:30,
        padding:0.5,
    }
})

export default Identity;