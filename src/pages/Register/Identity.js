import React from 'react';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../styles/colors';

const Identity = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>            
            <Text style={styles.title}>Kimlik Bigileri</Text>
            <Input 
                placeholder="İsminizi giriniz..."
                iconName="account"
            />
            <Input 
                placeholder="Soyisminizi giriniz..."
                iconName="account-multiple"
            />
            <Input 
                placeholder="Doğum tarihinizi giriniz..."
                label="Doğum tarihi"  
                iconName="calendar-range"          
            />
            <Input 
                placeholder="Kimlik numaranızı giriniz..."
                label="Kimlik Numarası"
                iconName="card-account-details"
            />
            <View style={styles.button_container}>
            <Button  text  onPress={() => navigation.goBack()} title="Zaten hesabınız var mı?"/>         
            <Button contained onPress={()=> navigation.navigate('PhotoScreen')} title="Sonraki adım" />         
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
        justifyContent:"space-between",
        marginLeft:10,
        marginRight:15,
        padding:10,
    }
})

export default Identity;