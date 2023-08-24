import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import BookmarkButton from '../componentsIcon/BookmarkButton';
import {getDigits} from './UtilityStar';

const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;
const PopularTripListsSearch = ({cardList}) => {
  return (
    <FlatList
      data={cardList}
      horizontal
      snapToInterval={220}
      decelerationRate="fast"
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginRight: index === cardList.length - 1 ? 12 : 0,
            }}>
            <View style={styles.card}>
              <BookmarkButton style={styles.bookmarkButton} />
              <View style={styles.imageBox}>
                <Image source={item.cardImage} style={styles.image} />
              </View>
              <View style={styles.cardContent}>
                <View style={styles.titleBox}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtTitle}>{item.title}</Text>
                    <Text style={styles.rating}>{getDigits(item.rating)}</Text>

                    <Image
                      source={require('../assets/icons/rateIcon.png')}
                      style={styles.ratingStarIcon}
                    />
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/icons/locationIcon.png')}
                      style={styles.locationIcon}
                    />
                    <Text style={styles.txtLocation}>{item.location}</Text>
                  </View>
                </View>
                <ScrollView>
                  <View style={styles.descriptionBox}>
                    <Text style={styles.txtDescription}>
                      {item.description}
                    </Text>
                  </View>
                </ScrollView>

                <View style={styles.priceBox}>
                  <Text style={styles.txtPrice}>{item.price}</Text>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 14,
                      color: '#060606',
                      fontWeight: '600',
                    }}>
                    /person
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default PopularTripListsSearch;

const styles = StyleSheet.create({
  card: {
    width: 230,
    height: 300,
    backgroundColor: 'white',
    elevation: 2,
    borderBottomWidth: 0.2,
    borderRadius: 6,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContent: {
    marginLeft: 10,
  },
  imageBox: {
    marginLeft: 10,
  },
  image: {
    width: 210,
    height: 150,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 16,
  },
  titleBox: {
    marginTop: 10,
  },
  descriptionBox: {
    marginVertical: 10,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
  },
  txtTitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: '#060606',
  },
  txtLocation: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: '#060606',
  },
  txtDescription: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 13,
    color: 'grey',
    fontWeight: '600',
  },
  txtPrice: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    color: '#060606',
    fontWeight: '600',
  },
  locationIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  rating: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#060606',
    marginLeft: 60,
  },
  ratingStarIcon: {
    width: 15,
    height: 15,
  },
});
