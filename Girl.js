import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Boy from './Boy';

export default class Girl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }


    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.text}> i am girl</Text>

                <Text style={styles.text}> 我收到男孩：{this.props.word}</Text>
                <Text style={styles.text}
                onPress={()=>{

                    this.props.onCallBack('巧克力')
                    this.props.navigator.pop()
                }}> 回送男孩巧克力</Text>

            </View>
        )

    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor:'red',
            justifyContent: 'center'
        },
        text:{
            fontSize:20,
        }
    }
)