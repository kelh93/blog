---
title: 队列
date: 2020-12-14 00:04:24
tags: 数据结构与算法
category: 数据结构与算法
---
# 队列
特点: FIFO, 先进先出.

## 优先队列
不按照先进先出的顺序,而是按照优先级排列. 比如医院急诊科,按照病人的紧急程度进行排列.

## 主要操作:
- 入队
- 出队

## 队列代码实现

``` js
  function Queue(){
    this.dataStore = []; // 队列初始数据
    this.enqueue = enqueue; // 入队
    this.dequeue = dequeue; // 出队
    this.front = front; // 队首
    this.back = back; // 队尾
    this.toString = toString; // 显示队列里面的内容
    this.empty = empty; // 是否为空队列
  }
  function enqueue(element){
    this.dataStore.push(element);
  }
  function dequeue(){
    return this.dataStore.shift();
  }
  function front(){
    return this.dataStore[0];
  }
  function back(){
    return this.dataStore[this.dataStore.length - 1];
  }
  function empty(){
    return this.dataStore.length == 0;
  }

```



### 基数排序
先比较个位数大小,再比较十位数大小.
比如: 91, 46, 85, 15, 92, 35, 31, 22
第一次比较
Bin 0: 
Bin 1: 91, 31
Bin 2: 92, 22
Bin 3: 
Bin 4:
Bin 5: 85, 15, 35
Bin 6: 46
Bin 7:
Bin 8:
Bin 9: 
第一次比较结果 91, 31, 92, 22, 85, 15, 35, 46
第二次比较十位数
Bin 0: 
Bin 1: 15 
Bin 2: 22
Bin 3: 31, 35
Bin 4: 46
Bin 5: 
Bin 6: 
Bin 7:
Bin 8: 85
Bin 9: 91, 92
第二次比较结果: 15, 22, 31, 35, 46, 85, 91, 92

``` js
  function distribute(nums, queues, n, digit){
    for(var i = 0; i < n; ++i){
      if(digit == 1){ // 个位
        queues[nums[i%10]].enqueue(nums[i]); // 取余数,也就是个位数.保存到盒子中
      } else { // 十位
        queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
      }
    }
  }
  function collect(queues, nums){
    var i = 0;
    for(var digit = 0; digit < 10; ++digit){
      while(!queues[digit].empty()){
        nums[i++] = queues[digit].dequeue();
      }
    }
  }
  function dispArray(arr){
    for(var i = 0; i < arr.length; ++i){
      console.log(arr[i] + ' ');
    }
  }

  var queues = [];
  for(var i = 0; i < 10; ++i){
    queues[i] = new Queue(); // 初始化十个队列对象,相当于10个盒子
  }
  var nums = []; // 随机生成10个,100以内的数字
  for(var i = 0; i < 10; ++i){
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
  }
  console.log('before radix sort: ');
  dispArray(nums);
  distribute(nums, queues, 10, 1);
  collect(queues, nums);
  distribute(nums, queues, 10, 10);
  collect(queues, nums);
  dispArray(nums);
```

## 广度优先搜索(BFS) 和队列
> 广度优先搜索的一个常见应用是找出根节点到目标节点的最短路径.在本文中,我们提供了一个示例来解释在BFS算法中是如何逐步应用队列的.



## 岛屿数量问题
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。

示例 1：
``` js
    输入：grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    输出：1
```

示例 2：
``` js
    输入：grid = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ]
    输出：3
```
提示:
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j] 的值为 '0' 或 '1'`

``` js
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    var numIslands = function(grid) {
        
    };
```