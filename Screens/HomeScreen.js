import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View,Text, ImageBackground } from 'react-native';
import FoglalasScreen from './FoglalasScreen';
import { useRoute } from '@react-navigation/native';
import Szalloda from './Szalloda';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native';




const Home = ({navigation}) => {
 


  return (

    
    <View style={styles.container}>
<View style={styles.header}>

<Animatable.Image
animation="bounceIn"
duration={2500}
iterationDelay={3}
source={require("./logo1.png")}
style={styles.logo}
resizeMode={"cover"}


/>




</View>

      <View style={styles.footer}>

    <Text style={styles.Title} >Válassz bátran a lehetőségek közül!</Text>

        <View style={styles.alternativeLayoutButtonContainer} >
         <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          
          >
          <Text style={styles.ButtonTitle} >Repülőjegy foglalás</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Szalloda')}
          
          >
          <Text style={styles.ButtonTitle}>Szállodák</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Auto')}
          
          >
          <Text style={styles.ButtonTitle} >Autó</Text>
        </TouchableOpacity>
        </View>
       
      </View>

    
    
     
      
    </View>
     
  );
}
const {height} = Dimensions.get("screen")
const height_logo = height *0.7 * 0.4
const styles = StyleSheet.create({
  
  container: {
   flex: 1,
   justifyContent: 'center',
   
    
    backgroundColor: "#97DEFF",
  
    
  },
  header:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    height:height_logo,
    width:height_logo,
    borderRadius: 40
  },
  Title:{
    fontWeight:'bold',
    color: '#146C94',
    fontSize: 20
  },
  footer:{
    flex:1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 27,


  },
  alternativeLayoutButtonContainer: {
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
    
  },
  Button:{
    position:'relative',
    height: 50,
    width:220,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:'#68BBE3',
    alignItems:'center'
    
  },
  ButtonTitle:{
    fontSize:20,
    color: 'white',
    fontWeight:'bold'
    
  },

 
 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;