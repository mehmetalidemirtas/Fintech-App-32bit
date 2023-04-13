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
import CurrencyContext from '../../../context/CurrencyContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {showMessage} from 'react-native-flash-message';

const Exchange = props => {
  const theme = useContext(ThemeContext);
  const currencyName = props.route.params.currency;
  const {currencyValues, setCurrencyValues} = useContext(CurrencyContext);
  const [inputValue, setInputValue] = useState('');
  const [isBuySelected, setIsBuySelected] = useState(false);
  const [bank, setBank] = useState([]);
  const [bankTL, setBankTL] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedTLAccount, setSelectedTLAccount] = useState(null);
  const [identityNo, setIdentityNo] = useState('');

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
        setBankTL(bankAccounts);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };
    const getBankData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
        const identityNo = await AsyncStorage.getItem('currentUser');
        const filterKey = `${identityNo}_bankAccount_${currencyName}_`;
        const bankAccountKeys = keys.filter(key => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
            return JSON.parse(bankAccount);
          }),
        );
        setBank(bankAccounts);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };

    getBankData();
    getBankTLData();
  }, []);

  const handleOptionChange = value => {
    setSelectedOption(value);
  };
  const handleButtonClick = () => {
    if (selectedAccount == null) {
      showMessage({
        message: `${currencyName} Hesabı seçiniz, yoksa hesap oluşturun`,
        type: 'danger',
        duration: 3000,
      });
    } else if (inputValue == '') {
      showMessage({
        message: 'Miktar giriniz',
        type: 'danger',
        duration: 3000,
      });
    } else if (selectedTLAccount == null) {
      showMessage({
        message: 'TL hesabı seçiniz, yoksa hesap oluşturun',
        type: 'danger',
        duration: 3000,
      });
    } else {
      if (isBuySelected == true) {
        console.log('buy selected');
      } else {
        console.log('sell selected');
      }
      console.log('girilen değer : ' + inputValue);
    }
  };

  const handleBuyPress = () => {
    setBankTL([...bank]);
    setBank([...bankTL]);
    setIsBuySelected(true);
  };

  const handleSellPress = () => {
    setBankTL([...bank]);
    setBank([...bankTL]);
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
          {currencyName}/TRY
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
            setSelected={val => setSelectedAccount(val)}
            data={bank.map(item => ({
              key: `${identityNo}_bankAccount_${currencyName}_${item.accountNo}`,
              value: `${item.branchName} - ${item.accountNo}`,
            }))}
            searchPlaceholder="Ara"
            notFoundText="Bulunamadı..."
            placeholder="Şube seçiniz"
          />
          <View style={{margin: 5}}>
            <Text>
              {isBuySelected
                ? 'Satılacak Para Birimi: TL'
                : `Satılacak Para Birimi: ${currencyName}`}
            </Text>
          </View>
          <View style={{margin: 5}}>
            <Text>Selected Bank: {selectedAccount}</Text>
          </View>
        </View>
        <View>
          <View style={{margin: 5}}>
            <Text style={{marginLeft: 25, marginRight: 25}}>
              Satılacak Para Tutarı:
            </Text>
          </View>
          <Input
            placeholder="Miktar giriniz"
            value={inputValue}
            onType={setInputValue}
          />
        </View>
        <View style={{marginLeft: 25, marginRight: 25}}>
          <View style={{margin: 5}}>
            <Text>Aktarılacak hesap:</Text>
            <SelectList
              setSelected={val => setSelectedTLAccount(val)}
              data={bankTL.map(item => ({
                key: `${identityNo}_bankAccount_TL_${item.accountNo}`,
                value: `${item.branchName} - ${item.accountNo}`,
              }))}
              searchPlaceholder="Ara"
              notFoundText="Bulunamadı..."
              placeholder="Şube seçiniz"
            />
          </View>
          <View style={{margin: 5}}>
            <Text>
              {!isBuySelected
                ? 'Alınacak Para Birimi: TL'
                : `Alınacak Para Birimi: ${currencyName}`}
            </Text>
          </View>
          <View style={{margin: 5}}>
            <Text>Selected Bank: {selectedTLAccount}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>
              {isBuySelected
                ? `Kur oranı: ${currencyValues.sellValue}`
                : `Kur oranı: ${currencyValues.buyValue}`}
            </Text>
          </View>
          <View style={{margin: 5}}>
            <Text>Sonuç:</Text>
          </View>
        </View>
        <View style={{margin: 5}}>
          <Button
            contained
            title="Tamamla"
            marginRight={25}
            marginLeft={25}
            onPress={handleButtonClick}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Exchange;
