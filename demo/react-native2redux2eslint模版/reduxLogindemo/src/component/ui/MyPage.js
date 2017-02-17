import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { loginRefresh,logoutRefresh } from '../../store/actions';
const ScreenHeight = Dimensions.get('window').height;
class MyPage extends Component {
  loginFun() {
    fetch('http://192.168.130.108:9000/test')
      .then((response)=>{
        if(response.ok){
          return response.text();
        }else {
          alert('服务器繁忙');
        }
      }).then((data) =>{
        console.log('data'+data);
        this.props.loginRefresh(data);
      }).done();
  }
  logoutFun(){
    this.props.logoutRefresh('登录');
  }
  static defaultProps={
    login:'登录'
  }
  render() {
    return (
      <View style={styles.mypage}>
       <TouchableOpacity activeOpacity={0.5} onPress={()=> {this.loginFun()}} >
       <Text style={styles.login}>{this.props.login}</Text>
       </TouchableOpacity>
       <TouchableOpacity activeOpacity={0.5} onPress={()=> {this.logoutFun()}}>
       <Text style={styles.logout}>登出</Text>
       </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mypage:{
    marginTop:ScreenHeight/2,
    flexDirection: 'column',
    alignItems:'center'
  },
  login:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green',
    fontSize:26
  },
  logout:{
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    fontSize:26
  }
});
// 这里的refresh是与导出的Reducer对应的
const mapStateToProps=({refresh})=>{
  // 这里的login要和Reducer里面传过来的参数一样
  const { login }= refresh;
  return { login };
};
export  default connect(mapStateToProps,{loginRefresh,logoutRefresh})(MyPage);
