import { StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    logo_container:{
        flex:1,
        justifyContent: "center",
        
    },
    body_container:{        
        marginBottom:100,
    },
    logo:{
        height: Dimensions.get('window').width * 0.9,
        width: Dimensions.get('window').height /3,
        resizeMode: 'contain',
        alignItems: "center",
        alignSelf: "center",        
    },
    forgot_pw_container:{

        flexDirection:"row",
        justifyContent:"flex-end",
         marginRight:25,
    },
    error_message:{
        fontSize: 12, 
        color: 'red',
        marginLeft:30,
        padding:1,
    }
});