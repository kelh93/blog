---
title: 常见的数据结构
date: 2020-12-08 14:26:56
tags: 数据结构与算法
category: 数据结构与算法
---

作为前端开发,在日常工作中主要处理的都是产品的展示,接触最多的是UI库,比较少用到数据结构与算法,但是在编程中,更多的了解和学习数据结构与算法对我们的编码和处理性能问题提供保障.笔者写这个专题旨在记录自己的学习过程和总结.

## 常见的数据结构
- 列表
- 栈
- 队列
- 链表
    - 单链表
    - 双链表
- 二叉树
- 图

### 列表的实现
使用Array实现列表
``` js
    function List(){
        this.dataSource = [];
        this.size = 0;
        this.append = append;
        this.remove = remove;
        this.clear = clear;
        this.length = length;
        this.find = find;
        this.contains = contains;
    }

```
