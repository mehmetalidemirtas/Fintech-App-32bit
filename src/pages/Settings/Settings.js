import React, {useContext} from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Settings.style';

const Settings = () => {

    const theme = useContext(ThemeContext);

    return (    
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>           
            <Text>Settings</Text>            
        </SafeAreaView>
    )
}

export default Settings;