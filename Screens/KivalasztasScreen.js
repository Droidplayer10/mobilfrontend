import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

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


const Kivalasztas = () => {

  return(
    <Text>Hello</Text>
  )

}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Kivalasztas);