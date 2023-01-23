import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import{createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { id } from "postcss-selector-parser";
const IP = require('../IPcim');




 
export default function Login({navigation}) {
  const [felhasznalo_id, setfelhasznalo_id] = useState("");
  const [felhasznalo_jelszo, setfelhasznalo_jelszo] = useState("");
  
  async function Handlelogin() {
  try {
  const body = JSON.stringify({ felhasznalo_id: felhasznalo_id, felhasznalo_jelszo: felhasznalo_jelszo });
  //---------------------POSTOLJA az adatokat a backendnek, ami leellenorzi, hogy letezik e ilyen ID majd visszadobja a const databa. Mivel visszadob adatokat, igy a message-t.
  // --------------------- Viszont ha van res.status pl.: 401-es hiba, akkor nem dob vissza semmit, igy if-be nem lehet használni se a res.statust se a data.message-t MEGOLDANDÓ
  const response = await axios.post('http://192.168.1.121:3000/felhasznalok',
  body,
  {
  headers: {
  'Content-Type': 'application/json'
  }
  });
  const data = response.data;
  if (data.message === "Sikeres bejelentkezés!") {
  alert("Hello! Bejelentkeztél!")
  navigation.navigate('Ajanlat')
  }
  else {
    /*if (res.status == 401  ) {
      alert("Sikertelen")
    }*/

  alert("Sikertelen")
  
  }

  }
  catch (error) {
  console.error(error)
  }
  }
  
  return (
  <View style={styles.container}>
  <Image style={styles.image} source={require("./repulo.png")} />
 
  <StatusBar style="auto" />
  <View style={styles.inputView}>
    <TextInput
      style={styles.TextInput}
      placeholder="Email."
      placeholderTextColor="#003f5c"
      onChangeText={(felhasznalo_id) => setfelhasznalo_id(felhasznalo_id)}
    />
  </View>

  <View style={styles.inputView}>
    <TextInput
      style={styles.TextInput}
      placeholder="Password."
      placeholderTextColor="#003f5c"
      secureTextEntry={true}
      onChangeText={(felhasznalo_jelszo) => setfelhasznalo_jelszo(felhasznalo_jelszo)}
    />
  </View>

  <TouchableOpacity>
    <Text style={styles.forgot_button}>Forgot Password?</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.loginBtn} onPress={Handlelogin}>
    <Text style={styles.loginText}>LOGIN</Text>
  </TouchableOpacity>
</View>
  
  
  
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#68BBE3",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#68BBE3",
  },
});