import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main_title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    marginTop: 15,
  },
  counter_title: {
    fontSize: 15,
  },
  counter: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  counter_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  bottom_container: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
});
