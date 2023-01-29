import React, {component} from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withNavigation } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import FoglalasScreen from './Screens/FoglalasScreen';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import AjanlatScreen from './Screens/AjanlatScreen';
import KivalasztasScreen from './Screens/KivalasztasScreen';
import RegisztracioScreen from './Screens/RegisztracioScreen';
import BejelentkezettProfileScreen from './Screens/BejelentkezettProfileScreen';





const AjanlatStack = createNativeStackNavigator();

function AjanlatStackScreen() {
  return (
    <AjanlatStack.Navigator screenOptions={{
      headerShown: false
    }}>
     
      <AjanlatStack.Screen name="Ajanlat" component={AjanlatScreen} />
      <AjanlatStack.Screen name="Kivalasztas" component={KivalasztasScreen} />
   
    </AjanlatStack.Navigator>
  );
}




const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Foglalas" component={FoglalasScreen} />
   
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
    <ProfileStack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="BejelentkezettProfileScreen" component={BejelentkezettProfileScreen}  />
      <ProfileStack.Screen name="Regisztracio" component={RegisztracioScreen} />
      
    
    </ProfileStack.Navigator>
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
              iconName = focused ? 'pricetags' : 'pricetags-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} 
         options={{
      headerStyle: {
        backgroundColor: '#567189',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
        <Tab.Screen name="Ajanlatok" component={AjanlatStackScreen}
             options={{
              headerStyle: {
                backgroundColor: '#567189',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
        
        <Tab.Screen name="Profile" component={ProfileStackScreen} 
             options={{
              headerStyle: {
                backgroundColor: '#567189',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen}
             options={{
              headerStyle: {
                backgroundColor: '#567189',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
        
        
      </Tab.Navigator>
      
    
    
    </NavigationContainer>
    

  );
}




