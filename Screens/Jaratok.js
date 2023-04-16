import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from "axios";

const Jaratok = ({ origin, destination }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const options = {
        method: 'GET',
        url: 'https://ryanair.p.rapidapi.com/flights',
        params: {
          origin_code: 'LGW',
          destination_code: 'DUB',
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
      <Text style={styles.header}>Járatok:</Text>
      <FlatList
        // Az apihoz ezt kell megadni data={flights.origin_to_destination_trip[0]}
        data={flights}
        renderItem={({ item }) => (
          <View style={styles.flight}>
            <Text style={styles.flightText}>Repülőjárat szám: {item.flight_number}</Text>
           
          </View>
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
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Jaratok;
