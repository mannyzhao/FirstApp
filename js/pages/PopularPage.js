import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/Dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    statusBar={{backgroundColor:"#2196F3"}}
                />
                <ScrollableTabView
                    tabBarBackgroundColor={'#2196F3'}
                    tabBarInactiveTextColor={"mintcream"}
                    tabBarActiveTextColor={"white"}
                    tabBarUnderlineStyle={{backgroundColor: "#e7e7e7", height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <PopularTab tabLabel='Java'>java</PopularTab>
                    <PopularTab tabLabel='ios'>ios</PopularTab>
                    <PopularTab tabLabel='Android'>android</PopularTab>
                    <PopularTab tabLabel='JavaScript'>js</PopularTab>
                </ScrollableTabView>


            </View>
        );
    }
}

class PopularTab extends Component {

    constructor(props) {
        super(props);
        this.dataRespository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
        }
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        this.setState({isLoading: true})
        let url = URL + this.props.tabLabel + QUERY_STR;
        console.log(url)
        this.dataRespository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isLoading: false
                })
            })
            .catch(error => {

                console.log(error);
            })

    }

    renderRow(data) {
        return (<RepositoryCell data={data}/>)
    }

    render() {

        return (<View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(data) => this.renderRow(data)}
                      refreshControl={
                          <RefreshControl refreshing={this.state.isLoading}
                                          onRefresh={() => this.onLoad()}
                                          colors={['#2196F3']}
                                          tintColor={'#2196F3'}
                                          title={'Loading...'}
                          />
                      }
            />
        </View>);
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