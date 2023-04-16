import React, {createContext, useState} from 'react';
const TradeHistoryContext = createContext();

export const TradeHistoryProvider = ({children}) => {
  const [tradeHistory, setTradeHistory] = useState({
    currencyNameToBeSold: '',
    bankAccountToBeSold: '',
    inputValue: '',
    bankAccountToBeReceived: '',
    currencyToBeReceived: '',
    exchangeRate: '',
    outputValue: '',
    newTotalAmount: '',
    time: '',
  });

  return (
    <TradeHistoryContext.Provider value={{tradeHistory, setTradeHistory}}>
      {children}
    </TradeHistoryContext.Provider>
  );
};

export default TradeHistoryContext;
