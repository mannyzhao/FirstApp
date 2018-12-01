/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Navigator
} from 'react-native';
import Boy from './Boy';

export default class FirstApp extends Component {
  render(){

    return(
        <View style={styles.container}>

            <Navigator
                initialRoute={{component:Boy}}

                renderScene={(route,navigator)=>{

              let Component=route.component;
              return<Component navigator={navigator} {...route.params}/>

            }}/>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'red',
  },

});

AppRegistry.registerComponent('FirstApp', () => FirstApp);
