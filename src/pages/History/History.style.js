import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  card_container: {
    padding: 20,
    margin: 10,
    marginBottom: 0,
    borderRadius: 25,
    backgroundColor: '#f7f7f7',
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: '#FF4F5A',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  titlee: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sortButton: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
