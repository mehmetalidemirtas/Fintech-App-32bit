import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Share,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './History.style';
import {Searchbar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {HistoryRender} from '../../components/ListItem/ListItem';

const PAGE_SIZE = 5;

const History = ({navigation}) => {
  const [bank, setBank] = useState([]);
  const {theme} = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const {t} = useTranslation();

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
    const data = searchData.length > 0 ? searchData : bank;
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const sortedData = data.sort((a, b) =>
      isAscending ? a.time - b.time : b.time - a.time,
    );
    const slicedData = sortedData.slice(start, end);

    return slicedData;
  };
  const search = searchText => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const filteredBank = bank.filter(
      item =>
        item.currencyNameToBeSold
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.currencyToBeReceived
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.bankAccountToBeSold
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.bankAccountToBeReceived
          .toLowerCase()
          .includes(searchText.toLowerCase()),
    );

    return filteredBank.slice(start, end).sort((a, b) => b.time - a.time);
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
          <View style={styles.header}>
            <View style={{marginTop: 10, flex: 0.99}}>
              <Searchbar
                style={{
                  backgroundColor: theme.itemColor,
                  color: 'black',
                  height: 45,
                }}
                inputStyle={{alignSelf: 'center', color: theme.textColor}}
                placeholder={t('search')}
                placeholderTextColor={theme.textColor}
                onChangeText={text => setSearchText(text)}
                value={searchText}
              />
            </View>
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={() => setIsAscending(prev => !prev)}>
              <Text style={[styles.sortButton, {color: theme.primary}]}>
                {isAscending ? t('newest') : t('oldest')}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchText !== '' ? search(searchText) : getPageData()}
            renderItem={({item}) => <HistoryRender item={item} />}
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

export default History;
