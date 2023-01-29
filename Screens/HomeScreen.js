import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View,Text, ImageBackground } from 'react-native';
import FoglalasScreen from './FoglalasScreen';
import { useRoute } from '@react-navigation/native';



const Home = ({navigation}) => {
 



  return (

    
    <View style={styles.container}>

<ImageBackground source={require("./hatterkep.jpg")} resizeMode="cover" style={styles.image}>

      <View style={styles.alternativeLayoutButtonContainer}>
        
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Foglalás"
          color="#567189"
        />
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Szoba"
          color="#567189"
        />
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
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
    
    backgroundColor: "#eaeaea",
    
  },
 
  alternativeLayoutButtonContainer: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
