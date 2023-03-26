import React, { useState, useContext } from 'react';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import currency_type_list from '../../assets/currency_type';
import BankAccountContext from '../../context/BankAccountContext';
import FlashMessage,{ showMessage, hideMessage } from "react-native-flash-message";

const BankCurrencyType = () => {
    
    const navigation = useNavigation();
    const [selected, setSelected] = useState("");
    const{bank, setBank} = useContext(BankAccountContext);

    const handleCurrencyTypeSelect = () => {
      if (selected === "") {
        showMessage({
          message: "Lütfen bir seçim yapın",
          type: "danger",
          backgroundColor: colors.primary
        });
        return;
      }
      console.log("selected::: " + selected);
      setBank(prev => ({...prev, currencyType: selected}));
      console.log(bank);
      navigation.navigate('BankBranchScreen');                
    };
    return(
        <SafeAreaView style={styles.container}>     
            <Text style={styles.title}>Currency Type</Text>
            <Text style={styles.text} > Lütfen döviz tipi seçiniz</Text>            
        <View style={{margin:20}}>
          <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={currency_type_list}
          title="Döviz tipi seçiniz" 
          save="value"
          searchPlaceholder="Ara"
          notFoundText="Bulunamadı..."
          placeholder="Döviz tipi seçiniz"
          defaultOption={bank.currencyType}
          />
          </View>
          <View style={styles.button_container}>
            <Button textColor='#7286D3' onPress={() => navigation.goBack()} title="Önceki adım"/>         
            <Button contained buttonColor='#7286D3' textColor='white' onPress={handleCurrencyTypeSelect} title="Sonraki adım"/>                                  
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

  container:{
      backgroundColor:"white", 
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
  text:{
    textAlign:"center", 
    marginTop:30, 
    fontSize:15
  },
  button_container:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-evenly",
      marginTop:25,
  },
})
export default BankCurrencyType;