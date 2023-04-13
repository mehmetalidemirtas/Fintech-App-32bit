import React, {createContext, useState} from 'react';
const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {
  const [currencyValues, setCurrencyValues] = useState({
    currency: '',
    buyValue: '',
    sellValue: '',
  });

  return (
    <CurrencyContext.Provider value={{currencyValues, setCurrencyValues}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
