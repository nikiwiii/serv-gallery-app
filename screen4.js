import React from 'react';
import { Pressable, StyleSheet, View, Text, Dimensions, Image, ToastAndroid } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import { DeviceEventEmitter } from "react-native"

class Screen4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canshare: Sharing.isAvailableAsync()
    };
  }
  render() {
    return (<View style={styles.centered}><Image
      resizeMode={'contain'}
      style={[styles.image, {
        width: '95%',
        height: undefined,
        maxHeight: Dimensions.get('window').height * .78,
        aspectRatio: this.props.route.params.wid / this.props.route.params.hig,
      }]}
      source={{ uri: this.props.route.params.loc }}
    />
      <Text style={{ color: 'white', textAlign: 'center' }}>{this.props.route.params.res}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable onPress={() => this.delete()} style={styles.buttons}>
          <Text style={styles.text}>DELETE</Text>
        </Pressable>
        <Pressable onPress={() => this.share(this.props.route.params.loc)} style={styles.buttons}>
          <Text style={styles.text}>SHARE</Text>
        </Pressable>
        <Pressable onPress={() => this.upload()} style={styles.buttons}>
          <Text style={styles.text}>UPLOAD</Text>
        </Pressable>
      </View>
    </View>)
  }
  async delete() {
    console.log(this.props.route.params.ids);
    await MediaLibrary.deleteAssetsAsync([this.props.route.params.ids]);
    ToastAndroid.showWithGravity(
      'deleted',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    DeviceEventEmitter.emit("refreshevent", {});
    this.props.navigation.goBack()
  }
  share(imagePath) {
    if (this.state.canshare) {
      Sharing.shareAsync(imagePath, {})
    }
    else {
      ToastAndroid.showWithGravity(
        'sharing unavailable',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  async upload() {
    if(!this.props.route.params.address.includes('x')){
      const photo = await MediaLibrary.getAssetInfoAsync(this.props.route.params.ids)
      const data = new FormData()
      data.append('photo', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: photo.filename
      })
      // console.log(photo);
      fetch(this.props.route.params.address, {
          method: 'POST',
          body: data
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#171717'
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    margin: Dimensions.get("window").width * .025
  },
  buttons: {
    paddingLeft: 0,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center',
    borderColor: 'limegreen',
    borderBottomWidth: .5,
    borderTopWidth: .5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'limegreen',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 24
  }
})

export default Screen4;