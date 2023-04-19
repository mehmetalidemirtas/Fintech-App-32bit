import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../context/UserContext';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {ThemeContext} from '../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import NfcManager, {NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager';

const Identity = () => {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [hasNfc, setHasNFC] = useState(null);
  const [tag, setTag] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [identityNumber, setidentityNumber] = useState('');
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);
  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('Tag Discovered', tag);
      setTag(tag);
      let tech = NfcTech.Ndef;
      let ndef = tag.ndefMessage;
      if (tag.ndefMessage) {
        tag.ndefMessage.forEach(message => {
          console.log('Record', message);
          console.log('Type', message.type);
          console.log('Payload', message.payload);
          const payload = message.payload;

          const payloadString = payload
            .map(charCode => String.fromCharCode(charCode))
            .join('');
          console.log(payloadString);
          const startIndex = payloadString.indexOf('{');
          const jsonData = payloadString.substring(startIndex);

          console.log(jsonData);
          const parsedData = JSON.parse(jsonData);

          //const {name, surname, birthday, identityno} = parsedData;

          setData(parsedData);
          setName(parsedData.name);
          setSurname(parsedData.surname);
          setBirthDate(parsedData.birthday);
          setidentityNumber(parsedData.identityno);
          setShowForm(true);
          console.log(name, surname, birthDate, identityNumber);
        });
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    toggleModal();

    await NfcManager.registerTagEvent();
  };
  if (hasNfc === null) return null;

  if (!hasNfc) {
    return (
      <View>
        <Text>NFC not supported</Text>
      </View>
    );
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('error.enterName')),
    surname: Yup.string().required(t('error.enterSurname')),
    birthDate: Yup.string()
      .required(t('error.enterDate'))
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/,
        t('error.invalidDate'),
      ),
    identityNumber: Yup.string()
      .required(t('error.enterIdentityNo'))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t('error.invalidId'))
      .min(11, t('error.minIdentity'))
      .max(11, t('error.minIdentity')),
  });

  const initialValues = {
    name: name || '',
    surname: surname || '',
    birthDate: birthDate || '',
    identityNumber: identityNumber || '',
  };
  const handleWithNfc = async () => {
    setIsLoading(true);

    try {
      const key = `${identityNumber}_userAccount`;
      const userAccount = await AsyncStorage.getItem(key);
      if (userAccount) {
        showMessage({
          message: t('error.userExist'),
          type: 'danger',
          backgroundColor: colors.primary,
        });
      } else {
        await setUser({...user, name, surname, birthDate, identityNumber});
        console.log(user);
        navigation.navigate('PhotoScreen');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleFormSubmit = async values => {
    setIsLoading(true);
    try {
      const key = `${values.identityNumber}_userAccount`;
      const userAccount = await AsyncStorage.getItem(key);
      if (userAccount) {
        showMessage({
          message: t('error.userExist'),
          type: 'danger',
          backgroundColor: colors.primary,
        });
      } else {
        //await AsyncStorage.setItem(key, JSON.stringify(values));
        await setUser({...user, ...values});
        navigation.navigate('PhotoScreen');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {!showForm ? (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Text style={[styles.title, {color: theme.primary}]}>
                  {t('title.enterYourCredentials')}
                </Text>
                <Input
                  placeholder={t('input.name')}
                  iconName="account"
                  onType={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.error_message}>{errors.name}</Text>
                )}
                <Input
                  placeholder={t('input.surname')}
                  iconName="account-multiple"
                  onType={handleChange('surname')}
                  onBlur={handleBlur('surname')}
                  value={values.surname}
                />
                {touched.surname && errors.surname && (
                  <Text style={styles.error_message}>{errors.surname}</Text>
                )}
                <Input
                  placeholder={t('input.date')}
                  label="Doğum tarihi"
                  iconName="calendar-range"
                  onType={handleChange('birthDate')}
                  onBlur={handleBlur('birthDate')}
                  value={values.birthDate}
                />
                {touched.birthDate && errors.birthDate && (
                  <Text style={styles.error_message}>{errors.birthDate}</Text>
                )}
                <Input
                  placeholder={t('input.identityNo')}
                  label="Kimlik Numarası"
                  iconName="card-account-details"
                  onType={handleChange('identityNumber')}
                  value={values.identityNumber}
                  onBlur={handleBlur('identityNumber')}
                />
                {touched.identityNumber && errors.identityNumber && (
                  <Text style={styles.error_message}>
                    {errors.identityNumber}
                  </Text>
                )}
                <View style={styles.button_container}>
                  <Button
                    text
                    onPress={() => navigation.goBack()}
                    title={t('button.alreadyHaveAccount')}
                    loading={isLoading}
                  />
                  <Button
                    contained
                    onPress={handleSubmit}
                    title={t('button.next')}
                    loading={isLoading}
                  />
                </View>
                <Button
                  text
                  onPress={readTag}
                  title="Scan your identity card"
                  border={1}
                  marginLeft={25}
                  marginRight={25}
                />
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={isModalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!isModalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Kimlik kartınızı nfc okuyucusuna yaklaştırın !
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!isModalVisible)}>
                        <Text style={styles.textStyle}>İptal et</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </Formik>
        </>
      ) : (
        <>
          <View>
            <Text style={[styles.title, {color: theme.primary}]}>
              {t('title.enterYourCredentials')}
            </Text>
            <Input
              placeholder={t('input.name')}
              iconName="account"
              value={name}
              editable
            />

            <Input
              placeholder={t('input.surname')}
              iconName="account-multiple"
              value={surname}
              editable
            />

            <Input
              placeholder={t('input.date')}
              label="Doğum tarihi"
              iconName="calendar-range"
              value={birthDate}
              editable
            />

            <Input
              placeholder={t('input.identityNo')}
              label="Kimlik Numarası"
              iconName="card-account-details"
              value={identityNumber}
              editable
            />

            <View style={styles.button_container}>
              <Button
                text
                onPress={() => navigation.goBack()}
                title={t('button.alreadyHaveAccount')}
                loading={isLoading}
              />
              <Button
                contained
                onPress={handleWithNfc}
                title={t('button.next')}
                loading={isLoading}
              />
            </View>
          </View>
        </>
      )}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 15,
    padding: 10,
  },
  error_message: {
    fontSize: 12,
    color: 'red',
    marginLeft: 30,
    padding: 0.5,
  },
});

export default Identity;
