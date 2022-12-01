import React, {component} from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import AutoScreen from './Screens/AutoScreen';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';




const AjanlatStack = createNativeStackNavigator();

function AjanlatStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AjanlatStack.Screen name="Home" component={HomeScreen} />
      <AjanlatStack.Screen name="Auto" component={AutoScreen} />
   
    </HomeStack.Navigator>
  );
}




const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Auto" component={AutoScreen} />
   
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      
    </SettingsStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return(
    <ProfileStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    
    </ProfileStack.Navigator>
  );
  
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  return (

<NavigationContainer>

      <Tab.Navigator screenOptions={({ route }) => ({ 
          
          tabBarIcon: ({ focused, color, size }) => {
             
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
            } else if(route.name == 'Profile'){
              iconName = focused ? 'ios-finger-print' : 'ios-finger-print-outline';
            } else if(route.name == 'Ajanlatok'){
              iconName = focused ? 'ios-offer' : 'ios-offer-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Ajanlatok" component={AjanlatStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        
        
      </Tab.Navigator>
      
    
    
    </NavigationContainer>
    

    


  );
}




