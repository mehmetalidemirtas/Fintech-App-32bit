import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import currency_type_list from '../../assets/currency_type';
import BankAccountContext from '../../context/BankAccountContext';
import {useTranslation} from 'react-i18next';
import Dropdown from '../../components/Dwopdown/Dropdown';
import {showFlashMessage} from '../../utils/flashMessage';
import {ThemeContext} from '../../context/ThemeContext';

const BankCurrencyType = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const {bank, setBank} = useContext(BankAccountContext);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const handleCurrencyTypeSelect = () => {
    if (selected === '') {
      showFlashMessage(t('text.chooseCurrencyType'));
      return;
    }
    setBank(prev => ({...prev, currencyType: selected}));
    navigation.navigate('BankBranchScreen');
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('title.currencyType')}
      </Text>
      <Text style={[styles.text, {color: theme.textColor}]}>
        {t('text.chooseCurrencyType')}
      </Text>
      <View style={{margin: 20}}>
        <Dropdown
          selected={val => setSelected(val)}
          data={currency_type_list}
          placeholder={t('text.chooseCurrencyType')}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          onPress={() => navigation.goBack()}
          title={t('button.previous')}
        />
        <Button
          contained
          onPress={handleCurrencyTypeSelect}
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
export default BankCurrencyType;
