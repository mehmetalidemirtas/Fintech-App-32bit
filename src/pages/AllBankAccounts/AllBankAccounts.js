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
import {useTranslation} from 'react-i18next';
import {AllBankAccountRender} from '../../components/ListItem/ListItem';

const PAGE_SIZE = 5;

const AllBankAccounts = ({navigation}) => {
  const [bank, setBank] = useState([]);
  const {theme} = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const getBankData = async () => {
    setLoading(true);

    try {
      const keys = await AsyncStorage.getAllKeys();
      const identityNo = await AsyncStorage.getItem('currentUser');
      const filterKey = `${identityNo}_bankAccount_`;
      const bankAccountKeys = keys.filter(key => key.includes(filterKey));
      const bankAccounts = await Promise.all(
        bankAccountKeys.map(async key => {
          const bankAccount = await AsyncStorage.getItem(key);
          return JSON.parse(bankAccount);
        }),
      );
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
            renderItem={({item}) => <AllBankAccountRender item={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <View style={styles.pagination}>
                <TouchableOpacity
                  disabled={page === 0}
                  style={[
                    styles.button,
                    {backgroundColor: theme.buttonColor},
                    page === 0 && styles.disabledButton,
                  ]}
                  onPress={handlePrevPage}>
                  <Text style={styles.buttonText}>{'<'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={(page + 1) * PAGE_SIZE >= bank.length}
                  style={[
                    styles.button,
                    {backgroundColor: theme.buttonColor},
                    (page + 1) * PAGE_SIZE >= bank.length &&
                      styles.disabledButton,
                  ]}
                  onPress={handleNextPage}>
                  <Text style={styles.buttonText}>{'>'}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default AllBankAccounts;
