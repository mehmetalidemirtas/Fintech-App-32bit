import React, { useState, useContext } from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import Button from '../../../components/Button';
import UserContext from '../../../context/UserContext';

const Watchlist = ({navigation}) => {
    const{user} = useContext(UserContext);
    return(
        <SafeAreaView>            
            <Text>Watchlist</Text>
            <Button title="New Account"  onPress={()=> navigation.navigate('NewAccount')} />   
            <Button title="History"   onPress={()=> navigation.navigate('HistoryScreen')} />  
            <Text>name: {user.name}</Text>
            <Text>surname: {user.surname}</Text>
            <Text>birthDate: {user.birthDate}</Text>
            <Text>photo: {user.photo}</Text>
            <Text>phone: {user.phone}</Text>
            <Text>password: {user.password}</Text>
            <Text>confirmPassword: {user.confirmPassword}</Text> 
        </SafeAreaView>
    )
}

export default Watchlist;