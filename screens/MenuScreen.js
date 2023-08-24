import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {SECTIONS} from '../data/HeaderSettingData';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function MenuScreen() {
  const [image, setImage] = React.useState(
    'https://lh3.googleusercontent.com/a/AAcHTtes3XX9RUJ4M84I-EsMFvd7yCq7MhL2FUKUS3bcwkev1Q=s288-c-no',
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

  const navigation = useNavigation();
  const onLogOut = () => {
    auth()
      .signOut()
      .then(Response => {
        navigation.navigate('Logup');
        console.log(Response);
        console.log('Signed out');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Not able to logout');
      });
  };
  const alertLogOut = () => {
    Alert.alert('Leave app', 'Are you sure you want to \n sign out', [
      {
        text: 'Yes',
        onPress: () => {
          onLogOut();
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 18,
          }}>
          <Text style={styles.txtScreen}> Settings</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesome5 name={'chevron-right'} size={20} color={'#060606'} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxProfile}>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <View style={styles.profileAvatarWrapper}>
              <Image source={{uri: image}} style={styles.profilePicture} />
              <Image
                source={require('../assets/icons/editIcon.png')}
                style={styles.editIcon}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>Nguyen Hoang Minh</Text>
          <Text style={styles.profileAddress}>
            6834 Hollywood Blvd Los Angeles CA 90028-6116
          </Text>
        </View>
        <View style={styles.boxSection}>
          <Image
            source={require('../assets/icons/userIcon.png')}
            style={styles.iconSectionHeader}
          />
          <Text style={styles.sectionHeader}>Account</Text>
        </View>
        <View style={styles.boxRowLabel}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.txtLabel}>Edit Profile</Text>
              <FontAwesome5 name={'chevron-right'} size={13} color={'grey'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text style={styles.txtLabel}>Change Password</Text>
              <FontAwesome5 name={'chevron-right'} size={13} color={'grey'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxSection}>
          <Image
            source={require('../assets/icons/notificationsIcon.png')}
            style={styles.iconSectionHeader}
          />
          <Text style={styles.sectionHeader}>Notification</Text>
        </View>
        <View style={styles.boxRowLabel}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.txtLabel}>Notifications</Text>
            <Switch
              value={isEnabled}
              trackColor={{false: 'grey', true: colors.primary}}
              thumbColor={isEnabled ? 'white' : 'white'}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>

        <View style={styles.boxSection}>
          <Image
            source={require('../assets/icons/moreIcon.png')}
            style={styles.iconSectionHeader}
          />
          <Text style={styles.sectionHeader}>More</Text>
        </View>
        <View style={styles.boxRowLabel}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.txtLabel}>Language</Text>
              <FontAwesome5 name={'chevron-right'} size={13} color={'grey'} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.btnLogOut} onPress={alertLogOut}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icons/logOutIcon.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={styles.txtLogOut}>LOGOUT</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  txtScreen: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 24,
    textAlign: 'left',
  },
  boxProfile: {
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 400 / 2,
    borderColor: '#060606',
    marginRight: 15,
  },
  editIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 3,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 16,
    textAlign: 'center',
  },
  profileAddress: {
    fontFamily: 'Gilroy-Medium',
    color: 'grey',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionHeader: {
    fontFamily: 'Gilroy-Bold',
    color: '#060606',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
  },
  iconSectionHeader: {
    width: 30,
    height: 30,
  },
  boxRowLabel: {
    marginLeft: 20,
    marginRight: 18,
  },
  txtLabel: {
    fontFamily: 'Gilroy-Medium',
    color: '#060606',
    fontSize: 13,
    textAlign: 'left',
  },
  btnLogOut: {
    width: width,
    height: 35,
    backgroundColor: '#060606',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogOut: {
    fontFamily: 'Gilroy-Medium',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
{
  /*{SECTIONS.map(({header, items}) => (
          <View style={styles.boxSection} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({id, label, type, icon, color}) => (
              <TouchableOpacity key={label}>
                <View style={styles.boxRow}>
                  <View style={styles.iconRowLabel}>
                    <FontAwesome5 name={icon} size={20} color={color} />
                  </View>
                  <Text style={styles.rowLabel}>{label}</Text>
                  <View style={{flex: 1}} />
                  {type === 'boolean' && (
                    <Switch
                      value={toggle[id]}
                      onValueChange={value =>
                        SetToggle({...toggle, [id]: value})
                      }
                    />
                  )}

                  {type === 'link' && (
                    <FontAwesome5
                      name={'chevron-right'}
                      size={15}
                      color="#060606"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))} */
}
