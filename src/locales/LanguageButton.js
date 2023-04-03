import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LanguageModal from './LanguageModal';
import { ThemeContext } from '../context/ThemeContext';

const LanguageButton = () => {
    const theme = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <>    
        <Icon name="translate" size={25} color={theme.primary} onPress={() => setModalVisible(true)} />
        <LanguageModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default LanguageButton;