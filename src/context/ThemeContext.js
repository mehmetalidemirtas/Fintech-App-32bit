import React, {createContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState({
    backgroundColor: 'white',
    textColor: 'black',
  });

  const setAppTheme = colorScheme => {
    setTheme({
      backgroundColor:
        colorScheme === 'dark'
          ? colors.dark_background
          : colors.light_background,
      primary:
        colorScheme === 'dark' ? colors.dark_primary : colors.light_primary,
      textColor: colorScheme === 'dark' ? colors.dark_text : colors.light_text,
      mainColor:
        colorScheme === 'dark' ? colors.light_primary : colors.light_primary,
      buttonColor:
        colorScheme === 'dark'
          ? colors.item_dark_background
          : colors.button_light_color,
      iconColor:
        colorScheme === 'dark'
          ? colors.icon_dark_color
          : colors.icon_light_color,
      itemColor:
        colorScheme === 'dark'
          ? colors.item_dark_background
          : colors.item_light_background,
      cardColor:
        colorScheme === 'dark' ? colors.dark_card_bg : colors.light_card_bg,
      statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
    });
  };

  const toggleAppTheme = () => {
    const newMode =
      theme.backgroundColor === colors.light_background ? 'dark' : 'light';
    setAppTheme(newMode);
    AsyncStorage.setItem('theme', newMode);
  };

  useEffect(() => {
    const getTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme !== null) {
        setAppTheme(storedTheme);
      } else {
        const colorScheme = Appearance.getColorScheme();
        setAppTheme(colorScheme);
      }
    };
    getTheme();

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setAppTheme(colorScheme);
      AsyncStorage.setItem('theme', colorScheme);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleAppTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
