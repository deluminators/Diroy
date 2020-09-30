import React from 'react';
import {Button, View} from 'react-native';

const HeaderButton = (props) => {
  return (
    <View style={{paddingHorizontal: 8}}>
      <Button color={props.color} title={props.name} onPress={props.onPress} />
    </View>
  );
  // );
};

export default HeaderButton;
