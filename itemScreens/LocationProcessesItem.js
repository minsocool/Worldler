import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
function LocationProcessesItem({
  titleLocation,
  secondTitleLocation,
  logo,
  maps,
  googleLogo,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GPSLocation');
      }}>
      <View style={{marginHorizontal: 10, alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={logo}
            style={styles.imageFamousPlace}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.titleLocation}>{titleLocation}</Text>
            <Text style={styles.secondTitleLocation}>
              {secondTitleLocation}
            </Text>
          </View>
        </View>
        <Image source={maps} style={styles.mapsLocation} />
        <Image source={googleLogo} style={styles.googleLogo} />
      </View>
    </TouchableOpacity>
  );
}

export default LocationProcessesItem;
const styles = StyleSheet.create({
  imageFamousPlace: {
    width: 100,
    height: 50,
    marginRight: 15,
  },
  titleLocation: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: colors.primary,
    textAlign: 'left',
  },
  secondTitleLocation: {
    fontFamily: 'Gilroy-Light',
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
  },
  mapsLocation: {
    width: 280,
    height: 100,
    borderRadius: 15,
    elevation: 10,
    shadowColor: colors.primary,
    backgroundColor: 'white',
  },
  googleLogo: {
    width: 80,
    height: 50,
    position: 'absolute',
    bottom: -15,
    left: 0,
  },
});
