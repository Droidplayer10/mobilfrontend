import React from 'react';


import { withNavigation } from 'react-navigation';

import { Button } from 'react-native';
import { useRoute } from 'react-navigation';

import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert, Modal, Pressable, Image,
} from 'react-native';
import Ajanlat from './AjanlatScreen';



const Kivalasztas = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [IsDatePickerVisible, setIsDatePickerVisible] = useState(false);
  
  
  const { itemajanlatnev } = route.params;
  const {itemajanlatnapszama} = route.params;
  



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
const returnDate = new Date(selectedDate.getTime() + itemajanlatnapszama * 24 * 60 * 60 * 1000);

  return(
    
<View>

<Text>{itemajanlatnev}</Text>

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
        minDate="2016-05-01"
        maxDate="2016-06-01"
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

</View>

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