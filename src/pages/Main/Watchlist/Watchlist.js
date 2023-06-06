import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button/Button';
import {ThemeContext} from '../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyContext from '../../../context/CurrencyContext';
import styles from './Watchlist.style';
import {
  getFavoriteCurrencies,
  saveCurrencies,
} from '../../../utils/FavoriteCurrenciesUtils';
import {listCurrencies} from '../../../components/ListItem/ListItem';
import {connectionString} from '../../../server/connectionString';

const socket = io(connectionString);

const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const {currencyValues, setCurrencyValues} = useContext(CurrencyContext);
  const [isMounted, setIsMounted] = useState(false);
  const [isconnected, setIsconnected] = useState(false);

  const [loading, setLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  useEffect(() => {
    setIsMounted(true);

    const checkSocketConnection = () => {
      if (socket.connected) {
        return;
      }

      console.log('Socket bağlantısı yok, tekrar deneniyor...');
      socket.connect();
    };

    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.on('currency-update', message => {
      const newData = message.split(',').map(value => {
        const [
          currency,
          buyValue,
          sellValue,
          time,
          backgroundColor,
          changeRate,
        ] = value.split('|');
        return {
          currency,
          buyValue,
          sellValue,
          time,
          backgroundColor,
          changeRate,
        };
      });

      // Get favorite currencies
      getFavoriteCurrencies().then(favorites => {
        if (isMounted) {
          if (favorites) {
            const favoriteData = newData.filter(currency =>
              favorites.includes(currency.currency),
            );
            setData(favoriteData);
          } else {
            setData(newData);
          }
          setLoading(false);
        }
      });
      saveCurrencies(newData.map(currency => currency.currency));
    });

    checkSocketConnection();

    return () => {
      setIsMounted(false);
      socket.disconnect();
    };
  }, [isMounted]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.item_container}>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon}>
                <Icon
                  name="bank-plus"
                  size={35}
                  color={theme.mainColor}
                  onPress={() => navigation.navigate('BankAccountTypeScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.mainColor}]}>
                  {t('icon.newBankAccount')}
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="star-plus"
                  size={35}
                  color={theme.mainColor}
                  onPress={() =>
                    navigation.navigate('FavoriteCurrenciesScreen')
                  }
                />
                <Text style={[styles.icon_text, {color: theme.mainColor}]}>
                  {t('icon.favoriteCurrencies')}
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="history"
                  size={35}
                  color={theme.mainColor}
                  onPress={() => navigation.navigate('HistoryScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.mainColor}]}>
                  {t('icon.tradeHistory')}
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="bank"
                  size={35}
                  color={theme.mainColor}
                  onPress={() => navigation.navigate('AllBankAccountsScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.mainColor}]}>
                  {t('icon.allBankAccounts')}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom_container}>
        <Text style={[styles.bar, {color: theme.textColor}]}>
          {t('title.currency')}
        </Text>
        <Text style={[styles.bar, {color: theme.textColor}]}>
          {t('title.buyPrice')}
        </Text>
        <Text style={[styles.bar, {color: theme.textColor}]}>
          {t('title.sellPrice')}
        </Text>
        <Text style={[styles.change, {color: theme.textColor}]}>
          {t('title.change')}
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <ActivityIndicator color={theme.textColor} size="large" />
          <Text style={{marginTop: 10, color: theme.textColor}}>
            {t('loading.websocket')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) =>
            listCurrencies(item, theme, setCurrencyValues, navigation)
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.currency}
        />
      )}
    </SafeAreaView>
  );
};
export default Watchlist;
