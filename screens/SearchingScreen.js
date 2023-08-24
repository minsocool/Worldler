import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {SERVICE} from '../data/ServiceData';
import {CARD_TRIPS} from '../data/PopularTripsSearchData';
import PopularTripListsSearch from '../itemScreens/PopularTripListsSearch';

const ServiceItem = (
  {serviceItem, onPress, backgroundColor, textColor}, // component render box
) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.itemServiceWrapper, {backgroundColor}]}>
    <Text style={[styles.titleService, {color: textColor}]}>
      {serviceItem.service}
    </Text>
  </TouchableOpacity>
);
function SearchingScreen() {
  const [selectedIDService, setSelectedService] = React.useState(1);
  const renderItem = ({item, index}) => {
    const backgroundColor =
      item.id === selectedIDService ? colors.primary : '#E8ECF2';
    const color = item.id === selectedIDService ? 'white' : 'black';

    return (
      <ServiceItem
        serviceItem={item}
        onPress={() => setSelectedService(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contentTitleHeader}>
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              color: 'black',
              fontSize: 30,
              padding: 24,
            }}>
            Discover
          </Text>
          <Image
            source={require('../assets/icons/searchIcon.png')}
            style={{width: 20, height: 20, marginRight: 20}}
          />
        </View>
        <View style={styles.contentService}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={SERVICE}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedIDService}
          />
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.contentTitleMiddle}>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              color: 'black',
              fontSize: 24,
              padding: 24,
            }}>
            Popular
          </Text>
          <Text
            style={{
              marginRight: 20,
              color: colors.primary,
              fontFamily: 'Gilroy-Regular',
              fontSize: 13,
            }}>
            See all
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PopularTripListsSearch cardList={CARD_TRIPS} />
        </ScrollView>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

export default SearchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 20,
  },
  middle: {
    flex: 70,
  },
  footer: {
    flex: 10,
  },
  contentTitleHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentTitleMiddle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemServiceWrapper: {
    backgroundColor: '#E8ECF2',
    padding: 10,
    marginLeft: 24,
    borderRadius: 10,
  },
  titleService: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: '#060606',
  },
});
