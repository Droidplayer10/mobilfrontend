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


      <Text>{felhasznalo_id}</Text>
     
      <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Foglalás"
          color="blue"
        />
      
       
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Szoba"
          color="blue"
        />
        <Button
          style={styles.Button}
          onPress={() => navigation.navigate('Foglalas')}
          title="Autó"
          color="blue"
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  buttonContainer: {
    margin: 20
  },

});

export default BejelentkezettProfileScreen;
