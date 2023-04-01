import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import colors from '../styles/colors';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: 'white',
    textColor: 'black',
  });

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme({
      backgroundColor: colorScheme === 'dark' ? colors.dark_background : colors.light_background,
      primary: colorScheme === 'dark' ?  colors.dark_primary: colors.light_primary,
      textColor: colorScheme === 'dark' ? colors.dark_text : colors.light_text,
      cardColor: colorScheme === 'dark' ? colors.dark_card_bg : colors.light_card_bg,
      statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
    });

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({
        backgroundColor: colorScheme === 'dark' ? colors.dark_background : colors.light_background,
        primary: colorScheme === 'dark' ?  colors.dark_primary: colors.light_primary,
        textColor: colorScheme === 'dark' ? colors.dark_text : colors.light_text,
        cardColor: colorScheme === 'dark' ? colors.dark_card_bg : colors.light_card_bg,
        statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
      });
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};