import React, { useState, useEffect, Component } from 'react';
import ImageModal from 'react-native-image-modal';
import { Icon } from 'react-native-elements';
import FoglalasScreen from './FoglalasScreen';
import KivalasztasScreen from './KivalasztasScreen';
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, ScrollView,Button, Circle,Flex, VStack,Switch } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
const IP = require('../IPcim');

// import all the componaents we are going to use
import {
  SafeAreaView,
  
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable,
  ImageBackground
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

      const NBBox = props => {
        return (
          <VStack space={4} alignItems="center">
           <Button borderBottomRadius={50} size={8} bg="primary.100" {...props}>
          
           </Button>
           </VStack>


        )
      };

  const ItemView = ({ item }) => {
    
    return (
      <NativeBaseProvider>
            <Center flex={1} px="3">
            <ScrollView>
      <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri:IP.ipcim+item.ajanlat_kep
          }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            KÉPEK
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {item.ajanlat_nev}
            </Heading>
          
            
        
     
 
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {item.ajanlat_nap} napos a város szívében
            </Text>
          </Stack>
          <Text fontWeight="400">
          {item.ajanlat_leiras}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
                {item.ajanlat_ar} Ft
              </Text>
              <Text>            </Text>
              <Switch defaultIsChecked colorScheme="secondary"  />
            </HStack>
            <Button size="sm" variant="solid" colorScheme="secondary" onPress={()=>{
               navigation.navigate('Kivalasztas',{
                itemajanlatnev: item.ajanlat_nev,
                itemajanlatnap: item.ajanlat_nap
              })
            }}>
            Ezt választom
          </Button>
          </HStack>
        </Stack>
        
      </Box>
      
    </Box>
    <NBBox borderColor="cyan.400" borderTopWidth="3" />
    </ScrollView>
    
    <Text></Text>
    
    </Center>
    
    <Text></Text>
    
      
          </NativeBaseProvider>
          

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