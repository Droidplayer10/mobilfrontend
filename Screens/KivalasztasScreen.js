import React from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, ScrollView,Button, Circle,Flex, VStack,Switch,Input,ZStack } from "native-base";
import axios from 'axios';
const IP = require('../IPcim');
import { withNavigation,useRoute, NavigationEvents } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';


import {
  
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable
} from 'react-native';
import Ajanlat from './AjanlatScreen';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



const Kivalasztas = ({route,navigation}) => {
  const [date, setDate] = useState(new Date());
  const [IsDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [ajanlathonnanvaros, setajanlathonnanvaros] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const {from} = route.params;

  
  
  const [felhasznaloId, setFelhasznaloId] = useState(null);
  const [bejelentkezve, setBejelentkezve] = useState(false);

  useEffect(() => {
    const Bejelentkezes = async () => {
      const felhasznaloId = await AsyncStorage.getItem('felhasznalo_id');
      if (felhasznaloId) {
        setFelhasznaloId(felhasznaloId);
        setBejelentkezve(true);
      }
    };
    Bejelentkezes();
  }, []);


  async function Utazom() {
    
    if (bejelentkezve) {
      if (ajanlathonnanvaros !== '') {
        try {
          const body = JSON.stringify({
            felhasznaloId,
            ajanlathonnanvaros,
            itemajanlatvarosnev,
            selectedDate,
            returnDate,
            selectedValue,
          });
  
          const response = await axios.post(IP.ipcim + 'felvitel', body, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = response.data;
          alert('Sikeresen felvettük az utazásodat!');
          navigation.goBack()
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('Kérjük töltsd ki az üres mezőt!');
      }
    } else {
      alert("Kérjük jelentkezz be!")
      navigation.navigate('Profile');
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
  


  if (from ==="ajanlatok") {
    const { itemajanlatnev } = route.params;
  const {itemajanlatnap} = route.params;
  const {itemajanlatvarosnev} = route.params;
  const returnDate = new Date(selectedDate.getTime() + itemajanlatnap * 24 * 60 * 60 * 1000);

    return(
      <NativeBaseProvider>
        <Center flex={1}>
  
       
  
        <Center bg="secondary.300" _text={{
      color: 'white'
    }} rounded="xl" w={"90%"} h={24} >
        
        
  
        <Text style={styles.itemvarosnevText}>{itemajanlatnev} </Text>
       
        
       
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
  <Text>Mennyi fő szeretne utazni?</Text>
  <Text></Text>
  <View style={styles.pickerStyle}>
  
  <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
        
        </Picker>
        </View>
        <Text></Text>
        <Text></Text>
  <Stack mb="2.5" mt="1.5" direction={{
          base: "row",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
          <Button size="lg" variant="outline" colorScheme="secondary" onPress={() => navigation.goBack()} > 
              Mégse
            </Button>
  <Button size="lg" variant="solid" colorScheme="secondary" onPress={Utazom} >
              Utazom!
            </Button>
  </Stack>
  </Center>
      </NativeBaseProvider>
    )


  }
  else{
    const {itemorszagvarosnev} = route.params
    
    return(
      <NativeBaseProvider>
        <Center flex={1}>
  
       
  
        <Center bg="secondary.300" _text={{
      color: 'white'
    }} rounded="xl" w={"90%"} h={24} >
      <Text style={styles.itemvarosnevText}>{itemorszagvarosnev} </Text>
        
  
  
       
        
       
      </Center>
        
  
  
  
  <Text></Text>
  
  <Text>Honnan: </Text>
  
  <Box alignItems="center">
        <Input mx="3" placeholder="Város" w="50%" onChangeText={(ajanlathonnanvaros) => setajanlathonnanvaros(ajanlathonnanvaros)} />
      </Box>
  
  <Text></Text>
  <Text>Úticél:</Text>
  <Text>{itemorszagvarosnev}</Text>
  
  <Text>Utazási dátum:</Text>
  
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
  
  
  <Text></Text>
  <Text>Hány fő szeretne utazni?</Text>
  <Text></Text>
  <View style={styles.pickerStyle}>
  
  <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
        
        </Picker>
        
        
        </View>
        <Text></Text>
        <Text></Text>
  <Stack mb="2.5" mt="1.5" direction={{
          base: "row",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
          <Button size="lg" variant="outline" colorScheme="secondary" onPress={() => navigation.goBack()} > 
              Mégse
            </Button>
  <Button size="lg" variant="solid" colorScheme="secondary" onPress={Utazom} >
              Utazom!
            </Button>
  </Stack>
  
  </Center>
      </NativeBaseProvider>
    )
    
  }
  

 

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
  pickerStyle:{
    backgroundColor: 'rgba(104, 187, 227, 0.4)',
    
    borderRadius: 20
  },
  selectDateBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  itemvarosnevText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
});

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Kivalasztas);