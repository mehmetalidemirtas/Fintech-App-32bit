import React, {createContext, useState} from 'react';
const TradeHistoryContext = createContext();

export const TradeHistoryProvider = ({children}) => {
  const [tradeHistory, setTradeHistory] = useState({
    currencyName: '',
    bankAccountToBeSold: '',
    inputValue: '',
    bankAccountToBeReceived: '',
    currencyToBeReceived: '',
    exchangeRate: '',
    outputValue: '',
  });

  return (
    <TradeHistoryContext.Provider value={{tradeHistory, setTradeHistory}}>
      {children}
    </TradeHistoryContext.Provider>
  );
};

export default TradeHistoryContext;
