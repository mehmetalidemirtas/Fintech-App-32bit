import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
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

const socket = io('http://10.0.2.2:3000');
const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const {currencyValues, setCurrencyValues} = useContext(CurrencyContext);

  const [loading, setLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [currencies, setCurrencies] = useState([]);

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

    let timeout;

    const handleSocketConnection = () => {
      if (!socket.connected) {
        console.log('Socket bağlantısı yok, tekrar deneniyor...');
        socket.connect();
      }
      timeout = setTimeout(() => {
        handleSocketConnection();
      }, 15000);
    };

    socket.on('connect', () => {
      console.log('Socket connected!');
      clearTimeout(timeout);
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
        if (favorites) {
          const favoriteData = newData.filter(currency =>
            favorites.includes(currency.currency),
          );
          setData(favoriteData);
        } else {
          setData(newData);
        }
        setLoading(false);
      });
      saveCurrencies(newData.map(currency => currency.currency));
    });

    handleSocketConnection();

    return () => {
      socket.disconnect();
      clearTimeout(timeout);
    };
  }, []);
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
      <Pressable style={styles.item} onPress={() => goToCryptoDetail()}>
        <View style={styles.card_container}>
          <View style={styles.currency}>
            <Text style={styles.title}>{item.currency}</Text>
            <Text style={styles.try}>/TRY</Text>
          </View>
          <Text style={styles.subtitle}>{item.buyValue}</Text>
          <Text style={styles.subtitle}>{item.sellValue}</Text>
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
                  color={theme.primary}
                  onPress={() => navigation.navigate('BankAccountTypeScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.primary}]}>
                  New bank account
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="star-plus"
                  size={35}
                  color={theme.primary}
                  onPress={() =>
                    navigation.navigate('FavoriteCurrenciesScreen')
                  }
                />
                <Text style={[styles.icon_text, {color: theme.primary}]}>
                  Favorite currencies
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="history"
                  size={35}
                  color={theme.primary}
                  onPress={() => navigation.navigate('HistoryScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.primary}]}>
                  Trade history
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="bank"
                  size={35}
                  color={theme.primary}
                  onPress={() => navigation.navigate('AllBankAccountsScreen')}
                />
                <Text style={[styles.icon_text, {color: theme.primary}]}>
                  All bank accounts
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom_container}>
        <Text style={styles.bar}>Currency</Text>
        <Text style={styles.bar}>Buy price</Text>
        <Text style={styles.bar}>Sell price</Text>
        <Text style={styles.change}>Change%</Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <ActivityIndicator color="black" size="large" />
          <Text style={{marginTop: 10}}>{t('loading.websocket')}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.currency}
        />
      )}
    </SafeAreaView>
  );
};
export default Watchlist;
