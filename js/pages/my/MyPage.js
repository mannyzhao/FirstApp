import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import CustomKeyPage from "./CustomKeyPage";
import NavigationBar from "../../common/NavigationBar";




export default class MyPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={{backgroundColor:"#2196F3"}}
                />

                <Text

                    onPress={()=>{
                        this.props.navigator.push({
                            component:CustomKeyPage,
                            params:{...this.props}
                        })
                    }}
                    style={styles.tips}>自定义标签</Text>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20,
        height: 40
    }

});