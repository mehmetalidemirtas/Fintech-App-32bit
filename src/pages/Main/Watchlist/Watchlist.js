import React from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import Button from '../../../components/Button';

const Watchlist = ({navigation}) => {

    return(
        <SafeAreaView>            
            <Text>Watchlist</Text>
            <Button title="New Account"  onPress={()=> navigation.navigate('NewAccount')} />   
            <Button title="History"   onPress={()=> navigation.navigate('HistoryScreen')} />   
        </SafeAreaView>
    )
}

export default Watchlist;