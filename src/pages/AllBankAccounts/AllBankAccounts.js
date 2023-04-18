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
import styles from './AllBankAccounts.syle';

const PAGE_SIZE = 5;

const AllBankAccounts = ({navigation}) => {
  const [bank, setBank] = useState([]);
  const {theme} = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getBankData = async () => {
    setLoading(true);

    try {
      const keys = await AsyncStorage.getAllKeys(); // Tüm async storage anahtarlarını al
      const identityNo = await AsyncStorage.getItem('currentUser');
      const filterKey = `${identityNo}_bankAccount_`;
      const bankAccountKeys = keys.filter(key => key.includes(filterKey)); // Sadece banka hesapları için anahtarları filtrele
      const bankAccounts = await Promise.all(
        bankAccountKeys.map(async key => {
          const bankAccount = await AsyncStorage.getItem(key); // Her bir banka hesabı için getItem ile async storage'dan verileri yükle
          return JSON.parse(bankAccount);
        }),
      );
      // Banka hesaplarını tarihlerine göre sırala
      setBank(bankAccounts);
      setLoading(false);
    } catch (e) {
      console.error('Error loading bank accounts from async storage:', e);
    }
  };
  useEffect(() => {
    getBankData();
    return () => {};
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
    return bank.slice(start, end);
  };

  function formatAmount(amount) {
    const newAmount = Number(amount).toFixed(2);
    return newAmount;
  }
  const Item = ({item}) => (
    <View style={styles.card_container}>
      <Text style={[styles.title, {textAlign: 'center', marginBottom: 2}]}>
        {item.currencyType}
      </Text>
      <View style={styles.title_container}>
        <Text style={styles.title}>Hesap türü: </Text>
        <Text style={styles.text}>{item.bankType}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Şube adı: </Text>
        <Text style={styles.text}>{item.branchName}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Hesap numarası: </Text>
        <Text style={styles.text}>{item.accountNo}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>IBAN: </Text>
        <Text style={styles.text}>{item.iban}</Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Toplam bakiye: </Text>
        <Text style={styles.text}>{formatAmount(item.amount)}</Text>
      </View>
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

export default AllBankAccounts;
