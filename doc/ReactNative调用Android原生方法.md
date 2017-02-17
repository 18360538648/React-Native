# ReactNative调用Android原生方法

开发过程中有时需要访问Android原生API，进过总结分为以下几个步骤

## 1. 创建一个原生模块
首先我们需要创建一个原生模块，这个原生模块是一个继承`ReactContextBaseJavaModule`的Java类,它可以实现一些JavaScript所调用的原生功能.

```
public class RnTest extends ReactContextBaseJavaModule {
  public RnTest(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  // ReactContextBaseJavaModule要求派生类实现getName方法。这个函数用于返回一个字符串
  // 这个字符串用于在JavaScript端标记这个原生模块
  @Override
  public String getName() {
    return "ToastByAndroid";
  }
  // 获取应用包名
  // 要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod
   @ReactMethod
   public void getPackageName() {
     String name = getReactApplicationContext().getPackageName();
     Toast.makeText(getReactApplicationContext(),name,Toast.LENGTH_LONG).show();
    }
}
```
## 2. 注册模块

要使JavaScript端调用到原生模块还需注册这个原生模块。需实现一个类实现ReactPackage接口，并实现其中的抽象方法

```
public class ExampleReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<>();
      modules.add(new RnTest(reactContext));
      return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}
```

除了上面的步骤意外，还需在MainApplication.java文件中的getPackages方法中，实例化上面的注册类

```
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      // 实例化注册类
      new ExampleReactPackage());
    }
  };
```

## 3. JS调用android原生方法

### 3.1 引入`NativeModules`模块

```
import { NativeModules } from 'react-native';
```
### 3.2 使用Android原生方法

```
//  这里的ToastByAndroid即为1.创建一个原生模块中getName()方法返回的字符串
var rnToastAndroid = NativeModules.ToastByAndroid;
rnToastAndroid.getPackageName();
```

## 4. 获取android返回值

重点：提供给js调用的原生android方法的返回类型必须是void，React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件

### 4.1 回调函数

#### 4.1.1 Callback

`Callback`是react.bridge中的一个接口，它作为ReactMethod的一个传参，用来映射JavaScript的回调函数（function）。`Callback`接口只定义了一个方法`invoke`，`invoke`接受多个参数，这个参数必须是react.bridge中支持的参数

 ```
// android端代码
  @ReactMethod
  public void tryCallBack(String name,String psw,Callback errorCallback,Callback successCallback){
    try{
      if(TextUtils.isEmpty(name)&&TextUtils.isEmpty(psw)){
        // 失败时回调
        errorCallback.invoke("user or psw  is empty");
      }
      // 成功时回调
      successCallback.invoke("add user success");
     }catch(IllegalViewOperationException e){
        // 失败时回调
        errorCallback.invoke(e.getMessage());
      }
    }
 ```
 
```
// RN端调用代码
var rnToastAndroid = NativeModules.ToastByAndroid;
rnToastAndroid.tryCallBack("luo","131",(errorCallback)=>{alert(errorCallback)},(successCallback)=>{alert(successCallback);});
```

#### 4.1.2 Promises

`Promise`是ES6中增加的对于异步编程和回调更加友好的API，使用`Promise`可以更简洁，更灵活地处理回调。在react.briage中定义的`Promise`接口,实现了`resolve`和`reject`的方法,`resolve`用来处理正确处理结果的情况，`reject`用来处理异常的情况。

```
// android端代码
@ReactMethod
  public void tryPromise(String name, String psw, Promise promise){
    try{
      if(TextUtils.isEmpty(name)&&TextUtils.isEmpty(psw)){
        promise.reject("0","user name  or psw is empty");
      }
      WritableMap map = Arguments.createMap();
      map.putString("user_id", "success");
      promise.resolve(map);
      }catch(IllegalViewOperationException e){
         promise.reject("2",e.getMessage());
      }
    }
```

```
// RN端调用代码
rnToastAndroid.tryPromise('luo', '131').then((map)=> { 
  alert(map['user_id']);}, (code, message)=> {
    alert(message);
});
```

## 5 android主动向rn发送消息

## 5.1 android端代码

reactContext(可以想办法到1. 创建一个原生模块中获得)

```
public  static void sendEvent(ReactContext reactContext, String eventName, int status)
    {
        System.out.println("reactContext="+reactContext);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,status);
    }
```

## 5.2 Rn端代码

```
// eventName为5.1中的eventName，reminder为5.1中的status
DeviceEventEmitter.addListener(eventName, (reminder) => {
      console.log(reminder):
    });
```

## rn调用android模版
```
RNBridgeModule.nativeLessonMsg("app4", (response) => {
			alert(response);
		});
const RNBridgeModule = NativeModules.RNBridgeModule;
nativeLanuchApp(message) {
    RNBridgeModule.nativePlayVideo(message);
  }

  <TouchableOpacity onPress={() => {
							this.nativeLanuchApp("111");
						}} >
      <Text style={{marginTop:20}}>
        try
      </Text>
    </TouchableOpacity>
```

```
RNBridgeModule.nativeLessonLearn("{"id": "12345","seq": [{"type": "video","url": "http://st.5vcdn.com/ubcoll/video.mp4"}, {"type": "web_bundle","url": "http://st.5vcdn.com/tmp/app3.zip","vc": "2","app_id": "app3","orientation": "portrait"}, {"type": "web_bundle","url": "http://st.5vcdn.com/tmp/app2.zip","vc": "2","app_id": "app2","orientation": "landscape"}]}");
	}
```