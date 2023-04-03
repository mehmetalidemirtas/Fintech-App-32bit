import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LanguageModal = ({ isVisible, onClose }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = async () => {
    await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>{t('languageModal.title')}</Text>
          <Pressable
              style={[styles.button,]}
              onPress={() => setSelectedLanguage('en')}
            >
            <Text style={[styles.textStyle,{ fontWeight: selectedLanguage === 'en' ? 'bold' : 'normal' }]}>{t('english')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button,]}
              onPress={() => setSelectedLanguage('tr')}
            >              
            <Text style={[styles.textStyle,{ fontWeight: selectedLanguage === 'tr' ? 'bold' : 'normal' }]}>{t('turkish')}</Text>
            </Pressable>
        <View style={styles.button_container}>
        <Icon name="close" size={25} color="red" onPress={onClose} />
        <Icon name="check" size={25} color="green" onPress={handleLanguageChange} />

        </View>
      </View>
      </View>

    </Modal>

    
  )
}
export default LanguageModal;

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    button_container:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      padding: 10,
      elevation: 2
  },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      margin:5,
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontWeight:"bold",
      marginBottom: 10,
      textAlign: "center"
    }
  });