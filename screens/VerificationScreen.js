import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants';
import firebaseSetup from '../setup';

function VerificationScreen({
  route: {
    params: {phoneNumberSignUp},
  },
}) {
  const {auth} = firebaseSetup();
  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState('');
  const navigation = useNavigation();
  // Method to sign in with phone number
  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      alert('Welcome to my app');
      navigation.replace('SuccessSignUp');
    } catch (err) {
      // alert('Opps! The OTP you entered is invalid. Please try again');
      Alert.alert(
        'Warning',
        'Opps! The OTP you entered is invalid. Please try again',
      );
    }
  };
  // Send OTP to Phone Number
  if (!confirm) {
    return (
      <View style={styles.sendOTPPhoneScreen}>
        <Image
          style={styles.logoChar}
          resizeMode="center"
          source={require('../assets/images/LogoChar(Transparent).png')}
        />
        <Text style={styles.otpText}>OTP</Text>
        <Text style={styles.verificationText}>
          SEND
          <Text style={{color: colors.primary}}>.</Text>
        </Text>
        <Text style={styles.noteSendOTP}>
          We will send you one time code on this mobile number:{'\n'}
          <Text style={{color: colors.primary, marginTop: 10}}>
            {phoneNumberSignUp}
          </Text>
        </Text>
        {/*}
        <Text>
          React Native Firebase Phone Authenication {'\n'} {phoneNumberSignUp}
        </Text>
    {*/}

        <TouchableOpacity
          style={styles.buttonSendOTP}
          onPress={() => signInWithPhoneNumber(phoneNumberSignUp)}>
          <Text style={styles.textButtonSendOTP}> GET OTP</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Image
            source={require('../assets/images/handPhoneOTPVerify.png')}
            style={styles.handPhoneImage}
          />
        </View>
      </View>
    );
  }
  // VERIFY OTP SCREEN
  return (
    <View style={styles.verifyOTPScreen}>
      <Image
        style={styles.logoChar}
        resizeMode="center"
        source={require('../assets/images/LogoChar(Transparent).png')}
      />
      <Text style={styles.otpText}>OTP</Text>
      <Text style={styles.verificationText}>
        VERIFICATION
        <Text style={{color: colors.primary}}>.</Text>
      </Text>
      <Text style={styles.noteSendOTP}>
        Enter the OTP Code from #myungDev just sent to your number:{'\n'}
        <Text style={{color: colors.primary, marginTop: 10}}>
          {phoneNumberSignUp}
        </Text>
      </Text>
      <View style={styles.inputOTPView}>
        <TextInput
          value={code}
          onChangeText={text => setCode(text)}
          style={styles.txtInputOTP}
          keyboardType="number-pad"
          maxLength={6}
        />
        <TouchableOpacity
          style={styles.buttonVerifyOTP}
          onPress={() => confirmCode()}>
          <Text style={styles.textButtonVerifyOTP}>Verify Code</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../assets/animations/verifyOTPMessNotification.json')}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
}

export default VerificationScreen;

const styles = StyleSheet.create({
  sendOTPPhoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  verifyOTPScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoChar: {
    tintColor: 'black',
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 10,
    width: 150,
    height: 50,
  },
  otpText: {
    marginLeft: 25,
    color: colors.primary,
    fontFamily: 'Gilroy-Bold',
    fontSize: 35,
  },
  verificationText: {
    marginLeft: 25,
    color: '#060606',
    fontFamily: 'Gilroy-Bold',
    fontSize: 35,
  },
  noteSendOTP: {
    marginLeft: 25,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
    color: '#060606',
    marginTop: 15,
    fontSize: 20,
  },
  viewButtonSendOTP: {
    width: 200,
    height: 200,
  },
  buttonSendOTP: {
    backgroundColor: colors.primary,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
  },
  buttonVerifyOTP: {
    backgroundColor: colors.primary,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  textButtonSendOTP: {
    fontFamily: 'Gilroy-Medium',
    color: '#060606',
    fontSize: 20,
  },
  textButtonVerifyOTP: {
    fontFamily: 'Gilroy-Medium',
    color: '#060606',
    fontSize: 20,
  },
  handPhoneImage: {
    width: 200,
    height: 300,
  },
  inputOTPView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInputOTP: {
    marginTop: 15,
    alignItems: 'center',
    width: 200,
    height: 50,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 20,
    borderColor: colors.primary,
    fontFamily: 'Gilroy-Heavy',
    fontSize: 20,
  },
});
