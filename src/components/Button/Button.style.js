import { StyleSheet } from "react-native";
import colors from '../../styles/colors';

export default StyleSheet.create({
    buttonContained: {
        margin:7,
        height:50,
        justifyContent:"center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
      },
      buttonText: {
        height:50,
        borderWidth: 1,
        justifyContent:"center",
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center',
    
      },
      containedButtonText: {
        textAlign: 'center',
        fontSize: 15
      },
      textButtonText: {
        textAlign: 'center',
      },
});