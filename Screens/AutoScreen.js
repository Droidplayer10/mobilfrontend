import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, Linking, Button,TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';




export default class Auto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      orszag:""
    };
  }

  async getNews(ertek) {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country='+ertek+'&apiKey=3896d67f06394c548239d21610ab6841');
      const json = await response.json();
      this.setState({ data: json.articles });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getNews(this.state.orszag);
  }


  valtoztat=(szoveg)=>{
    this.setState({orszag:szoveg})
  }

  kereses=()=>{
    this.getMovies();
  }

  orszag_valtoztat_pickerrel=(ertek)=>{
      this.setState({orszag:ertek})
      this.getNews(ertek)
  }




  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 , backgroundColor:"#fff",color:"white"}}>
<Text style={{fontSize:20,color:"black"}}>Válassz országot:</Text>
              <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.orszag}
                onValueChange={(itemValue) => this.orszag_valtoztat_pickerrel(itemValue)
              }>
                  <Picker.Item label="Magyarország" value="hu" />
                  <Picker.Item label="Amerika" value="us" />
                  <Picker.Item label="Kína" value="cn" />
                  <Picker.Item label="Olaszország" value="it" />
                  <Picker.Item label="Görögország" value="gr" />
                  <Picker.Item label="Oroszország" value="ru" />
                  <Picker.Item label="Kanada" value="ca" />

              </Picker>
      {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>

              <View style={{alignItems: 'center'}}>

              


              <Image style={{width:200,height:200,marginTop:10,marginBottom:10}} source={{uri: item.urlToImage}} /> 
              </View>

              <Text style={styles.alul}>{item.title}</Text>

              <Text style={styles.alul2}>{item.description}</Text>
              <Text style={styles.alul3}>{item.content}</Text>

              <Text style={{fontSize:12,fontStyle:"italic",color:"#4d4dff"}}>{item.publishedAt}</Text>
              <Text style={{fontSize:12,fontStyle:"italic",color:"#e65c00"}}>{item.source.name}</Text>
 
              <Button onPress={()=>Linking.openURL(item.url)} title="Olvass tovább..."/>
              
              <View  style={{    borderBottomColor: 'blue', borderBottomWidth: 1,marginBottom:10  }}/>
                        

              </View>


            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
      
  button: {
    alignItems: "center",
    backgroundColor: "#000066",
    padding: 5,
    margin:20,
    borderRadius:3,
    borderColor:"blue",
    borderWidth:1
  },
  gombfelirat:{
    color:"#e6e6ff"
  },
  bev:{
    height: 40,
    
    backgroundColor:"#000066",
    
    borderRadius:3,
    margin:10,
    
    padding:10,
    color:"#e6e6ff"

  },
  alul:{
    color:"#e6e6ff",
    marginBottom:5,
    fontWeight:"bold",
    fontSize:16,
    textAlign:'center'
  },
  alul2:{
    color:"#b3b3ff",
    marginBottom:5,
    fontSize:14,
    textAlign:'justify'
  },
  alul3:{
    color:"#8080ff",
    marginBottom:5,
    fontSize:12,
    textAlign:'justify'
  }
});
