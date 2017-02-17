import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text,View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import MyPage from '../ui/MyPage';
import Home from '../ui/Home';
import { pageone,pagetwo } from '../../store/actions';
class MainContainer extends Component {
  static defaultProps={
    loginnumber:1
  }
  view() {
    if (this.props.loginnumber === 1) {
      console.log('login'+this.props.login);
      return <Home/>;
    }
    return <MyPage/>;
  }
  page1(){
    this.props.pageone();
  }
  page2(){
    this.props.pagetwo();
  }
  render() {
    return (
      <View>
      <View style={styles.containerdisplay}>
      {this.view()}
      </View>

      <View style={styles.pagebutton}>
            <TouchableOpacity style={styles.buttonstyle}  onPress={()=> {this.page1()}}>
              <Text style={styles.textStyle}>首页</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonstyle}  onPress={()=> {this.page2()}}>
              <Text style={styles.textStyle}>我</Text>
            </TouchableOpacity>
      </View>
      {this.view()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerdisplay:{
    height:Dimensions.get('window').height-50
  },
  pagebutton:{
    flexDirection: 'row'
  },
  buttonstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: Dimensions.get('window').width / 2,
  }


});
// 这里的refresh是与导出的Reducer对应的
const mapStateToProps=({refresh})=>{
  // 这里的loginnumber要和Reducer里面传过来的参数一样
  const { loginnumber }= refresh;
  return { loginnumber };
};
export  default connect(mapStateToProps,{pageone,pagetwo})(MainContainer);
