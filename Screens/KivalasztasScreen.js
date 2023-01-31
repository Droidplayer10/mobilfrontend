import React from 'react';

import { withNavigation } from 'react-navigation';
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
import ProfileScreen from './ProfileScreen'


const Kivalasztas = () => {
  const [date, setDate] = useState(new Date());
  const [ActiveDateVisible, setActiveDateVisible] = useState(false);


function handleClose() {
  setActiveDateVisible(false);
}

const ActiveUser = props =>{
  return(
    <Text>{this.props.felhasznalo_id}</Text>
  )
}

  return(
    
<View>
<ActiveUser />
<Text>Melyik nap szeretne menni?</Text>

<View  >

<TouchableOpacity 
      style={styles.selectDateBtn}
      onPress={() => setActiveDateVisible(true)}>
      <Text style={styles.selectDateBtnText}>Select date</Text>
    </TouchableOpacity>
       
    



</View>



{ActiveDateVisible && (
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
        onCloseModal={handleClose}
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
        
        onChange={(event, selectedDate) => setDate(selectedDate)} 
       
      />

      
</View>      
)}

<Text>Kiválasztott dátum: {date.toLocaleDateString()}</Text>


</View>
  


  )

}
const styles = StyleSheet.create({
  selectDateBtn: {
    backgroundColor: 'rgba(104, 187, 227, 0.5)',
    padding: 10,
    borderRadius: 20,
    width: 100,
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