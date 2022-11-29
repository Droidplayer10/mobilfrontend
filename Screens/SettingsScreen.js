import React, {component} from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import App from '../App';
import NewsScreen from './NewsScreen';


const Settings = ({navigation}) => {
    
    return (
        <Button
          title="Go to News"
          onPress={() =>
            navigation.navigate('News')
          }
        />
)
};

export default Settings;