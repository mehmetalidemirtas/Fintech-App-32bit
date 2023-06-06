import AsyncStorage from '@react-native-async-storage/async-storage';
export const updateAmountSell = async (
  newAmount,
  newAmountGet,
  selectedAccountToBeSold,
  selectedAccountToBeReceived,
) => {
  const bankAccountData = await AsyncStorage.getItem(selectedAccountToBeSold);
  if (bankAccountData !== null) {
    const parsedData = JSON.parse(bankAccountData);
    parsedData.amount = newAmount;
    await AsyncStorage.setItem(
      selectedAccountToBeSold,
      JSON.stringify(parsedData),
    );
  }
  const bankAccountTLData = await AsyncStorage.getItem(
    selectedAccountToBeReceived,
  );
  if (bankAccountTLData !== null) {
    const parsedData = JSON.parse(bankAccountTLData);
    parsedData.amount = newAmountGet;
    await AsyncStorage.setItem(
      selectedAccountToBeReceived,
      JSON.stringify(parsedData),
    );
  }
};
