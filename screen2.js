import React from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import Item from './Item';
import * as MediaLibrary from "expo-media-library";
import {DeviceEventEmitter} from "react-native"

class Screen2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        photos: [],
        numColumns: 5,
        selects: []
      }
    }
    async componentDidMount(){
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
          alert('brak uprawnień do czytania image-ów z galerii')
      }
        this.setState({
            loading: true
        })
        let obj = await MediaLibrary.getAssetsAsync({
            first: 150,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            sortBy: 'modificationTime'
        })
        this.setState({
            photos: obj.assets
        })
        ToastAndroid.showWithGravity(
          'photos swallowed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
          );
      
          this.setState({
              loading: false
          })
          DeviceEventEmitter.addListener("refreshevent", () => {this.refresh()});
    }

    async refresh() {
        this.setState({
            loading: true
        })
        let obj = await MediaLibrary.getAssetsAsync({
            first: 150,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            sortBy: 'modificationTime'
        })
        this.setState({
            photos: obj.assets
        })
        this.setState({
            loading: false
        })
    }

    layout() {
        this.setState({
            numColumns: this.state.numColumns === 1 ? 5 : 1
        })
    }

    render(){
        return(<View style={styles.centered}>
                <View style={styles.flex}>
                    <Pressable style={styles.buttons} onPress={() => this.delSelected()}><Text style={styles.text}>DELETE</Text></Pressable> 
                    <Pressable style={styles.buttons} onPress={() => this.makePhoto()}><Text style={styles.text}>CAMERA</Text></Pressable>
                    <Pressable style={styles.buttons} onPress={() => this.layout()}><Text style={styles.text}>LAYOUT</Text></Pressable> 
                </View>
                {
                    this.state.loading ?
                        <ActivityIndicator size="large" color="white" />
                        :
                        null
                }
                <FlatList
                    style={styles.list}
                    data={this.state.photos}
                    renderItem={({item}) => <Item loc={item.uri} ids={item.id} wid={item.width} hig={item.height} rem={(x) => {this.removeSelected(x)}} select={(x) => {this.addSelected(x)}} cols={this.state.numColumns} navigation={this.props.navigation} />}
                    numColumns={this.state.numColumns}
                    key={this.state.numColumns}
                />
            </View>)
    }
    makePhoto = async() => {
        this.props.navigation.navigate('camera')
    }
    addSelected(selectedPath) {
        this.setState({
            selects: [...this.state.selects, selectedPath]
        })
        console.log(this.state.selects);
    }
    removeSelected(selectedPath) {
        this.setState({
            selects: [...this.state.selects.filter((item) => item !== selectedPath)]
        })
        console.log(this.state.selects);
    }
    async delSelected() {
        await MediaLibrary.deleteAssetsAsync(this.state.selects)
        this.setState({
            selects: []
        })
        this.refresh()
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#171717'
    },
    list: {
        flex: 1
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttons: {
        height: 40,
        alignSelf: 'center',
        borderColor: 'transparent',
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        color: 'limegreen',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Screen2;
