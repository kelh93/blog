---
title: 链表
date: 2020-12-11 01:22:38
tags: 数据结构与算法
category: 数据结构与算法
---

# 链表

## 数组的缺点
1. 添加和删除比较麻烦, 因为添加或删除之后,最坏的情况下所有元素的下标都会发生变化.
2. js中的数组是使用对象实现的,与其他语言相比,效率很低.

## 数组的优点
1. 随机访问.只要给定下标就可以找到. 所有查找算是数组的优点.

## 链表
1. 添加、删除快。
2. 查找慢，每个都要从头开始查找。

链表的概念  
`链表`是由一组`节点`组成的集合。每个`节点`都使用一个对象的引用指向它的`后继`。指向另一个节点  
的引用叫做`链`。

头节点： 链表开始的位置  
> 疑问链表的头节点Head是否真实存在，还是只是为了定义一个链表的开始位置。头节点是否存在值？

链表的末尾指向`null`  

### 单链表的代码实现
1. 首先要实现一个`节点类`。节点包含数据`element`和`next`
2. 链表的操作
- 插入
- 删除
  - 删除之前得先找到`前一个元素`，让`前一个元素`指向`待删除元素`的next。
* insert
* remove
* find、findPrevious
* display 返回链表中的元素值
``` js
  // Node 节点类
  function Node(element){
    this.element = element; // 表示节点上的数据
    this.next = null; // 指向下一个节点的链接（地址）
  }
  // LinkedList
  function LList(){
    this.head = new Node('head'); // 实例化一个头节点
    this.find = find; // 查找
    this.insert = insert; // 插入
    this.remove = remove; // 删除
    this.display = display; // 显示链表里面所有的元素
    this.findPrevious = findPrevious;
  }
  // LList初始状态下。就是 head -> null。相当于数组中的 []，不包含任何元素。

  function find(element){
    // let eleNode = new Node(element);
      let curNode = this.head; // 头节点
      while(curNode.element != eleNode){
        curNode = curNode.next;
      }
      return curNode;
  }
  // 在item后插入newElement
  function insert(newElement, item){
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }
  //display
  function display(){
    let curr = this.head; // 从头开始
    while(curr.next != null){
      console.log(curr.next.element);
      curr =  curr.next;
    }
  }

  function findPrevious(element){
    let cur = this.head;
    // 还没到最后一个元素，并且下一个元素不是element就继续next
    // 进行查找。cur.next = element;此时cur就是element的
    // 前一个元素
    if(cur.next != null && cur.next.element != element){
      cur = cur.next;
    }
    return cur;
  }

  function remove(element){
    let cur = this.findPrevious(element);
    if(cur.next != null){
      // cur.next = element.next; 为什么这样写不行？
      cur.next = cur.next.next;
    }
  }

  // 测试代码
  var cities = new LList();
  cities.insert("ShenZhen", "head");
  cities.insert("HangZhou", "Xihu");
  cities.insert("SiChuan", "Chengdu");
  cities.display();

  // 双链表
```

### 双链表
`双链表`中的元素具有指向`前一个元素`和`后一个元素`的`链`，相比单链表多了一个`指向前一个元素的链`。

**三条线**
1. current.next
2. current.previous
3. previous.next -> current
``` js
  //修改Node类，增加previous属性
  function Node(element){
    this.element = element;
    this.next = null;
    this.previous = null;
  }

  //修改insert
  function insert(newElement, item){
    let newNode = new Node(newElement); // 新增节点
    let cur = this.find(item); // 要追加节点的位置
    cur.next = newNode;
    newNode.previous = cur;
    newNode.next = cur.next;
  }

  function remove(element){
    let curr = this.find(element); //找到要删除的节点位置
    if(curr.next != null){
      curr.previous.next = curr.next; //上节点指向下节点
      curr.next.previous = curr.previous; // 下节点指向上节点
      curr.next = null; // 删除当前节点下链接
      curr.previous = null; // 删除当前节点上链接
    }
  }

  function findLast(){
    // let cur = this.find();
    let cur = this.head;
    while(cur != null){
      cur = cur.next;
    }
    return cur;
  }

  // 反序显示
  function dispReverse(){
    let curNode = this.head;
    curNode = this.findPrevious();
    while(curNode.previous != null){
      console.log(curNode.element);
      curNode = curNode.previous;
    }
  }

```

### 循环链表
> 如果你希望可以从后向前遍历链表，但是又不想付出额外的代价来创建一个双向链表，那么  
就需要使用循环链表，从`循环链表`的尾结点向后移动，就等于从后向前遍历链表。

``` js
  function LList(){
    this.head = new Node('head');
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.display = display;
  }

  function display(){
    var cur = this.head;
    // 检查到头节点退出。不然就会死循环。
    while(cur.next != null && cur.next.element != 'head'){
      cur = cur.next;
    }
  }
  
```
