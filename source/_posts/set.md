---
title: 集合（Set）
date: 2020-12-14 01:31:12 
tags: 数据结构与算法
category: 数据结构与算法
---

# 集合

## 定义
`集合`是由一组`无序`但彼此之间又有一定相关性的成员组成的，每个成员在集合中`只能出现一次`。  

- 不包含任何成员的集合称为`空集`，`全集`则是包含一切可能成员的集合。
- 如果两个集合的成员完全相同，则称这两个集合相等。
- 如果一个集合中所有的成员都属于另外一个集合，则前一个集合称为后一个集合的`子集`。

## 集合的操作
跟数学上集合的操作一样。
- 并集
  将两个集合的成员进行合并，得到一个新的集合。
- 交集
  两个集合中共同存在的成员组成一个新的集合。
- 补集
  属于一个集合而不属于另一个集合的成员组成的集合。

## Set类的实现
Set类的实现基于数组，数组用来存储数据。

``` js
  function Set() {
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.size = size;
    this.union = union; // 并集
    this.intersect = intersect; // 交集
    this.subset = subset; // 子集
    this.difference = difference; // 补集
    this.show = show; // 展示集合中的元素
  }

  function add(data) {
    // 因为集合内不能存在相同的元素，所以添加之前先查重
    if (this.dataStore.indexOf(data) < 0 ) { // 不存在则添加
      this.dataStore.push(data);
      return true;
    }
    return false;
  }

  function remove(data) {
    let pos = this.dataStore.indexOf(data);
    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    }
    return false;
  }

  function show() {
    return this.dataStore;
  }

  // 是否包含
  function contains(data) {
    if (this.dataStore.indexOf(data) > -1) {
      return true;
    }
    return false;
  }

  // 求并集。先将其中一个保存到temp，再遍历第二个将不属于temp中的继续添加到temp，
  // 最后返回temp。
  function union(set) {
    let temp = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      temp.add(this.dataStore[i]);
    }
    for(var i = 0; i < set.dataStore.length; i++) {
      if (!temp.contains(set.dataStore(i))) {
        temp.dataStore.push(set.dataStore(i));
      }
    }
    return temp;
  }

  // 交集。定义一个temp。将2个集合中相同的成员添加到temp中，最后返回。
  function intersect(set) {
    let temp = new Set();
    for(let i = 0; i < this.dataStore.length; i++) {
      if (set.contains(this.dataStore[i])) {
        temp.add(this.dataStore[i]);
      }
    }
    return temp;
  }

  // 是否是一个集合的子集。判断2个集合的size，如果A.size > B.size 那么A肯定不是B的子集。
  function subset(set) {
    if (this.size() > set.size()) {
      return false;
    } 
    for (let i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) {
        return false;
      }
    }
    return true;
  }

  function size() {
    return this.dataStore.length;
  }

  // 补集。两个集合中不属于另一个集合的所有成员。
  function difference(set) {
    let temp = new Set();
    for (let i = 0; i < this.dataStore.length; i++ ) {
      if (!set.contains(this.dataStore[i])) {
        temp.add(this.dataStore[i]);
      }
    }
    return temp;
  }

```