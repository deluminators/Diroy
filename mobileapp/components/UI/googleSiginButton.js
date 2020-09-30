import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const googleIcon = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
};

export default class GoogleSignInButton extends React.PureComponent {
  static defaultProps = {
    onPress() {},
  };
  render() {
    const { children, style, ...props } = this.props;
    return (
      <TouchableNativeFeedback {...props}>
        <View
          activeOpacity={0.6}
          style={StyleSheet.flatten([styles.touchable, style])}
        >
          <View style={styles.content}>
            <Image source={googleIcon} style={styles.icon} />
            <Text style={styles.text}>{children}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    overflow: 'visible',
    shadowColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 15,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 24, aspectRatio: 1 },
  text: { color: 'gray', marginLeft: 12, fontSize: 16, fontWeight: '600' },
});
