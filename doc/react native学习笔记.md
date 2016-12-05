# react native学习笔记

每运行一个工程，都需要启动react native服务器

？？？？bind

架构stat（图片）

```
react-native start
```
| 难记的样式属性 |名称|
|:--|:--|
|字体粗细|fontWeight(normal, bold bolder, lighter)|
|边框弧度|borderRadius(为数值)|
|边框宽度|borderWidth(为数值)|

另起一个端口
react-native start --port 8082

## 1.RN目前主要支持flexbox的如下6个属性（下面使用的格式要求如：flexDirection:"row"）

1.justifyContent

用来定义伸缩项目在主轴线的对齐方式，语法为：
justifyContent:flex-start（默认值） | flex-end | center | space-between（平均分布在主轴线上） | space-around

2.alignItems

用来定义伸缩项目在交叉轴上的对齐方式，语法为：
alignItems:flex-start（默认值） | flex-end | center | stretch

3.alignSelf

用来设置单独的伸缩项目在交叉轴上的对齐方式，会覆盖默认的对齐方式，其语法为：alignSelf:auto | flex-start | flex-end | center | stretch(伸缩项目在交叉轴方向占满伸缩容器，如果交叉轴为垂直方向的话，只有在不设置高度的情况下才能看到效果)

4.flex

是flex-grow flex-shrink flex-basis这三个属性的缩写，其语法为：flex:none | flex-grow flex-shrink flex-basis，其中第二个和第三个参数为可选参数，默认值为：0 1 auto

flex-grow:定义伸缩项目的放大比例，默认值为0，即表示如果存在剩余空间，也不放大，语法为：flex-grow：整数值

flex-shrink:定义伸缩项目的收缩能力，默认值为1 ，其语法为：flex-shrink:整数值

flex-basis:用来设置伸缩项目的基准值，剩余的空间按比率进行伸缩，其语法为：flex-basis:length | auto，默认值为auto

5.flexDirection

指定主轴的方向 flex-direction:row| row-reverse | column（默认值） | column-reverse

6.flexWrap

伸缩容器在主轴线方向空间不足的情况下，是否换行以及该如何换行

flexWrap:nowrap（默认值,不换行） | wrap | wrap-reverse


外联样式：style={styles.container}

  内联样式：style={{flex:1,borderWidth:1,borderColor:'red',flexDirection:'row'}}

  多个样式：style=
  {[styles.container,styles.flex,{borderWidth:1,borderColor:'red'}]}

##  2 .TextInput组件

文本输入框：基本组件 自动补全的搜索功能

调试apk目录：DongFang\android\app\build\outputs\apk

TextInput的主要属性和事件如下：

autoCapitalize：枚举类型，可选值有none sentences words characters 当用户输入时，用于提示

placeholder：占位符，在输入前显示的文本内容

value：文本输入框的默认值

placeholderTextColor：占位符文本的颜色

password：boolean类型 true表示密码输入显示*

multiline：多行输入

editable：文本框是否可输入

autoFocus:自动聚焦

clearButtonMode：枚举类型，never while-editing unless-editing always 用于显示清除按钮

maxLength：能够输入的最长字符数

enablesReturnKeyAutomatically：如果为true 表示没有文本时键盘是不能有返回键的，其默认值为false

returnKeyType：枚举类型 default go google join next route search send yahoo done emergency-call 表示软键盘返回键显示的字符串

secureTextEntry：隐藏输入内容，默认值为false

onChangeText：当文本输入框的内容变化时，调用改函数；onChangeText接收一个文本的参数对象

onChange：当文本变化时，调用该函数

onEndEditing：当结束编辑时，调用改函数

onBlur：失去焦点触发事件

onFocus：获得焦点时触发事件

onSubmitEditing：当结束编辑后，点击键盘的提交按钮触发该事件


## 3.Touchable类组件

React Native没有像Web开发那样给元素绑定click事件，前面讲的Text组件有onPress事件回调，View组件是没有的，但是在实际项目开发中，很多其他的组件也是需要可以被点击的，RN提供了3个组件来赋予被点击的能力（去包裹其他组件即可），这3个组件被称为“Touchable类组件”：

1.TouchableHighlight  高亮

属性：activeOpacity(设置透明度)、onHideUnderlay、onShowUnderlay、underlayColor(点击时背景阴影效果的背景颜色)

2.TouchableOpacity   透明度

属性：activeOpacity

3.TouchableWithoutFeedback 无反馈 不会出现任何视觉变化

不建议使用；属性：onLongPress、onPressIn、onPressOut

在app中我们希望点击的时候会有一些视觉上的变化，这个变化会提醒我们已经点击过了，从而避免重复点击

图片Image组件

React Native的Image组件调用的图片途径比较多：网络图片、本地图片、照相机图片

## 4.Image组件的属性：

(.代表级数：../两级)
resizeMode：图片适用的模式 cover、contain、stretch

source:图片的引用地址

网络图片：source={{uri:'http://.png'}}

本地图片：source={require('./baidulogo.png')}

静态图片资源：注意：如果你添加图片的时候packager正在运行，则你需要重启packager以便能正确引入新添加的图片。

这样会带来如下的一些好处:

iOS和Android一致的文件系统。
图片和JS代码处在相同的文件夹，这样组件就可以包含自己所用的图片而不用单独去设置。
不需要全局命名。你不用再担心图片名字的冲突问题了。
只有实际被用到（即被require）的图片才会被打包到你的app。
现在在开发期间，增加和修改图片不需要重新编译了，只要和修改js代码一样刷新你的模拟器就可以了。
与访问网络图片相比，Packager可以得知图片大小了，不需要在代码里再声明一遍尺寸。
现在通过npm来分发组件或库可以包含图片了。

注意：为了使新的图片资源机制正常工作，require中的图片名字必须是一个静态字符串。

使用混合App的图片资源

如果你在编写一个混合App（一部分UI使用React Native，而另一部分使用平台原生代码），也可以使用已经打包到App中的图片资源（通过Xcode的asset类目或者Android的drawable文件夹打包）

<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />

注意：这一做法并没有任何安全检查。你需要自己确保图片在应用中确实存在，而且还需要指定尺寸

注意：网络图片，你需要手动指定图片的尺寸

关于图片的尺寸，React Native会自动为你选好。如果没有，则会选择最接近的尺寸进行缩放，但也至少缩放到比所需尺寸大出50%，以使图片看起来仍然足够清晰。这一切过程都是自动完成的，所以你不用操心自己去完成这些繁琐且易错的代码。

# 遇到的问题：

1.利用数组存放本地图片的路径，需要采用如下形式,如果不加require会找不到图片

```
require("./img/two.png")
```

但是想用json数据存放本地图片的路径，这样写不符合数据格式要求，又会报错，这个需要解决一下

2.多个listview上下排列，由于一个屏幕空间就这么大，如果listview过多时，为了能够显示每一个listview，listview会相互挤压，这是就要引入srcollview来解决这个问题

3. 加了TouchableOpacity会使gridview只能显示一行，其余的行没发显示出来

configureScene = {(route) => Navigator.SceneConfigs.FadeAndroid}

TouchableOpacity和TouchableHighlight的区别

对stats和pros的用法还是迷惑不了解
图片的属性，下面的解释实际的操作有不同之处
resizeMode:
cover:等比拉伸
strech:保持原有大小 
contain:图片拉伸  充满空间（我设置了这个属性，但是没有铺满）



## React Native 遇到的细节问题(一个月至少十个)
1.开头import的意义：

```
//导出react库中默认导出的组件，并命名为React，以及导出非默认导出的组件Component和PropTypes
import React, {Component,PropTypes} from 'react';
//意义同上
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  Navigator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
```
