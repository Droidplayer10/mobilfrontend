import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,ImageBackground } from 'react-native';
import axios from "axios";
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Jaratok = ({ route,origin, destination }) => {
  const [flights, setFlights] = useState([]);
  const [bejelentkezve, setBejelentkezve] = useState(false);
  const [felhasznaloId, setFelhasznaloId] = useState(null);
  const {selectedValue} = route?.params;
  
const Utazom=()=>{
  alert('Sikeresen felvettük az utazásodat!');

}



  async function Utazom1() {
    
    const felhasznaloId = await AsyncStorage.getItem('felhasznalo_id');
    if (felhasznaloId) {
      setFelhasznaloId(felhasznaloId);
      
    }
     
        try {
          const body = JSON.stringify({
            felhasznaloId,
            origin_code,
            destination_code,
            origin_departure_date,
            destination_departure_date,
            selectedValue

            
          });
          setReturnDate(selectedDate || returnDate);



          const response = await axios.post(IP.ipcim + 'felvitel', body, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = response.data;
          alert('Sikeresen felvettük az utazásodat!');
          navigation.navigate('Home')
        } catch (error) {
          console.error(error);
        }
     
    
  }
  



  useEffect(() => {
    const fetchFlights = async () => {
      const options = {
        method: 'GET',
        url: 'https://ryanair.p.rapidapi.com/flights',
        params: {
          origin_code: 'Dub',
          destination_code: 'LGW',
          origin_departure_date: '2023-09-28',
          destination_departure_date: '2023-10-28'
        },
        headers: {
          'X-RapidAPI-Key': '5c6a0c7eb5msh476e5ea70801982p11029bjsn4aae7a4f76ad',
          'X-RapidAPI-Host': 'ryanair.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setFlights(response.data);
        
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchFlights();
  }, [origin, destination]);
  

  return (
    <View style={styles.container}>
 <FlatList
  data={flights.origin_to_destination_trip}
  renderItem={({ item }) => (
   
      <ImageBackground 
      source={require("./ticket.png")}
        resizeMode="stretch"
        style={styles.image}>
      <Text style={styles.flightText}>Indulási idő: {item[0].departure_datetime_utc}</Text>
            <Text style={styles.flightText}>Érkezés idő: {item[0].arrival_datetime_utc}</Text>

         

            <Text style={styles.flightText}>Innen indul: {item[0].origin_code}</Text>
            <Text style={styles.flightText}>Utazási cél: {item[0].destination_code}</Text>
            <Text style={styles.flightText}>Repülőjárat szám: {item[0].flight_number}</Text>
            <Text></Text>
            <TouchableOpacity style={{alignItems:'flex-end', alignSelf:'flex-end', paddingEnd: 12,paddingBottom: 5, paddingLeft: 5, backgroundColor:"#68BBE3", borderRadius: 10}} onPress={Utazom}>
              <Text style={styles.lefoglalomText} >Lefoglalom</Text>
            </TouchableOpacity>
            
            
    </ImageBackground>
    
   
    
  )}
  keyExtractor={(item) => item.flight_number}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
    backgroundColor: '#fff',
  },
   image: {
    flex: 1,
    justifyContent: 'center',
    width: 420,height:230
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flight: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  flightText: {
    fontSize: 14,
    marginBottom: 5,
    paddingStart: 15
  },
  lefoglalomText:{
    fontSize: 16
  }
});

export default Jaratok;
