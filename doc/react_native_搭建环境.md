#React Native 搭建环境

## 1.安装Node.js
```
brew install node
```
## 2.安装React Native的命令行工具
```
npm install -g react-native-cli
```
你看到EACCES: permission denied这样的权限报错,需修复/usr/local目录的所有权，执行如下代码:

```
sudo chown -R `whoami` /usr/local
```
## 3.安装Nuclide

是由Facebook提供的基于atom的集成开发环境，可用于编写、运行和 调试React Native应用

```
apm install nuclide
```
## 4.建立React Native工程

```
react-native init HelloWorld
```
## 5.运行工程

```
cd HelloWorld //进入创建的工程目录
react-native run-ios(android) //在ios或Android中运行手机

```

## 6.编写Hello World

使用如下代码，覆盖index.ios.js或是index.android.js中的代码

```
import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

// 注意，这里用引号括起来的'HelloWorld'必须和你init创建的项目名一致
//第二个参数，要前面的类名相同
AppRegistry.registerComponent('HelloWorld', () => HelloWorldApp);
```

## 7.版本跟新

React-native现在很不稳定，基本上是每两周就更新一次，已有代码库更新的步骤如下


* 打开项目目录下的package.json文件，然后在dependencies模块下找到react-native，将当前版本号改到最新，然后在命令行中运行npm install。(当提示‘require react@某.某.某版本, but none was installed’，然后根据这样的提示，执行npm install react@某.某.某版本 --save)
* react-native upgrade（更新动态生成的文件）
## 7.遇到的问题


### 7.1 界面显示：Application XXX has not been registered.This is either due to a require() error during initialization or failure to call AppRegistry.registerComponent.(遇到404，重写的内容无法显示也可以这样解决)

解决方案：问题出现是服务没有开启，进入到项目目录启动服务，代码如下：

```
react-native start
```
### 7.2 界面显示:Could not get BatchedBridge,make sure your bundle is packaged correctly

解决方案：使劲摇晃手机 在出来的菜单里选择“Dev Settings”，然后点击最下面的“Debug server host & port for device“，然后填入你电脑的ip:8081必须是你的手机和你的电脑在同一个局域网内才可以。设置完成以后再重启应用 你就可以看到Reac Native的欢迎界面了，就是index.android.js页面的内容

### 7.3 更新以后遇到Cannot find module 'invariant'

```
npm install invariant warning --save
```
### 7.4 Building and installing the app on the device (cd android && ./gradlew installDebug...Could not install the app on the device, read the error above for details.Make sure you have an Android emulator running or a device connected and have

这是由gradlew无权限的原因，到工程目录下面，运行下面一句话即可解决

```
chmod 755 android/gradlew
```

### 7.5 修改android包名以后，无法找到Mainactivity，导致应用无法自启

这是由于rn中自启android是根据build.gradle目录下面的defaultConfig中的applicationId来启动的，由于更改包名以后，applicationId没有自动更改，导致根据老包名无法启动，只要将applicationId更改为新包名即可

### 7.6 but only one callback may be registered to a function in a native module

这是由于在一个事件中连续发送了两次callback导致的


## 小米手机装不上

小米手机设置里-------开发者选项---------启用MIUI优化关闭

ReactNative安装白屏，打开悬浮窗权限





