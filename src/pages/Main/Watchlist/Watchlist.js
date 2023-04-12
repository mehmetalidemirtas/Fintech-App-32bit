import React, {useState, useEffect, useCallback, useContext} from 'react';
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

import Button from '../../../components/Button/Button';
import {ThemeContext} from '../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const socket = io('http://10.0.2.2:3000');
const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
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

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderItem = ({item}) => {
    const goToCryptoDetail = () => {
      navigation.navigate('TradeScreen', {currency: item.currency});
    };

    const date = new Date(parseInt(item.time));
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
        <Button
          contained
          title={t('button.createBankAccount')}
          onPress={() => navigation.navigate('BankAccountTypeScreen')}
        />
        <Button
          contained
          title="Choose your favorite currencies"
          onPress={() => navigation.navigate('FavoriteCurrenciesScreen')}
        />
        <View style={styles.bottom_container}>
          <Text>Currency</Text>
          <Text>Buy price</Text>
          <Text>Sell price</Text>
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
    flex: 0.99,
    margin: 10,
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
});

export default Watchlist;
