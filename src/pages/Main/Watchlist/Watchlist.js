import React, { useState, useEffect,useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl , ScrollView,ActivityIndicator, SafeAreaView} from 'react-native';
import Button from '../../../components/Button/Button';
import { ThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const socket = io('http://10.0.2.2:3000');
const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {

    const getFavoriteCurrencies = async () => {
      const identityNo = await AsyncStorage.getItem('currentUser');
      const favoriteCurrencies = await AsyncStorage.getItem(`${identityNo}_favoriteCurrencies`);
      console.log("favorites:" +favoriteCurrencies);
      if (favoriteCurrencies) {
        return favoriteCurrencies.split(',');
      } else {
        return ['USD', 'IDR', 'JPY']; // Varsayılan olarak bu üç para birimini kullanabiliriz
      }
    }


    const saveCurrencies = async (currencies) => {
      try {
        await AsyncStorage.setItem('currencies', JSON.stringify(currencies));
        //console.log('Currencies saved:', currencies);
      } catch (error) {
        console.error(error);
      }
    };
    socket.on('currency-update', (message) => {
      const newData = message.split(',').map((value) => {
        const [currency, buyValue, sellValue, time,backgroundColor] = value.split('|');
        return {
          currency,
          buyValue,
          sellValue,
          time,
          backgroundColor,
        };
      });  
      setLoading(false);
      setData(newData);
      saveCurrencies(newData.map((currency) => currency.currency));
      getFavoriteCurrencies();
    });

    return () => {
      socket.disconnect();
      //saveCurrencies(newData.map((currency) => currency.currency));
    };
  }, []);


  const renderItem = ({ item }) => {
    const date = new Date(parseInt(item.time));    
    return (
      <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
         <Text style={styles.title}>{item.currency}/TRY</Text>
        <Text style={styles.subtitle}>Buy: {item.buyValue}</Text>
        <Text style={styles.subtitle}>Sell: {item.sellValue}</Text>      
        <Text style={styles.subtitle}>Last updated: {date.toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>            
    <View style={styles.item_container}>
      <Button contained title={t('button.createBankAccount')} onPress={()=> navigation.navigate('BankAccountTypeScreen')} />  
      <Button contained title="Choose your favorite currencies" onPress={()=> navigation.navigate('FavoriteCurrenciesScreen')} />      
      {loading ? (
  <View style={{ flex: 10, justifyContent: "center", alignItems: "center", marginBottom:50 }}>
    <ActivityIndicator color="black" size="large" />
    <Text style={{ marginTop: 10 }}>{t('loading.websocket')}</Text>
  </View>
) : (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.currency}
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
    padding: 12,    
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  item_container:{
    flex:0.99,
    margin:10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  subtitle: {
    color:"white",
    fontSize: 16,
  },
});

export default Watchlist;