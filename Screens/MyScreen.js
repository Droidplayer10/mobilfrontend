import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const MyScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [menuAnim] = useState(new Animated.Value(1));

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
      
    }).start(() => setIsMenuOpen(!isMenuOpen));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>IT Travel&Relax</Text>
      </View>
      
      {isMenuOpen && (
        <Animated.View style={{ paddingVertical: 20, paddingHorizontal: 20, opacity: menuAnim }}>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Kedvencek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Előzmények</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Ajánlataink</Text>
          </TouchableOpacity>
        </Animated.View>
        
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={{ backgroundColor: '#007aff', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20 }}
        >
          <Text style={{ color: 'white' }}>{isMenuOpen ? 'Bezárás' : 'Menü'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyScreen;
