---
title: 栈
date: 2020-12-14 00:08:21 
tags: 数据结构与算法
category: 数据结构与算法
---
# 栈

## 概念
- 栈是一种特殊的列表。
- 栈是一种高效的数据结构，因为数据只能在栈顶删除或添加,操作很快。 就像洗碗的时候放盘子。

## 特点
- 栈内元素只能通过列表的一端访问,这一端成为栈顶.
- LIFO (last in first out)
- 操作新元素又称作 进栈,入栈或压栈.从一个栈删除元素又称作出栈或退栈.

## 方法
- 入栈
- 出栈
- 栈顶

## 栈代码实现
核心方法:
    1. 使用数组存储数据. 
    2. 定义一个栈顶. 栈顶默认位置为0,因为栈默认数据为空.
    3. 实现入栈方法
    4. 实现出栈方法.
    5. 实现清空栈的方法.
    6. 返回栈顶元素.
``` js
    function Stack(){
        this.dataSource = [];
        this.top = 0;
        this.push = push;
        this.pop = pop;
        this.peek = peek;
        this.clear = clear;
        this.length = length;
    }
    // 入栈
    function push(element){
        // 元素入栈后,栈顶位置发生变化.
        this.dataSource[this.top++] = element;
    }
    // 出栈: 删除栈顶元素
    function pop(){
        // 返回栈顶元素.栈顶位置发生变化,this.top - 1;
        return this.dataSource[--this.top];
    }
    // 返回栈顶元素
    function peek(){
        return this.dataSource[this.top - 1];// 返回栈顶元素
    }

    function clear(){
        this.top = 0;
    }

    function length(){
        return this.top;
    }
    // 栈的应用: 解决回文字符串的问题.
    // 思路: 出栈和入栈结果一致则是回文,否则不是.
```


