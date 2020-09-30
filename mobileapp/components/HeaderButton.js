/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const HeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{paddingHorizontal: 12}}>
      <Icon name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

export default HeaderButton;
