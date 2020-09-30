import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

const FacebookLoginButton = (props) => {
  const facebookIcon = {
    uri:
      'https://imageog.flaticon.com/icons/png/512/124/124010.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
  };
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        activeOpacity={0.6}
        style={StyleSheet.flatten([styles.touchable, props.style])}
      >
        <View style={styles.content}>
          <Image source={facebookIcon} style={styles.icon} />
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FacebookLoginButton;

const styles = StyleSheet.create({
  touchable: {
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    overflow: 'visible',
    shadowColor: 'black',
    backgroundColor: '#4267b2',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 24, aspectRatio: 1 },
  text: { color: 'white', marginLeft: 12, fontSize: 16, fontWeight: '600' },
});
