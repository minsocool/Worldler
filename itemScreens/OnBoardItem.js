import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import BOARD from '../data/OnBoardData';
const {width, height} = Dimensions.get('screen');

const OnBoardItem = ({item}) => {
  const navigation = useNavigation();
  const [completed, setCompleted] = useState(false);
  const scrollX = new Animated.Value(0);
  useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / width) === BOARD.length - 1) {
        setCompleted(false);
      }
    });
    console.log(BOARD.length);
    return () => scrollX.removeListener();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={item.img}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          colors={['#00000000', '#060606']}
          style={styles.linearGradient}></LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.positionButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Logup')}>
          <Text style={styles.txtButton}>
            {completed ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    top: 350,
    padding: 15,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 40,
    color: 'white',
  },
  description: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 15,
    color: 'gray',
  },
  positionButton: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CC7DB',
    borderRadius: 30,
    width: 130,
    height: 40,
  },
  txtButton: {
    fontFamily: 'Gilroy-Bold',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
2;
