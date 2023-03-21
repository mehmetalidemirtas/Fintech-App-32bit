import React from 'react';
import { SafeAreaView,View,Text,Image } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Login.style';

const Login = ({navigation}) => {

    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.logo_container}>
            <Image style={styles.logo} source={require("../../assets/login-logo.png")} />
            </View>   
           <View style={styles.body_container}>
                <Input 
                    placeholder="Kimlik numaranızı giriniz..."
                    iconName="account"
                    />
                 <Input 
                    placeholder="Şifrenizi giriniz..." 
                    iconName="lock"
                    isPassword
                    />

            <View style={styles.forgot_pw_container}>
                <Button title="Forgot password?" border={0} onPress={()=> navigation.navigate('ForgotPasswordScreen')}/>
            </View>
            </View>

            <View style={{marginBottom:70}}>
            <Button contained marginRight={25} marginLeft={25} title="Giriş Yap" onPress={()=> navigation.navigate('MainTabs')} />
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>                
                    <Button  title="Dont you have an account? Sign up" marginRight={25} marginLeft={25} border={0} onPress={()=> navigation.navigate('IdentityScreen')} />                    
                </View>
            </View>                                                         
        </SafeAreaView>                  
    )
}

export default Login;