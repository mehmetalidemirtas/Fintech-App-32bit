import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  image_container: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottom_container: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    marginTop: 5,
    height: 50,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 3,
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
