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
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {isValidEmail} from '../utilities/Validation';
import {useNavigation} from '@react-navigation/native';

function ForgetPasswordScreen(props) {
  const resetPasswordDone = () => props.navigation.replace('ResetPwd');
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState(
    'Please enter your email address.',
  );
  // validation OK
  const isValidationOK = () => email.length > 0 && isValidEmail(email) == true;
  const resetPassword = () => {
    if (email != '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent!
          // ..
          resetPasswordDone();
          alert('Password reset email has been sent successfully');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('User not found! Please Try again');
          // ..
        });
    } else {
      alert('Please enter a valid email');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerForgot}>
        <Image
          style={styles.logoChar}
          resizeMode="center"
          source={require('../assets/images/LogoChar(Transparent).png')}
        />
        <TouchableOpacity>
          <Text style={styles.txtCreateAnAccount}>Create an account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleForgot}>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={styles.iconForgotPassword}
            source={require('../assets/icons/fingerPrint.png')}
          />
          <Text style={styles.titleForgotPassword}>Forgot password?</Text>
          <Text style={styles.sloganForgot}>
            No worries,we'll send you reset instructions.
          </Text>
        </View>
        <View
          style={{
            marginLeft: 23.5,
            marginTop: 15,
          }}>
          <Text style={{fontFamily: 'Gilroy-Medium', color: '#060606'}}>
            Email
          </Text>
          <TextInput
            style={styles.inputEmailForgot}
            placeholder="Enter your email"
            placeholderTextColor={'#D6DADD'}
            value={email}
            autoCapitalize={false}
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={email => {
              if (isValidEmail(email) == false) {
                setErrorEmail('Invalid email !');
              } else {
                setErrorEmail('');
              }
              setEmail(email);
            }}></TextInput>
          <Text style={styles.errorValidation}>{errorEmail}</Text>
          <TouchableOpacity
            disabled={isValidationOK() == false}
            style={[
              styles.btnResetPassword,
              {
                backgroundColor:
                  isValidationOK() == true ? colors.primary : 'gray',
              },
            ]}
            onPress={() => {
              resetPassword();
            }}>
            <Text style={{fontFamily: 'Gilroy-Medium', color: 'white'}}>
              Reset password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnBackToLogin}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back-outline" color={'gray'} size={15} />
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
                fontFamily: 'Gilroy-Bold',
                marginLeft: 5,
              }}>
              Back to log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerForgot}></View>
    </View>
  );
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerForgot: {
    flex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  middleForgot: {
    flex: 70,
    backgroundColor: 'white',
  },
  footerForgot: {
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
  iconForgotPassword: {
    width: 40,
    height: 40,
    borderWidth: 0.2,
    borderColor: 'black',
    elevation: 5,
    shadowColor: 'black',
    borderRadius: 10,
  },
  titleForgotPassword: {
    color: '#060606',
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    marginVertical: 10,
  },
  sloganForgot: {
    color: '#929292',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  inputEmailForgot: {
    height: 40,
    width: 258,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 7,
    marginVertical: 10,
  },
  btnResetPassword: {
    height: 40,
    width: 258,
    backgroundColor: '#003ECB',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBackToLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 20,
  },
  errorValidation: {
    fontFamily: 'Gilroy-Regular',
    color: 'red',
    textAlign: 'justify',
    marginBottom: 10,
  },
});
