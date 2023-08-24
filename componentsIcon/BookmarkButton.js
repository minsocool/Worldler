import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {icons} from '../constants';
const BookmarkButton = ({active, style}) => {
  const imageUri = active ? icons.bookmarkedIcon : icons.bookmarkIcon;
  return (
    <TouchableOpacity
      style={{position: 'absolute', zIndex: 1, right: 20, top: 15}}>
      <View
        style={[
          {
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 20,
            shadowColor: '#060606',
            shadowRadius: 4,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          },

          style,
        ]}>
        <Image source={imageUri} style={{width: 25, height: 25}} />
      </View>
    </TouchableOpacity>
  );
};

export default BookmarkButton;
