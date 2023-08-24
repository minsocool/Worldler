import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TRIPS} from '../data/PopularTripsHomeData';
import TypePlaceItem from './TypePlaceItem';
import {colors, icons} from '../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {getCorrectRating, getDigits} from './UtilityStar';

function TripDetailsItem({trip}) {
  const navigation = useNavigation();
  const rating = getCorrectRating(trip.rate);
  return (
    <View style={styles.container}>
      <View style={styles.headerDetails}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{trip.title}</Text>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <Text style={styles.region}>{trip.region}</Text>
            <Image
              source={icons.locationIcon}
              style={{width: 20, height: 20, marginTop: 5}}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TypePlaceItem list={TRIPS} />
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.middleDetails}>
          <Text
            style={{
              marginLeft: 15,
              fontFamily: 'Gilroy-Medium',
              fontSize: 15,
              marginTop: 5,
              color: '#060606',
            }}>
            Description
          </Text>
          <Text style={styles.descriptions}>{trip.descriptions}</Text>
          <Text
            style={{
              marginLeft: 15,
              fontFamily: 'Gilroy-Medium',
              fontSize: 15,
              marginTop: 5,
              color: '#060606',
            }}>
            Address
          </Text>
          <Text style={styles.address}> {trip.address}</Text>
        </View>
        <Text
          style={{
            marginLeft: 15,
            fontFamily: 'Gilroy-Medium',
            fontSize: 15,
            marginTop: 5,
            color: '#060606',
          }}>
          Overall Rating
        </Text>
        <View style={{marginLeft: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtRate}>{getDigits(trip.rate)}</Text>
            <AirbnbRating
              defaultRating={rating}
              count={5}
              showRating={false}
              size={12}
              isDisabled={true}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerDetails}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/dollarIcon.png')}
              style={styles.iconDollar}
            />
            <Text style={styles.priceNumber}>{trip.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.btnContinue}
            onPress={() => navigation.navigate('Ticket')}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'SF-Pro',
                fontSize: 16,
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </View>
    </View>
  );
}

export default TripDetailsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerDetails: {},
  middleDetails: {},
  footerDetails: {},
  title: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 13,
  },
  region: {
    textAlign: 'center',
    top: 5,
    fontFamily: 'Gilroy-Medium',
    color: 'gray',
    fontSize: 13,
    marginTop: 5,
  },
  descriptions: {
    fontFamily: 'Gilroy-Light',
    color: 'gray',
    fontSize: 13,
    marginLeft: 15,
    textAlign: 'auto',
    marginTop: 5,
  },
  address: {
    fontFamily: 'Gilroy-Light',
    color: 'gray',
    fontSize: 13,
    marginLeft: 15,
    textAlign: 'auto',
    marginTop: 5,
  },
  txtRate: {
    fontSize: 14,
    fontFamily: 'SF-Pro',
    color: '#060606',
    marginRight: 5,
  },
  iconDollar: {
    width: 22,
    height: 22,
    marginLeft: 20,
  },
  priceNumber: {
    fontSize: 25,
    fontFamily: 'SF-Pro',
    color: '#060606',
    textAlign: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 16,
    marginRight: 15,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
