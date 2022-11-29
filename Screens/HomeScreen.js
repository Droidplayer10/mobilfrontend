import React, {component} from 'react';
import { Button, Text, View, FlatList,SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import App from '../App';
import NewsScreen from './NewsScreen';
import Emberek from './Emberek';


 

//-------Főprogram--------------------
const Home = ({navigation}) => {
  


    return (
        <View>
            
<Button
          title="Emberek"
          component={Emberek}
        />
<Button
          title="Go to News"
          onPress={() =>
            navigation.navigate('News')
          }
        />
    
        </View>
       
       
        

        
        

)

};




export default Home;