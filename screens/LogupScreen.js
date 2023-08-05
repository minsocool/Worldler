import React from 'react';
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
} from 'react-native';
import Video from 'react-native-video';
const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, colors, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Platform} from 'react-native';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username must be at least 6 character.')
    .max(50, 'Too Long!')
    .required('Please enter your username.'),
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
  password: Yup.string()
    .min(8)
    .required('Please enter your password.')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 character, at least one uppercase letter, one lowercase letter,one number and one speacial character',
    ),
});
function LogupScreen(props) {
  const Main = () => props.navigation.replace('Home');
  const navigation = useNavigation();
  const [modalSignInVisible, setModalSignInVisible] = React.useState(false);
  const [modalSignUpVisible, setModalSignUpVisible] = React.useState(false);
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
        resizeMode="cover"
        rate={1.0}
      />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
        <View style={{flex: 65}}>
          <Image
            style={styles.logoChar}
            resizeMode="center"
            source={require('../assets/images/LogoChar(Transparent).png')}
          />
          <Text style={styles.sloganLogin}>Enjoy the trip {'\n'}with me</Text>
        </View>
        <View style={{flex: 35}}>
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
        {/* Modal Sign In View */}
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={SignInSchema}>
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
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.modalText}>Welcome back</Text>

                      <Image source={images.userAvatar} style={styles.avatar} />
                    </View>
                    {/* Xu ly username */}
                    <Text style={styles.userName}>#minsocool0711</Text>

                    {/*Password Login View */}
                    <View style={{marginTop: 25}}>
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
                        />
                        <TextInput
                          style={styles.inputPasswordLogin}
                          value={values.password}
                          placeholder="********"
                          autoCapitalize={false}
                          onChangeText={handleChange('password')}
                          secureTextEntry={passwordVisibility}
                          autoFocus={true}
                          onBlur={() =>
                            setFieldTouched('password')
                          }></TextInput>
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Icon name={rightIcon} size={22} color="#232323" />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorValidation}>
                          {errors.password}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          alert('You press Forgot Password');
                        }}>
                        <Text style={styles.forgotPwd}> Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                    {/*Button Login*/}
                    <View style={styles.boxButtonLoginToLoad}>
                      <TouchableOpacity
                        style={[
                          styles.btnSignInToLoad,
                          {backgroundColor: isValid ? colors.primary : 'gray'},
                        ]}
                        disabled={!isValid}
                        onPress={Main}>
                        <Text style={styles.txtSignInToLoad}>Sign In</Text>
                      </TouchableOpacity>
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
                            color: 'gray',
                            fontSize: 13,
                            marginHorizontal: 10,
                          }}>
                          or sign in with
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
                        <Image
                          source={icons.Google}
                          style={{width: 23, height: 23}}
                        />
                        <Image
                          source={icons.ios}
                          style={{width: 23, height: 25, marginHorizontal: 30}}
                        />
                        <Image
                          source={icons.twitter}
                          style={{width: 25, height: 20}}
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
            username: '',
            password: '',
            mobile: '',
          }}
          validationSchema={SignupSchema}>
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
                          onChangeText={handleChange('mobile')}
                          layout="first"
                          placeholder="Ex: 903991835"
                          onBlur={() => setFieldTouched('mobile')}
                          containerStyle={styles.phoneContainer}
                          textContainerStyle={styles.textPhoneInput}
                          onChangeFormattedText={text => {
                            setPhoneNumberSignUp(text);
                          }}
                        />
                        {touched.mobile && errors.mobile && (
                          <Text style={styles.errorValidation}>
                            {errors.mobile}
                          </Text>
                        )}
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontWeight: '600',
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          Username
                        </Text>
                        <View style={styles.userNameInputSignUpView}>
                          <Icon
                            name="user-astronaut"
                            size={20}
                            color={'#060606'}
                          />
                          <TextInput
                            style={styles.inputUserNameSignUp}
                            value={values.username}
                            onChangeText={handleChange('username')}
                            placeholder="Ex: minsocool0711"
                            autoCapitalize={false}
                            onBlur={() =>
                              setFieldTouched('username')
                            }></TextInput>
                        </View>
                        {touched.username && errors.username && (
                          <Text style={styles.errorValidation}>
                            {errors.username}
                          </Text>
                        )}

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
                            value={values.password}
                            onChangeText={handleChange('password')}
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
                        {touched.password && errors.password && (
                          <Text style={styles.errorValidation}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                      <View style={styles.boxButtonSignUpToLoad}>
                        <TouchableOpacity
                          disabled={!isValid}
                          style={[
                            styles.btnSignUpToLoad,
                            {
                              backgroundColor: isValid
                                ? colors.primary
                                : 'gray',
                            },
                          ]}
                          onPress={() =>
                            navigation.replace('VerifiedMessSignUp', {
                              phoneNumberSignUp,
                            })
                          }>
                          <Text style={styles.txtSignUpToLoad}>Sign Up</Text>
                        </TouchableOpacity>
                      </View>
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
                            color: 'gray',
                            fontSize: 13,
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
                        <Image
                          source={icons.Google}
                          style={{width: 23, height: 23}}
                        />
                        <Image
                          source={icons.ios}
                          style={{width: 23, height: 25, marginHorizontal: 30}}
                        />
                        <Image
                          source={icons.twitter}
                          style={{width: 25, height: 20}}
                        />
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
    backgroundColor: '#1CC7DB',
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
  userName: {
    fontFamily: 'Gilroy-Bold',
    color: 'black',
    fontSize: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
  },
  uploadImage: {
    width: 35,
    height: 35,
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
  inputUserNameSignUp: {
    width: 230,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 4,
  },
  userNameInputSignUpView: {
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
    fontFamily: 'Gilroy-Light',
    color: colors.primary,
    textAlign: 'right',
    fontSize: 12,
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
