import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text,ActivityIndicator } from 'react-native';
import Button from '../../components/Button'
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ChooseFavoriteCurrencies = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [identityNo, setIdentityNo] = useState(null);
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {    
    const getIdentity= async ()=>{
      const identityNo = await AsyncStorage.getItem('currentUser');
        setIdentityNo(identityNo);
      }        
    const loadCurrencies = async () => {
      try {
        const savedCurrencies = await AsyncStorage.getItem('currencies');
        if (savedCurrencies) {
          setData(JSON.parse(savedCurrencies));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencies();
    getIdentity();
    //console.log(identityNo);
  }, []);

  const [favorites, setFavorites] = useState({});

  const toggleCheckbox = (currency) => {
    setFavorites((prev) => ({ ...prev, [currency]: !prev[currency] }));
  };

  const saveFavorites = async () => {
    const favoriteCurrencies = Object.keys(favorites);
    const key = `${identityNo}_favoriteCurrencies`; // Her bir kullanıcı için ayrı ayrı favori listesi oluştur
    console.log("key:: "+ key);
    await AsyncStorage.setItem(key, JSON.stringify(favoriteCurrencies));
    console.log('Favorites saved:', favoriteCurrencies);
    navigation.navigate('WatchlistScreen')
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
          <Text style={[styles.title,{color: theme.primary}]}>Choose your favorite currencies</Text>
        {loading ? (
  <View style={{ flex: 10, justifyContent: "center", alignItems: "center", marginBottom:50 }}>
    <ActivityIndicator color="black" size="large" />
    <Text style={{ marginTop: 10 }}>{t('loading.currencies')}</Text>
  </View>
) : (<>
        {data.map((currency) => (
          <Checkbox.Item
            key={currency}
            label={currency}
            status={favorites[currency] ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox(currency)}
          />
        ))}
      
        <Button contained title="Save favorite currencies" onPress={saveFavorites} />
        </> )}
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
  item_container:{
    flex:0.99,
  },
});

export default ChooseFavoriteCurrencies;
