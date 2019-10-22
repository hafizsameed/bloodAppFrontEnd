import React from 'react';
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import Navigation from './config/navigation'
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {Root} from 'native-base'
class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <React.Fragment>
        <Root>
        <Navigation />
        </Root>
      </React.Fragment>
      </PersistGate>
    </Provider>
      );
    }
}
export default App

