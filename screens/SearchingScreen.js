import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function SearchingScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontFamily: 'Gilroy-Medium', color: 'black', fontSize: 15}}>
        Hello SearchingScreen
      </Text>
    </View>
  );
}

export default SearchingScreen;

const styles = StyleSheet.create({});
