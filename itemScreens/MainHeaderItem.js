import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {icons, colors, images} from '../constants';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
function MainHeaderItem({titleCity, titleCountry, LocateCityCheckingIcon}) {
  const navigation = useNavigation();
  const onLogOut = () => {
    auth()
      .signOut()
      .then(Response => {
        navigation.navigate('Logup');
        console.log(Response);
        console.log('Signed out');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Not able to logout');
      });
  };

  return (
    <View style={styles.container}>
      {/*}
      <TouchableOpacity onPress={() => {}}>
        <Image source={icons.menuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
  {*/}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Menu');
        }}>
        <Image
          source={require('../assets/icons/menuIcon.png')}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Lottie
          source={LocateCityCheckingIcon}
          autoPlay
          loop={true}
          style={styles.comPassIcon}
        />
      </TouchableOpacity>

      <Text style={styles.titleCity}>{titleCity}</Text>
      <Text style={styles.titleCountry}>{titleCountry}</Text>
    </View>
  );
}
export default MainHeaderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  titleCity: {
    color: colors.primary,
    fontFamily: 'Gilroy-Regular',
    fontSize: 13,
    textAlign: 'center',
    position: 'absolute',
    right: 10,
  },
  titleCountry: {
    color: colors.primary,
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    textAlign: 'center',
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  comPassIcon: {
    width: 55,
    height: 55,
    top: 3,
  },
  menuIcon: {
    width: 30,
    height: 30,
    right: 80,
    bottom: -20,
    position: 'absolute',
  },
});
