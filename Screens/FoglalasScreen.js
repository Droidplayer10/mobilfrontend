import React, { useState, useEffect } from 'react';
import ImageModal from 'react-native-image-modal';
const IP = require('../IPcim');
import { useNavigation } from '@react-navigation/native';


// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable, ScrollView
} from 'react-native';
import KivalasztasScreen from './KivalasztasScreen';

const Foglalas = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ActiveModalId, setActiveModalId] = useState(null);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search2, setSearch2] = useState('');
  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(IP.ipcim + 'orszagok')
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

    const searchFilterFunction2 = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData2 = masterDataSource2.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData2 = item.varos_nev
            ? item.varos_nev.toUpperCase()
            : ''.toUpperCase();
          const textData2 = text.toUpperCase();
          return itemData2.indexOf(textData2) > -1;
        });
        setFilteredDataSource2(newData2);
        setSearch2(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource2(masterDataSource2);
        setSearch2(text);
      }
    }



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
              <Text>{item.orszag_nev}</Text>
              <TextInput
                style={{ height: 35, borderColor: "#68BBE3", borderWidth: 2, margin: 5, padding: 5, borderRadius: 20 }}
                onChangeText={(text) => searchFilterFunction2(text)}
                value={search2}
                underlineColorAndroid="transparent"
                placeholder="Keress itt"
              />

              <Text>

              </Text>
              <Text>

              </Text>

              <ScrollView>
                <TouchableOpacity onPress={() => {
                  navigation.navigate(<KivalasztasScreen name={item.varos_nev} />, {
                    itemvarosnev: item.varos_nev

                  })
                }}>
                  <Text>
                    {item.varos_nev}
                  </Text>
                </TouchableOpacity>
              </ScrollView>




              <Text></Text>
              <Pressable
                style={[styles.bezarasbutton, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                  setActiveModalId(null);
                }}
              >

                <Text style={styles.textStyle}>X</Text>



              </Pressable>


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
          style={{ height: 35, borderColor: "#68BBE3", borderWidth: 2, margin: 5, padding: 5, borderRadius: 20 }}
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

        {/* ---------------------------------------MODAAAAALLLLLLL*/}



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
    marginTop: 22,
  },
  modalView: {
    height: 700,
    width: 380,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.0,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  bezarasbutton: {
    borderRadius: 80,
    padding: 9,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#68BBE3",
  },
  buttonClose: {
    backgroundColor: "red",
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