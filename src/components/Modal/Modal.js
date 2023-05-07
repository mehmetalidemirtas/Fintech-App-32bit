import React, {useContext} from 'react';
import {Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import styles from './Modal.style';

const ModalAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.container}>
        <View
          style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
          <Text style={[styles.title, {color: theme.textColor}]}>{title}</Text>
          <Text style={[styles.message, {color: theme.textColor}]}>
            {message}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onCancel} style={styles.buttonContainer}>
              <Text style={styles.buttonTextOk}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                padding: 20,
                alignItems: 'center',
                borderBottomLeftRadius: 10,
              }}>
              <Text style={[styles.buttonTextSettings, {color: theme.primary}]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
