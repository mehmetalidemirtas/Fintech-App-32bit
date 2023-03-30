import React, { useContext,useState } from 'react';
import UserContext from '../../context/UserContext';
import { SafeAreaView,View,Text,StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const Photo = () => {
    
    const{user, setUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async (photo) => {
      setIsLoading(true);
        try {
          await setUser({...user, ...photo});
          console.log(user);
          navigation.navigate('PasswordScreen');
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      };
    
    return(
        <SafeAreaView style={styles.container}>     
            <Text style={styles.title}>Fotoğraf Seç</Text>
          <View style={styles.button_container}>
            <Button  onPress={() => navigation.goBack()} title="Önceki adım" loading={isLoading}/>         
            <Button contained onPress={handleSubmit} title="Sonraki adım" loading={isLoading}/>                                  
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:"#FFF", 
        flex:1, 
        justifyContent:"center"
    },
    title:{
        textAlign: 'center', 
        fontSize:25, 
        fontWeight:"bold", 
        padding:20, 
        color:colors.primary,
    },
    button_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
    }
})

export default Photo;