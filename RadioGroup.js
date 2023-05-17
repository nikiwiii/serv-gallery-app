import React from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    render() {
        console.log(this.props.settingsArr)
        return (<View>
            <Text>{this.props.settingsTitle}</Text>
            {
                Array.isArray(this.props.settingsArr) ?
                    this.props.settingsArr.map((e) => {
                        <View>
                            <RadioButton />
                            <Text>{e}</Text>
                        </View>
                    })
                    :
                    <Text>obnjekt</Text>
            }
        </View>)
    }
};
export default RadioGroup;
