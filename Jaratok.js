import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';

const Jaratok = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://ryanair.p.rapidapi.com/flights',
        params: {
          origin_code: 'LGW',
          destination_code: 'DUB',
          origin_departure_date: '2023-09-28',
          destination_departure_date: '2023-10-28'
        },
        headers: {
          'X-RapidAPI-Key': 'df246d20demsh470aa455e3b9d0dp1dbd74jsna3d4a381b713',
          'X-RapidAPI-Host': 'ryanair.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        setData(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    };

    fetchData();
  }, []);

  const sortedData = Object.keys(data).sort();

  return (
    <View>
      {sortedData.map((key) => {
        return data[key].map((item, index) => (
          <Text key={index}>{JSON.stringify(item)}</Text>
        ));
      })}
    </View>
  );
};

export default Jaratok;
