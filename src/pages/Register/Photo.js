import React, { useState } from 'react';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
const Photo = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>            
            <Text style={styles.title}>Fotoğraf Seç</Text>
          <View style={styles.button_container}>
            <Button textColor='#7286D3' onPress={() => navigation.goBack()} title="Önceki adım"/>         
            <Button contained buttonColor='#7286D3' textColor='white' onPress={()=> navigation.navigate('PasswordScreen')} title="Sonraki adım"/>                                  
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:"#FFF", 
        flex:1, 
        justifyContent:"center"
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

export default Photo;
