import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View,Text } from 'react-native';
import FoglalasScreen from './FoglalasScreen';
import { useRoute } from '@react-navigation/native';


const BejelentkezettProfileScreen = ({navigation}) => {
 
 
const route = useRoute();
const felhasznalo_id = route.params.felhasznalo_id;


  return (
    <View style={styles.container}>

 
      <Text style={styles.textfelhasznalo_id}>{felhasznalo_id}</Text>
     
      <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Kedvencek"
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
          title="Előzmények"
          color="#567189"
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
    padding: 20,
    backgroundColor: "#eaeaea",
    
  },
  textfelhasznalo_id:{
    justifyContent: 'center',
    fontSize: 30

  },
  buttonContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-between'
  },

});

export default BejelentkezettProfileScreen;