import React, { useState, useEffect } from "react";
import { Input, Icon, Stack, Pressable, Center, NativeBaseProvider,VStack,ScrollView,Button,Divider,Heading,Image,AspectRatio, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import{createStackNavigator} from '@react-navigation/stack';
import RegisztracioScreen from './RegisztracioScreen';
import BejelentkezettProfileScreen from "./BejelentkezettProfileScreen";
import { id } from "postcss-selector-parser";
const IP = require('../IPcim');
import { useNavigation } from '@react-navigation/native';





const Profile=() => {

  

  
  
  
  return (
    
    <NativeBaseProvider>
      <Center flex={1} px="3">
      <AspectRatio w="100%" ratio={16 / 9}>
        <Box alignItems="center" marginTop={10}>
        <Image borderRadius={50} size={"xl"} source={require("./repulo.jpg")} alt="image" />
        </Box>
          </AspectRatio>
          <InputButtons />
          
      </Center>
    </NativeBaseProvider>
  );
};



const InputButtons = () => {
  const [show, setShow] = React.useState(false)
  const [felhasznalo_id, setfelhasznalo_id] = useState("");
  const [felhasznalo_jelszo, setfelhasznalo_jelszo] = useState("");

  async function Handlelogin() {
    try {
    const body = JSON.stringify({ felhasznalo_id: felhasznalo_id, felhasznalo_jelszo: felhasznalo_jelszo });
    //---------------------POSTOLJA az adatokat a backendnek, ami leellenorzi, hogy letezik e ilyen ID majd visszadobja a const databa. Mivel visszadob adatokat, igy a message-t.
    // --------------------- Viszont ha van res.status pl.: 401-es hiba, akkor nem dob vissza semmit, igy if-be nem lehet használni se a res.statust se a data.message-t MEGOLDANDÓ
    const response = await axios.post(IP.ipcim+'felhasznalok',
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
     }),
     navigation.setParams({
      felhasznaloId: felhasznalo_id
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

  const Handleregist = () =>{
    navigation.navigate('Regisztracio')
  }

  const navigation = useNavigation();
 
  return <Stack space={4} w="100%" mt={20} alignItems="center">
      <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="ID" onChangeText={(felhasznalo_id) => setfelhasznalo_id(felhasznalo_id)} />
      <Input w={{
      base: "75%",
      md: "25%",
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" onChangeText={(felhasznalo_jelszo) => setfelhasznalo_jelszo(felhasznalo_jelszo)}/>

          <ScrollView showsVerticalScrollIndicator={false} px="3">

<VStack w="100%" space={4} px="2" mt="4" alignItems="center" justifyContent="center">
<Divider w="100%" />
 
  <Stack mb="2.5" mt="1.5" direction={{
  base: "column",
  md: "row"
}} space={2} mx={{
  base: "auto",
  md: "0"
}}>
  
    
  <Button size="sm" variant="link" colorScheme="secondary" >
      Elfelejtette a jelszót?
    </Button>


    <Button size="sm" variant="link" colorScheme="primary" onPress={Handleregist}>
      Regisztráció
    </Button>
  
  </Stack>

  <Divider w="100%" />

  <VStack w="100%" space={4} px="2" mt="15" alignItems="center" justifyContent="center">
  <Button size="lg" onPress={Handlelogin} >Bejelentkezés</Button>
  </VStack>
  </VStack>
</ScrollView>

    </Stack>





}




    export default Profile;