import React, {useRef, useState} from 'react';
import {View, FlatList, Animated} from 'react-native';
import BOARD from '../data/OnBoardData';
import OnBoardItem from '../itemScreens/OnBoardItem';
import Pagination from '../components/Pagination';
const OnBoardingScreen = () => {
  const [index, setIndex] = useState(0);
  // Scroll animated
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };
  // Scroll animated

  // Scrolled changed
  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log(viewableItems);
    setIndex(viewableItems[0].index);
  }).current;
  // Scrolled changed

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <FlatList
        data={BOARD}
        renderItem={({item}) => <OnBoardItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={BOARD} scrollX={scrollX} index={index} />
    </View>
  );
};

export default OnBoardingScreen;
