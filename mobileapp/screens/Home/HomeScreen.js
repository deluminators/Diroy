/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
  NativeModules,
  Alert,
  ImageBackground,
} from 'react-native';
import FloatButton from '../../components/FloatButton';
import HeaderButton from '../../components/HeaderButton';
import {GameEngine} from 'react-native-game-engine';
import {DeviceMotion} from 'expo-sensors';
import wifi from 'react-native-android-wifi';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Circle, {BODY_DIAMETER} from '../../components/Circle';
import Matter from 'matter-js';
import * as ReadSms from 'react-native-read-sms/ReadSms';
import * as Location from 'expo-location';
import {useSelector, useDispatch} from 'react-redux';
import Svg, {Polyline} from 'react-native-svg';
import Speed from '../../components/speed';
import {addDevices} from '../../store/actions/contacts';
const SendSMS = NativeModules.SendSMS;
const Toast = NativeModules.Toast;
const IMEI = NativeModules.IMEI;
// const

const {height, width} = Dimensions.get('window');

const BALL_SIZE = Math.floor(width * 0.02);
const ballStartPoint = {x: width - 80, y: height - 150};
const theBall = Matter.Bodies.circle(
  ballStartPoint.x,
  ballStartPoint.y,
  BALL_SIZE,
  {
    label: 'ball',
  },
);
DeviceMotion.setUpdateInterval(500);
const App = (props) => {
  const sendSMS = async () => {
    const grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    );
    if (grant !== PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('not');
      return;
    }
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'give permission',
        'Permission to access location was denied',
      );
    }

    let res = await Location.getCurrentPositionAsync({});
    const resp = await SendSMS.sendSms(
      '8763223331',
      `Hey.., this is me!\nMy locations are [latitude : ${res.coords.latitude} longitude: ${res.coords.longitude}]. `,
    );
    // console.log(res.coords);
    // console.log(resp);
  };
  const [sp, setSp] = useState(0);
  const headerHeight = useHeaderHeight();
  const entities = useRef();
  const ballX = useRef(theBall.position.x);
  const ballY = useRef(theBall.position.y);
  // const appState = useRef(AppState.currentState);
  const [coords, setCoords] = useState();
  const sub = useRef();
  const subscription = useRef();
  const [line, setLine] = useState(
    `${theBall.position.x},${theBall.position.y}`,
  );
  let image = useSelector((state) => state.location.pickup);

  // console.log(image);
  const dispatch = useDispatch();
  const getBluetooth = async () => {
    try {
      const res = await Toast.bluetoothCheck();
      const resp = await Toast.discoverDevices();
      console.log(resp);
      dispatch(addDevices(resp));
      // console.log(res, 'res');
    } catch (er) {
      console.log(er);
    }
  };
  // console.log(theBall);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="white"
            size={25}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        );
      },
    });
  });
  const askPermissions = async () => {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ]);
    const hasPermission = await ReadSms.requestReadSMSPermission();
    console.log(hasPermission);
    if (hasPermission) {
      // console.log('has');
      ReadSms.startReadSMS((status, sms, error) => {
        if (status == 'success') {
          // console.log('Great!! you have received new sms:', sms);
          if (sms == '0') {
            sendSMS();
          }
        }
      });
    }

    wifi.isEnabled((isEnabled) => {
      if (isEnabled) {
        // console.log('wifi service enabled');
        wifi.loadWifiList(
          (wifiStringList) => {
            const wifiArray = JSON.parse(wifiStringList);
            console.log(wifiArray);
            dispatch(addDevices(wifiArray));
          },
          (err) => console.log(err),
        );
      } else {
        // console.log('wifi service is disabled');
        Alert.alert(
          'Warning!!',
          'Your wifi is not enabled. Please turn on wifi for better perfomance.',
        );
      }
    });
    getBluetooth();

    // const enabled = await WifiManager.isEnabled();
    // console.log(enabled);
    // if (!enabled) {
    //   console.log('hello');
    //   WifiManager.setEnabled(true);
    // }
    if (
      res['android.permission.BODY_SENSORS'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      res['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      res['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      // console.log('hello');
      if (await DeviceMotion.isAvailableAsync()) {
        sub.current = DeviceMotion.addListener((e) => {
          const acc =
            e && e.acceleration ? Math.abs(e.acceleration.x.toFixed(2) * 1) : 0;
          const dist = 0.5 * acc * Math.pow(0.5, 2) * 10;
          const speed = acc * 0.5;
          const rot = e && e.rotation ? e.rotation.alpha.toFixed(1) * 1 : 0;
          let ang;
          if (rot >= 0) {
            ang = 60 * rot * 0.0174533;
          } else {
            ang = 60 * (6 + rot) * 0.0174533;
          }
          const posx = dist * Math.sin(ang);
          const posy = dist * Math.cos(ang);
          // console.log(posx, posy);
          Matter.Body.setPosition(theBall, {
            x: ballX.current - posx,
            y: ballY.current - posy,
          });
          // console.log(theBall);

          ballX.current = ballX.current - posx;
          ballY.current = ballY.current - posy;
          if (dist > 1) {
            // console.log('you');
            setLine((pre) => {
              return pre + ` ${ballX.current},${ballY.current}`;
            });
          }
          setSp(speed.toFixed(2));
          if (coords) {
            setCoords((pre) => {
              return {x: pre.x * 1 + posx / 2, y: pre.y * 1 + posy / 2};
            });
          } else if (image) {
            console.log(image);
            setCoords({x: image.latitude * 1, y: image.longitude * 1});
          }
        });
      }
    }
  };
  const pressHandler = () => {
    props.navigation.navigate('Calliberate Your Location');
  };
  useEffect(() => {
    askPermissions();
    if (sub.current) {
      sub.current.remove();
    }
    const engine = Matter.Engine.create({enableSleeping: true});
    const world = engine.world;

    Matter.World.add(world, [theBall]);
    entities.current = {
      playerBall: {
        body: theBall,
        bgColor: '#FF5877',
        borderColor: '#FF5877',
        renderer: Circle,
      },
    };

    return () => {
      // AppState.removeEventListener('change', _handleAppStateChange);
      // console.log('removed');
      if (sub.current) {
        sub.current.remove();
      }
      if (subscription.current) {
        subscription.current.remove();
      }
      Matter.Engine.clear(engine);
    };
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View contentInsetAdjustmentBehavior="automatic">
        <ScrollView>
          <ScrollView horizontal={true}>
            <ImageBackground
              style={{width: width, height: height - headerHeight}}
              source={
                image
                  ? require('../../assets/map.jpeg')
                  : {
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Lightblue_grid_blue_axes.svg/1024px-Lightblue_grid_blue_axes.svg.png',
                    }
              }>
              {entities.current ? (
                <GameEngine entities={entities.current} />
              ) : null}
              <Svg height="100%" width="100%">
                <Polyline
                  points={line}
                  fill="none"
                  stroke="black"
                  strokeWidth="7"
                />
              </Svg>
            </ImageBackground>
          </ScrollView>
        </ScrollView>
        {/* <Footer /> */}
        <FloatButton pressHandler={pressHandler} />
        <Speed speed={sp} coords={coords} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: 18,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    width: 200,
    justifyContent: 'space-between',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  wrapper: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  subhead: {
    fontWeight: '700',
    fontSize: 18,
  },
});

export default App;
