import React, { useState, useEffect, Component } from 'react';
import ImageModal from 'react-native-image-modal';
import { Icon } from 'react-native-elements';
import FoglalasScreen from './FoglalasScreen';
import KivalasztasScreen from './KivalasztasScreen';
import { useNavigation } from '@react-navigation/native';

const IP = require('../IPcim');

// import all the componaents we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable, Image
} from 'react-native';

const Ajanlat = () => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [ActiveModalId,setActiveModalId]=useState(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  

 
  

  useEffect(() => {
    fetch(IP.ipcim+'ajanlat')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.ajanlat_nev
          ? item.ajanlat_nev.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

    
      // Flat List Item



  const ItemView = ({ item }) => {
    
    return (
     
      // Flat List Item
   <View>
    
    {/*-----------MODAL TULAJDONSÁGAI -------------*/}
     <Modal
       animationType="slide"
       transparent={true}
       
       visible={ActiveModalId === item.ajanlat_id && modalVisible}
       onRequestClose={() => {
         Alert.alert("Modal has been closed.");
         setModalVisible(false);
         setActiveModalId(null);
        
        }}
      >
        {/*-----------MODAL TULAJDONSÁGAI VÉGE-------------*/}
        <View style={styles.centeredView}>
          {/* -----MODAL ABLAK------- */}
          <View style={styles.modalView}>

            <Text style={styles.modaltextar}> {item.ajanlat_ar} Ft </Text> 
          {/*   <View style={{flex: 1}}> */}

            <Text style={{color: "black"}}> {item.ajanlat_leiras}  </Text>

          {/*   </View> */}
           
    
            {/* -----MODAL BELUL A KEK ABLAK----- */}


          
            <Pressable
              style={[styles.kivalasztasbutton, styles.kivalasztasbuttonClose]}
              onPress={() => {
                  setModalVisible(false);
                   setActiveModalId(null);
                  navigation.navigate('Kivalasztas',{
                    itemajanlatnev: item.ajanlat_nev,
                    itemajanlatnap: item.ajanlat_nap
                  })
                  
                  
                }}>

              {/* -----KÉK ABLAKON BELUL KIVÁLASZTÁS GOMB----- */}
              
              <Text style={styles.textmodalkivalasztas}>Kiválasztás</Text>
             
            </Pressable>
 
          </View>
        </View>
      </Modal>
      {/*------------Modal megnyitása */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          setActiveModalId(item.ajanlat_id);
          
        }}
        
      >
      
        <Text style={styles.textStyle}> {item.ajanlat_nev}</Text>
        <Text style={styles.textarStyle} > {item.ajanlat_ar} Ft </Text>
        <Image
        style={styles.image}
        source={{uri:IP.ipcim+item.ajanlat_kep}}
     
        />
        
      </Pressable>
      <Text>{"\n"}</Text>

   </View>
    );
  };




  
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    


    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
    
      

        <TextInput
          style={{height: 35, borderColor:"#68BBE3",borderWidth:2, margin:5, padding:5, borderRadius: 20}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Keress itt"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          
        />

{/* ---------------------------------------MODAAAAALLLLLLL*/ }



      </View>
    </SafeAreaView>
 
 
 

 );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitez',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 25,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 110,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  // Modalon belul hide es kivalasztas gomb
  textmodalhide:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    
    fontSize: 10
  },
  hidemodalbutton:{
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    position:'absolute',
    right:5,
    top:'10%'
  },
  hidemodalbuttonClose:{
    backgroundColor: "#2196F3",
    padding: 10,
  },
  textmodalkivalasztas:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlign: "left",
    fontSize: 18
  },
  kivalasztasbutton:{
    
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position:'relative',
    
    top:'10%'
  },
  kivalasztasbuttonClose:{
    backgroundColor: "#2196F3",
    padding: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "lightblue",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    padding: 10,
    
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlign: "left",
    fontSize: 20
  },
  textarStyle:{
    color:"black",
    fontWeight:"bold",
    textAlign:"right",
    
  },
  modaltextar:{
    fontSize: 20,
    top:'120%'
  },
  image:{
 width: 300,
 height: 150,
 borderRadius: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Ajanlat;