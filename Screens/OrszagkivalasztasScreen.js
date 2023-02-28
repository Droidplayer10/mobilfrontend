import React from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, ScrollView,Button, Circle,Flex, VStack,Switch } from "native-base";

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



const Orszagkivalasztas = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [IsDatePickerVisible, setIsDatePickerVisible] = useState(false);
  
  

  const {itemvarosnev} = route.params;
  
  
const felvitel=()=>{

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

  return(
    <NativeBaseProvider>
      <Center flex={1}>



      <Box bg="primary.300"  _text={{
    color: 'white',fontSize: "md"
  }} rounded="xl" w={"60%"} h={24} >
     Úticél:  {itemvarosnev}
     
    </Box>
      

  


<Text>{itemvarosnev}</Text>

<Text></Text>

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



<Button size="lg" variant="solid" colorScheme="secondary" w={24} onPress={felvitel()} >
     Utazok!
    </Button>
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
export default withNavigation(Orszagkivalasztas);