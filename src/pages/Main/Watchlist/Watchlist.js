import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import Button from '../../../components/Button/Button';
const CURRENCIES = ['USD', 'EUR', 'GBP', 'IDR', 'JPY'];

const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://10.0.2.2:3000');

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

      setData(newData);
    });

    return () => {
      socket.disconnect();
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
    <View style={styles.container}>
      <View style={styles.item_container}>
      <Button contained title="Yeni hesap oluştur"  onPress={()=> navigation.navigate('BankAccountTypeScreen')} />  
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.currency}
      />
    </View>
    </View>
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