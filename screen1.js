import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';

class Screen1 extends React.Component {
    render(){
        return(<View style={styles.centered}>
          <View style={styles.colored}>
            <Text style={styles.rt}>G</Text>
            <Text style={styles.rt}>A</Text>
            <Text style={styles.rt}>L</Text>
            <Text style={styles.rt}>L</Text>
            <Text style={styles.rt}>E</Text>
            <Text style={styles.rt}>R</Text>
            <Text style={styles.rt}>Y</Text>
          </View>
          <Pressable style={styles.buttons} onPress={() => this.register()}>
            <Text style={styles.text}>GO</Text>
          </Pressable>
        </View>)
    }
    register = () => {
      this.props.navigation.navigate('list')
    }
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#171717'
  },
  colored: {
    flex: .65,
    backgroundColor: '#171717',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 220
  },
  rt: {
    fontSize: 130,
    color: 'limegreen',
    fontWeight: 'bold',
    lineHeight: 170,
    height: 140
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
    fontSize: 32
  }
});

export default Screen1;