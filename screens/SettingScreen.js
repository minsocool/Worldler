import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import React from 'react';
import {SECTIONS} from '../data/HeaderSettingData';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

function SettingScreen() {
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
  const [toggle, SetToggle] = React.useState({});
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
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
        {SECTIONS.map(({header, items}) => (
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  boxProfile: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSection: {},
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
    color: 'gray',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingHorizontal: 24,
    fontFamily: 'Gilroy-Bold',
  },
  boxRow: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconRowLabel: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 16,
    color: '#060606',
    fontFamily: 'Gilroy-Medium',
  },
});
