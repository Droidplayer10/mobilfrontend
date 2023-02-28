import React from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, ScrollView,Button, Circle,Flex, VStack,Switch,Input } from "native-base";
import axios from 'axios';

import { withNavigation,useRoute } from 'react-navigation';

import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';

import {
  
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable,
} from 'react-native';
import Ajanlat from './AjanlatScreen';
import { Platform } from 'react-native';



const Kivalasztas = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [IsDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [ajanlathonnanvaros, setajanlathonnanvaros] = useState("");
  
  const { itemajanlatnev } = route.params;
  const {itemajanlatnap} = route.params;
  const {itemajanlatvarosnev} = route.params;
  
  async function Utazom() {
    try {
    const body = JSON.stringify({ ajanlathonnanvaros: ajanlathonnanvaros, itemajanlatvarosnev: itemajanlatvarosnev, selectedDate: selectedDate, returnDate: returnDate });
    //---------------------POSTOLJA az adatokat a backendnek, ami leellenorzi, hogy letezik e ilyen ID majd visszadobja a const databa. Mivel visszadob adatokat, igy a message-t.
    // --------------------- Viszont ha van res.status pl.: 401-es hiba, akkor nem dob vissza semmit, igy if-be nem lehet használni se a res.statust se a data.message-t MEGOLDANDÓ
    const response = await axios.post('http://192.168.6.8:3000/felvitel',
    body,
    {
    headers: {
    'Content-Type': 'application/json'
    }
    });
    const data = response.data;
    if (data.message=="Sikeres bejelentkezés!"){
      alert("Üdv "+data.message)
      navigation.navigate('BejelentkezettProfileScreen',{
        felhasznalo_id
     })
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


const showDatePicker = () => {
  setIsDatePickerVisible(true);
};
const hideDatePicker = () => {
  setIsDatePickerVisible(false);
};


const handleDateChange = (event, selectedDate) => {
  hideDatePicker();
  setDate(selectedDate || date);
};


const selectedDate = date;
const returnDate = new Date(selectedDate.getTime() + itemajanlatnap * 24 * 60 * 60 * 1000);

  return(
    <NativeBaseProvider>
      <Center flex={1}>



      <Center bg="secondary.300" _text={{
    color: 'white'
  }} rounded="xl" w={"90%"} h={24} >
      {itemajanlatnev}
      


     
      
     
    </Center>
      



<Text></Text>

<Text>Honnan: </Text>

<Box alignItems="center">
      <Input mx="3" placeholder="Város" w="50%" onChangeText={(ajanlathonnanvaros) => setajanlathonnanvaros(ajanlathonnanvaros)} />
    </Box>

<Text></Text>
<Text>Úticél:</Text>
<Text>{itemajanlatvarosnev}</Text>

<Text>Melyik nap szeretne menni?</Text>

<View  >

<TouchableOpacity 
      style={styles.selectDateBtn}
      onPress={showDatePicker}>
      <Text style={styles.selectDateBtnText}>Válassz dátumot</Text>
    </TouchableOpacity>
      
</View>



{IsDatePickerVisible && (
  
  <View>
    
<DatePicker
        style={{width: 200}}
        value={date}
  
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2023-02-01"
        maxDate="2023-06-10"
        confirmBtnText="Confirm"
        onCloseModal={hideDatePicker}
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        
        onChange={handleDateChange} 
       
      />

      
</View>      
)}

<Text>Kiválasztott dátum: {date.toLocaleDateString()}</Text>

<Text>Hazamenet dátum: {returnDate.toLocaleDateString()}</Text>

<Text></Text>
<Stack mb="2.5" mt="1.5" direction={{
        base: "column",
        md: "row"
      }} space={2} mx={{
        base: "auto",
        md: "0"
      }}>
<Button size="lg" variant="solid" colorScheme="secondary" onPress={Utazom} >
            Utazom!
          </Button>
</Stack>
</Center>
    </NativeBaseProvider>
  )

}
const styles = StyleSheet.create({
  selectDateBtn: {
    backgroundColor: 'rgba(104, 187, 227, 0.5)',
    padding: 10,
    borderRadius: 20,
    width: 150,
    height: 40,
    alignSelf: 'flex-start',
    marginTop:10
  },
  selectDateBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
});

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Kivalasztas);