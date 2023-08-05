import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {colors} from '../constants';
import {BlurView} from '@react-native-community/blur';
function TicketScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTicket}>
        <View style={styles.boxTitle}>
          <Text style={styles.tittle}>Where do you {'\n'}want to go ?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../assets/images/userAvatar.png')}
              style={styles.userAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.middleTicket}>
        <View style={styles.boxFlights}>
          <View style={styles.boxContentFlights}>
            <Text style={styles.txtFrom}>From</Text>
            <Text style={styles.placeGo}>Ho Chi Minh</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 1,
                  borderRadius: 1,
                  borderStyle: 'dashed',
                  borderWidth: 0.4,
                  width: 200,
                }}
              />
              <TouchableOpacity>
                <Image
                  source={require('../assets/icons/exchangeIcon.png')}
                  style={styles.exchangeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txtTo}>To</Text>
            <Text style={styles.placeArrive}>HaNoi</Text>
          </View>
        </View>
        <View style={styles.boxAction}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#EBEBEB',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/Exclamation_mark.png')}
                style={styles.btnExclamationIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnContinue}>
            <Text style={styles.txtContinue}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerTicket}>
        <Image
          source={require('../assets/images/advertisingSacombank.png')}
          style={styles.imageAdvertising}
          resizeMode="cover"
        />
        <View style={styles.boxAdvertising}>
          <Text style={styles.txtAdvertising}>Learn More</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTicket: {
    flex: 20,
  },
  middleTicket: {
    flex: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTicket: {
    flex: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    paddingTop: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tittle: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 24,
    textAlign: 'left',
    color: '#060606',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 400 / 2,
    borderWidth: 1,
    borderColor: '#060606',
  },
  boxFlights: {
    width: width - 30,
    marginBottom: 15,
    borderRadius: 16,
    height: 150,
    backgroundColor: 'white',
    shadowColor: colors.primary,
    elevation: 5,
    shadowOpacity: 0.3,
  },
  boxContentFlights: {
    marginHorizontal: 25,
    paddingVertical: 10,
  },
  txtFrom: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
    color: '#B4B6BA',
  },
  txtTo: {
    fontFamily: 'Gilroy-Medium',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    color: '#B4B6BA',
  },
  placeGo: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    textAlign: 'left',
    color: '#060606',
  },
  placeArrive: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    textAlign: 'left',
    color: '#060606',
  },
  exchangeIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },

  boxAction: {
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnExclamationIcon: {
    width: 30,
    height: 30,
    tintColor: '#9A9BA8',
  },
  btnContinue: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  txtContinue: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 18,
    fontWeight: '650',
    textAlign: 'center',
    color: 'black',
  },
  imageAdvertising: {
    width: 250,
    height: 200,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  boxAdvertising: {
    width: 200,
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 15,
    borderRadius: 16,
  },
  txtAdvertising: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: colors.primary,
  },
});
