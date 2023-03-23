import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const Photo = () => {
    
    const{user, setUser} = useContext(UserContext);
    const navigation = useNavigation();

    const handleSubmit = async (photo) => {
        try {
          await setUser({...user, ...photo});
          console.log(user);
          navigation.navigate('PasswordScreen');
        } catch (error) {
          console.log(error);
        }
      };
    
    return(
        <SafeAreaView style={styles.container}>     
            <Text style={styles.title}>Fotoğraf Seç</Text>
          <View style={styles.button_container}>
            <Button textColor='#7286D3' onPress={() => navigation.goBack()} title="Önceki adım"/>         
            <Button contained buttonColor='#7286D3' textColor='white' onPress={handleSubmit} title="Sonraki adım"/>                                  
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
