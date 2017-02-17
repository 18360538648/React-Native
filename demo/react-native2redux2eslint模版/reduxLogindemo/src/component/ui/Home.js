import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
const ScreenHeight = Dimensions.get('window').height;
class Home extends Component {

  render() {
    return (
      <View style={styles.homepage}>
       <Text style={styles.course}>课程列表</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  homepage:{
    marginTop:ScreenHeight/2,
    flexDirection: 'column',
    alignItems:'center'
  },
  course:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green',
    fontSize:26
  }
});
export default Home;
