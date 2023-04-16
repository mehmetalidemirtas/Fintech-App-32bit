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

const socket = io('http://10.0.2.2:3000');
const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const {currencyValues, setCurrencyValues} = useContext(CurrencyContext);

  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);
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
    /*
    const formatDate = date => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
      <Text>time: {formatDate(new Date(parseInt(currencyValues.time)))}</Text>
    };*/
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  item_container: {
    margin: 10,
    marginBottom: 0,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontSize: 16,
  },
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  change: {
    width: 90,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bar: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    marginTop: 10,
  },
  currency: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  try: {
    color: '#191825',
    fontSize: 15,
    marginLeft: 3,
  },
  bottom_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  icon: {
    paddingBottom: 2,
    marginBottom: 5,
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  icon_text: {},
});

export default Watchlist;
