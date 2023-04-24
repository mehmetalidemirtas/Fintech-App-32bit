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
import Lottie from 'lottie-react-native';
import DatePicker from 'react-native-date-picker';

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

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormattedDate(formatDate(date));
  };

  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        await setUser({...user, ...values, birthDate: formattedDate});
        navigation.navigate('PhotoScreen');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const validate = () => {
    const errors = {};
    if (formattedDate == '') {
      errors.birthDate = t('error.enterDate');
    }
    return errors;
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {!showForm ? (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validate={validate}
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
                <View>
                  <DatePicker
                    date={selectedDate}
                    title={null}
                    onDateChange={handleDateChange}
                    modal
                    open={open}
                    mode="date"
                    onConfirm={date => {
                      setOpen(false);
                      setSelectedDate(date);
                      setFormattedDate(formatDate(date));
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
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
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Input
                    placeholder={t('input.date')}
                    label="Doğum tarihi"
                    iconName="calendar-range"
                    onType={handleChange('birthDate')}
                    onBlur={handleBlur('birthDate')}
                    value={formattedDate}
                    clickedIcon={() => setOpen(true)}
                    clickedInput={() => setOpen(true)}
                    selectTextOnFocus
                    editable={true}
                  />
                </TouchableOpacity>
                {errors.birthDate && (
                  <Text style={styles.error_message}>{errors.birthDate}</Text>
                )}
                <Input
                  placeholder={t('input.identityNo')}
                  label="Kimlik Numarası"
                  iconName="card-account-details"
                  onType={handleChange('identityNumber')}
                  value={values.identityNumber}
                  onBlur={handleBlur('identityNumber')}
                  keyboardType="numeric"
                  maxLengthValue={11}
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
                      <Lottie
                        style={styles.animation}
                        source={require('../../assets/nfc_animation.json')}
                        autoPlay
                        loop
                      />

                      <Text style={styles.modalText}>
                        Kimlik kartınızı nfc okuyucusuna yaklaştırın !
                      </Text>
                      <Button
                        contained
                        onPress={() => setModalVisible(!isModalVisible)}
                        title="Cancel"
                        border={1}
                        marginLeft={25}
                        marginRight={25}
                      />
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
              maxLengthValue={11}
              keyboardType="numeric"
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
  animation: {
    width: 250,
    height: 250,
  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    marginBottom: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
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
