import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  message: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    borderBottomRightRadius: 10,
  },
  buttonTextOk: {color: '#007AFF', fontWeight: 'bold'},
  buttonTextSettings: {
    fontWeight: 'bold',
  },
});
