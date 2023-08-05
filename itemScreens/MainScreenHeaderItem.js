import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {colors} from '../constants';
function MainScreenHeaderItem({mainTittle, userName}) {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [buttonTxt, setButtonTxt] = React.useState(
    'Show your coordinates: Vi do va Kinh do',
  );
  function handleClick() {
    setButtonTxt('Your coordinates: ');
  }
  return (
    <View>
      <Text style={styles.txtWelcome}>
        {mainTittle} {userName}.
      </Text>
      <TouchableOpacity
        onPress={() => {
          [getLocation(), handleClick()];
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.showTxtCoordinates}>{buttonTxt}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 150,
            }}>
            <Text style={styles.txtCoordinate}>{latitude}</Text>
            <Text style={styles.txtCoordinate}>{longitude}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MainScreenHeaderItem;
const styles = StyleSheet.create({
  txtWelcome: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 20,
    marginLeft: 15,
  },
  showTxtCoordinates: {
    fontFamily: 'Gilroy-Medium',
    color: '#060606',
    fontSize: 13,
    marginLeft: 15,
    marginRight: 10,
  },
  txtCoordinate: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: 'lime',
  },
});
