import React, {useContext, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './Summary.style';
import {ThemeContext} from '../../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import TradeHistoryContext from '../../../context/TradeHistoryContext';
import {useTranslation} from 'react-i18next';

const Exchange = props => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {tradeHistory, setTradeHistory} = useContext(TradeHistoryContext);
  useEffect(() => {
    const saveTradeHistoryToStorage = async () => {
      try {
        const identityNo = await AsyncStorage.getItem('currentUser');
        const time = Date.now();
        const key = `${identityNo}_tradeHistory_${time}`;
        await AsyncStorage.setItem(key, JSON.stringify(tradeHistory));
      } catch (error) {
        console.log(error);
      }
    };
    saveTradeHistoryToStorage();
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
