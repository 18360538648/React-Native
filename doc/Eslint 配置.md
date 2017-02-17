# Eslint 配置

Local Installation

## 1.安装eslint

```
npm install eslint --save-dev
```

## 2. 配置参数文件

```
./node_modules/.bin/eslint --init
```

![图片](https://github.com/18360538648/Image/blob/master/CC222F54-37F6-4805-B974-63FDFD8CD651.png)

## 3.将.eslintrc.json的.json后缀去掉，复制下面的代码(eslint规则)

 ```
 {
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "flowtype"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": ["error", { "allow": ["warn", "error","log"] }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-undef": "error"
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  }
}

 ```
 
 ## 4 在package.json中加入以下的依赖包目录(可获取最新的包体 npm install --save (某一个包体))
 
 ```
 "dependencies": {
    "babel-eslint": "^7.1.1",
    "eslint-plugin-react": "^6.8.0",
    "react": "15.4.2",
    "react-native": "0.41.2"
  },
  "devDependencies": {
    "babel-jest": "18.0.0",
    "babel-preset-react-native": "1.9.1",
    "eslint": "^3.15.0",
    "eslint-config-standard": "^6.2.1",
    "eslint-plugin-flowtype": "^2.29.1",
    "eslint-plugin-promise": "^3.4.2",
    "eslint-plugin-standard": "^2.0.1",
    "jest": "18.1.0",
    "react-test-renderer": "15.4.2"
  },
 ```
