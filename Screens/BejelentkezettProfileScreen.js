import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View,Text, ImageBackground, Animated} from 'react-native';
import FoglalasScreen from './FoglalasScreen';
import { useRoute } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const BejelentkezettProfileScreen = ({navigation}) => {
 
  const [felhasznaloId, setFelhasznaloId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [menuAnim] = useState(new Animated.Value(1));

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
      
    }).start(() => setIsMenuOpen(!isMenuOpen));
  };
  AsyncStorage.getItem("felhasznalo_id")
  .then((value) => {
    setFelhasznaloId(value);
  });


  const Kijelentkezes = async () => {
    try {
      await AsyncStorage.removeItem('felhasznalo_id')
      navigation.navigate('Profile')
    } catch(e) {
      // remove error
    }
  
    alert("Kijelentkeztél!")
  }



  return (

    
    <View style={styles.container}>
<View style={styles.header}>
<Text style={styles.KijelentkezoTitle}>Kijelentkezés</Text>
<TouchableOpacity
          style={styles.KijelentkezoButton }
          onPress={Kijelentkezes}
          >
            <MaterialIcons name="logout" size={21} />
          
        </TouchableOpacity>
        
<Text style={styles.ButtonTitle}>Hello {felhasznaloId} !</Text>

<Animatable.Image
animation="bounceIn"
duration={2500}
iterationDelay={3}
source={require("./logo1.png")}
style={styles.logo}
resizeMode={"cover"}


/>




</View>

        <Text></Text>
        
      <View style={styles.footer}>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>IT Travel&Relax</Text>
      </View>
      
      {isMenuOpen && (
        <Animated.View style={{ paddingVertical: 20, paddingHorizontal: 20, opacity: menuAnim }}>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Kedvencek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Előzmények</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Ajánlataink</Text>
          </TouchableOpacity>
        </Animated.View>
        
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={{ backgroundColor: '#007aff', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20 }}
        >
          <Text style={{ color: 'white' }}>{isMenuOpen ? 'Bezárás' : 'Menü'}</Text>
        </TouchableOpacity>
      </View>
   

        <View style={styles.alternativeLayoutButtonContainer} >
         <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          
          >
          <Text style={styles.ButtonTitle} >Kedvencek</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Szalloda')}
          
          >
          <Text style={styles.ButtonTitle}>Előzmények</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('Auto')}
          
          >
          <Text style={styles.ButtonTitle}>Ajánlatok</Text>
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
    flex:1.5,
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
  KijelentkezoalternativeLayoutButtonContainer: {
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
    fontWeight:'bold',

    
  },
  KijelentkezoTitle:{
    fontSize:15,
    color: 'white',
    fontWeight:'bold',
    alignSelf:'flex-end'
    
  },
  KijelentkezoButton:{
    
    justifyContent:'center',
    alignSelf: 'flex-end',
    marginRight:10,
    paddingRight:10,
    alignItems:'flex-end',
    backgroundColor:'#b23b3b',
    height: 40,
    width:40,
    borderRadius: 20,
    
  },
 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BejelentkezettProfileScreen;