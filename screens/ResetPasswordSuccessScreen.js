import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
function ResetPasswordSuccessScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerDone}>
        <Image
          style={styles.logoChar}
          resizeMode="center"
          source={require('../assets/images/LogoChar(Transparent).png')}
        />
        <TouchableOpacity>
          <Text style={styles.txtCreateAnAccount}>Create an account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleDone}>
        <View // Status View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <Image
            style={styles.iconResetSuccessPassword}
            source={require('../assets/icons/doneResetPassword.png')}
          />
          <Text style={styles.titleResetPassword}>All done!</Text>
          <Text style={styles.sloganDoneReset}>
            Your request to reset password has been sent to your email.{'\n'}
            Would you like to set up Face ID as well ?
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={styles.btnSetUpFaceID}
            onPress={() => {
              alert('You press set up FaceID');
            }}>
            <Image
              source={require('../assets/icons/faceIDIcon.png')}
              style={styles.faceIDIcon}
            />
            <Text style={styles.txtFaceID}>Set up Face ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDoLater}
            onPress={() => {
              navigation.replace('Logup');
            }}>
            <Text style={styles.txtDoLater}>I'll do this later</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerDone}></View>
    </View>
  );
}

export default ResetPasswordSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerDone: {
    flex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  middleDone: {
    flex: 70,
    marginTop: 50,
  },
  footerDone: {
    flex: 10,
  },
  logoChar: {
    tintColor: 'black',
    width: 150,
    height: 50,
    marginTop: 30,
    marginLeft: 5,
  },
  txtCreateAnAccount: {
    marginTop: 30,
    marginRight: 5,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: 13,
    fontFamily: 'Gilroy-Bold',
  },
  iconResetSuccessPassword: {
    width: 40,
    height: 40,
    borderWidth: 0.3,
    borderColor: 'black',
    elevation: 5,
    shadowColor: 'black',
    borderRadius: 10,
  },
  titleResetPassword: {
    color: '#060606',
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    marginVertical: 10,
  },
  sloganDoneReset: {
    color: '#929292',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
    textAlign: 'center',
  },
  btnSetUpFaceID: {
    flexDirection: 'row',
    width: 250,
    height: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  faceIDIcon: {
    width: 20,
    height: 20,
  },
  txtFaceID: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  btnDoLater: {
    width: 250,
    height: 35,
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#060606',
  },
  txtDoLater: {
    color: '#060606',
    fontSize: 11,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
    marginLeft: 5,
  },
});
