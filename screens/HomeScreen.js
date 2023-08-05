import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import MainHeaderItem from '../itemScreens/MainHeaderItem';
import MainScreenHeaderItem from '../itemScreens/MainScreenHeaderItem';
import LocationProcessesItem from '../itemScreens/LocationProcessesItem';
import {COUNTRY} from '../data/RegionData';
import {TRIPS} from '../data/PopularTripsData';
import SectionPopularTripRegion from '../itemScreens/SectionPopularTripRegion';
// import PopularTripListsForRegion from '../itemScreens/PopularTripListsForRegion';
// import PlayListsItem from '../draft/PlayListsItem';
const width = Dimensions.get('window').width;
const CARD_WIDTH = 160;
const CARD_HEIGHT = 220;
import {getDigits} from '../itemScreens/UtilityStar';
import {useNavigation} from '@react-navigation/native';
/*
const Item = ({item, onPress, textColor, index}) => (
  <View style={{justifyContent: 'center', height: 50}}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: 21,
        marginRight: index === COUNTRY.length - 1 ? 24 : 0,
      }}>
      <Text style={[styles.txtRegion, textColor]}>{item.region}</Text>
    </TouchableOpacity>
  </View>
);
*/

function HomeScreen(props) {
  const navigation = useNavigation();
  //  const [selectedId, setSelectedId] = React.useState(1);
  const [region, setRegion] = React.useState('All');
  const [datalist, setDataList] = React.useState(TRIPS);
  // function render Item
  /*
  const renderRegionItem = ({item, index}) => {
    const color = item.id === selectedId ? colors.primary : 'gray';
    return (
      <Item
        item={item}
        index={index}
        onPress={() => setSelectedId(item.id)}
        textColor={{color}}
      />
    );
  };
*/

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
  const PopularTripListsForRegion = ({item, index}) => {
    return (
      //  <View key={index} style={styles.itemContainer}>
      <View key={item.id} style={styles.container}>
        <TouchableOpacity
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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.light,
      }}>
      <MainHeaderItem
        LocateCityCheckingIcon={require('../assets/animations/LocateCityChecking.json')}
        title={'SaiGon,VietNam'}
      />
      <View style={styles.boxTitle}>
        <MainScreenHeaderItem
          mainTittle={'Welcome'}
          userName={'#minsocool0711'}
        />
      </View>

      <View style={styles.boxContainerLocation}>
        <View style={styles.boxLocation}>
          <LocationProcessesItem
            logo={require('../assets/images/LogoChar(Transparent).png')}
            titleLocation={'Find tourist locations'}
            secondTitleLocation={
              'Promo packages for tourist\nlocations around you '
            }
            maps={require('../assets/images/locationMaps.png')}
            googleLogo={require('../assets/images/googleMapLogo.png')}
          />
        </View>
      </View>
      {/*}
      <View style={styles.boxRegion}>
        <FlatList
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          data={COUNTRY}
          showsHorizontalScrollIndicator={false}
          renderItem={renderRegionItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />

        <ScrollView horizontal={true}>
          {COUNTRY.map(eachRegion => (
            <TouchableOpacity
              style={[
                {
                  width: Dimensions.get('window').width / 4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                region === eachRegion.region,
              ]}
              onPress={() => setRegionFilter(eachRegion.region)}>
              <Text
                style={[
                  {
                    fontSize: 15,
                    color: 'gray',
                    fontFamily: 'Gilroy-Medium',
                  },
                  region === eachRegion.region && styles.txtActive,
                ]}>
                {eachRegion.region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.boxTouristArea}>
        <SectionPopularTripRegion title="Popular Trips" onPress={() => {}} />
        <FlatList
          data={datalist}
          horizontal
          renderItem={({item}) => <PlayListsItem list={TRIPS} />}
          keyExtractor={item => item.id}
        />
      

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PopularTripListsForRegion list={TRIPS} />
        </ScrollView>
      </View>
        {*/}

      <View style={styles.boxRegion}>
        <ScrollView horizontal={true}>
          {COUNTRY.map(eachRegion => (
            <TouchableOpacity
              key={eachRegion.id}
              style={[
                {
                  marginLeft: 22,
                  marginRight: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                //  region === eachRegion.region && styles.backGroundActive,
              ]}
              onPress={() => setRegionFilter(eachRegion.region)}>
              <Text
                style={[
                  {
                    fontSize: 15,
                    color: 'gray',
                    fontFamily: 'Gilroy-Medium',
                  },
                  region === eachRegion.region && styles.txtActive,
                ]}>
                {eachRegion.region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.boxTouristArea}>
        <SectionPopularTripRegion title="Popular Trips" onPress={() => {}} />
        <FlatList
          data={datalist}
          horizontal
          keyExtractor={item => item.id}
          renderItem={PopularTripListsForRegion}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  boxTitle: {
    flex: 10,
    backgroundColor: 'white',
  },
  boxContainerLocation: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRegion: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTouristArea: {
    flex: 50,
  },
  boxLocation: {
    width: width - 15,
    height: 160,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 7,
  },
  txtRegion: {
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    fontSize: 15,
  },
  txtActive: {
    color: colors.primary,
    fontSize: 15,
  }, // RestorePoint
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
    shadowColor: colors.primary,
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
