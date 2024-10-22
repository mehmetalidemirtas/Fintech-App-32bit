import React, {useState, useContext} from 'react';
import {Modal, Text, View, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../context/ThemeContext';

const LanguageModal = ({isVisible, onClose}) => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const {theme} = useContext(ThemeContext);

  const handleLanguageChange = async () => {
    await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
          <Text style={[styles.modalText, {color: theme.textColor}]}>
            {t('languageModal.title')}
          </Text>
          <Pressable
            style={[styles.button, {backgroundColor: theme.itemColor}]}
            onPress={() => setSelectedLanguage('en')}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: theme.textColor,
                  fontWeight: selectedLanguage === 'en' ? 'bold' : 'normal',
                },
              ]}>
              {t('english')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, {backgroundColor: theme.itemColor}]}
            onPress={() => setSelectedLanguage('tr')}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: theme.textColor,
                  fontWeight: selectedLanguage === 'tr' ? 'bold' : 'normal',
                },
              ]}>
              {t('turkish')}
            </Text>
          </Pressable>
          <View style={styles.button_container}>
            <Icon name="close" size={25} color="red" onPress={onClose} />
            <Icon
              name="check"
              size={25}
              color="green"
              onPress={handleLanguageChange}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LanguageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    width: '60%',
    height: '33%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 5,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
