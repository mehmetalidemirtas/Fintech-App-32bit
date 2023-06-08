import React, {useContext, useEffect} from 'react';
import {View, BackHandler, Platform, Text, SafeAreaView} from 'react-native';
import styles from './Summary.style';
import {ThemeContext} from '../../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import TradeHistoryContext from '../../../context/TradeHistoryContext';
import {useTranslation} from 'react-i18next';
import {saveTradeHistoryToStorage} from '../../../utils/saveTradeHistoryToStorage';
import {disableBackButton} from '../../../utils/disableBackButton';

const Exchange = props => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const {t} = useTranslation();
  disableBackButton();

  const {tradeHistory, setTradeHistory} = useContext(TradeHistoryContext);

  useEffect(() => {
    saveTradeHistoryToStorage(tradeHistory);
  }, [tradeHistory]);

  const handleSubmit = () => {
    navigation.navigate('WatchlistScreen');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View>
        <View style={styles.bottom_container}>
          <Text style={[styles.title, {color: theme.textColor}]}>
            {t('successful')}{' '}
          </Text>
          <Text style={[styles.text, {color: theme.textColor}]}>
            {t('newAmount')} {tradeHistory.newTotalAmount}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            contained
            onPress={handleSubmit}
            title={t('button.goToMainScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Exchange;
