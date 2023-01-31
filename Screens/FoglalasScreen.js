import React, { useState, useEffect } from 'react';
import ImageModal from 'react-native-image-modal';
const IP = require('../IPcim');




// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable
} from 'react-native';

const Foglalas = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ActiveModalId,setActiveModalId]=useState(null);
  const [SelectedImage,setSelectedImage] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(IP.ipcim+'orszagok')
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
        const itemData = item.orszag_nev
          ? item.orszag_nev.toUpperCase()
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



  const ItemView = ({ item }) => {
   
    return (
     
      // Flat List Item
   <View>
    {/*-----------MODAL TULAJDONSÁGAI -------------*/}
     <Modal
       animationType="slide"
       transparent={true}
       visible={ActiveModalId === item.orszag_id && modalVisible}
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
            {/*-----------KÉP TULAJDONSÁGAI -------------*/}
          <ImageModal
    resizeMode="contain"
    imageBackgroundColor="#000000"
    style={{
      width: 250,
      height: 250,
    }}
    source={{
      uri: SelectedImage,
    }}
  />
   {/*-----------KÉP TULAJDONSÁGAI VÉGE-------------*/}
            {/* -----MODAL BELUL A KEK ABLAK----- */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                  setModalVisible(false);
                  setActiveModalId(null);
                }}
            >
               {/* -----KÉK ABLAKON BELUL HideModal GOMB----- */}
              <Text style={styles.textStyle}>Hide Modal</Text>
              {/* -----KÉK ABLAKON BELUL KIVÁLASZTÁS GOMB----- */}
              
              
              <Text style={styles.textStyle}>Kiválasztás</Text>
              
               
            </Pressable>
            <Text>{item.orszag_id}</Text>
          </View>
         
        </View>
      </Modal>
      {/*------------Modal megnyitása */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          setActiveModalId(item.orszag_id);
          setSelectedImage(item.orszag_kep);
        }}
        
      >
      
        <Text style={styles.textStyle}> {item.orszag_nev}</Text>
        
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
    backgroundColor: 'white',
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#68BBE3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Foglalas;
