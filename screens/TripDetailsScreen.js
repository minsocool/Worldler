import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const width = Dimensions.get('window').width;
import TripDetailsItem from '../itemScreens/TripDetailsItem';
function TripDetailsScreen({navigation, route}) {
  const {trip} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageDetailBox}>
        <Image
          source={trip.imageCardPlace}
          style={styles.imageDetailsCard}
          resizeMode="cover"
        />
        <View style={styles.headerDetail}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('../assets/icons/previousIcon.png')}
              style={{width: 30, height: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Gilroy-Medium',
              fontSize: 18,
              marginHorizontal: 80,
            }}>
            Detail
          </Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/warningIcon.png')}
              style={{width: 30, height: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.placeDetailType}>
        <TripDetailsItem trip={trip} />
      </View>
    </View>
  );
}

export default TripDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageDetailBox: {
    flex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  placeDetailType: {
    flex: 50,
  },
  imageDetailsCard: {
    width: width - 20,
    height: 300,
    borderRadius: 30,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  headerDetail: {
    position: 'absolute',
    top: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
