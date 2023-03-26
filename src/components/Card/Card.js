import React from 'react';
import { TouchableOpacity, StyleSheet,View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import colors from '../../styles/colors';
import styles from './Card.style';
const CustomCard =({title, text, onPress}) => {
    return(    
        <View style={styles.container}>   
            <View style={styles.text_container} >        
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
                </View>
                {onPress ? (
        <View style={styles.button_container}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.button_text}>Düzenle</Text>
          </TouchableOpacity>
        </View>
      ) : null}
        </View>      
    )
}

export default CustomCard;