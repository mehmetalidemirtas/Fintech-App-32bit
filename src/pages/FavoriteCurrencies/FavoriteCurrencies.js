import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const ChooseFavoriteCurrencies = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [identityNo, setIdentityNo] = useState(null);
  const [favorites, setFavorites] = useState({});
  const {t} = useTranslation();
  const theme = useContext(ThemeContext);
  useEffect(() => {
    const loadFavorites = async () => {
      const key = `${identityNo}_favoriteCurrencies`;
      const favoriteCurrencies = await AsyncStorage.getItem(key);
      if (favoriteCurrencies) {
        const favoritesObj = {};
        JSON.parse(favoriteCurrencies).forEach(currency => {
          favoritesObj[currency] = true;
        });
        setFavorites(favoritesObj);
      }
      setLoading(false);
    };

    if (identityNo) {
      loadFavorites();
    }
  }, [identityNo]);
  useEffect(() => {
    const getIdentity = async () => {
      const identityNo = await AsyncStorage.getItem('currentUser');
      setIdentityNo(identityNo);
    };
    const loadCurrencies = async () => {
      try {
        const savedCurrencies = await AsyncStorage.getItem('currencies');
        if (savedCurrencies) {
          setData(JSON.parse(savedCurrencies));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadCurrencies();
    getIdentity();
  }, []);

  const toggleCheckbox = currency => {
    setFavorites(prev => ({...prev, [currency]: !prev[currency]}));
  };

  const saveFavorites = async () => {
    setIsLoading(true);
    const favoriteCurrencies = Object.keys(favorites).filter(
      currency => favorites[currency],
    );
    const key = `${identityNo}_favoriteCurrencies`;
    console.log('key:: ' + key);

    try {
      // Async storage'de var olan kaydı silmek için
      await AsyncStorage.removeItem(key);

      // Yeni kaydı oluşturmak için
      await AsyncStorage.setItem(key, JSON.stringify(favoriteCurrencies));
      console.log('Favorites saved:', favoriteCurrencies);
      setLoading(false);
      navigation.navigate('WatchlistScreen');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.title, {color: theme.primary}]}>
          Choose your favorite currencies
        </Text>
        {loading ? (
          <View
            style={{
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 50,
            }}>
            <ActivityIndicator color="black" size="large" />
            <Text style={{marginTop: 10}}>{t('loading.currencies')}</Text>
          </View>
        ) : (
          <>
            {data.map(currency => (
              <Checkbox.Item
                key={currency}
                label={currency}
                status={favorites[currency] ? 'checked' : 'unchecked'}
                onPress={() => toggleCheckbox(currency)}
              />
            ))}
            <Button
              contained
              title="Save favorite currencies"
              onPress={saveFavorites}
              loading={isLoading}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item_container: {
    flex: 0.99,
  },
});

export default ChooseFavoriteCurrencies;
