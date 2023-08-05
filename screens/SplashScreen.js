import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Lottie from 'lottie-react-native';

function SplashScreen(props) {
  const [authLoaded, setAuthLoaded] = useState(false); // authLoaded = false  === close app

  useEffect(() => {
    // bat su kien khi authLoaded  = true thi replace screen to lOGIN
    if (authLoaded) {
      // == open app then set delay3s to Login
      props.navigation.replace('Logup');
    }
  }, [authLoaded, props.navigation]);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true); // khi setAuthLoaded = true ( tuc la khi giao dien thay doi)
    }, 3000); // delay 3s
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <Lottie
        source={require('../assets/animations/worldLerLogoAnimate.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
}

export default SplashScreen;
