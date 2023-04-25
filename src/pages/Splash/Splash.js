import React, {useContext} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

function Splash() {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Image
        style={styles.logo}
        source={require('../../assets/splash-logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  animation: {
    width: 200,
    height: 286,
  },
});

export default Splash;
