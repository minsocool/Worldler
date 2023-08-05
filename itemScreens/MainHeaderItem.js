import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {icons, colors, images} from '../constants';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
function MainHeaderItem({title, LocateCityCheckingIcon}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/*}
      <TouchableOpacity onPress={() => {}}>
        <Image source={icons.menuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
  {*/}
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {}}>
        <Lottie
          source={LocateCityCheckingIcon}
          autoPlay
          loop={true}
          style={styles.comPassIcon}
        />
        <Text style={styles.locationTitle}>{title}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        <Image source={images.userAvatar} style={styles.userAvatar} />
      </TouchableOpacity>
    </View>
  );
}
export default MainHeaderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  locationTitle: {
    color: colors.primary,
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    left: 60,
  },
  comPassIcon: {
    width: 70,
    height: 70,
    justifyContent: 'flex-start',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#060606',
    marginRight: 15,
  },
});
