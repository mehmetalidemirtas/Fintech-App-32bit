import React from 'react';
import Router from './Router';
import {UserProvider} from './context/UserContext';
import {BankProvider} from './context/BankAccountContext';
import {ThemeProvider} from './context/ThemeContext';
import {CurrencyProvider} from './context/CurrencyContext';
import {TradeHistoryProvider} from './context/TradeHistoryContext';

import FlashMessage from 'react-native-flash-message';
export default () => {
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
        <FlashMessage style={{marginTop: 30}} position="top" />
      </BankProvider>
    </UserProvider>
  );
};
