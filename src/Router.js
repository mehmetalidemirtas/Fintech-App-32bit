import React from 'react';
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
import NewAccount from './pages/NewAccount';
import ForgotPassword from './pages/Register/ForgotPassword';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const screenOptions = {
  headerStyle : {backgroundColor: "white"},
  headerTitleStyle: {color: colors.primary},
  headerTitleAlign: "center",
  statusBarColor: "#FFF",
  statusBarStyle:"dark",
  headerTintColor: colors.primary,
}

const LoginStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false, statusBarColor:"#FFF", statusBarStyle:"dark", navigationBarColor:"#FFF"}}>
      <Stack.Screen name="LoginScreen" component={Login}/>
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
    screenOptions={{navigationBarColor:"white"}}
    initialRouteName="Home"
    activeColor={colors.primary}
    inactiveColor={colors.primary}    
    barStyle={{ backgroundColor: "#FFF" }}
    >
      <Tab.Screen screenOptions={{navigationBarColor:"#FFFF"}} name="WatchlistStack" component={WatchlistStack}                   
      options={{                         
          tabBarLabel: 'Watchlist',  
          tabBarIcon: () => (
            <Icon name="home" color={colors.primary} size={25} />
          ),
        }}/>
      <Tab.Screen name="TradeScreen" component={TradeStack}  
      options={{
        tabBarLabel: 'Trade',
        tabBarIcon: () => (
          <Icon name="swap-horizontal" color={colors.primary} size={25} />
        ),
      }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsStack} 
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: () => (
          <Icon name="cog" color={colors.primary} size={25} />
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
        }}/>
    </Stack.Navigator>
  )
}

const WatchlistStack = () => {
  return(
    <Stack.Navigator screenOptions={screenOptions}>
      
      <Stack.Screen name="WatchlistScreen" component={Watchlist}
       options={{title: "Watchlist",
          headerBackVisible:false,         
        }}/>

      <Stack.Screen name="NewAccount" component={NewAccount}
       options={{
          title: "New Account",
        }}/>

      <Stack.Screen name="HistoryScreen" component={History} 
        options={{
          title: "History",        
        }}/>
    </Stack.Navigator>
  )
}


const App= () => {
  return (
    
    <NavigationContainer>                 
      <Stack.Navigator  screenOptions={{
        headerShown:false,
        }}>
        <Stack.Screen name="LoginStack" component={LoginStack}/>
        <Stack.Screen name="MainTabs" component={MainTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;