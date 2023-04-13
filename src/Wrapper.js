import React from 'react';
import Router from './Router';
import {UserProvider} from './context/UserContext';
import {BankProvider} from './context/BankAccountContext';
import {ThemeProvider} from './context/ThemeContext';
import {CurrencyProvider} from './context/CurrencyContext';

import FlashMessage from 'react-native-flash-message';
export default () => {
  // içteki Context yapıları, dıştaki Context yapılarının sağladığı değerlere erişebilirler.
  return (
    <UserProvider>
      <BankProvider>
        <CurrencyProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </CurrencyProvider>
        <FlashMessage style={{marginTop: 25}} position="top" />
      </BankProvider>
    </UserProvider>
  );
};
