import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './styles/colors';
import Login from './pages/Login';
import Identity from './pages/Register/Identity';
import Photo from './pages/Register/Photo';
import Password from './pages/Register/Password';
import Watchlist from './pages/Main/Watchlist';
import Settings from './pages/Settings';
import History from './pages/History';
import BankAccountType from './pages/NewBankAccount/BankAccountType';
import BankCurrencyType from './pages/NewBankAccount/BankCurrencyType';
import BankBranch from './pages/NewBankAccount/BankBranch';
import Summary from './pages/NewBankAccount/Summary';
import Confirmation from './pages/NewBankAccount/Confirmation';
import ForgotPassword from './pages/Register/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './pages/Splash';
import {ThemeContext} from './context/ThemeContext';
import FavoriteCurrencies from './pages/FavoriteCurrencies';
import io from 'socket.io-client';
import TradeSummary from './pages/Trade/Summary';
import Exchange from './pages/Trade/Exchange';
import AllBankAccounts from './pages/AllBankAccounts';
import ChangePassword from './pages/Settings/SettingScreens/ChangePassword';
import ChangePhoto from './pages/Settings/SettingScreens/ChangePhoto';
import ChangePhone from './pages/Settings/SettingScreens/ChangePhone';
const socket = io('http://fx32.vercel.app/');
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const screenOptions = {
    headerStyle: {backgroundColor: theme.backgroundColor},
    headerTitleStyle: {color: theme.textColor},
    headerTitleAlign: 'center',
    statusBarColor: theme.backgroundColor,
    statusBarStyle: theme.statusBarStyle,
    headerTintColor: colors.primary,
    navigationBarColor: theme.backgroundColor,
    backgroundColor: theme.backgroundColor,
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  const LoginStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: theme.backgroundColor,
          statusBarStyle: theme.statusBarStyle,
          navigationBarColor: theme.backgroundColor,
          backgroundColor: theme.backgroundColor,
        }}>
        <Stack.Screen name="LoginScreen">
          {props => (
            <Login
              {...props}
              handleLogin={handleLogin}
              options={{
                presentation: 'transparentModal',
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="IdentityScreen"
          options={{
            presentation: 'transparentModal',
          }}
          component={Identity}
        />
        <Stack.Screen
          name="PhotoScreen"
          options={{
            presentation: 'transparentModal',
          }}
          component={Photo}
        />
        <Stack.Screen
          name="PasswordScreen"
          options={{
            presentation: 'transparentModal',
          }}
          component={Password}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          options={{
            presentation: 'transparentModal',
          }}
          component={ForgotPassword}
        />
      </Stack.Navigator>
    );
  };

  const MainTabs = () => {
    return (
      <Tab.Navigator
        backgroundColor={theme.backgroundColor}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.backgroundColor,
            padding: 5,
          },
          navigationBarColor: theme.backgroundColor,
          headerShown: false,
          backgroundColor: theme.backgroundColor,
          tabBarActiveTintColor: theme.textColor,
          tabBarInactiveTintColor: '#aaa',
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}>
        <Tab.Screen
          screenOptions={{
            navigationBarColor: theme.backgroundColor,
            backgroundColor: theme.backgroundColor,
          }}
          name="WatchlistStack"
          component={WatchlistStack}
          options={{
            tabBarLabel: t('watchlist'),
            presentation: 'transparentModal',
            tabBarIcon: () => (
              <Icon name="home" color={theme.primary} size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="SettingsScreen"
          component={SettingsStack}
          options={{
            tabBarLabel: t('settings'),
            presentation: 'transparentModal',
            tabBarIcon: () => (
              <Icon name="cog" color={theme.primary} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const SettingsStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Setting"
          component={Settings}
          options={{
            title: t('settings'),
            presentation: 'transparentModal',
            headerBackVisible: false,
            headerRight: () => (
              <Icon
                name="logout"
                size={25}
                color={theme.textColor}
                onPress={onLogout}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePassword}
          options={{
            presentation: 'transparentModal',
            title: t('settings.changePassword'),
          }}
        />
        <Stack.Screen
          name="ChangePhoneScreen"
          component={ChangePhone}
          options={{
            presentation: 'transparentModal',
            title: t('settings.changePhoneNumber'),
          }}
        />
        <Stack.Screen
          name="ChangePhotoScreen"
          component={ChangePhoto}
          options={{
            presentation: 'transparentModal',
            title: t('settings.changeProfilePhoto'),
          }}
        />
      </Stack.Navigator>
    );
  };

  const WatchlistStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="WatchlistScreen"
          component={Watchlist}
          options={{
            presentation: 'transparentModal',
            title: t('watchlist'),
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="BankAccountTypeScreen"
          component={BankAccountType}
          options={{
            presentation: 'transparentModal',
            title: t('title.bankAccountType'),
          }}
        />
        <Stack.Screen
          name="BankCurrencyTypeScreen"
          component={BankCurrencyType}
          options={{
            presentation: 'transparentModal',
            title: t('title.currencyType'),
          }}
        />
        <Stack.Screen
          name="BankBranchScreen"
          component={BankBranch}
          options={{
            presentation: 'transparentModal',
            title: t('title.bankBranch'),
          }}
        />
        <Stack.Screen
          name="ConfirmationScreen"
          component={Confirmation}
          options={{
            title: t('title.confirmation'),
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="SummaryScreen"
          component={Summary}
          options={{
            title: t('title.summary'),
            headerBackVisible: false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={History}
          options={{
            title: t('icon.tradeHistory'),
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="FavoriteCurrenciesScreen"
          component={FavoriteCurrencies}
          options={{
            title: t('icon.favoriteCurrencies'),
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="ExchangeScreen"
          component={Exchange}
          options={{
            title: t('exchangeMoney'),
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="TradeSummaryScreen"
          component={TradeSummary}
          options={{
            title: t('tradeSummary'),
            presentation: 'transparentModal',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="AllBankAccountsScreen"
          component={AllBankAccounts}
          options={{
            title: t('icon.allBankAccounts'),
            presentation: 'transparentModal',
          }}
        />
      </Stack.Navigator>
    );
  };
  const onLogout = async () => {
    setIsLoggedIn(false);
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('currentUser');
      socket.disconnect();
    } catch (error) {
      console.log(error);
    }
  };
  const getIsSignedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    return isLoggedIn;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsSignedIn = async () => {
      const signedIn = await getIsSignedIn();
      setIsLoggedIn(signedIn);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    checkIsSignedIn();
  }, [isLoggedIn]);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: theme.backgroundColor,
        }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="MainTabs"
            options={{
              presentation: 'transparentModal',
            }}
            component={MainTabs}
          />
        ) : (
          <Stack.Screen
            name="LoginStack"
            options={{
              presentation: 'transparentModal',
            }}
            component={LoginStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
