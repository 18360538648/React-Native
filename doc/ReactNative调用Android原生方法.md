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

## 4. 获取android返回值(在失败时返回值有问题，需进一步调整)

提供给js调用的原生android方法的返回类型必须是void，React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件

### 4.1 回调函数

#### 4.1.1 Callback

`Callback`是react.bridge中的一个接口，它作为ReactMethod的一个传参，用来映射JavaScript的回调函数（function）。`Callback`接口只定义了一个方法`invoke`，`invoke`接受多个参数，这个参数必须是react.bridge中支持的参数

 ```
// android端代码
  @ReactMethod
  public void tryCallBack(String name,String psw,Callback errorCallback,Callback successCallback){
    try{
      if(TextUtils.isEmpty(name)){
        // 失败时回调
        errorCallback.invoke("user name is empty");
      }
      if(TextUtils.isEmpty(psw)){
        // 失败时回调
        errorCallback.invoke("psw name is empty");
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
rnToastAndroid.tryCallBack("luo","131",(errorMsg1)=>{alert(errorMsg1)},(msg)=>{alert(msg);});
```

#### 4.1.2 Promises

`Promise`是ES6中增加的对于异步编程和回调更加友好的API，使用`Promise`可以更简洁，更灵活地处理回调。在react.briage中定义的`Promise`接口,实现了`resolve`和`reject`的方法,`resolve`用来处理正确处理结果的情况，`reject`用来处理异常的情况。

```
// android端代码
@ReactMethod
  public void tryPromise(String name, String psw, Promise promise){
    try{
      if(TextUtils.isEmpty(name)){
        promise.reject("0","user name is empty");
      }
      if(TextUtils.isEmpty(psw)){
         promise.reject("1","pwd is empty");
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


