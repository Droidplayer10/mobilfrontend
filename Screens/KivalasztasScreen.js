import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class kivalasztas extends React.Component {
  render() {
    return (
        <Text>Hello</Text>
    )
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(kivalasztas);