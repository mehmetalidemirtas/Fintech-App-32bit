import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTradeHistoryToStorage = async tradeHistory => {
  try {
    const identityNo = await AsyncStorage.getItem('currentUser');
    const time = Date.now();
    const key = `${identityNo}_tradeHistory_${time}`;
    await AsyncStorage.setItem(key, JSON.stringify(tradeHistory));
  } catch (error) {
    console.log(error);
  }
};
