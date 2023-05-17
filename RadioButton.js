import React from 'react';
import { View } from 'react-native';

class RadioButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        <View style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {
                this.props.selected ?
                    <View style={{
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }} />
                    : null
            }
        </View>
    }
};
export default RadioButton;
