import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LanguageModal from './LanguageModal';
import {useTranslation} from 'react-i18next';
import {View, Text, Pressable} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import styles from '../pages/Settings/Settings.style';
const LanguageButton = () => {
  const {theme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View
          style={[styles.bottom_container, {backgroundColor: theme.itemColor}]}>
          <Text style={[styles.title, {color: theme.textColor}]}>
            {t('settings.changeLanguage')}
          </Text>
          <Icon
            name="translate"
            size={20}
            style={{marginRight: 5}}
            color={theme.iconColor}
          />
        </View>
      </Pressable>
      <LanguageModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default LanguageButton;
