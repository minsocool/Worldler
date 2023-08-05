import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
const TYPEPLACECARD_WIDTH = 60;
const TYPEPLACECARD_HEIGHT = 80;
function TypePlaceItem({list}) {
  return (
    <View style={styles.containerType}>
      {list.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.btnType, styles.shadow]}>
            <View style={styles.boxType}>
              {/* WARNINGGGGGGGGGGG */}
              {/**  Xu ly data phan vung cho tung dia diem */}
              <Image source={item.typePlaceIcon} style={styles.iconTypePlace} />
              <Text style={styles.txtTypePlace}>{item.typePlaceTxt}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TypePlaceItem;

const styles = StyleSheet.create({
  containerType: {
    flexDirection: 'row',
    height: 100,
  },
  btnType: {
    width: TYPEPLACECARD_WIDTH,
    height: TYPEPLACECARD_HEIGHT,
    marginLeft: 13,
    marginTop: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  boxType: {
    width: TYPEPLACECARD_WIDTH,
    height: TYPEPLACECARD_HEIGHT,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
  },
  iconTypePlace: {
    width: 25,
    height: 25,
  },
  txtTypePlace: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#060606',
    marginTop: 10,
    fontWeight: '400',
  },
});
