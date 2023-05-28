import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, Pressable, DeviceEventEmitter } from 'react-native'

class Screen5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '192.168.xx.xxx',
            port: '4000',
            open: false
        };
    }
    ip = '192.168.xx.xxx'
    port = '4000'

    sendData() {
        this.setState({ip:this.ip, port:this.port})
        DeviceEventEmitter.emit("newServerData", {ip: this.ip, port: this.port})
    }

    render() {
        return (
            <View style={[styles.centered, { flex: 1 }]}>
                <Text style={styles.text}>Obecnie zapisane IP to:</Text>
                <Text style={[styles.text, {color: 'gainsboro'}]}>{this.state.ip}</Text>
                <Text style={styles.text}>Obecnie zapisany PORT to:</Text>
                <Text style={[styles.text, {color: 'gainsboro'}]}>{this.state.port}</Text>
                <Pressable style={styles.buttons} 
                onPress={() => { 
                    this.setState({open: !this.state.open}); 
                    this.state.open ? this.sendData() : null }}>
                    <Text style={[styles.text, { fontSize: 30, fontWeight: 'bold' }]}>{this.state.open ? 'ZAPISZ NOWE DANE' : 'PODAJ NOWE DANE'}</Text>
                </Pressable>


                <View style={[styles.dialog, {top: this.state.open ? 250 : Dimensions.get('window').height,}]}>
                    <Text style={styles.text}>wpisz IP:</Text>
                    <TextInput
                        placeholderTextColor="dimgray" 
                        style={styles.input}
                        onChangeText={newText => this.ip = newText}
                        ref={input => {this.input1 = input}}
                        defaultValue={this.ip}>
                    </TextInput>
                    <Text style={styles.text}>wpisz PORT:</Text>
                    <TextInput
                        placeholderTextColor="dimgray" 
                        style={styles.input}
                        onChangeText={newText => this.port = newText}
                        ref={input => {this.input2 = input}}
                        defaultValue={this.port}>
                    </TextInput>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(30, 30, 30)'
    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white'
    },
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
