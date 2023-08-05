import Icon from 'react-native-vector-icons/FontAwesome5';
import {images, icons, colors, fontSizes} from '../constants';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
const CARD_WIDTH = 160;
const CARD_HEIGHT = 220;
import {getDigits} from '../itemScreens/UtilityStar';
import {TRIPS} from '../data/PopularTripsData';
function PlayListsItem({list}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.btnTrips}
            onPress={() => {
              navigation.navigate('TripDetails', {trip: item});
            }}>
            <View style={[styles.containerCard, styles.shadow]}>
              <View style={styles.cardImageBox}>
                <Image
                  style={styles.cardImage}
                  resizeMode="cover"
                  source={item.imageCardPlace}></Image>
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.tittle}>{item.title}</Text>
                  <Text style={styles.regionChosen}>{item.region}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assets/icons/dollarIcon.png')}
                        style={styles.iconDollar}
                      />
                      <Text style={styles.txtPrice}>{item.price}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 40,
                      }}>
                      <Image
                        source={require('../assets/icons/rateIcon.png')}
                        style={styles.rateIcon}
                      />
                      <Text style={styles.txtRate}>{getDigits(item.rate)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PlayListsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  btnTrips: {
    marginLeft: 15,
    marginTop: 5,
  },
  cardImageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 80,
    borderRadius: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: 130,
    height: 130,
    borderRadius: 16,
    marginTop: 5,
    resizeMode: 'cover',
  },
  shadow: {
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  tittle: {
    fontFamily: 'Gilroy-Medium',
    fontWeight: 'bold',
    color: '#060606',
  },
  regionChosen: {
    fontFamily: 'Gilroy-Regular',
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 3,
  },
  iconDollar: {
    width: 16,
    height: 16,
  },
  rateIcon: {
    width: 16,
    height: 16,
  },
  txtPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  txtRate: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
});
