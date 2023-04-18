import React, {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import BankAccountContext from '../../context/BankAccountContext';
import Card from '../../components/Card';
import {ThemeContext} from '../../context/ThemeContext';

const Confirmation = () => {
  const navigation = useNavigation();
  const {bank, setBank} = useContext(BankAccountContext);
  const accountNumber = Math.floor(Math.random() * 100000000);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    //Bir önceki aşamada seçilen branchName bir sonraki render işleminde context'e kaydolacağı için useEffect kullandımm.
    console.log(bank.bankType);
    console.log(bank.currencyType);
    console.log(bank.branchName);
  }, [bank]);

  const handleSubmit = async () => {
    setBank(prev => ({
      ...prev,
      accountNo: accountNumber,
      iban: generateTRIBAN(),
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
  const generateTRIBAN = () => {
    const TR_COUNTRY_CODE = 'TR';
    const TR_IBAN_CHECK_DIGIT_VALUE = '68';
    const bankCode = '0001';
    const branchCode = '0019';
    const accountNo = accountNumber;
    const trIban = `${TR_COUNTRY_CODE}${TR_IBAN_CHECK_DIGIT_VALUE}${bankCode}${branchCode}${accountNo}`;
    return trIban;
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>Confirmation</Text>
      <Text style={styles.text}> Lütfen hesap açma işlemini onaylayınız</Text>
      <View
        style={{
          backgroundColor: theme.cardColor,
          borderRadius: 30,
          margin: 20,
        }}>
        <Card
          title="Bank Account Type:"
          text={bank.bankType}
          onPress={editAccountType}
        />
        <Card
          title="Currency Type:"
          text={bank.currencyType}
          onPress={editCurrencyType}
        />
        <Card
          title="Bank Branch:"
          text={bank.branchName}
          onPress={editBankBranch}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          contained
          buttonColor="#7286D3"
          textColor="white"
          onPress={handleSubmit}
          title="Onaylıyorum"
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

export default Confirmation;
