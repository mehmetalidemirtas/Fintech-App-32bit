import React from 'react';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';

const Password = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>            
        <Text style={styles.title}>Şifre Belirle</Text>
    
            <View>
            <Input 
                placeholder="Telefon numaranızı giriniz..."
                iconName="phone"
            />
            <Input 
                placeholder="Yeni şifrenizi giriniz..."
                iconName="lock"
            />
            <Input 
                placeholder="Yeni şifrenizi tekrar giriniz..."
                iconName="lock-check"
                label="Yeni şifre (Tekrar)"
            />
            </View>
            <View style={styles.button_container}>
            <Button  onPress={() => navigation.goBack()} title="Önceki adım"/>
            <Button contained onPress={() => navigation.navigate('LoginScreen')} title="Kaydı tamamla"/>
            </View>
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
    }
})

export default Password;
