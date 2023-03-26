import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
    container: {        
        alignItems: 'center',
        padding: 8,
        marginLeft:20,
        marginRight:20,
      },
      bottom_container:{
        flexDirection: 'row', alignItems: 'center' 
      },
      textInputContainer: {
        justifyContent:"center",
        borderRadius:20,
        height: 60,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 18, 
      },
      focusedTextInputContainer: {
        borderRadius:20,
        borderColor: colors.secondary,
      },
      textInput: {
        borderRadius:20,
        flex: 1,
        marginLeft: 10
      },
});