import React, {useContext, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/Card';
import BankAccountContext from '../../context/BankAccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const Summary = () => {
  const navigation = useNavigation();
  const {bank, setBank} = useContext(BankAccountContext);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  useEffect(() => {}, [bank]);

  const saveBankAccountToAsyncStorage = async () => {
    const {bankType, currencyType, branchName, accountNo, iban, amount} = bank;
    const data = {
      bankType,
      currencyType,
      branchName,
      accountNo,
      iban,
      amount,
    };

    const identityNo = await AsyncStorage.getItem('currentUser');
    const currency = currencyType.split('-')[0].trim(); // "USD"
    const key = `${identityNo}_bankAccount_${currency}_${accountNo}`;
    try {
      console.log(data);
      AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Bank account saved to async storage.');
      navigation.navigate('WatchlistScreen');
    } catch (error) {
      console.log('Error saving bank account to async storage: ', error);
    }
  };
  const handleSubmit = async () => {
    try {
      await saveBankAccountToAsyncStorage();
      navigation.navigate('WatchlistScreen');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.textColor}]}>Hesap Özeti</Text>
      <View
        style={{
          backgroundColor: theme.itemColor,
          borderRadius: 30,
          margin: 20,
        }}>
        <Card title={t('title.bankAccountType2')} text={bank.bankType} />
        <Card title={t('title.currencyType2')} text={bank.currencyType} />
        <Card title={t('title.bankBranch2')} text={bank.branchName} />
        <Card title={t('title.accountNo')} text={bank.accountNo} />
        <Card title="Iban:" text={bank.iban} />
      </View>
      <View style={styles.button_container}>
        <Button
          contained
          onPress={handleSubmit}
          title={t('button.goToMainScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    color: colors.primary,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Summary;
