import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import CustomKeyPage from "./CustomKeyPage";
import NavigationBar from "../../common/NavigationBar";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/Dao/LanguageDao";
import ArrayUtils from "../../utils/ArrayUtils";
import SortableListView  from 'react-native-sortable-listview';




export default class SortKeyPages extends Component {

    constructor(props){
        super(props)
        this.dataArray=[];
        this.sortResultArray=[];
        this.originalCheckedArray=[];
        this.state={
            checkArray:[]
        }
    }

    componentDidMount(){
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    loadData(){
       this.languageDao.fetch()
           .then(result=>{

             this.getCheckedItems(result);
           })
           .catch(error=>{

           })
    }

    getCheckedItems(result){
        this.dataArray=result;
        console.log(this.dataArray.length+"查询书")
        let checkedArray=[];
        for (let i = 0,len=this.dataArray.length; i <len; i++) {
            let data=result[i];
            if (data.checked)  checkedArray.push(data);
        }
        this.setState({
            checkArray:checkedArray
        })

        console.log(this.state.checkArray.length)

        this.originalCheckedArray=ArrayUtils.clone(checkedArray);
    }


    render() {

        let order=Object.keys(this.state.checkArray)
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'自定义标签排序'}
                    statusBar={{backgroundColor:"#2196F3"}}
                />
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkArray}
                    order={order}
                    onRowMoved={e => {
                        order.splice(e.to, 0, this.state.checkArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} />}
                />


            </View>
        );
    }
}
class SortCell extends Component{

    render(){
        return <View>

            <Text>{this.props.data.name}</Text>
        </View>
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