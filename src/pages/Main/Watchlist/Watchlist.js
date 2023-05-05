import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
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
const url = 'https://fx32.vercel.app:80/';
const socket = io(url);

const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const {currencyValues, setCurrencyValues} = useContext(CurrencyContext);
  const [isMounted, setIsMounted] = useState(false);
  const [isconnected, setIsconnected] = useState(false);

  const [loading, setLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const getFavoriteCurrencies = async () => {
    const identityNo = await AsyncStorage.getItem('currentUser');
    const favoriteCurrencies = await AsyncStorage.getItem(
      `${identityNo}_favoriteCurrencies`,
    );
    if (favoriteCurrencies) {
      const favorites = favoriteCurrencies.split(',');
      const filteredData = data.filter(currency =>
        favorites.includes(currency.currency),
      );
      setData(filteredData);
    }
  };

  const saveCurrencies = async currencies => {
    try {
      await AsyncStorage.setItem('currencies', JSON.stringify(currencies));
      //console.log('Currencies saved:', currencies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setIsMounted(true);

    const getFavoriteCurrencies = async () => {
      const identityNo = await AsyncStorage.getItem('currentUser');
      const favoriteCurrencies = await AsyncStorage.getItem(
        `${identityNo}_favoriteCurrencies`,
      );
      if (favoriteCurrencies) {
        return favoriteCurrencies;
      } else {
        return null;
      }
    };

    const saveCurrencies = async currencies => {
      try {
        await AsyncStorage.setItem('currencies', JSON.stringify(currencies));
      } catch (error) {
        console.error(error);
      }
    };

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
  const renderItem = ({item}) => {
    const goToCryptoDetail = () => {
      setCurrencyValues(prev => ({
        ...prev,
        currency: item.currency,
        buyValue: item.buyValue,
        sellValue: item.sellValue,
        time: item.time,
      }));
      //console.log('values:' + currencyValues);
      navigation.navigate('ExchangeScreen', {
        currency: item.currency,
        buyValue: item.buyValue,
        time: item.time,
        sellValue: item.sellValue,
      });
    };
    return (
      <Pressable
        style={[styles.item, {backgroundColor: theme.itemColor}]}
        onPress={() => goToCryptoDetail()}>
        <View style={styles.card_container}>
          <View style={styles.currency}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {item.currency}
            </Text>
            <Text style={[styles.try, {color: theme.textColor}]}>/TRY</Text>
          </View>
          <Text style={[styles.subtitle, {color: theme.textColor}]}>
            {item.buyValue}
          </Text>
          <Text style={[styles.subtitle, {color: theme.textColor}]}>
            {item.sellValue}
          </Text>
          <View style={[styles.rate, {backgroundColor: item.backgroundColor}]}>
            <Text style={[styles.subtitle, {color: 'white'}]}>
              {item.changeRate}%
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

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
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.currency}
        />
      )}
    </SafeAreaView>
  );
};
export default Watchlist;
