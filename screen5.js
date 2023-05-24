import React from 'react';
import { Text, View, StyleSheet, BackHandler, ToastAndroid, Dimensions, DeviceEventEmitter } from 'react-native'
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

class Screen5 extends React.Component {
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
                <View style={[styles.centered, { flex: 1 }]}>
                    <Text style={styles.text}>Obecnie zapisane IP to:</Text>
                    <Text style={styles.text}>jakies IP</Text>
                    <Text style={styles.text}>Obecnie zapisany PORT to:</Text>
                    <Text style={styles.text}>jakis PORT</Text>
                    <Pressable style={styles.buttons}>
                        <Text style={[styles.text, { fontSize: 30, fontWeight: 'bold' }]}>PODAJ NOWE DANE</Text>
                    </Pressable>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    centered: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    buttons: {
        paddingLeft: 0,
        marginTop: 50,
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
        fontSize: 20,
        textAlign:'center'
    },
})

export default Screen5;
