import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, colors, icons} from '../constants';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import onAuthStateChanged from '@react-native-firebase/auth';
import * as Yup from 'yup';
import {Platform} from 'react-native';
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from '../utilities/Validation';
/*
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password.')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 character, at least one uppercase letter, one lowercase letter,one number and one speacial character',
    ),
  mobile: Yup.string()
    .min(9, 'Must be exactly 9 digits ')
    .min(9, 'Must be exactly 9 digits ')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter your mobile number.'),
});
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password.')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 character, at least one uppercase letter, one lowercase letter,one number and one speacial character',
    ),
});
*/
function LogupScreen(props) {
  // const Main = () => props.navigation.replace('Home');
  const navigation = useNavigation();
  const [modalSignInVisible, setModalSignInVisible] = React.useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = React.useState(false);
  // state to store phone/email/password
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state to login pending loading spinner
  const [loading, setLoading] = useState(false);
  // states for validating
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(
    'Please enter your mobile number.',
  );
  const [errorEmail, setErrorEmail] = useState(
    'Please enter your email address.',
  );
  const [errorPassWord, setErrorPassword] = useState(
    'Please enter your password.',
  );
  // storage user account to Logout
  const [user, setUser] = useState(user);
  console.log('user', user);

  const onAuthStateSave = user => setUser(user);
  //
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // validation OK
  const isValidationOK = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true;

  const onRegister = () => {
    navigation.replace('VerifiedMessSignUp', {
      phoneNumberSignUp,
    });
    if (!email.trim() || !password.trim()) {
      console.log('Please enter email and password to Register');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      console.log('Please enter your email and your password to Login');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)

      .then(() => {
        navigation.replace('Home');
        console.log('Success! Signed in !');
      })
      .catch(error => {
        console.error(error);
        alert('Account does not exist.\nPlease try again');
      });
  };
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateSave, user);
    if (user) {
      alert('Logged In');
      navigation.replace('Home');
    } else {
    }
  }, []);

  const [phoneNumberSignUp, setPhoneNumberSignUp] = React.useState('');
  const phoneInput = React.useRef(null);
  const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState('eye');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      // neu icon la eye open khi duoc click thi set eye close va hint password
      setRightIcon('eye-slash');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
      // nguoc lai
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const [image, setImage] = React.useState(
    'https://static.vecteezy.com/system/resources/thumbnails/015/723/885/small/upload-cloud-3d-media-rendering-png.png',
  );
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 1,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          // solution when exit uploading photos
          return false;
        }
      });
  };

  return (
    <>
      <Video
        source={require('../assets/videoSrc/LoginVideo.mp4')}
        style={styles.videoBackGround}
        repeat
        muted
        resizeMode="cover"
        rate={1.0}
      />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
        <View style={{flex: 60}}>
          <Image
            style={styles.logoChar}
            resizeMode="center"
            source={require('../assets/images/LogoChar(Transparent).png')}
          />
          <Text style={styles.sloganLogin}>Enjoy the trip {'\n'}with me</Text>
        </View>
        <View style={{flex: 20}}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={() => setModalSignUpVisible(true)}>
            <Text style={styles.txtSignUp}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{height: 30}}></View>
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => setModalSignInVisible(true)}>
            <Text style={styles.txtSignIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 20, marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                height: 0.6,
                backgroundColor: 'black',
              }}></View>
            <Text
              style={{
                fontFamily: 'Gilroy-Light',
                alignSelf: 'center',
                color: 'white',
                fontSize: 14,
                marginHorizontal: 10,
              }}>
              or sign up with
            </Text>
            <View
              style={{
                flex: 1,
                height: 0.6,
                backgroundColor: 'black',
              }}></View>
          </View>
          {/*Platform ios Google twitter */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.Google} style={{width: 30, height: 30}} />
            <Image
              source={icons.ios}
              style={{width: 30, height: 30, marginHorizontal: 30}}
            />
            <Image source={icons.twitter} style={{width: 30, height: 30}} />
          </View>
        </View>
        {/* Modal Sign In View */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          // validationSchema={SignInSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
          }) => (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSignInVisible}>
              <View style={styles.containerModalView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[styles.buttonCloseModal]}
                    onPress={() => setModalSignInVisible(!modalSignInVisible)}>
                    <Icon
                      name="chevron-down"
                      color={colors.dropDown}
                      size={30}
                    />
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'black',
                        width: width,
                      }}
                    />
                  </TouchableOpacity>
                  {/* Box Sign in */}

                  <View style={styles.boxSignIn}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.modalText}>Welcome,</Text>

                      <Image source={images.userAvatar} style={styles.avatar} />
                    </View>

                    <Text style={styles.email}>Glad to see you!</Text>
                    {/*Email Login View */}
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          fontSize: 15,
                          color: '#060606',
                        }}>
                        Email
                      </Text>
                      <View style={styles.emailInputLogInView}>
                        <Icon
                          name="user-astronaut"
                          size={20}
                          color={'#060606'}
                        />
                        <TextInput
                          style={styles.inputEmailSignIn}
                          value={email}
                          keyboardType="email-address"
                          onChangeText={email => {
                            if (isValidEmail(email) == false) {
                              setErrorEmail('Invalid email');
                            } else {
                              setErrorEmail('');
                            }
                            setEmail(email);
                          }}
                          placeholderTextColor={'gray'}
                          autoCapitalize={false}
                          autoCorrect={false}
                          autoFocus={true}
                          placeholder="Ex:minsocool0711@gmail.com"
                          onBlur={() => setFieldTouched('email')}></TextInput>
                      </View>
                      {/* {touched.email && errors.email && (
                        <Text style={styles.errorValidation}>
                          {errors.email}
                        </Text>
                      )}*/}
                      <Text style={styles.errorValidation}>{errorEmail}</Text>
                    </View>

                    {/*Password Login View */}
                    <View style={{marginTop: 20}}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          fontSize: 15,
                          color: '#060606',
                        }}>
                        Password
                      </Text>
                      <View style={styles.passWordInputView}>
                        <MaterialCommunityIcons
                          name="key-outline"
                          size={20}
                          color={'#060606'}
                          style={{
                            marginLeft: 23,
                          }}
                        />
                        <TextInput
                          style={styles.inputPasswordLogin}
                          value={password}
                          placeholder="********"
                          autoCapitalize={false}
                          onChangeText={password => {
                            if (isValidPassword(password) == false) {
                              setErrorPassword(
                                'Must contain minimum 6 character',
                              );
                            } else {
                              setErrorPassword('');
                            }
                            setPassword(password);
                          }}
                          secureTextEntry={passwordVisibility}
                          onBlur={() =>
                            setFieldTouched('password')
                          }></TextInput>
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Icon
                            name={rightIcon}
                            size={22}
                            color="#232323"
                            style={{right: 20}}
                          />
                        </TouchableOpacity>
                      </View>
                      {/*{touched.password && errors.password && (
                        <Text style={styles.errorValidation}>
                          {errors.password}
                        </Text>
                      )} */}
                      <Text style={styles.errorValidation}>
                        {errorPassWord}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ForgetPwd');
                        }}>
                        <Text style={styles.forgotPwd}> Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                    {/*Button Login*/}
                    <View style={styles.boxButtonLoginToLoad}>
                      {/* {loading ? (
                      <View
                        style={[
                          StyleSheet.absoluteFillObject,
                          styles.loaderContainerView,
                        ]}>
                        <Lottie
                          source={require('../assets/animations/loaderSpiner.json')}
                          autoPlay
                          loop={true}
                        />
                      </View>
                    ) : (
                      <>
                        <TouchableOpacity
                        style = {{width:50,height:50}}
                          title="Start Loading"

                          onPress={() => {
                            startLoading();
                          }}>
                            <Text>
                              Button
                            </Text>
                          </TouchableOpacity>
                      </>
                    )}*/}
                      <TouchableOpacity
                        style={[
                          styles.btnSignInToLoad,
                          {
                            backgroundColor:
                              isValidationOK() == true
                                ? colors.primary
                                : 'gray',
                          },
                        ]}
                        disabled={isValidationOK() == false}
                        // onPress={Main}
                        onPress={() => {
                          startLoading();
                          onLogin();
                          console.log(
                            `Login with account: \nPhoneNumber: \nEmail:${email}\nPassword:${password}`,
                          );
                        }}>
                        <Text style={styles.txtSignInToLoad}>Sign In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{marginTop: 15}}
                        onPress={() => setModalSignUpVisible(true)}>
                        <Text style={styles.txtHaveAccountGoToSignUp}>
                          Don't have an account? {''}
                          <Text style={styles.txtHaveAccountGoToSignUpInner}>
                            SignUp
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.loadingPending}>
                        <ActivityIndicator
                          size="large"
                          color={colors.primary}
                          animating={loading}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </Formik>
        {/* Modal Sign Up View */}

        <Formik
          initialValues={{
            email: '',
            password: '',
            mobile: '',
          }}
          // validationSchema={SignupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
          }) => (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSignUpVisible}>
              <View style={styles.containerModalView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[styles.buttonCloseModal]}
                    onPress={() => setModalSignUpVisible(!modalSignUpVisible)}>
                    <Icon
                      name="chevron-down"
                      color={colors.dropDown}
                      size={30}
                    />
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'black',
                        width: width,
                      }}
                    />
                  </TouchableOpacity>
                  {/* Box Sign Up */}
                  <ScrollView
                    style={{flex: 1}}
                    automaticallyAdjustKeyboardInsets={true}>
                    <View style={styles.boxSignUp}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.modalText}>New Account</Text>
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={choosePhotoFromLibrary}>
                            <Image
                              source={{uri: image}}
                              style={styles.uploadImage}
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                fontFamily: 'Gilroy-Light',
                                color: 'gray',
                                fontSize: 12,
                              }}>
                              Upload Image
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.boxSignUpTxtInput}>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontWeight: '600',
                            color: 'gray',
                          }}>
                          Phone Number
                        </Text>

                        <PhoneInput
                          ref={phoneInput}
                          defaultValue={phoneNumberSignUp}
                          value={values.mobile}
                          autoFocus={true}
                          defaultCode="VN"
                          textInputProps={{maxLength: 10}}
                          onChangeText={phoneNumber => {
                            if (isValidPhoneNumber(phoneNumber) == false) {
                              setErrorPhoneNumber(
                                'Must be exactly 9 or 10 digits',
                              );
                            } else {
                              setErrorPhoneNumber('');
                            }
                            setPhoneNumber(phoneNumber);
                          }}
                          layout="first"
                          placeholder="PhoneNumber"
                          placeholderTextColor={'gray'}
                          onBlur={() => setFieldTouched('mobile')}
                          containerStyle={styles.phoneContainer}
                          textContainerStyle={styles.textPhoneInput}
                          onChangeFormattedText={text => {
                            setPhoneNumberSignUp(text);
                          }}
                        />
                        {/* {touched.mobile && errors.mobile && (
                          <Text style={styles.errorValidation}>
                            {errors.mobile}
                          </Text>
                        )}*/}
                        <Text style={styles.errorValidation}>
                          {errorPhoneNumber}
                        </Text>

                        <Text
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontWeight: '600',
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          Email
                        </Text>
                        <View style={styles.emailInputSignUpView}>
                          <Icon
                            name="user-astronaut"
                            size={20}
                            color={'#060606'}
                          />
                          <TextInput
                            style={styles.inputEmailSignUp}
                            value={email}
                            keyboardType="email-address"
                            onChangeText={email => {
                              if (isValidEmail(email) == false) {
                                setErrorEmail('Invalid email');
                              } else {
                                setErrorEmail('');
                              }
                              setEmail(email);
                            }}
                            placeholder="Ex:minsocool0711@gmail.com"
                            placeholderTextColor={'gray'}
                            autoCapitalize={false}
                            autoCorrect={false}
                            onBlur={() => setFieldTouched('email')}></TextInput>
                        </View>
                        {/* {touched.email && errors.email && (
                          <Text style={styles.errorValidation}>
                            {errors.email}
                          </Text>
                          )}*/}

                        <Text style={styles.errorValidation}>{errorEmail}</Text>

                        <Text
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontWeight: '600',
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          Password
                        </Text>
                        <View style={styles.passWordInputSignUpView}>
                          <MaterialCommunityIcons
                            name="key-outline"
                            size={20}
                            color={'#060606'}
                          />
                          <TextInput
                            style={styles.inputPasswordSignUp}
                            value={password}
                            placeholderTextColor={'gray'}
                            onChangeText={password => {
                              if (isValidPassword(password) == false) {
                                setErrorPassword(
                                  'Must contain minimum 6 character',
                                );
                              } else {
                                setErrorPassword('');
                              }
                              setPassword(password);
                            }}
                            placeholder="********"
                            secureTextEntry={passwordVisibility}
                            autoCapitalize={false}
                            onBlur={() =>
                              setFieldTouched('password')
                            }></TextInput>
                          <TouchableOpacity onPress={handlePasswordVisibility}>
                            <Icon name={rightIcon} size={20} color="#232323" />
                          </TouchableOpacity>
                        </View>
                        {/* {touched.password && errors.password && (
                          <Text style={styles.errorValidation}>
                            {errors.password}
                          </Text>
                        )}*/}
                        <Text style={styles.errorValidation}>
                          {errorPassWord}
                        </Text>
                      </View>
                      <View style={styles.boxButtonSignUpToLoad}>
                        <TouchableOpacity
                          disabled={isValidationOK() == false}
                          style={[
                            styles.btnSignUpToLoad,
                            {
                              backgroundColor:
                                isValidationOK() == true
                                  ? colors.primary
                                  : 'gray',
                            },
                          ]}
                          /* onPress={() =>
                            navigation.replace('VerifiedMessSignUp', {
                              phoneNumberSignUp,
                            })
                          }
                        */
                          onPress={() => {
                            startLoading();
                            onRegister();
                            console.log(
                              `SignUp Account : \n Phone = ${phoneNumber} \n Email = ${email} \n password = ${password}`,
                            );
                          }}>
                          <Text style={styles.txtSignUpToLoad}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{marginTop: 15}}
                          onPress={() => setModalSignInVisible(true)}>
                          <Text style={styles.txtHaveAccountGoToSignIn}>
                            Already have an account? {''}
                            <Text style={styles.txtHaveAccountGoToSignInInner}>
                              Sign In
                            </Text>
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.loadingPending}>
                          <ActivityIndicator
                            size="large"
                            color={colors.primary}
                            animating={loading}
                          />
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 100,
  },
  videoBackGround: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  logoChar: {
    tintColor: 'black',
    marginTop: 60,
    marginLeft: 20,
    width: 150,
    height: 50,
  },
  sloganLogin: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 30,
    marginLeft: 25,
    marginTop: 30,
    color: 'black',
  },
  buttonSignUp: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#003ECB',
    height: 50,
    borderRadius: 30,
  },
  buttonSignIn: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#060606',
    height: 50,
    borderRadius: 30,
  },
  txtSignUp: {
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
    color: 'white',
  },
  txtSignIn: {
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
    color: 'white',
  },
  boxSignIn: {
    padding: 20,
  },
  loadingPending: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModalView: {
    flex: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  modalView: {
    width: width,
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalText: {
    fontFamily: 'Gilroy-Bold',
    color: 'black',
    fontSize: 25,
  },
  buttonCloseModal: {
    alignItems: 'center',
    backgroundColor: '#060606',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  txtCloseModal: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 400 / 2,
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
    left: 200,
  },
  uploadImage: {
    width: 35,
    height: 35,
  },
  emailInputLogInView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
  },
  inputEmailSignIn: {
    width: 230,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 4,
  },
  inputPasswordLogin: {
    width: 230,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 4,
  },
  inputPasswordSignUp: {
    width: 210,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 4,
  },
  inputEmailSignUp: {
    width: 230,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 4,
  },
  emailInputSignUpView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
  },
  passWordInputView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.6,
  },
  passWordInputSignUpView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
  },
  forgotPwd: {
    fontFamily: 'Gilroy-Medium',
    color: colors.primary,
    textAlign: 'right',
    fontSize: 13,
    marginTop: 12,
  },
  boxButtonLoginToLoad: {
    marginTop: 20,
  },
  boxButtonSignUpToLoad: {
    marginTop: 20,
  },
  btnSignInToLoad: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 30,
  },
  txtSignInToLoad: {
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
    color: 'white',
  },
  txtHaveAccountGoToSignUp: {
    fontFamily: 'Gilroy-Light',
    alignSelf: 'center',
    color: '#060606',
    fontSize: 12,
  },
  txtHaveAccountGoToSignUpInner: {
    fontFamily: 'Gilroy-Medium',
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 13,
  },
  txtHaveAccountGoToSignIn: {
    fontFamily: 'Gilroy-Light',
    alignSelf: 'center',
    color: '#060606',
    fontSize: 12,
  },
  txtHaveAccountGoToSignInInner: {
    fontFamily: 'Gilroy-Medium',
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 13,
  },
  // Sign Up Styles
  boxSignUp: {
    padding: 20,
  },
  boxSignUpTxtInput: {
    justifyContent: 'center',
  },
  phoneContainer: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderBottomWidth: 0.6,
  },
  textPhoneInput: {
    paddingVertical: 0,
    fontFamily: 'Gilroy-Regular',
  },
  btnSignUpToLoad: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 50,
    borderRadius: 30,
  },
  txtSignUpToLoad: {
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
    color: 'white',
  },
  errorValidation: {
    fontFamily: 'Gilroy-Regular',
    color: 'red',
    textAlign: 'justify',
  },
});

export default LogupScreen;
