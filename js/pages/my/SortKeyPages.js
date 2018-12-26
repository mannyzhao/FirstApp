import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image, TouchableOpacity, Alert,
} from 'react-native';

import NavigationBar from "../../common/NavigationBar";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/Dao/LanguageDao";
import ArrayUtils from "../../utils/ArrayUtils";
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from "../../utils/ViewUtils";


export default class SortKeyPages extends Component {

    constructor(props) {
        super(props)
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {

                this.getCheckedItems(result);
            })
            .catch(error => {

            })
    }

    getCheckedItems(result) {
        this.dataArray = result;
        console.log(this.dataArray.length + "查询书")
        let checkedArray = [];
        for (let i = 0, len = this.dataArray.length; i < len; i++) {
            let data = result[i];
            if (data.checked) checkedArray.push(data);
        }
        this.setState({
            checkArray: checkedArray
        })

        console.log(this.state.checkArray.length)

        this.originalCheckedArray = ArrayUtils.clone(checkedArray);

    }

    onBack(){
        if (ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkArray)){
            this.props.navigator.pop();
            return;
        }

        Alert.alert('提示','要保存修改吗？',

            [
                {
                    text:'不保存',onPress:()=>{ this.props.navigator.pop()},style:'cancel'
                },
                {
                    text: '保存',onPress:()=>{this.onSave(true)},
                }
            ]

        )

    }
    onSave(isChecked){
        if (!isChecked&&ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkArray)){
            this.props.navigator.pop();
        }
        this.getSortResult();
        console.log(this.sortResultArray.length)
        console.log(this.sortResultArray[1])

        this.languageDao.save(this.sortResultArray)
        this.props.navigator.pop();
    }


    render() {

        let rightButton = <TouchableOpacity
            onPress={() => this.onSave(false)}
        >

            <View style={{margin: 10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'自定义标签排序'}
                    statusBar={{backgroundColor: "#2196F3"}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={rightButton}
                />
                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkArray}
                    order={Object.keys(this.state.checkArray)}
                    onRowMoved={e => {
                        this.state.checkArray.splice(e.to, 0, this.state.checkArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row}/>}
                />


            </View>
        );
    }

    getSortResult() {
        this.sortResultArray=ArrayUtils.clone(this.dataArray)
        for (let i = 0,len=this.originalCheckedArray.length; i <len ; i++) {
            let item=this.originalCheckedArray[i];
            let index=this.dataArray.indexOf(item)
            this.sortResultArray.splice(index,1,this.state.checkArray[i])
        }
    }
}

class SortCell extends Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}
            >

                <View style={styles.row}>
                    <Image style={styles.image} source={require('./images/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20,
        height: 40
    },
    item: {
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        tintColor:'#2196F3',
        height: 16,
        width:16,
        marginRight: 10
    }, title: {
        fontSize: 20,
        color: 'white'
    },

});