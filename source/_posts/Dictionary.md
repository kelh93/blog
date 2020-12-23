---
title: 字典
date: 2020-12-14 00:01:03
tags: 数据结构与算法
category: 数据结构与算法
---
# 字典
1. `字典`是一种以`键值对`形式存储数据的数据结构。
2. JavaScript中的`Object`类就是以字典的形式设计的。

## 字典的实现
``` js
  // 定义字典类
  // 字典类的基础是Array类，而不是Object类。
  function Dictionary(){
    this.dataStore = new Array(); //使用array是为了让其可以遍历
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.clear = clear;
  }

  function add(key, value){
    this.dataStore[key] = value;
  }

  function find(key){
    return this.dataStore[key];
  }

  function remove(key){
    delete this.dataStore[key];
  }

  function showAll(){
    // this.dataStore是数组，数组也是由Object实现的，所以支持
    // Object.keys去拿到数组的key
    // ①不加this。function里面就无法访问到dataStore
    // Object.keys(this.dataStore).forEach(function(key){
    //   console.log(key + '>' + this.dataStore[key]);
    // }, this);
    // 返回一个有序的结果:添加sort方法
    Object.keys(this.dataStore).sort().forEach(function(key){
      console.log(key + '>' + this.dataStore[key]);
    }, this);
  }

  // ②不能使用数组的length属性，因为当字符串作为key时，数组的length就不准了
  function count(){
    var n = 0;
    Object.keys(this.dataStore).forEach(function(key){
      ++n;
    });
    return n;
  }

  function clear(){
    Object.keys(this.dataStore).forEach(function(key){
      delete this.dataStore[key];
    }, this);
  }
  // Test
  let dic = new Dictionary();
  dic.add("name", "CK");
  dic.add("age", 18);
  console.log(dic.showAll());
  console.log(dic.find("age")); 
  dic.remove("age");
  console.log(dic.showAll());
  
```
## Array.prototype.forEach

- 用法：
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])  

- 参数：
  - `callback`
    - `currentValue` 数组中正在处理的当前元素
    - `index` 数组中正在处理的当前元素的索引（可选）
    - `array` 原数组（可选）
  - `thisArg` callback中用作this的值。(可选)

## Array.length
``` js
  var nums = new Array();
  nums[0] = 1;
  nums[1] = 2;
  console.log(nums.length); // 2
  var books = new Array();
  books['js'] = "《你不知道的javascript》";
  books['java'] = "《大话java》";
  console.log(books.length); // 0
```

