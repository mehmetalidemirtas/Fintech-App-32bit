import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import BankAccountContext from '../../context/BankAccountContext';
import {useTranslation} from 'react-i18next';

import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import {ThemeContext} from '../../context/ThemeContext';

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
      showMessage({
        message: t('text.chooseBankAccountType'),
        type: 'danger',
        backgroundColor: colors.primary,
      });
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
        <SelectList
          setSelected={val => setSelected(val)}
          data={data}
          title={t('text.chooseBankAccountType')}
          searchPlaceholder={t('search')}
          notFoundText={t('notFound')}
          placeholder={t('text.chooseBankAccountType')}
          save="value"
          defaultOption={bank.bankType}
          dropdownTextStyles={{color: theme.textColor}}
          dropdownItemStyles={{color: theme.textColor}}
          boxStyles={theme.textColor}
          inputStyles={{color: theme.textColor}}
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
