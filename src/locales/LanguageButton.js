import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LanguageModal from './LanguageModal';
import {View, Text, Pressable} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import styles from '../pages/Settings/Settings.style';
const LanguageButton = () => {
  const theme = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.bottom_container}>
          <Text style={styles.title}>Change language</Text>
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
