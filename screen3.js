import React from 'react';
import { Text, View, StyleSheet, BackHandler, ToastAndroid, ScrollView, Animated } from 'react-native'
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { DeviceEventEmitter } from "react-native"
import RadioGroup from './RadioGroup';

class Screen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back,  // typ kamery
      ratio: null,
      whiteBalance: null,
      pictureSize: null,
      flashMode: null
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

  async getSizes() {
    if (this.camera) {
      const sizes = await this.camera.getAvailablePictureSizesAsync()
      return sizes
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
            type={this.state.type}
            ratio={this.state.ratio}
            whiteBalance={this.state.wb}
            pictureSize={this.state.ps}
            flashMode={this.state.fm}>

            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Pressable onPress={() => this.photo()} style={styles.buttons}><Text style={styles.text}>+</Text></Pressable>
              <Pressable onPress={() => this.flip()} style={styles.buttons}><Text style={[styles.text, { paddingBottom: 11 }]}>↺</Text></Pressable>
            </View>
          </Camera>
          <ScrollView style={{ position: 'absolute' }}>
            <RadioGroup
              settingsTitle="WHITE BALANCE"
              settingsArr={Camera.Constants.WhiteBalance}
            />
            <RadioGroup
              settingsTitle="FLASH"
              settingsArr={Camera.Constants.FlashMode}
            />
            <RadioGroup
              settingsTitle="CAMERA RATIO"
              settingsArr={["4:3", "16:9"]}
            />
            <RadioGroup
              settingsTitle="PICTURE SIZES"
              // settingsArr={() => this.getSizes()}
              settingsArr={['yuh']}
            />
          </ScrollView>
        </View>
      );
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
    textAlign: 'center'
  }
})

export default Screen3;
