// App.js
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import MainNavigator from './components/MainNavigator';
function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        hidden={true}
        backgroundColor="transparent"></StatusBar>
      <MainNavigator />
    </SafeAreaView>
  );
}

export default App;
