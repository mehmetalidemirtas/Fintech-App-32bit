import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: 'white',
    textColor: 'black',
  });

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme({
      backgroundColor: colorScheme === 'dark' ? 'blue' : 'yellow',
      textColor: colorScheme === 'dark' ? 'white' : 'black',
    });

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        textColor: colorScheme === 'dark' ? 'white' : 'black',
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