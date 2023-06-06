import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import React, {useState, useContext} from 'react';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import colors from '../../../styles/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import ModalAlert from '../../../components/Modal';
import {showFlashMessage} from '../../../utils/flashMessage';

const Photo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCameraPress = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === 'granted') {
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
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGalleryPress = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === 'granted') {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
        };
        launchImageLibrary(options, response => {
          if (response.assets) {
            setSelectedImage(response.assets[0].uri);
          }
        });
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uptadePhoto = async newPhoto => {
    const identityNumber = await AsyncStorage.getItem('currentUser');
    const userAccount = await AsyncStorage.getItem(
      `${identityNumber}_userAccount`,
    );
    const parsedUserAccount = JSON.parse(userAccount);
    parsedUserAccount.photo = newPhoto;

    await AsyncStorage.setItem(
      `${identityNumber}_userAccount`,
      JSON.stringify(parsedUserAccount),
    );
    navigation.navigate('Setting');
  };

  const handleFormSubmit = async values => {
    if (selectedImage === null) {
      showFlashMessage(t('error.choosePhoto'));
      return;
    }
    setIsLoading(true);
    try {
      uptadePhoto(selectedImage);
      navigation.navigate('Setting');
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primary}]}>
        {t('settings.setNewPhoto')}
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
      <ModalAlert
        visible={modalVisible}
        title={t('permissionError')}
        message={t('permissionErrorText')}
        confirmText={t('settings')}
        cancelText={t('ok')}
        onConfirm={() => openSettings()}
        onCancel={() => setModalVisible(false)}
        style={{backgroundColor: 'yellow'}}
      />

      <View style={styles.button_container}>
        <Button
          contained
          onPress={handleFormSubmit}
          title={t('button.complete')}
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
});

export default Photo;
