/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
import {LinearGradient} from 'expo-linear-gradient';
import ImagePicker from 'react-native-image-picker';

const ProductDetailsScreen = (props) => {
  const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [pvalue, setPvalue] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const getPermission = async () => {
    const grant = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    console.log(grant);
    return grant;
  };
  //   const token = useSelector((state) => state.auth.token);
  //   const submitHandler = useCallback(async () => {
  //     try {
  //       setLoading(true);
  //       //   console.log(token, 'token');
  //       const formData = new FormData();
  //       let filename = image.split('/').pop();
  //       let match = /\.(\w+)$/.exec(filename);
  //       let type = match ? `image/${match[1]}` : 'image';
  //       formData.append('file', {uri: image, name: filename, type});
  //       formData.append('prodName', productName);
  //       formData.append('prodWeight', weight);
  //       formData.append('prodValue', pvalue);
  //       formData.append('recieverName', name);
  //       formData.append('recieverEmail', email);
  //       formData.append('recieverMobile', mobile);
  //       const res = await Axios.post(`${LINK}/delivery`, formData, {
  //         headers: {
  //           'content-type': 'multipart/form-data',
  //           authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(res);
  //       setLoading(false);
  //       props.navigation.navigate('Success', {id: res.data.data._id});
  //     } catch (er) {
  //       setLoading(false);
  //       Alert.alert('Error occured!', er.response.data.message, ['Okay']);
  //     }
  //   });
  useEffect(() => {
    getPermission();
  }, []);
  const imagePickHandler = useCallback(async () => {
    try {
      ImagePicker.showImagePicker(
        {
          storageOptions: {
            skipBackup: true,
            path: 'images',
            privateDirectory: true,
          },
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = {uri: response.uri};

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            console.log(source);
            setImage(source.uri);
          }
        },
      );
    } catch (er) {
      console.log(er);
    }
  });
  //   const takeImageHandler = useCallback(async () => {
  //     try {
  //       const res = await ImagePicker.launchCameraAsync({
  //         allowsEditing: false,
  //         aspect: [4, 3],
  //         quality: 0.5,
  //         base64: false,
  //       });
  //       console.log(res);
  //       if (!res.cancelled) {
  //         setImage(res.uri);
  //       }
  //     } catch (er) {
  //       Alert.alert('Error occured!', er.message, ['Okay']);
  //     }
  //   });

  return (
    <ScrollView>
      <LinearGradient colors={['#D3CCE3', '#E9E4F0']} style={styles.screen}>
        <Text style={styles.head}>Provide vehicle details</Text>
        <TextInput
          style={styles.input}
          placeholder="vehicle number"
          value={productName}
          onChangeText={(str) => setProductName(str)}
        />
        <TextInput
          style={styles.input}
          placeholder="RC Number"
          value={weight}
          onChangeText={(str) => setWeight(str)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name in RC"
          value={pvalue}
          onChangeText={(str) => setPvalue(str)}
        />
        <Text style={styles.subhead}>Image of the vehicle</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          ) : (
            <Text>No image selected</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
            marginBottom: 10,
          }}>
          <Button
            color="#5e548e"
            title="Upload Image"
            onPress={imagePickHandler}
          />
          {/* <Button
            color="#5e548e"
            title="Take Image"
            // onPress={takeImageHandler}
          /> */}
        </View>

        <View style={{marginVertical: 10, width: '40%'}}>
          {loading ? (
            <ActivityIndicator size="small" color="#5e548e" />
          ) : (
            <Button title="Register" color="#5e548e" />
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: '#9f86c0',
    borderBottomWidth: 2,
    marginVertical: 10,
    padding: 5,
  },
  head: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
  subhead: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9f86c0',
    width: '80%',
    height: 300,
    marginVertical: 5,
  },
});
