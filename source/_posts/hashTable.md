---
title: 散列表（HashTable）
date: 2020-12-14 00:01:05
tags: 数据结构与算法
category: 数据结构与算法
---

# 散列
- 散列是一种常用的数据存储结构，散列后的数据可以快速的`插入`、`删除`和`取用`。 
- 散列使用的数据结构叫做`散列表`。
- 散列的`查找效率很低`。
总上描述，散列的特点有点类似于`链表`。

## 概览
1. 散列表存储数据时，通过一个`散列函数`将`键`映射为一个数字，这个数字的范围是0-散列表的长度。
2. 理想情况下，散列函数会将每个键值映射为一个唯一的数组索引，然而，键的数量是无限的，数组的长度  
是有限的。两个键映射成同一个值的现象称为`碰撞`。
3. 散列表是基于数组去实现的，数组的长度应该是一个`质数`，为何？
- 计算数组下标的时候是`取余运算`，确保散列表中用来存储数据的`数组大小是一个质数可以避免发生碰撞`。
- 数组的长度应该在100以上，这样可以保证散列表中的数据分布的更均匀。
- 霍纳算法，散列函数的处理字符串数据，先计算字符串中的ASCII，然后乘以一个较小的质数。

核心：散列函数和碰撞处理（开链法和线性探测法）

## HashTable

``` js
  // 构造函数
  function HashTable(){
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
    this.values = [];//为线性探测法使用
  }

  function showDistro(){
    let n = 0;
    for(let i = 0; i < this.table.length; i++){
      if(this.table[i] != undefined){
        console.log("i=" +  this.table[i]);
      }
    }
  }

```
选择一个`散列函数`。
- 如果`键`是`整形`，最简单的`散列函数是以数组的长度对键值取余`。这种散列方式称为`除留余数法`。

**简单的散列函数**

``` js
  function simpleHash(string){ // 依然会发生碰撞
    let total = 0;
    for(let i = 0; i < string.length; i++){
      total += string.charCodeAt(i);
    }
    return total % this.table.length;
  }
```
运行以下示例，依然会发生碰撞。
``` js
  var someNames = ['David', 'Jennifer', 'Donnie', 'Raymond',
   'Cynthia', 'Mike', 'Claython', 'Danny', 'Jonathan'];
   
```

**使用霍纳算法后的散列函数**

``` js
  function betterHash(string, arr){
    let total = 0;
    const H = 37;
    for(let i = 0; i < string.length; i++){
      total += H * total + string.charCodeAt(i);
    }
    return total % arr.length;
  }
```

## 散列表的碰撞处理
1. 开链法
> 开链法是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如另一个数组，这样就可以存储多个键了。
> 使用二维数组进行存储。
比如 a 散列之后的 index = 0， b散列之后的 index 也是 0，那么可以把a.data 存储在 二维数组的[0][0]位置，
b存储在数组[0][1]的位置。

``` js
  function put(key, data){
    let index = 0;
    let pos = this.betterHash(key);
    // key，data存储的位置相隔 1
    if(this.table[pos][index] == undefined){
      this.table[pos][index+1] = data;
      ++index;
    } else {
      while(this.table[pos][index] != undefined){
        ++index;
      }
      this.table[pos][index+1] = data;
    }
  }

  function get(key){
    let index = 0;
    let pos = this.betteHash(key);
    if (this.table[pos][index] == key) { // 找到对应的key
      return this.table[pos][index+1]; // 返回data
    } else {
      while(this.table[pos][index] != key){
        index+=2;
      }
      return this.table[pos][index+1];
    }
    
  }
```
2. 线性探测法
`线性探测法`又叫做`开放寻址散列`。其原理是当发生碰撞时，线性探测法检测列表中的下一个位置是否为空。如果  
为空，就将数据存入该位置，如果不为空，则继续检查下一个位置，直到找到一个空的位置为止。该技术基于这样  
一个事实：`每个散列表都会有很多空的单元格，可以使用它们来存储数据`。

**开链法和线性探测法的选择方法**
- 如果数组的大小是待存储数据个数的1.5倍，那么使用`开链法`。
- 如果数组的大小是待存储数据的两倍及两倍以上时，则使用`线性探测法`。

使用`线性探测法`重写`put`、`get`。
``` js
  function put(key, data) {
    var pos = this.betterHash(key);
    if (this.table[pos] == undefined) {
      this.table[pos] = key;
      this.values[pos] = data;
    } else {
      while(this.table[pos] !== undefined){
        pos++;
      }
      this.table[pos] = key;
      this.values[pos] = data;
    }
  }

  function get(key) {
    var hash = -1;
    hash = this.betterHash(key);
    if (hash > -1) {
      for(var i = hash; i < this.table.length; i++) {
        if (this.table[hash] == key) {
          return this.values[hash];
        }
      }
      return undefined;
    }
  }
```

**散列完整版代码实现**

``` js
  function HashTable() {
    this.table = new Array(137); // 存储数据的数组
    this.betterHash = betterHash; // 以字符串为键
    this.simpleHash = simpleHash; // 以数子为键
    this.put = put; // 存入
    this.get = get; // 读取
    this.values = [];
  }

  // 使用字符的ASCII作为计算的基础
  function simpleHash(data) {
    let total = 0;
    for(let i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    return total % this.table.length;
  }

  // 减少碰撞的发生
  function betterHash(string, arr) {
    const H = 37;
    let total = 0;
    for(let i = 0; i < string.length; i++) {
      total += H * total + string.charCodeAt(i);
    }
    total = total % arr.length; // 这里的arr指的是this.table
    return parseInt(total);
  }

  // put,get 开链法,二维数组, index => key, inde+1 => data
  
  // put,get 线性探测法,关键点直到找到一个为空的

```

## 总结
`散列`的实现原理，使用数组存储数据假定为`array`，而存储的下标通过一个散列函数计算得出假定为`index`。  
如果是以字符串为key进行散列计算。数据下标很容易发生重复，为了解决重复可以使用开链法和线性探测法（开放寻址散列）。  
使用`array[index]`存储`data`。

