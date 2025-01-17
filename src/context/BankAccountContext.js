import React, {createContext, useState} from 'react';
const BankContext = createContext();

export const BankProvider = ({children}) => {
  const [bank, setBank] = useState({
    bankType: '',
    currencyType: '',
    branchName: '',
    accountNo: '',
    iban: '',
    amount: '1000',
  });

  return (
    <BankContext.Provider value={{bank, setBank}}>
      {children}
    </BankContext.Provider>
  );
};
export default BankContext;
