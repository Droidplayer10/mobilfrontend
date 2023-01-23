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
  const [password, setPassword] = useState("");
 



  
async function Handlelogin() {
  try{
    const seen = new WeakSet();
    const body = JSON.stringify({felhasznalo_id:felhasznalo_id},
     ( key, value) =>{
        if(typeof value === 'object' && value !== null){
          if(seen.has(value)){
            return;
          }
          seen.add(value);
        }
        return value;
      });
    const response = await axios.post('http://192.168.6.8:3000/felhasznalok',
    body,
    {
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data= response.data;
    if(data.success ){
alert("Hello! Sikeres bejelentkezés!")
navigation.navigate('Home')
    }
    else{
      alert("Sikertelen")
    }
  }
  catch(error){
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
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity >
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