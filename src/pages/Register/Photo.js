import React, {useContext, useState} from 'react';
import UserContext from '../../context/UserContext';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/ThemeContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import colors from '../../styles/colors';
import {useTranslation} from 'react-i18next';

const Photo = () => {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const {t} = useTranslation();

  const handleCameraPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
    };
    launchCamera(options, response => {
      if (response.assets) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleGalleryPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async photo => {
    if (selectedImage === null) {
      showMessage({
        message: t('error.choosePhoto'),
        type: 'danger',
        backgroundColor: colors.primary,
      });
      return;
    }
    setIsLoading(true);
    try {
      setUser(prev => ({...prev, photo: selectedImage}));
      console.log(user);
      navigation.navigate('PasswordScreen');
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('title.choosePhoto')}
      </Text>
      {selectedImage && (
        <Image style={styles.image} source={{uri: selectedImage}} />
      )}
      <View style={{margin: 5, padding: 10, marginHorizontal: 20}}>
        <Button
          border={1}
          onPress={handleCameraPress}
          title={t('button.openTheCamera')}
          loading={isLoading}
        />
      </View>
      <View
        style={{margin: 5, marginTop: 0, padding: 10, marginHorizontal: 20}}>
        <Button
          border={1}
          onPress={handleGalleryPress}
          title={t('button.openTheGallery')}
          loading={isLoading}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          onPress={() => navigation.goBack()}
          title={t('button.previous')}
          loading={isLoading}
        />
        <Button
          contained
          onPress={handleSubmit}
          title={t('button.next')}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 150,
    marginVertical: 10,
  },
});

export default Photo;
