import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import styles from './Card.style';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const CustomCard = ({title, text, onPress}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={[styles.title, {color: theme.textColor}]}>{title}</Text>
        <Text style={[styles.text, {color: theme.textColor}]}>{text}</Text>
      </View>
      {onPress ? (
        <View style={styles.button_container}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.backgroundColor}]}
            onPress={onPress}>
            <Text style={[styles.button_text, {color: theme.textColor}]}>
              {t('button.edit')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default CustomCard;
