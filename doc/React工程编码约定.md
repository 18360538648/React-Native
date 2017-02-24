React工程编码约定：
1、使用ESLint做静态代码检查

2、目录结构
src/component/containers: 需要与Redux连接的container component
src/component/ui: 不需要与Redux连接的container component
src/component/hoc: 高阶组件
src/store/actions: action creator
src/store/reducers: reducer
src/store/initial_state.json: 初始状态（应用程序模型）
src/constants.js: 应用程序常量定义

3、一致性要求
src/store/actions和src/store/reducers的文件名与src/store/initial_state.json的第一级key保持一致

4、应用业务逻辑位于actions和reducer目录中，component只负责状态呈现、用户事件响应与style

5、component源文件名不需大写

6、设计驱动开发，先完成initial_state.json的定义，再对照制定src/store/actions中的API，然后编码实现