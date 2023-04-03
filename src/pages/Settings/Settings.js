import React, {useContext} from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Settings.style';
import LanguageButton from "../../locales/LanguageButton";
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);

    return (    
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>           
            <Text>{t('settings')}</Text>            
          <LanguageButton />      
        </SafeAreaView>
    )
}

export default Settings;