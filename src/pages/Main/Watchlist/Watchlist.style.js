import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  item_container: {
    margin: 10,
    marginBottom: 0,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontSize: 16,
  },
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  change: {
    width: 90,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bar: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    marginTop: 10,
  },
  currency: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  try: {
    color: '#191825',
    fontSize: 15,
    marginLeft: 3,
  },
  bottom_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  icon: {
    paddingBottom: 2,
    marginBottom: 5,
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
});
