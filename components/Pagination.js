import {StyleSheet, Animated, Text, View, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');
const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#EBECF0', '#1CC7DB', '#EBECF0'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
              // idx === index && styles.dotActive
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 13,
  },
  dot: {
    width: 8,
    height: 3,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: 'cyan',
  },
});

export default Pagination;
