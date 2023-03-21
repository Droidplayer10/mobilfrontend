import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Button,
  TextInput
} from 'react-native';

const IP = require('../IPcim');

const Szalloda = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.ipcim + 'szalloda');
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const szavazat = async (szam) => {
    var adatok = {
      bevitel1: szam
    };
    alert(adatok.bevitel1);
    const response = fetch(IP.ipcim + 'szavazat', {
      method: 'POST',
      body: JSON.stringify(adatok),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const text = response.text();
    console.log(text);
  };

  const evjarat = async (ev) => {
    var datumok = {
      datum: szamok
    };
    alert(datumok.datum);
    const response = fetch(IP.ipcim + 'auto_evjarat', {
      method: 'POST',
      body: JSON.stringify(datumok),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const text = response.text();
    console.log(text);
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 30 }}>
      <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center' }}>
        {item.szalloda_neve}
      </Text>
      <Image
        source={{ uri: IP.ipcim + item.szalloda_kep }}
        style={{ width: 300, height: 300, alignSelf: 'center' }}
      />
      <Text style={{ fontSize: 20, color: 'dark', textAlign: 'center' }}>
        {item.auto_evjarat}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => szavazat(item.szallod_id)}
      >
        <Text style={{ fontStyle: 'italic', color: 'white', fontSize: 30 }}>
          Kivétel
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 24, marginTop: 40 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ szalloda_id }, index) => szalloda_id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    marginLeft: 30,
    marginRight: 30
  },
  countContainer: {
    alignItems: 'center',
    padding: 10

    
    }
  });

  export default Szalloda;