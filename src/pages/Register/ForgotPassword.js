import React, {useContext} from 'react';
import { SafeAreaView,View,StyleSheet,Dimensions,Image,Text } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import { ThemeContext } from '../../context/ThemeContext';

const ForgotPassword = ({navigation}) => {
    const theme = useContext(ThemeContext);

    return(
        <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.logo_container}>
        <Image style={styles.logo} source={require("../../assets/forgot-password.png")} />
        </View>   
       <View style={styles.body_container}>
       <Text style={[styles.text, {color:theme.textColor}]}>Forgot Password?</Text>
       <Text style={styles.text_exp}> Enter your registered identity number to receive password reset instruction</Text>
            <Input 
                placeholder="Kimlik numaranızı giriniz..."
                iconName="card-account-details"
                />    
        <Button contained marginRight={25} marginLeft={25} title="Send"  onPress={() => navigation.goBack()} />            
        </View>                                                   
    </SafeAreaView>  
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    logo_container:{
        marginTop:30,
        flex:1,
        justifyContent: "center",
        
    },
    body_container:{        
        flex:1,
    },
    logo:{
        height: Dimensions.get('window').width * 0.9,
        width: Dimensions.get('window').height /3,
        resizeMode: 'contain',
        alignItems: "center",
        alignSelf: "center",
    },
    text:{
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 22,
        padding:5,
        
    },
    text_exp:{
        textAlign: "center",
        padding: 10,
        marginBottom:15,
        fontSize: 15,
    }    
})

export default ForgotPassword;