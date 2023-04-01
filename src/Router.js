import React, {useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './styles/colors';
import Login from './pages/Login';
import Identity from './pages/Register/Identity';
import Photo from './pages/Register/Photo';
import Password from './pages/Register/Password';
import Watchlist from './pages/Main/Watchlist';
import Trade from './pages/Main/Trade';
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
import { ThemeContext } from './context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const theme = useContext(ThemeContext);
const screenOptions = {
  headerStyle : {backgroundColor: theme.backgroundColor},
  headerTitleStyle: {color: theme.textColor},
  headerTitleAlign: "center",
  statusBarColor: theme.backgroundColor,
  statusBarStyle:theme.statusBarStyle,
  headerTintColor: colors.primary,
}
const handleLogin = async () => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  } catch (error) {
    console.log(error);
  }
};
const LoginStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false, statusBarColor:theme.backgroundColor, statusBarStyle:theme.statusBarStyle, navigationBarColor:theme.backgroundColor}}>
      <Stack.Screen name="LoginScreen">
        {(props) => <Login {...props} handleLogin={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="IdentityScreen" component={Identity}/>
      <Stack.Screen name="PhotoScreen" component={Photo}/>
      <Stack.Screen name="PasswordScreen" component={Password}/>
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword}/>
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return(
    <Tab.Navigator    
    screenOptions={{navigationBarColor:theme.backgroundColor}}
    initialRouteName="Home"
    activeColor={theme.textColor}
    inactiveColor={theme.primary}    
    barStyle={{ backgroundColor: theme.backgroundColor }}
    >
      <Tab.Screen screenOptions={{navigationBarColor:theme.backgroundColor}} name="WatchlistStack" component={WatchlistStack}                   
      options={{                         
          tabBarLabel: 'Watchlist',  
          tabBarIcon: () => (
            <Icon name="home" color={theme.primary} size={25} />
          ),
        }}/>
      <Tab.Screen name="TradeScreen" component={TradeStack}  
      options={{
        tabBarLabel: 'Trade',
        tabBarIcon: () => (
          <Icon name="swap-horizontal" color={theme.primary} size={25} />
        ),
      }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsStack} 
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: () => (
          <Icon name="cog" color={theme.primary} size={25} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

const TradeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='Trade' component={Trade}
       options={{title: "Trade",
          headerBackVisible:false,          
        }}/>
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='Setting' component={Settings}
       options={{
          title: "Setting",
          headerBackVisible:false,   
          headerRight: () => (
            <Icon name='logout' size={25} color={theme.primary} onPress={onLogout}/>
          ),     
        }}/>
    </Stack.Navigator>
  )
}

const WatchlistStack = () => {
  return(
    <Stack.Navigator screenOptions={screenOptions}>      
      <Stack.Screen name="WatchlistScreen" component={Watchlist}
       options={{
        title: "Watchlist",
          headerBackVisible:false,         
        }}/>
      <Stack.Screen name="BankAccountTypeScreen" component={BankAccountType}
       options={{
          title: "Bank Account Type",
        }}/>
        <Stack.Screen name="BankCurrencyTypeScreen" component={BankCurrencyType}
       options={{
          title: "Currency Type",
        }}/>
      <Stack.Screen name="BankBranchScreen" component={BankBranch}
       options={{
          title: "Bank Branch",
        }}/>
        <Stack.Screen name="ConfirmationScreen" component={Confirmation}
        options={{
           title: "Confirmation",
         }}/>
        <Stack.Screen name="SummaryScreen" component={Summary}
        options={{
           title: "Summary",
         }}/>                
      <Stack.Screen name="HistoryScreen" component={History} 
        options={{
          title: "History",        
        }}/>
    </Stack.Navigator>
  )
}
const onLogout = async () => {
  // Kullanıcının giriş durumunu "false" olarak ayarlayın
  setIsLoggedIn(false);
  // AsyncStorage'de kullanıcının giriş durumunu güncelleyin
  try {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem('currentUser');

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
      setIsLoading(false);
    };

    checkIsSignedIn();
  }, [isLoggedIn]);

  if (isLoading) {
    return <Splash />;
  }
  console.log("isLoggedIn: "+ isLoggedIn);
  
  return (    
    <NavigationContainer>                     
      <Stack.Navigator  screenOptions={{        
        headerShown:false,
      }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
          ) : (
          <Stack.Screen name="LoginStack" component={LoginStack} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;