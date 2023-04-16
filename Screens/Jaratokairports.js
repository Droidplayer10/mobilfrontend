import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Text } from "react-native-elements";
import React, { useState, useEffect } from "react";

const Jaratokairports = ({ route,navigation }) => {
const { itemorszagvarosnev } = route.params;
const { ajanlathonnanvaros } = route.params;
const { selectedDate } = route.params;
const [flightData, setFlightData] = useState(null);

useEffect(() => {
const options = {
method: 'GET',
url: 'https://ryanair.p.rapidapi.com/airports',
headers: {
'x-rapidapi-host': 'ryanair.p.rapidapi.com',
'x-rapidapi-key': 'df246d20demsh470aa455e3b9d0dp1dbd74jsna3d4a381b713'
}
};
axios.request(options)
  .then(response => {
    // Létrehozzuk az airport objektumot
    const airports = {};
    response.data.forEach(airport => {
      airports[airport.city_code] = airport;
      airports[airport.code] = airport;
    });
    
    const departureCityCode = response.data.find(airport => airport.city_code === ajanlathonnanvaros.toUpperCase()).code;
    const arrivalCityCode = response.data.find(airport => airport.code === itemorszagvarosnev.toUpperCase()).code;
    
    // A "Flights" végpont válaszának feldolgozása
   
   
    const date = selectedDate;

    const flightsOptions = {
      method: 'GET',
      url: 'https://ryanair.p.rapidapi.com/v4/flights',
      params: {
        origin_code: 'LGW',
    destination_code: 'DUB',
    origin_departure_date: '2023-09-28',
    destination_departure_date: '2023-10-28'
      },
      headers: {
        'x-rapidapi-host': 'ryanair.p.rapidapi.com',
        'x-rapidapi-key': '5c6a0c7eb5msh476e5ea70801982p11029bjsn4aae7a4f76ad'
      }
    };
    
    axios.request(flightsOptions)
      .then(response => {
        setFlightData(response.data);
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}, [ajanlathonnanvaros, itemorszagvarosnev, selectedDate]);

return(
<React.Fragment>
    <Text>Járatok:</Text>
    {flightData ? (
      flightData.trips[0].dates[0].flights.map(flight => (
        <View key={flight.id}>
          <Text>Repülés száma: {flight.origin_code}</Text>
        
        </View>
      ))
    ) : (
      <Text>Nincs járat elérhető a keresett dátumon.</Text>
    )}
  </React.Fragment>
);
}

export default withNavigation(Jaratokairports);