import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Girl from './Girl';
import NavigationBar from './NavigationBar';

export default class Boy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <NavigationBar
                 title={'Boy'}
                 statusBar={{
                     backgroundColor:'red'
                 }}
                 style={{
                     backgroundColor: "red",

                 }}
                />

                <Text style={styles.text}> i am boy</Text>

                <Text style={styles.text}
                onPress={()=>{
                    this.props.navigator.push({
                        component:Girl,
                        params:{
                            word:'一束花',
                            onCallBack:(word)=>{
                                this.setState({
                                    word:word
                                })
                            }

                        }
                    })

                }}>送女孩一束花</Text>

                <Text style={styles.text}> {this.state.word}</Text>
            </View>
        )

    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor:'gray',

        },
        text:{
            fontSize:20,
        }
    }
)