import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import styles from './FavoriteCurrencies.style';
import {
  saveFavorites,
  loadFavorites,
  getIdentity,
} from '../../utils/FavoriteCurrenciesUtils';

const ChooseFavoriteCurrencies = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [identityNo, setIdentityNo] = useState(null);
  const [favorites, setFavorites] = useState({});
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    //Daha önce favorilere eklenenleri göster.
    const loadFavoritesData = async () => {
      const favoritesData = await loadFavorites(identityNo);
      setFavorites(favoritesData);
      setLoading(false);
    };

    if (identityNo) {
      loadFavoritesData();
    }
  }, [identityNo]);

  useEffect(() => {
    //websocket bağlantısından gelen bütün para birimlerini listele.
    const fetchData = async () => {
      try {
        const savedCurrencies = await AsyncStorage.getItem('currencies');
        if (savedCurrencies) {
          setData(JSON.parse(savedCurrencies));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getIdentity().then(identityNo => setIdentityNo(identityNo));
  }, []);

  const toggleCheckbox = currency => {
    setFavorites(prev => ({...prev, [currency]: !prev[currency]}));
  };

  const saveFavoritesData = async () => {
    setIsLoading(true);
    const success = await saveFavorites(identityNo, favorites);

    if (success) {
      setIsLoading(false);
      navigation.navigate('WatchlistScreen');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t('title.chooseFavoriteCurrencies')}
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
                color={theme.primary}
                labelStyle={{color: theme.textColor}}
                label={currency}
                status={favorites[currency] ? 'checked' : 'unchecked'}
                onPress={() => toggleCheckbox(currency)}
              />
            ))}
            <Button
              contained
              title={t('button.saveFavorite')}
              onPress={saveFavoritesData}
              loading={isLoading}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ChooseFavoriteCurrencies;
