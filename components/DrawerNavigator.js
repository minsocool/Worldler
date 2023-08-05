import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{drawerLabel: 'Updates'}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
