---
title: 从dist分析webpack4与webpack5
date: 2021-02-19 13:03:39
tags: webpack
category: 前端工程化
---
[源代码传送门](https://github.com/kelh93/webpack4VSwebpack5)  

webpack5其实很早就更新了，现在[webpack官网](https://webpack.js.org/)已经`V5.22.0`。
今天主要是要对比下webpack4打包出来的结果和webpack5有什么差别，以`--mode deveplopment`为例。
从webpack4开始，其实就不需要`webpack.config.js`也可以进行打包。它会自动从`src`目录找到`index.js`
作为入口文件。  

先写一个简单的index.js
- webpack4
```js
  // ck-webpack/webpack4/src/index.js
  console.log('ck-webpack4');
```
- webpack5
```js
  // ck-webpack/webpack5/src/index.js
  console.log('ck-webpack5');
```
查看产生的dist
**webpack4/dist**
```js
  // ck-webpack/webpack4/dist/main.js
  (function (modules) {
  // 模块缓存
  var installedModules = {};
  // The require function
  function __webpack_require__(moduleId) {
    // 检查模块是否被缓存，如果缓存过则直接返回该模块的exports
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 如果没有被缓存则创建一个模块对象，并将该对象加入到缓存中。
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // 执行module中的function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 模块是否被加载
    module.l = true;

    // 返回module的exports
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = '';

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/index.js': function (module, exports) {
    console.log('ck-webpack4');
  },
});
```
**webpack5/dist**
```js
  //ck-webpack/webpack5/dist/main.js
  (() => {
    // webpackBootstrap
    var __webpack_modules__ = {
      './src/index.js': () => {
        console.log('ck-webpack5');
      },
    };
    var __webpack_exports__ = {};
    __webpack_modules__['./src/index.js']();
  })();

```

### 分析dist ###
- webpack4
生成的main.js是一个闭包
参数： 模块对象，以模块路径作为key，也就是moduleId，模块的内容被包裹在一个function中
返回值： 返回`__webpack_require__`函数的`module.exports`。

**__webpack_require__**
参数: `moduleId`
返回值: module.exports  

- webpack5
webpack5生成的main.js也是一个闭包，但是隐藏了很多细节，也没有了之前的一些静态属性。因为入口文件非常简单。  

## 结果 ##
1. webpack5生成的main.js的文件，比webpack4更加简洁，因为浏览器已经大部分支持了ES6，所以省去了很多之前polyfill的代码。  
2. webpack5使用了ES6的箭头函数，也不需要在`modules[moduleId].call`去固定this指向了。
> ps：上面代码段的main.js删除了一些无用的注释，把eval中的代码放开了。
上面是从一个最简单的入口文件分析的结果。如果入口文件复杂一些呢，引入其他文件。
## 入口文件引入其他文件 ##

- webpack4
在入口文件引入了`add.js`和`tool.js`
```js
  // index.js
  import add from './add';
  import upperCase from './tool';
  console.log('ck-webpack4');
  var c = add(1, 2);
  console.log('1+2等于', c);
  var str = 'apple';
  var d = upperCase(str);
  console.log('apple转大写', d);
  // add.js
  const add = function (a, b) {
    return a + b;
  };
  export default add;
  // tool.js
  const upperCase = function (str) {
    return str.toUpperCase();
  };
  export default upperCase;
```
- webpack5
代码和webpack4一致，不再赘述。来看看生成的dist。    
**webpack4/dist**
```js
  (function(modules){
    /* ... */
    // 首先执行入口文件
    return __webpack_require__((__webpack_require__.s = './src/index.js'));
  })({
  './src/add.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const add = function (a, b) {
      return a + b;
    };
    __webpack_exports__['default'] = add;
  },
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/add.js');
    var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/tool.js');
    console.log('ck-webpack4');
    var c = Object(_add__WEBPACK_IMPORTED_MODULE_0__['default'])(1, 2);
    console.log('1+2等于', c);
    var str = 'apple';
    var d = Object(_tool__WEBPACK_IMPORTED_MODULE_1__['default'])(str);
    console.log('apple转大写', d);
  },
  './src/tool.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const upperCase = function (str) {
      return str.toUpperCase();
    };
    __webpack_exports__['default'] = upperCase;
  },
})
```
webpack4将每个模块都放入到`modules`对象中，`index.js`通过`__webpack_require__`引入依赖的模块。  
在`add.js`和`tools.js`的function中，使用`__webpack_exports__`对外暴露接口。
**webpack5/dist**
```js
  (()=>{
      var __webpack_modules__ = {
      './src/add.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
        const add = function (a, b) {
          return a + b;
        };
        const __WEBPACK_DEFAULT_EXPORT__ = add;
      },
      './src/index.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/add.js');
        var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/tool.js');
        console.log('ck-webpack5');
        var c = (0, _add__WEBPACK_IMPORTED_MODULE_0__.default)(1, 2);
        console.log('1+2等于', c);
        var str = 'apple';
        var d = (0, _tool__WEBPACK_IMPORTED_MODULE_1__.default)(str);
        console.log('apple转大写', d);
      },
      './src/tool.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, { default: () => __WEBPACK_DEFAULT_EXPORT__ });
        const upperCase = function (str) {
          return str.toUpperCase();
        };
        const __WEBPACK_DEFAULT_EXPORT__ = upperCase;
      },
    };
    /* ... */
      (() => {
        // define getter functions for harmony exports
        __webpack_require__.d = (exports, definition) => {
          for (var key in definition) {
            if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
              Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
            }
          }
        };
      })();

      /* webpack/runtime/hasOwnProperty shorthand */
      (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
      })();

    /* webpack/runtime/make namespace object */
    (() => {
      // define __esModule on exports
      __webpack_require__.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
      };
    });
    var __webpack_exports__ = __webpack_require__('./src/index.js');
  })()
```
## 结果 ##
1. webpack5将webpack4中的modules参数放到了闭包函数的内部使用变量`__webpack_modules__`保存。
2. webpack5将`__webpack_require__`的静态属性方法都使用箭头函数包裹。

### webpack4与webpack5异步加载js ###
webpack5解决了webpack4打包异步js，chunkId被串改的问题。我们可以做一个实验。
- webpack4
```js
  // index.js
  import('./sync').then((data) => {
    onsole.log(data);
  });
  // sync.js
  const data = '同步js';
  export default data;
});
```
执行yarn dev，生成dist文件,生成了0.js，就是sync.js打包后的文件。  

![webpack4 打包结果](/images/webpack4vswebpack5/1.png)  

![sync.js打包结果](/images/webpack4vswebpack5/2.png)  
如果再增加一个异步js。  
```js
  // index.js
  import('./sync').then((data) => {
    onsole.log(data);
  });
  import('./async').then((_) => {
    console.log('_', _);
  });
  // sync.js
  const data = '同步js';
  export default data;
  // async.js
  const data = '异步js';
  export default data;
```
再次打包执行`yarn dev`  

![webpack4增加async.js后的打包结果](/images/webpack4vswebpack5/3.png)  

![原先的chunkId被async覆盖](/images/webpack4vswebpack5/4.png)  
之前的0.js的内容被async.js的内容覆盖了。webpack4也给出了解决方法，可以使用魔法注释。  
在引入异步js的时候加上`/* webpackChunkName: 'sync' */`就可以固定异步js的文件名。  
```js
    // index.js
  import(/* webpackChunkName: 'sync' */ './sync').then((data) => {
    onsole.log(data);
  });
  import(/* webpackChunkName: 'async' */'./async').then((_) => {
    console.log('_', _);
  });
```
更改之后打包出来的文件名就会固定，不会被覆盖。  
![webpack4新增魔法注释](/images/webpack4vswebpack5/5.png)  

**但是webpack5不存在这个问题**  

![webpack5异步加载打包结果](/images/webpack4vswebpack5/6.png)  
webpack5在`development`环境下，打包出来的异步js文件名使用文件路径进行拼接，防止重名。在`production`环境下，chunk id是`deterministic`。
>[摘自webpack官网](https://webpack.js.org/configuration/optimization/#optimizationchunkids)  
>`optimization.chunkIds`
>`boolean = false string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'`
>告诉webpack生成chunk id的逻辑。设置`false`，则通过自定义插件进行设置。
>- 另外如果是开发环境那么`optimization.chunkIds`设置为'named',如果是生产环境则设置为`deterministic`;  
>- 如果以上都没有，则默认设置为`natural`(自然数)
>```js
>module.exports = {
  //...
  optimization: {
    chunkIds: 'deterministic'
  }
}
>```

## webpack异步加载原理  
```js
(function (modules) {
  // webpackBootstrap
  // install a JSONP callback for chunk loading
  // webpack异步加载js的回调,将加载完成的js打上已安装的flag==>installedChunks[chunkId] = 0;
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      // if(installedChunks.chunkId && installedChunks[chunkId])
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        // installedChunks[chunkId][0]就是加载成功的resolve方法.
        resolves.push(installedChunks[chunkId][0]);
      }
      // 异步加载完成后将chunkId打上已安装的flag
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);
    // 执行promise.resolve回调函数
    while (resolves.length) {
      resolves.shift()();
    }
  }

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // 哨兵变量。记录加载过的chunk
  var installedChunks = {
    main: 0,
  };

  // script path function
  // 拼接异步script路径
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + '' + ({ async: 'async', sync: 'sync' }[chunkId] || chunkId) + '.js';
  }

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

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // 通过主入口进行异步的启动的过程
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];

    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];
    // 0 代表以及安装了
    if (installedChunkData !== 0) {
      // 存在则直接将模块的函数放到promise
      if (installedChunkData) {
        // installedChunkData[2] ==> installedChunks[chunkId][2] ==> module.exports
        // 因为installedChunks[chunkId] = [resolve, reject];// 0是resolve，1是reject
        // installedChunkData[2] = promise
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        var promise = new Promise(function (resolve, reject) {
          // 异步加载promise
          // installedChunks[chunkId] = [resolve, reject];
          // installedChunkData = [resolve, reject];
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push((installedChunkData[2] = promise));

        // 开始模块加载
        // 通过 DOM 操作，往 HTML head 中插入一个 script标签去异步加载 Chunk 对应的 JavaScript文件
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute('nonce', __webpack_require__.nc);
        }
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        // 在 script加载和执行完成时回调
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          // 去检查 chunkId 对应的 Chunk 是否安装成功，安装成功时才会存在于 installedChunks 中
          var chunk = installedChunks[chunkId];
          // onload之后，chunk != 0，表示没有正常加载完成。
          if (chunk !== 0) {
            // 加载失败
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              // 执行reject，返回error
              chunk[1](error);
            }
            // 未找到。将chunkId赋值为undefined
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    // Promise.all 返回一个数组
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = '';

  // on error function for async loading
  __webpack_require__.oe = function (err) {
    console.error(err);
    throw err;
  };
  // 执行webpackJsonp的回调
  var jsonpArray = (window['webpackJsonp'] = window['webpackJsonp'] || []);
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/add.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const add = function (a, b) {
      return a + b;
    };
    __webpack_exports__['default'] = add;
    // sourceMap原理
    //# sourceURL=webpack:///./src/add.js?'
  },
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/add.js');
    var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/tool.js');
    __webpack_require__
      .e('sync')
      .then(__webpack_require__.bind(null, './src/sync.js'))
      .then((data) => {
        console.log(data);
      });
    __webpack_require__
      .e('async')
      .then(__webpack_require__.bind(null, './src/async.js'))
      .then((_) => {
        console.log('_', _);
      });
    console.log('ck-webpack4');
    var c = Object(_add__WEBPACK_IMPORTED_MODULE_0__['default'])(1, 2);
    console.log('1+2等于', c);
    var str = 'apple';
    var d = Object(_tool__WEBPACK_IMPORTED_MODULE_1__['default'])(str);
    console.log('apple转大写', d);
  },

  './src/tool.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const upperCase = function (str) {
      return str.toUpperCase();
    };
    __webpack_exports__['default'] = upperCase;
  },
});

```
