import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View,Text, ImageBackground } from 'react-native';
import FoglalasScreen from './FoglalasScreen';
import { useRoute } from '@react-navigation/native';
import Szalloda from './Szalloda';



const Home = ({navigation}) => {
 



  return (

    
    <View style={styles.container}>


<ImageBackground source={require("./hatterkep.jpg")} resizeMode="cover" style={styles.image}>




      <View style={styles.footer}>
        
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Repülőjegy foglalás"
          color="#567189"
        />
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Szalloda')}
          title="Szállodák"
          color="#567189"
        />
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Auto')}
          title="Autó"
          color="#567189"

          
        />
      </View>

    
      </ImageBackground>

     
      
    </View>
     
  );
}

const styles = StyleSheet.create({
  
  container: {
   flex: 1,
   justifyContent: 'center',
   
    
    //backgroundColor: "#eaeaea",
    backgroundColor: 'blue'
    
  },
  header:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(	236, 249, 255, 0.5)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 70,
    paddingHorizontal: 50,
   // helyettesítjük a justifyContent-ot az alignItems-re


  },

  
  
  
 
  alternativeLayoutButtonContainer: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(104, 187, 227, 0.5)'
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: null,

    
  },
});

export default Home;
