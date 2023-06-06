import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import styles from '../../pages/AllBankAccounts/AllBankAccounts.syle';
import historyStyles from '../../pages/History/History.style';
import currenciesStyle from '../../pages/Main/Watchlist/Watchlist.style';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import {shareItem} from '../../utils/shareItem';
import {formatDate} from '../../utils/dateFormatter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AllBankAccountRender = ({item}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  function formatAmount(amount) {
    const newAmount = Number(amount).toFixed(2);
    return newAmount;
  }
  return (
    <View style={[styles.card_container, {backgroundColor: theme.itemColor}]}>
      <Text
        style={[
          styles.title,
          {textAlign: 'center', marginBottom: 2, color: theme.textColor},
        ]}>
        {item.currencyType}
      </Text>
      <View style={styles.title_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t('title.bankAccountType2')}
        </Text>
        <Text style={[styles.text, {color: theme.textColor}]}>
          {item.bankType}
        </Text>
      </View>
      <View style={styles.title_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t('title.bankBranch2')}{' '}
        </Text>
        <Text style={[styles.text, {color: theme.textColor}]}>
          {item.branchName}
        </Text>
      </View>
      <View style={styles.title_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t('title.accountNo')}
        </Text>
        <Text style={[styles.text, {color: theme.textColor}]}>
          {item.accountNo}
        </Text>
      </View>
      <View style={styles.title_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>IBAN: </Text>
        <Text style={[styles.text, {color: theme.textColor}]}>{item.iban}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          Toplam bakiye:
        </Text>
        <Text style={[styles.text, {color: theme.textColor}]}>
          {formatAmount(item.amount)}
        </Text>
      </View>
    </View>
  );
};

const HistoryRender = ({item}) => {
  const handleShare = () => {
    shareItem(item);
  };
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <View
      style={[
        historyStyles.card_container,
        {backgroundColor: theme.itemColor},
      ]}>
      <Text
        style={[
          historyStyles.title,
          {textAlign: 'center', marginBottom: 2, color: theme.textColor},
        ]}>
        {item.currencyNameToBeSold} / {item.currencyToBeReceived}
      </Text>
      <View style={historyStyles.title_container}>
        <Text style={[historyStyles.title, {color: theme.textColor}]}>
          {t('soldAccount')}
        </Text>
        <Text style={[historyStyles.text, {color: theme.textColor}]}>
          {item.bankAccountToBeSold}
        </Text>
      </View>
      <View style={historyStyles.title_container}>
        <Text style={[historyStyles.title, {color: theme.textColor}]}>
          {t('transferredAccount')}
        </Text>
        <Text style={[historyStyles.text, {color: theme.textColor}]}>
          {item.bankAccountToBeReceived}
        </Text>
      </View>
      <View style={historyStyles.title_container}>
        <Text style={[historyStyles.title, {color: theme.textColor}]}>
          {t('exchangeRate')}
        </Text>
        <Text style={[historyStyles.text, {color: theme.textColor}]}>
          {item.exchangeRate}
        </Text>
      </View>
      <View style={historyStyles.title_container}>
        <Text style={[historyStyles.title, {color: theme.textColor}]}>
          {t('newTotalAmount')}
        </Text>
        <Text style={[historyStyles.text, {color: theme.textColor}]}>
          {item.newTotalAmount} {item.currencyToBeReceived}
        </Text>
      </View>
      <View style={historyStyles.bottom_container}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{textAlign: 'right', color: theme.textColor}}>
            {formatDate(new Date(parseInt(item.time)))}
          </Text>
          <Text style={{color: theme.textColor}}>
            + {item.outputValue} {item.currencyToBeReceived}
          </Text>
        </View>
        <Icon
          name="share-variant"
          size={20}
          color={theme.primary}
          onPress={handleShare}
        />
      </View>
    </View>
  );
};
const listCurrencies = (item, theme, setCurrencyValues, navigation) => {
  const goToCryptoDetail = () => {
    setCurrencyValues(prev => ({
      ...prev,
      currency: item.currency,
      buyValue: item.buyValue,
      sellValue: item.sellValue,
      time: item.time,
    }));
    navigation.navigate('ExchangeScreen', {
      currency: item.currency,
      buyValue: item.buyValue,
      time: item.time,
      sellValue: item.sellValue,
    });
  };

  return (
    <Pressable
      style={[currenciesStyle.item, {backgroundColor: theme.itemColor}]}
      onPress={() => goToCryptoDetail()}>
      <View style={currenciesStyle.card_container}>
        <View style={currenciesStyle.currency}>
          <Text style={[currenciesStyle.title, {color: theme.textColor}]}>
            {item.currency}
          </Text>
          <Text style={[currenciesStyle.try, {color: theme.textColor}]}>
            /TRY
          </Text>
        </View>
        <Text style={[currenciesStyle.subtitle, {color: theme.textColor}]}>
          {item.buyValue}
        </Text>
        <Text style={[currenciesStyle.subtitle, {color: theme.textColor}]}>
          {item.sellValue}
        </Text>
        <View
          style={[
            currenciesStyle.rate,
            {backgroundColor: item.backgroundColor},
          ]}>
          <Text style={[currenciesStyle.subtitle, {color: 'white'}]}>
            {item.changeRate}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export {AllBankAccountRender, HistoryRender, listCurrencies};
