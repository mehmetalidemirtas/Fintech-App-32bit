import React, {createContext, useState} from 'react';
const TradeContext = createContext();

export const TradeProvider = ({children}) => {
  const [currencyValues, setCurrencyValues] = useState({
    currency: '',
    buyValue: '',
    sellValue: '',
  });

  return (
    <TradeContext.Provider value={{currencyValues, setCurrencyValues}}>
      {children}
    </TradeContext.Provider>
  );
};

export default TradeContext;
