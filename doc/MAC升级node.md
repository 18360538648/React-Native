MAC升级node.js

* 先查看本机node.js版本

```
node -v
```
* 清除node.js的cache

```
sudo npm cache clean -f
```
* 安装 n 工具，这个工具是专门用来管理node.js版本的，别怀疑这个工具的名字，是他是他就是他，他的名字就是 "n"

```
sudo npm install -g n
```
* 安装最新版本的node.js

```
sudo n stable
```
* 再次查看本机的node.js版本

```
node -v
```