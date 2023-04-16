import React from 'react';
import Router from './Router';
import {UserProvider} from './context/UserContext';
import {BankProvider} from './context/BankAccountContext';
import {ThemeProvider} from './context/ThemeContext';
import {CurrencyProvider} from './context/CurrencyContext';
import {TradeHistoryProvider} from './context/TradeHistoryContext';

import FlashMessage from 'react-native-flash-message';
export default () => {
  // içteki Context yapıları, dıştaki Context yapılarının sağladığı değerlere erişebilirler.
  return (
    <UserProvider>
      <BankProvider>
        <CurrencyProvider>
          <TradeHistoryProvider>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </TradeHistoryProvider>
        </CurrencyProvider>
        <FlashMessage style={{marginTop: 20}} position="top" />
      </BankProvider>
    </UserProvider>
  );
};
