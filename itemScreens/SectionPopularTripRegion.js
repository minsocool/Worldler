import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
function SectionPopularTripRegion({title, onPress}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.txtSeeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SectionPopularTripRegion;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 16,
  },
  txtSeeAll: {
    color: colors.primary,
    fontFamily: 'Gilroy-Medium',
  },
});
