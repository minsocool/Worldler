import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {COUNTRY} from '../data/RegionData';
import {TRIPS} from '../data/PopularTripsData';
import {useNavigation} from '@react-navigation/native';
const CARD_WIDTH = 160;
const CARD_HEIGHT = 220;
import {getDigits} from '../itemScreens/UtilityStar';
const draft = () => {
  const navigation = useNavigation();
  const [region, setRegion] = React.useState('All');
  const [datalist, setDataList] = React.useState(TRIPS);
  const setRegionFilter = region => {
    if (region !== 'All') {
      setDataList([
        ...TRIPS.filter(eachRegion => eachRegion.region === region),
      ]);
    } else {
      setDataList(TRIPS);
    }
    setRegion(region);
  };
  const renderItem = ({item, index}) => {
    return (
      //  <View key={index} style={styles.itemContainer}>
      <View key={index} style={styles.container}>
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
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.listTab}>
          {COUNTRY.map(eachRegion => (
            <TouchableOpacity
              style={[
                styles.btnTab,
                region === eachRegion.region && styles.btnTabActive,
              ]}
              onPress={() => setRegionFilter(eachRegion.region)}>
              <Text style={styles.txtTab}>{eachRegion.region}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={datalist}
        horizontal
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default draft;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: 'row',
    height: 100,
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#060606',
    marginTop: 15,
    padding: 10,
    justifyContent: 'center',
  },
  txtTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: 'cyan',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  txtItem: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemRegion: {
    justifyContent: 'center',
    right: 12,
  },
  container: {
    flex: 1,
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
