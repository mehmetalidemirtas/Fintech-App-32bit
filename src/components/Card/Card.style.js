import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  text_container: {
    flexDirection: 'row',
    flex: 0.74,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    paddingRight: 2,
    margin: 5,
  },
  text: {
    color: 'black',
    padding: 10,
    paddingLeft: 0,
    margin: 5,
    marginLeft: 0,
  },
  button_container: {
    flex: 1,
    paddingLeft: 15,
    flex: 0.28,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 25,
  },
  button_text: {
    textAlign: 'center',
  },
});
