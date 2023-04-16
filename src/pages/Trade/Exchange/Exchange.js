import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './Exchange.style';
import {ThemeContext} from '../../../context/ThemeContext';
import TradeHistoryContext from '../../../context/TradeHistoryContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const Exchange = props => {
  const theme = useContext(ThemeContext);
  const nameOfCurrency = props.route.params.currency;
  const {tradeHistory, setTradeHistory} = useContext(TradeHistoryContext);
  const [isBuySelected, setIsBuySelected] = useState(false);
  const [bankAccountToBeSold, setBankAccountToBeSold] = useState([]);
  const [bankAccountToBeReceived, setBankAccountToBeReceived] = useState([]);
  const [selectedAccountToBeSold, setSelectedAccountToBeSold] = useState(null);
  const [selectedAccountToBeReceived, setSelectedAccountToBeReceived] =
    useState(null);
  const [identityNo, setIdentityNo] = useState('');
  const [outputValue, setOutputValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountOfReceivedBank, setAmountOfReceivedBank] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //forHistory
  const [nameOfBankSold, setNameOfBankSold] = useState(null); //Satılacak hesap adı
  const [nameOfBankBuy, setNameOfBankBuy] = useState(null); //Aktarılacak hesap adı
  const [currencyNameToBeReceived, setCurrencyNameToBeReceived] = useState('TL'); //Alınacak para birimi adı
  const [currencyNameToBeSold, setCurrencyNameToBeSold] = useState(props.route.params.currency);  //Satılacak para birimi adı
  const [exchangeRate, setExchangeRate] = useState(props.route.params.buyValue); //Kur oranı
  const [inputValue, setInputValue] = useState(''); //Girilen tutar
  
  useEffect(() => {
    const getBankTLData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
        const identityNo = await AsyncStorage.getItem('currentUser');
        setIdentityNo(identityNo);
        const filterKey = `${identityNo}_bankAccount_TL_`;
        const bankAccountKeys = keys.filter(key => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
            return JSON.parse(bankAccount);
          }),
        );
        setBankAccountToBeReceived(bankAccounts);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };
    const getBankData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
        const identityNo = await AsyncStorage.getItem('currentUser');
        const filterKey = `${identityNo}_bankAccount_${nameOfCurrency}_`; //????????????????? currencyNameToBeSold
        const bankAccountKeys = keys.filter(key => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
            return JSON.parse(bankAccount);
          }),
        );
        setBankAccountToBeSold(bankAccounts);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };

    getBankData();
    getBankTLData();
  }, []);

  const getAmountFromSelectedAccount = async value => {
    try {
      const bankAccountData = await AsyncStorage.getItem(value);
      const parsedBankAccountData = JSON.parse(bankAccountData);
      setSelectedAccountToBeSold(value);
      console.log('selectedAccountToBeSold::::' + selectedAccountToBeSold);
      const amount = parsedBankAccountData.amount;
      const branchName = parsedBankAccountData.branchName;
      const accountNo = parsedBankAccountData.accountNo;      
      const bankOfSell=`${branchName} - ${accountNo}`;
      setNameOfBankSold(bankOfSell);
      console.log('amount:::: ' + amount);
      setAmount(amount);
    } catch (e) {
      console.error(
        "Error loading bank account's amount from async storage:",
        e,
      );
    }
  };

  const getAmountFromSelectedAccountGet = async value => {
    try {
      const bankAccountData = await AsyncStorage.getItem(value);
      const parsedBankAccountData = JSON.parse(bankAccountData);
      setSelectedAccountToBeReceived(value);
      console.log('selectedAccount::::' + selectedAccountToBeReceived);
      const amount = parsedBankAccountData.amount;
      const branchName = parsedBankAccountData.branchName;
      const accountNo = parsedBankAccountData.accountNo;
      const bankOfBuy=`${branchName} - ${accountNo}`;  
      setNameOfBankBuy(bankOfBuy);    
      console.log('amount:::: ' + amount);
      setAmountOfReceivedBank(amount);
    } catch (e) {
      console.error(
        "Error loading bank account's amount from async storage:",
        e,
      );
    }
  };
  const updateAmountSell = async (newAmount, newAmountGet) => {
    const bankAccountData = await AsyncStorage.getItem(selectedAccountToBeSold);
    if (bankAccountData !== null) {
      const parsedData = JSON.parse(bankAccountData);
      parsedData.amount = newAmount;
      await AsyncStorage.setItem(
        selectedAccountToBeSold,
        JSON.stringify(parsedData),
      );
    }
    const bankAccountTLData = await AsyncStorage.getItem(
      selectedAccountToBeReceived,
    );
    if (bankAccountTLData !== null) {
      const parsedData = JSON.parse(bankAccountTLData);
      parsedData.amount = newAmountGet;
      await AsyncStorage.setItem(
        selectedAccountToBeReceived,
        JSON.stringify(parsedData),
      );
    }
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    if (selectedAccountToBeSold == null) {
      showMessage({
        message: `${currencyNameToBeSold} Hesabı seçiniz, yoksa hesap oluşturun`,
        type: 'danger',
        duration: 3000,
      });
    } else if (inputValue == '') {
      showMessage({
        message: 'Miktar giriniz',
        type: 'danger',
        duration: 3000,
      });
    } else if (selectedAccountToBeReceived == null) {
      showMessage({
        message: 'TL hesabı seçiniz, yoksa hesap oluşturun',
        type: 'danger',
        duration: 3000,
      });
    } else {
      const num = parseInt(inputValue, 10);
      if (isBuySelected == true) {
        if (num <= amount) {
          const outputValue = num / exchangeRate;
          setOutputValue(outputValue.toFixed(2));
          console.log("amountOfReceivedBank::::: " + amountOfReceivedBank);
          console.log("outputValue : " + outputValue);
          const newTotalAmount = ( parseInt(amountOfReceivedBank) +  parseInt(outputValue)).toFixed(2);
          console.log("newTotalAmount: " + newTotalAmount);
          updateAmountSell(
            amount - inputValue, //Girilen değer bankadaki toplam paradan çıkarılıyor.
            newTotalAmount            //output value : sonuç
          );         
          setTradeHistory({
            ...tradeHistory,
            currencyName: currencyNameToBeReceived,
            bankAccountToBeSold: nameOfBankSold,
            inputValue: inputValue,
            bankAccountToBeReceived: nameOfBankBuy,
            currencyToBeReceived: currencyNameToBeSold,
            exchangeRate: exchangeRate,
            outputValue: newTotalAmount,
          });
          console.log("currencyName: " + currencyNameToBeReceived);
          console.log("nameOfBankSold: " + nameOfBankSold);
          console.log("inputValue: " + inputValue);
          console.log("nameOfBankBuy: " + nameOfBankBuy);
          console.log("currencyNameToBeSold: " + currencyNameToBeSold);
          console.log("exchangeRate: " + exchangeRate);
          console.log("newTotalAmount: " + newTotalAmount);
          console.log("sonuc: " + outputValue);

          navigation.navigate('TradeSummaryScreen');
        } else {
          showMessage({
            message: 'Hesabınızda yeterli bakiye bulunmamaktadır.',
            type: 'danger',
            duration: 3000,
          });
        }
      } else {
        if (num <= amount) {
          const outputValue = num * exchangeRate;
          setOutputValue(outputValue.toFixed(2));
          console.log("amountOfReceivedBank: " + amountOfReceivedBank);
          console.log("outputValue: " + outputValue);
          const newTotalAmount = (Number(amountOfReceivedBank) + Number(outputValue)).toFixed(2);
          console.log("newTotalAmount: " + newTotalAmount);

          updateAmountSell(
            amount - inputValue,
            newTotalAmount
            );

          setTradeHistory({
            ...tradeHistory,
            currencyName: currencyNameToBeReceived,
            bankAccountToBeSold: nameOfBankSold,
            inputValue: inputValue,
            bankAccountToBeReceived: nameOfBankBuy,
            currencyToBeReceived: currencyNameToBeSold,
            exchangeRate: exchangeRate,
            outputValue: newTotalAmount,
          });
          console.log("currencyName: " + currencyNameToBeReceived);
          console.log("nameOfBankSold: " + nameOfBankSold);
          console.log("inputValue: " + inputValue);
          console.log("nameOfBankBuy: " + nameOfBankBuy);
          console.log("currencyNameToBeSold: " + currencyNameToBeSold);
          console.log("exchangeRate: " + exchangeRate);
          console.log("newTotalAmount: " + newTotalAmount);
          console.log("sonuc: " + outputValue);

          navigation.navigate('TradeSummaryScreen');
        } else {
          showMessage({
            message: 'Hesabınızda yeterli bakiye bulunmamaktadır.',
            type: 'danger',
            duration: 3000,
          });
        }
      }
    }
    setIsLoading(false);
  };

  const handleBankAccountSelect = value => {
    console.log('value:' + value); // seçilen banka hesabının bilgileri console'a yazdırılıyor
    getAmountFromSelectedAccount(value);
    console.log('amount:' + amount); // seçilen banka hesabının bilgileri console'a yazdırılıyor
  };
  const handleBankAccountSelectGet = value => {
    console.log('value:' + value); // seçilen banka hesabının bilgileri console'a yazdırılıyor
    getAmountFromSelectedAccountGet(value);
    console.log('amount:' + amount); // seçilen banka hesabının bilgileri console'a yazdırılıyor
  };
  const handleBuyPress = () => {
    setBankAccountToBeReceived([...bankAccountToBeSold]);
    setBankAccountToBeSold([...bankAccountToBeReceived]);
    setCurrencyNameToBeSold('TL');
    setCurrencyNameToBeReceived(nameOfCurrency);
    setExchangeRate(props.route.params.sellValue);
    setIsBuySelected(true);
  };

  const handleSellPress = () => {
    setBankAccountToBeReceived([...bankAccountToBeSold]);
    setBankAccountToBeSold([...bankAccountToBeReceived]);
    setCurrencyNameToBeSold(nameOfCurrency);
    setCurrencyNameToBeReceived('TL');
    setExchangeRate(props.route.params.buyValue);
    setIsBuySelected(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView style={{flex: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
            margin: 10,
            padding: 10,
          }}>
          {nameOfCurrency}/TRY
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={!isBuySelected ? {margin: 7} : {}}>
            <Button
              contained={isBuySelected}
              title="Buy"
              onPress={handleBuyPress}
            />
          </View>
          <View style={isBuySelected ? {margin: 7} : {}}>
            <Button
              contained={!isBuySelected}
              title="Sell"
              onPress={handleSellPress}
            />
          </View>
        </View>
        <View style={{marginLeft: 25, marginRight: 25, marginTop: 10}}>
          <Text>Satılacak Hesap: </Text>
          <SelectList
            setSelected={handleBankAccountSelect}
            data={bankAccountToBeSold.map(item => ({
              key: `${identityNo}_bankAccount_${currencyNameToBeSold}_${item.accountNo}`,
              value: `${item.branchName} - ${item.accountNo}`,
            }))}
            searchPlaceholder="Ara"
            notFoundText="Bulunamadı..."
            placeholder="Şube seçiniz"
          />
          <View style={{margin: 5}}>
            <Text>
              Satılacak para birimi: {currencyNameToBeSold}
            </Text>
          </View>
        </View>
        <View>
          <View style={{margin: 5}}>
            <Text style={{marginLeft: 25, marginRight: 25}}>
              Satılacak Para Tutarı:
            </Text>
          </View>
          <Input
            keyboardType="numeric"
            placeholder="Miktar giriniz"
            value={inputValue}
            onType={setInputValue}
          />
        </View>
        <View style={{marginLeft: 25, marginRight: 25}}>
          <View style={{margin: 5}}>
            <Text>Aktarılacak hesap:</Text>
            <SelectList
              setSelected={handleBankAccountSelectGet}
              data={bankAccountToBeReceived.map(item => ({
                key: `${identityNo}_bankAccount_${currencyNameToBeReceived}_${item.accountNo}`,
                value: `${item.branchName} - ${item.accountNo}`,
              }))}
              searchPlaceholder="Ara"
              notFoundText="Bulunamadı..."
              placeholder="Şube seçiniz"
            />
          </View>
          <View style={{margin: 5}}>
            <Text>
              Alınacak para birimi: {currencyNameToBeReceived}         
            </Text>     
          </View>

          <View style={{margin: 5}}>
            <Text>Kur oranı: {exchangeRate}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>Sonuç: {outputValue}</Text>
          </View>
        </View>
        <View style={{margin: 5}}>
          <Button
            contained
            title="Tamamla"
            marginRight={25}
            marginLeft={25}
            onPress={handleButtonClick}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Exchange;
