import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
function SignUpSuccessScreen(props) {
  const navigation = useNavigation();
  const [authLoaded, setAuthLoaded] = React.useState(false); // authLoaded = false  === close app

  React.useEffect(() => {
    // bat su kien khi authLoaded  = true thi replace screen to lOGIN
    if (authLoaded) {
      // == open app then set delay3s to Login
      props.navigation.replace('Logup');
    }
  }, [authLoaded, props.navigation]);

  React.useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true); // khi setAuthLoaded = true ( tuc la khi giao dien thay doi)
    }, 10000); // delay 10s
    console.log(setTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        source={require('../assets/animations/successSignUp.json')}
        autoPlay
        loop={true}
        style={{flex: 1, top: 0}}
        resizeMode="cover"
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={'checkmark-circle'} size={13} color="#FBEEAC" />
        <Text
          style={{fontFamily: 'Gilroy-Medium', color: '#FBEEAC', fontSize: 13}}>
          {' '}
          Profile Set Up!
        </Text>
      </View>

      <View style={styles.congratUserView}>
        <Text style={styles.congratUserName}>Congrats #username!</Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            color: '#FFFFFF',
            fontSize: 24,
            marginBottom: 20,
          }}>
          You're set to start!
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            color: '#FBEEAC',
            fontSize: 13,
            textAlign: 'center',
          }}>
          Thank you for choosing us as your trusted {'\n'}source! We have your
          back!
        </Text>
      </View>
      <View style={styles.buttonViewPlan}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Gilroy-Bold',
              color: 'black',
            }}>
            View My Plans{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUpSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratUserView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratUserName: {
    marginTop: 20,
    fontFamily: 'Gilroy-Bold',
    color: '#FFFFFF',
    fontSize: 24,
  },
  buttonViewPlan: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FCFCFC',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
});
