import React from 'react';
import {StyleSheet, Animated, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TicketScreen from '../screens/TicketScreen';
import SearchingScreen from '../screens/SearchingScreen';
import SettingScreen from '../screens/SettingScreen';
import {colors} from '../constants/';
const width = Dimensions.get('window').width;
const tabs = [
  {
    name: 'TabHome',
    icon: 'homeIcon',
    screen: HomeScreen,
  },
  {
    name: 'Ticket',
    icon: 'ticketIcon',
    screen: TicketScreen,
  },
  {
    name: 'Search',
    icon: 'Searching',
    screen: SearchingScreen,
  },
  {
    name: 'Setting',
    icon: 'Setting',
    screen: SettingScreen,
  },
];
const Tab = createBottomTabNavigator();
import IconBottomTabItem from '../itemScreens/IconBottomTabItem';
const MainContainerBottomTab = () => {
  const offSetAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        initialRouteName="TabHome"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
          },
        }}>
        {tabs.map(({name, icon, screen}, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({focused}) => {
                  return (
                    <IconBottomTabItem
                      icon={icon}
                      size={25}
                      style={{tintColor: focused ? colors.primary : 'gray'}}
                    />
                  );
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offSetAnimation, {
                    toValue: index * (width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offSetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default MainContainerBottomTab;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 15,
    height: 3,
    left: width / 4 / 2 - 7,
    bottom: 10,
    backgroundColor: colors.primary,
    zIndex: 100,
  },
});
