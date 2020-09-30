/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableWithoutFeedback, Dimensions} from 'react-native';

const Backdrop = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={props.press}>
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height,
          zIndex: 2,
          backgroundColor: 'black',
          //   backgroundColor: 'transparent',
          opacity: 0.4,
          position: 'absolute',
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default Backdrop;
