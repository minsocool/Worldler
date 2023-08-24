import React from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function GPSLocationScreen() {
  React.useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    // PERMISSION
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(position.coords);
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [pin, setPin] = React.useState({
    latitude: lat,
    longitude: long,
  });
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.799849755031484,
          longitude: 106.68486762550553,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0005,
        }}
        provider="google"
        showsUserLocation={true}>
        <Marker
          coordinate={{latitude: lat, longitude: long}}
          title="GPS"
          description="Im here"
          pinColor="aqua"
          draggable={true}
          onDragStart={e => {
            console.log('Drag Start', e.nativeEvent);
          }}
          onDragEnd={e => {
            console.log('Drag End', e.nativeEvent);

            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}></Marker>
        <Circle center={pin} radius={1000}></Circle>
      </MapView>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 20,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          getLocation();
        }}>
        <Text style={{color: 'white'}}>Get Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GPSLocationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
