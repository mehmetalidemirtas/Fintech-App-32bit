import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorites = async (identityNo, favorites) => {
  const favoriteCurrencies = Object.keys(favorites).filter(
    currency => favorites[currency],
  );
  const key = `${identityNo}_favoriteCurrencies`;

  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(favoriteCurrencies));
    console.log('Favorites saved:', favoriteCurrencies);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loadFavorites = async identityNo => {
  const key = `${identityNo}_favoriteCurrencies`;
  const favoriteCurrencies = await AsyncStorage.getItem(key);

  if (favoriteCurrencies) {
    const favoritesObj = {};
    JSON.parse(favoriteCurrencies).forEach(currency => {
      favoritesObj[currency] = true;
    });
    return favoritesObj;
  }

  return {};
};

export const getIdentity = async () => {
  const identityNo = await AsyncStorage.getItem('currentUser');
  return identityNo;
};

export const getFavoriteCurrencies = async () => {
  const identityNo = await AsyncStorage.getItem('currentUser');
  const favoriteCurrencies = await AsyncStorage.getItem(
    `${identityNo}_favoriteCurrencies`,
  );
  if (favoriteCurrencies) {
    return favoriteCurrencies;
  } else {
    return null;
  }
};

export const saveCurrencies = async currencies => {
  try {
    await AsyncStorage.setItem('currencies', JSON.stringify(currencies));
  } catch (error) {
    console.error(error);
  }
};
