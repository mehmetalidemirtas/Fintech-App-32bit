import React, {useContext, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import BankAccountContext from '../../context/BankAccountContext';
import Card from '../../components/Card';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import generateTRIBAN from '../../utils/ibanGenerator';

const Confirmation = () => {
  const navigation = useNavigation();
  const {bank, setBank} = useContext(BankAccountContext);
  const accountNumber = Math.floor(Math.random() * 100000000);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  useEffect(() => {
    console.log(bank.bankType + bank.currencyType + bank.branchName);
  }, [bank]);

  const handleSubmit = async () => {
    setBank(prev => ({
      ...prev,
      accountNo: accountNumber,
      iban: generateTRIBAN(accountNumber),
    }));
    navigation.navigate('SummaryScreen');
  };

  const editAccountType = () => {
    navigation.navigate('BankAccountTypeScreen');
  };
  const editCurrencyType = () => {
    navigation.navigate('BankCurrencyTypeScreen');
  };
  const editBankBranch = () => {
    navigation.navigate('BankBranchScreen');
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('title.confirmation')}
      </Text>
      <Text style={[styles.text, {color: theme.primary}]}>
        {t('text.confirm')}
      </Text>
      <View
        style={{
          backgroundColor: theme.itemColor,
          borderRadius: 30,
          margin: 20,
        }}>
        <Card
          title={t('title.bankAccountType2')}
          text={bank.bankType}
          onPress={editAccountType}
        />
        <Card
          title={t('title.currencyType2')}
          text={bank.currencyType}
          onPress={editCurrencyType}
        />
        <Card
          title={t('title.bankBranch2')}
          text={bank.branchName}
          onPress={editBankBranch}
        />
      </View>
      <View style={styles.button_container}>
        <Button contained onPress={handleSubmit} title={t('button.approve')} />
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
  text: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
});

export default Confirmation;
