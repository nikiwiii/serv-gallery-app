import Screen2 from './screen2'
import Screen3 from './screen3'
import Screen4 from './screen4'
import Screen5 from './screen5';
import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>

          <Stack.Screen
            name="list"
            component={Screen2}
            options={{ title: 'Gallery' }}
          />

          <Stack.Screen
            name="camera"
            component={Screen3}
            options={{ title: 'Camera' }} />

          <Stack.Screen
            name="bigphoto"
            component={Screen4}
            options={{ title: 'Your photo' }} />

          <Stack.Screen
            name="settings"
            component={Screen5}
            options={{ title: 'Your settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
