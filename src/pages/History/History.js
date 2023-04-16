import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './History.style';

const PAGE_SIZE = 5;

const Watchlist = ({navigation}) => {
  const [bank, setBank] = useState([]);
  const theme = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBankData = async () => {
      setLoading(true);
      try {
        const keys = await AsyncStorage.getAllKeys();
        const identityNo = await AsyncStorage.getItem('currentUser');
        const filterKey = `${identityNo}_tradeHistory_`;
        const bankAccountKeys = keys.filter(key => key.includes(filterKey));
        const bankAccounts = await Promise.all(
          bankAccountKeys.map(async key => {
            const bankAccount = await AsyncStorage.getItem(key);
            return JSON.parse(bankAccount);
          }),
        );
        bankAccounts.sort((a, b) => b.time - a.time);
        setBank(bankAccounts);
        setLoading(false);
      } catch (e) {
        console.error('Error loading bank accounts from async storage:', e);
      }
    };
    getBankData();
  }, []);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const getPageData = () => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return bank.slice(start, end).sort((a, b) => b.time - a.time);
  };

  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const Item = ({item}) => (
    <View style={styles.card_container}>
      <Text style={[styles.title, {textAlign: 'center', marginBottom: 2}]}>
        {item.currencyNameToBeSold} / {item.currencyToBeReceived}
      </Text>
      <View style={styles.title_container}>
        <Text style={styles.title}>Satılan hesap:</Text>
        <Text style={styles.text}>{item.bankAccountToBeSold}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Aktarılan hesap: </Text>
        <Text style={styles.text}>{item.bankAccountToBeReceived}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Kur oranı: </Text>
        <Text style={styles.text}>{item.exchangeRate}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Toplam yeni bakiye: </Text>
        <Text style={styles.text}>
          {item.newTotalAmount} {item.currencyToBeReceived}
        </Text>
      </View>
      <Text style={{textAlign: 'right'}}>
        {formatDate(new Date(parseInt(item.time)))}
      </Text>
      <Text style={{textAlign: 'right'}}>
        + {item.outputValue} {item.currencyToBeReceived}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {loading ? (
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <ActivityIndicator color="red" size="large" />
        </View>
      ) : (
        <>
          <FlatList
            data={getPageData()}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={page === 0}
              style={[styles.button, page === 0 && styles.disabledButton]}
              onPress={handlePrevPage}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={(page + 1) * PAGE_SIZE >= bank.length}
              style={[
                styles.button,
                (page + 1) * PAGE_SIZE >= bank.length && styles.disabledButton,
              ]}
              onPress={handleNextPage}>
              <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Watchlist;
