import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Button, StyleSheet, View } from 'react-native';
import FoglalasScreen from './FoglalasScreen';

export default class Home extends React.Component {  
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>

<SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
      />

         <View style={styles.alternativeLayoutButtonContainer}>
          <Button style={styles.Button}
            onPress={() =>this.props.navigation.navigate('Foglalas')}
            Component={FoglalasScreen}
            title="Foglalás"
            color="blue"
          />
        <Button style={styles.Button}
            onPress={() =>this.props.navigation.navigate('Foglalas')}
            Component={FoglalasScreen}
            title="Szoba"
            color="blue"
          />
        <Button style={styles.Button}
            onPress={() =>this.props.navigation.navigate('Foglalas')}
            Component={FoglalasScreen}
            title="Autó"
            color="blue"
          />
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  
});