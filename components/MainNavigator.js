import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import LogupScreen from '../screens/LogupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpSuccessScreen from '../screens/SignUpSuccessScreen';
import VerificationScreen from '../screens/VerificationScreen';
import MainContainerBottomTab from './MainContainerBottomTab';
import GPSLocationScreen from '../screens/GPSLocationScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
// import PickerAvatar from '../draft/PickerAvatar';
const Stack = createStackNavigator();
const MainNavigator = props => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    }
    fetchData();
  }, [setIsAppFirstLaunched]);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="OnBoard">
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnBoard"
              component={OnBoardingScreen}
              options={{header: () => null}}
            />
          )}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Logup"
            component={LogupScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="SuccessSignUp"
            component={SignUpSuccessScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="VerifiedMessSignUp"
            component={VerificationScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Home"
            component={MainContainerBottomTab}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="GPSLocation"
            component={GPSLocationScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="TripDetails"
            component={TripDetailsScreen}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default MainNavigator;
