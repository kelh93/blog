---
title: 如何实现函数重载
date: 2021-01-15 05:32:50
tags: Javascript基础
---
## 什么是函数重载？
  函数的重载指的是一组具有相同名称的函数，不同参数列表的方法。
> javascript本身是不支持函数重载的，同名函数的后一个会覆盖前一个。
考虑以下例子：
```js
  function sum(num){
    return num + 1;
  }
  function sum(num){
    return num + 2;
  }
  var result = sum(1); // 输出3；因为sum的赋值被后一个覆盖了。
```
那么如何模拟实现函数的重载呢？
## 模拟函数重载
1. JavaScript函数有一个arguments属性来表示函数形参的个数。我们可以通过判断arguments的长度去实现。
```js
  function sum(){
    switch (arguments.length) {
      case 0: 
        return 1;
      case 1: 
        return arguments[0] + 1;
      case 2:
        return arguments[0] + arguments[1] + 2;
      case 3:
        // ...
        break;
      default:
        return 0;
    }
  }
```
显然这样的代码难以维护，我们可以试试另外一种方式。参照


