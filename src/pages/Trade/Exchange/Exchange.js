import React, {useState, useContext, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import styles from './Exchange.style';
import {ThemeContext} from '../../../context/ThemeContext';
import TradeHistoryContext from '../../../context/TradeHistoryContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {showFlashMessage} from '../../../utils/flashMessage';
import {updateAmountSell} from '../../../utils/updateAmount';

const Exchange = props => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
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
  const [nameOfBankSold, setNameOfBankSold] = useState(null); //Account name to sell
  const [nameOfBankBuy, setNameOfBankBuy] = useState(null); //Account name to transfer
  const [currencyNameToBeReceived, setCurrencyNameToBeReceived] =
    useState('TL'); //Currency name to receive
  const [currencyNameToBeSold, setCurrencyNameToBeSold] = useState(
    props.route.params.currency,
  ); //currency name to be sold
  const [exchangeRate, setExchangeRate] = useState(props.route.params.buyValue); //exchange rate
  const [exchangeTime, setExchangeTime] = useState(props.route.params.time); //exchange time
  const [inputValue, setInputValue] = useState(''); //Amount entered
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(timer);
      navigation.navigate('WatchlistScreen');
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter, navigation]);

  useEffect(() => {
    const getBankTLData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const identityNo = await AsyncStorage.getItem('currentUser');
        setIdentityNo(identityNo);
        const filterKey = `${identityNo}_bankAccount_TL_`;
        const bankAccountKeys = keys.filter(key => key.includes(filterKey));
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key);
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
        const keys = await AsyncStorage.getAllKeys();
        const identityNo = await AsyncStorage.getItem('currentUser');
        const filterKey = `${identityNo}_bankAccount_${nameOfCurrency}_`;
        const bankAccountKeys = keys.filter(key => key.includes(filterKey));
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key);
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
      const amount = parsedBankAccountData.amount;
      const branchName = parsedBankAccountData.branchName;
      const accountNo = parsedBankAccountData.accountNo;
      const bankOfSell = `${branchName} - ${accountNo}`;
      setNameOfBankSold(bankOfSell);
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
      const amount = parsedBankAccountData.amount;
      const branchName = parsedBankAccountData.branchName;
      const accountNo = parsedBankAccountData.accountNo;
      const bankOfBuy = `${branchName} - ${accountNo}`;
      setNameOfBankBuy(bankOfBuy);
      setAmountOfReceivedBank(amount);
    } catch (e) {
      console.error(
        "Error loading bank account's amount from async storage:",
        e,
      );
    }
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    if (selectedAccountToBeSold == null) {
      setIsLoading(false);
      showFlashMessage(
        t('select') + ' ' + `${currencyNameToBeSold} ` + t('selectAccount'),
      );
    } else if (inputValue == '') {
      setIsLoading(false);
      showFlashMessage(t('enterAmount'));
    } else if (selectedAccountToBeReceived == null) {
      setIsLoading(false);
      showFlashMessage(
        t('select') + ' ' + `${currencyNameToBeReceived}` + t('selectAccount'),
      );
    } else {
      const num = parseInt(inputValue, 10);
      if (isBuySelected == true) {
        if (num <= amount) {
          const outputValue = num / exchangeRate;
          setOutputValue(outputValue.toFixed(2));
          const newTotalAmount = (
            parseInt(amountOfReceivedBank) + parseInt(outputValue)
          ).toFixed(2);
          updateAmountSell(
            amount - inputValue, //The entered value is subtracted from the total money in the bank.
            newTotalAmount, //output value : result
            selectedAccountToBeSold,
            selectedAccountToBeReceived,
          );
          setTradeHistory({
            ...tradeHistory,
            currencyNameToBeSold: currencyNameToBeSold,
            bankAccountToBeSold: nameOfBankSold,
            inputValue: inputValue,
            bankAccountToBeReceived: nameOfBankBuy,
            currencyToBeReceived: currencyNameToBeReceived,
            exchangeRate: exchangeRate,
            outputValue: outputValue.toFixed(2),
            newTotalAmount: newTotalAmount,
            time: exchangeTime,
          });

          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('TradeSummaryScreen');
          }, 2000);
        } else {
          showFlashMessage(t('notEnoughBalance'));
          setIsLoading(false);
        }
      } else {
        if (num <= amount) {
          const outputValue = num * exchangeRate;
          setOutputValue(outputValue.toFixed(2));
          const newTotalAmount = (
            Number(amountOfReceivedBank) + Number(outputValue)
          ).toFixed(2);

          updateAmountSell(
            amount - inputValue,
            newTotalAmount,
            selectedAccountToBeSold,
            selectedAccountToBeReceived,
          );

          setTradeHistory({
            ...tradeHistory,
            currencyNameToBeSold: currencyNameToBeSold,
            bankAccountToBeSold: nameOfBankSold,
            inputValue: inputValue,
            bankAccountToBeReceived: nameOfBankBuy,
            currencyToBeReceived: currencyNameToBeReceived,
            exchangeRate: exchangeRate,
            outputValue: outputValue.toFixed(2),
            newTotalAmount: newTotalAmount,
            time: exchangeTime,
          });

          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('TradeSummaryScreen');
          }, 2000);
        } else {
          showFlashMessage(t('notEnoughBalance'));
          setIsLoading(false);
        }
      }
    }
  };

  const handleBankAccountSelect = value => {
    getAmountFromSelectedAccount(value);
  };
  const handleBankAccountSelectGet = value => {
    getAmountFromSelectedAccountGet(value);
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
        <Text style={[styles.main_title, {color: theme.textColor}]}>
          {nameOfCurrency}/TRY
        </Text>
        <View style={styles.counter_container}>
          <Text style={[styles.counter_title, {color: theme.textColor}]}>
            {t('lastSeconds')}{' '}
          </Text>
          <Text style={[styles.counter, {color: theme.textColor}]}>
            {counter}
          </Text>
          <Text style={[styles.counter_title, {color: theme.textColor}]}>
            {' '}
            {t('second')}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={!isBuySelected ? {margin: 7} : {}}>
            <Button
              contained={isBuySelected}
              title={t('buy')}
              onPress={handleBuyPress}
            />
          </View>
          <View style={isBuySelected ? {margin: 7} : {}}>
            <Button
              contained={!isBuySelected}
              title={t('sell')}
              onPress={handleSellPress}
            />
          </View>
        </View>
        <View style={styles.bottom_container}>
          <Text style={[styles.title, {color: theme.textColor}]}>
            {t('accountToSell')}{' '}
          </Text>
          <SelectList
            setSelected={handleBankAccountSelect}
            data={bankAccountToBeSold.map(item => ({
              key: `${identityNo}_bankAccount_${currencyNameToBeSold}_${item.accountNo}`,
              value: `${item.branchName} - ${item.accountNo}`,
            }))}
            searchPlaceholder={t('search')}
            notFoundText={t('notFound')}
            placeholder={t('text.chooseBranch')}
            dropdownTextStyles={{color: theme.textColor}}
            dropdownItemStyles={{color: theme.textColor}}
            boxStyles={theme.textColor}
            inputStyles={{color: theme.textColor}}
          />
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('currencyToSell')}{' '}
            </Text>
            <Text
              style={{
                alignContent: 'center',
                fontSize: 16,
                color: theme.textColor,
              }}>
              {currencyNameToBeSold}
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text
              style={[
                styles.title,
                {
                  marginLeft: 25,
                  color: theme.textColor,
                  marginRight: 25,
                  marginBottom: 0,
                },
              ]}>
              {t('amountToSell')}
            </Text>
          </View>
          <Input
            keyboardType="numeric"
            placeholder={t('enterAmount')}
            value={inputValue}
            onType={setInputValue}
          />
        </View>
        <View style={[styles.bottom_container, {marginTop: 0}]}>
          <View>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('accountToTransfer')}
            </Text>
            <SelectList
              setSelected={handleBankAccountSelectGet}
              data={bankAccountToBeReceived.map(item => ({
                key: `${identityNo}_bankAccount_${currencyNameToBeReceived}_${item.accountNo}`,
                value: `${item.branchName} - ${item.accountNo}`,
              }))}
              searchPlaceholder={t('search')}
              notFoundText={t('notFound')}
              placeholder={t('text.chooseBranch')}
              dropdownTextStyles={{color: theme.textColor}}
              dropdownItemStyles={{color: theme.textColor}}
              boxStyles={theme.textColor}
              inputStyles={{color: theme.textColor}}
            />
          </View>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('currencyToReceive')}{' '}
            </Text>
            <Text
              style={{
                alignContent: 'center',
                color: theme.textColor,
                fontSize: 16,
              }}>
              {currencyNameToBeReceived}
            </Text>
          </View>
          <View style={{marginTop: 0, flexDirection: 'row'}}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('exchangeRate')}{' '}
            </Text>
            <Text
              style={{
                alignContent: 'center',
                color: theme.textColor,
                fontSize: 16,
              }}>
              {exchangeRate}
            </Text>
          </View>
          <View style={{marginTop: 0, flexDirection: 'row'}}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('result')}{' '}
            </Text>
            <Text
              style={{
                alignContent: 'center',
                color: theme.textColor,
                fontSize: 16,
              }}>
              {outputValue}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Button
            contained
            title={t('button.complete')}
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
