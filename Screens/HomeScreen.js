import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class ButtonBasics extends Component {
  _onPressButton() {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
          <Button style={styles.Button}
            onPress={this._onPressButton}
            title="Foglalás"
            color="blue"
          />
          <Button
            onPress={this._onPressButton}
            title="Szoba"
            color="blue"
          />
          <Button
            onPress={this._onPressButton}
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