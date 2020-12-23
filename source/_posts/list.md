---
title: 列表
date: 2020-12-14 00:17:34 
tags: 数据结构与算法
category: 数据结构与算法
---
# 列表
关键概念： 列表是一组有序的数据。每个列表中的数据项称为元素。没有任何元素的列表称为空列表。
注意:
- 列表元素不能太多,否则内存吃不消。
- 不需要很长序列查找元素或排序。

## 列表的代码实现

核心方法和属性:
    1. 列表长度-size.
    2. 添加元素.
    3. 删除元素.
    4. 插入元素.
    5. 查找元素.

``` js
    function List(){
        this.size = 0;
        this.pos = pos;
        this.dataSource = [];
        this.find = find;
        this.append = append;
        this.remove = remove;
        this.insert = insert;
        this.curPos = curPos;
        this.getElement = getElement;
        this.contains = contains;
        this.toString = toString;
    }

    function find(element){
        for(let i = 0; i < this.dataSource.length; i++){
            let sub = this.dataSource[i];
            if(element === sub){
                return i;
            }
        }
        return -1;
    }

    function append(element){
        this.dataSource[this.size++] = element;
    }

    function remove(element){
        let index = this.find(element);
        if(index > -1){
            this.size--;
            return this.dataSource.splice(index, 1);
        }
        return false;
    }

    function insert(element){
        let index = this.find(element);
        if(index > -1){
            this.size++;
            this.dataSource.splice(index + 1, 0, element);
            return true;
        }
        return false;
    }

    function getElement(){
        return this.dataSource[this.pos];
    }

    function curPos(){
        return this.pos;
    }

    // 后一位
    function next(){
        if (this.pos < this.size){
            this.pos++;
        }
    }

    function prev(){
        if(this.pos > 0){
            this.pos--;
        }
    }

    function moveTo(position){
        this.pos = position;
    }

    function contains(element){
        let index = this.find(element);
        if(index > -1){
            return true;
        }
        return false;
    }

    function toString(){
        return this.dataSource;
    }
    
    var list = new List();
    list.append('1');
    list.append('2');
    list.append('3');
    console.log(list.toString());
    list.next(); // 后移一位,默认初始位置是0,后移一位之后,pos=1.所以返回'2'

```

