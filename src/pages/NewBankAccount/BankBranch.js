import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import bank_branch_list from '../../assets/bank_branch';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import BankAccountContext from '../../context/BankAccountContext';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import {ThemeContext} from '../../context/ThemeContext';

const BankBranch = () => {
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const {bank, setBank} = useContext(BankAccountContext);
  const {theme} = useContext(ThemeContext);

  const handleBranchNameSelect = () => {
    if (selected === '') {
      showMessage({
        message: 'Lütfen bir seçim yapın',
        type: 'danger',
        backgroundColor: colors.primary,
      });
      return;
    }
    console.log('selected::: ' + selected);
    setBank(prev => ({...prev, branchName: selected}));
    console.log(bank);
    navigation.navigate('ConfirmationScreen');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>Branch</Text>
      <Text style={styles.text}> Lütfen şube seçiniz</Text>
      <View style={{margin: 20}}>
        <SelectList
          setSelected={val => setSelected(val)}
          data={bank_branch_list}
          save="value"
          searchPlaceholder="Ara"
          notFoundText="Bulunamadı..."
          placeholder="Şube seçiniz"
          defaultOption={bank.branchName}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          textColor="#7286D3"
          onPress={() => navigation.goBack()}
          title="Önceki adım"
        />
        <Button
          contained
          buttonColor="#7286D3"
          textColor="white"
          onPress={handleBranchNameSelect}
          title="Sonraki adım"
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
