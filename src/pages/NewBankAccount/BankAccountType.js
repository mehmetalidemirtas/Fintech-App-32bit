import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import BankAccountContext from '../../context/BankAccountContext';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../context/ThemeContext';
import Dropdown from '../../components/Dwopdown/Dropdown';
import {showFlashMessage} from '../../utils/flashMessage';

const BankAccountType = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const {bank, setBank} = useContext(BankAccountContext);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const data = [
    {key: '1', value: 'Vadeli hesap'},
    {key: '2', value: 'Vadesiz hesap'},
  ];
  const handleBankAccountTypeSelect = () => {
    if (selected === '') {
      showFlashMessage(t('text.chooseBankAccountType'));
      return;
    }
    setBank(prev => ({...prev, bankType: selected}));
    navigation.navigate('BankCurrencyTypeScreen');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('title.bankAccountType')}
      </Text>
      <Text style={[styles.text, {color: theme.textColor}]}>
        {t('text.chooseBankAccountType')}
      </Text>
      <View style={{margin: 20}}>
        <Dropdown
          selected={val => setSelected(val)}
          data={data}
          title={t('text.chooseBankAccountType')}
          placeholder={t('text.chooseBankAccountType')}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          contained
          onPress={handleBankAccountTypeSelect}
          title={t('button.next')}
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

export default BankAccountType;
