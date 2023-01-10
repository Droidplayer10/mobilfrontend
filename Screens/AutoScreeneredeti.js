import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,Linking, Button,TextInput } from 'react-native';
//const ipcim="192.168.6.7:3000";


export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      isLoading: true,
      szoveg1: "",
      szoveg2: ""
    };
  }

  

  async getMovies() {
    try {
      const response = await fetch('http://192.168.6.8:3000/orszagok');
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  keres=()=>{
    alert("Hello")
  }



  render() {

    
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40}}>


        <Text style={{fontStyle:"italic"}} >Honnan:</Text>
            <TextInput
        style={{height: 35, borderColor:"#68BBE3",borderWidth:2, margin:5, padding:5, borderRadius: 10}}
        
        onChangeText={szoveg1 => this.setState({szoveg1})}
        value={this.state.szoveg1}
      />       

<Text>Hova:</Text>
            <TextInput
        style={{height: 35, borderColor:"#68BBE3",borderWidth:2, margin:5, padding:5, borderRadius: 10}}
      
        onChangeText={szoveg2 => this.setState({szoveg2})}
        value={this.state.szoveg2}
      />       

<TouchableOpacity
            style={{ width: "100%",
            borderRadius: 25,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            backgroundColor: "#68BBE3"}}
            onPress={()=>this.keres()}
          >
            <Text style={{fontStyle: "italic"}}>Keresés</Text>
          </TouchableOpacity>



        {isLoading ? <ActivityIndicator/> : (
          <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
            <TouchableOpacity
            style={{ width: "50%",
            borderRadius: 25,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            backgroundColor: "#68BBE3"}}
            onPress={this.onPress}
          >
            <Text style={{fontStyle: "italic"}}>{item.orszag_nev}</Text>
          </TouchableOpacity>
          )}
        />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft:30,
    marginRight:30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});