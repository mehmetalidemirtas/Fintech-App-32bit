import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import bank_branch_list from '../../assets/bank_branch';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import BankAccountContext from '../../context/BankAccountContext';
import {useTranslation} from 'react-i18next';
import Dropdown from '../../components/Dwopdown/Dropdown';
import {showFlashMessage} from '../../utils/flashMessage';
import {ThemeContext} from '../../context/ThemeContext';

const BankBranch = () => {
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const {bank, setBank} = useContext(BankAccountContext);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const handleBranchNameSelect = () => {
    if (selected === '') {
      showFlashMessage(t('text.chooseBranch'));
      return;
    }
    setBank(prev => ({...prev, branchName: selected}));
    navigation.navigate('ConfirmationScreen');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('title.bankBranch')}
      </Text>
      <Text style={[styles.text, {color: theme.textColor}]}>
        {' '}
        {t('text.chooseBranch')}
      </Text>
      <View style={{margin: 20}}>
        <Dropdown
          selected={val => setSelected(val)}
          data={bank_branch_list}
          placeholder={t('text.chooseBranch')}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          textColor="#7286D3"
          onPress={() => navigation.goBack()}
          title={t('button.previous')}
        />
        <Button
          contained
          buttonColor="#7286D3"
          textColor="white"
          onPress={handleBranchNameSelect}
          title={t('button.next')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
export default BankBranch;
