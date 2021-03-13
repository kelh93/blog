---
title: 基于AST实现一个简易的webpack
date: 2021-03-14 07:24:21
tags: webpack4 前端工程化 webpack
category: 前端工程化
---
## 学习目标
- 了解webpack如何实现commonjs规范。
- 分析webpack打包后生成的文件
- 基于AST实现webpack打包js文件。  
> 运行环境：
nodejs：v10.15.3
webpack：4.26.0
webpack-cli： 3.3.12  
## 分析webpack打包结果
打包的结果是一个闭包，参数就是模块的依赖对象（也可以是数组），key为文件的路径，value是一个function,模块内部代码使用function进行包裹。  
## 了解webpack如何实现commonjs规范  
1. 使用__webpack_require__代替require
2. __webpack_require__内部构造出module.exports,记录模块的导出内容。  

```js
  function __webpack_require__(moduleId){
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    //调用挂载的function，开始运行程序
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    //返回模块导出的内容。
    return module.exports;
}
```
## 提取webpack的Template模板
```js
  (function (modules) {
  // webpackBootstrap
  // 模块缓存
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    // 'use strict';
    var _sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/sync.js');
    console.log('外部文件', _sync__WEBPACK_IMPORTED_MODULE_0__['default']);
    console.log('simple-webpack');
  },

  './src/sync.js': function (module, __webpack_exports__, __webpack_require__) {
    // 'use strict';
    const data = 'test-data';
    __webpack_exports__['default'] = data;
  },
});
```
## 基于AST实现webpack打包功能
项目依赖
```js
//package.json
  "dependencies": {
    "@babel/traverse": "^7.13.0",
    "babylon": "^6.18.0",
    "ejs": "^3.1.6",
    "magic-string": "^0.25.7",
    "webpack": "^4.26.0",
    "webpack-cli": "^3.3.12"
  }
```
1. 分析入口文件，读取文件内容。  
```js
  const entry = './src/index.js';
  const content = fs.readFileSync(filename, 'utf-8');
```
2. 代码转换为ast
```js
  const ast = babylon.parse(content, {
      sourceType: 'module',
  });
```
3. 遍历ast代码,替换`import` 和 `export` 
```js
  traverse(ast, {
    ExportDeclaration({ node }) {
      const { start, end, declaration } = node;
      code.overwrite(start, end, `__webpack_exports__["default"] = ${declaration.name}`);
    },
    ImportDeclaration({ node }) {
      const { start, end, specifiers, source } = node;
      console.log('node', node);
      const newfile = './src/' + join(source.value);
      code.overwrite(start, end, `var ${specifiers[0].local.name} = __webpack_require__("${newfile}").default`);
      array.push(newfile);
    },
  });
```
4. 收集依赖  
```js
  let depencies = [];
  const _code = code.toString();
  depencies.push({
    filename,
    _code,
  });
```
5. 通过模板生成bundle.js文件内容,输出到文件.  
```js
  const template = `
  (function (modules) {
    // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
      });

      // Execute the module function
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

      // Flag the module as loaded
      module.l = true;

      // Return the exports of the module
      return module.exports;
    }

    // Load entry module and return exports
    return __webpack_require__((__webpack_require__.s = './src/index.js'));
  })({
    <% for(var i=0;i<depencies.length;i++){ %>
      "<%- depencies[i]["filename"] %>":(function(module, __webpack_exports__, __webpack_require__){
        <%- depencies[i]._code%>
      }),
    <% }%>
  });
`;
```
源代码查看请点击[这里](https://github.com/kelh93/simple-webpack)，欢迎star，谢谢。