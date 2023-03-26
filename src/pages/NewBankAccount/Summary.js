import React, { useContext,useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card';
import BankAccountContext from '../../context/BankAccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Summary = () => {

    const navigation = useNavigation();
    const{bank, setBank} = useContext(BankAccountContext);

    useEffect(() => { //Bir önceki aşamada seçilen branchName bir sonraki render işleminde context'e kaydolacağı için useEffect kullandımm.       
    }, [bank]);
    
    const saveBankAccountToAsyncStorage = async () => {
        const {bankType, currencyType, branchName,accountNo,iban} = bank;
      const data = {
        bankType,
        currencyType,
        branchName,
        accountNo,
        iban
      };

        try {          
          console.log(data);
          await AsyncStorage.setItem('bank', JSON.stringify(data));
          console.log('Bank account saved to async storage.');  
          navigation.navigate('WatchlistScreen');
        } catch (error) {
          console.log('Error saving bank account to async storage: ', error);
        }
      }
    const handleSubmit = async () => {        
        try {
            await saveBankAccountToAsyncStorage(); 
            navigation.navigate('WatchlistScreen');                
        } catch (error) {
            console.log(error);
        }   
    };
    return(
        <SafeAreaView style={styles.container}>     
            <Text style={styles.title}>Hesap Özeti</Text>
            <View style={{backgroundColor: colors.card_bg, borderRadius: 30, margin:20}}>
            <Card title="Bank Account Type:" text={bank.bankType} />
            <Card title="Currency Type:" text={bank.currencyType} />
            <Card title="Bank Branch:" text={bank.branchName} />
            <Card title="Account No:" text={bank.accountNo} />
            <Card title="Iban:" text={bank.iban}/>
            </View>
          <View style={styles.button_container}>
            <Button contained buttonColor='#7286D3' textColor='white' onPress={handleSubmit} title="Ana sayfaya git"/>                                  
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

export default Summary;