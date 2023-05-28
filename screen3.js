import React from 'react';
import { Text, View, StyleSheet, BackHandler, ToastAndroid, Dimensions, DeviceEventEmitter } from 'react-native'
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as ImagePicker from 'expo-image-picker';

class Screen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back,  // typ kamery
    };
  }
  camera
  async componentDidMount() {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == 'granted' });
    BackHandler.addEventListener("hardwareBackPress", () => { DeviceEventEmitter.emit("refreshevent", {}) });
  }

  flip() {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  async photo() {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
      ToastAndroid.showWithGravity(
        'photo made',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      DeviceEventEmitter.emit("refreshevent", {})
    }
  }

  render() {
    const hasCameraPermission = this.state.hasCameraPermission; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
      return (<View />);
    } else if (hasCameraPermission == false) {
      return (<Text>brak dostępu do kamery</Text>);
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            style={{ flex: 1 }}
          >
            <Pressable onPress={() => this.openPicker()} style={[styles.buttons, { position: 'absolute', right: 20, top: 20, height: 50, width: 50 }]}>
              <Text style={[styles.text, { lineHeight: 60, paddingRight: 2.7, color: 'dimgray' }]}>⇣</Text>
            </Pressable>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Pressable onPress={() => this.photo()} style={styles.buttons}><Text style={styles.text}>+</Text></Pressable>
              <Pressable onPress={() => this.flip()} style={styles.buttons}><Text style={styles.text}>↻</Text></Pressable>
            </View>
          </Camera>
        </View>
      );
    }
  }
  async openPicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });
   
   if (!result.canceled) {
    if (!this.props.route.params.address.includes('x')){
      result.assets.forEach(e => {
        const data = new FormData()
        data.append('photo', {
            uri: e.uri,
            type: 'image/jpeg',
            name: e.uri.substr(e.uri.lastIndexOf('/'), e.uri.length)
        })
        // console.log(photo);
        console.log(e);
        fetch(this.props.route.params.address, {
            method: 'POST',
            body: data
        })  
      })
    }
    else {
      ToastAndroid.showWithGravity(
        'go to settings and type in your ip',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
   }
  }
}

const styles = StyleSheet.create({
  buttons: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 40
  },
  text: {
    color: 'limegreen',
    fontWeight: 'bold',
    fontSize: 70,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 80
  },
  image: {
    alignSelf: 'center'
  }
})

export default Screen3;
