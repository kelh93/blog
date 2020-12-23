---
title: 图和图算法
date: 2020-12-24 00:43:00
tags: 数据结构与算法
category: 数据结构与算法
---

# 图
1. 图的定义
`图`由`边`的集合及`顶点`的集合组成。`顶点`也有权重，也称为`成本`。  
如果一个图的顶点是有序的，则可以称之为`有向图`。在对有向图的顶点对排序后，便可以在两个顶点之间绘制一个箭头。有向图表明了顶点的流向。如果图是无序的，则称之为`无序图`或`无向图`。

2. `图`中的一系列顶点构成`路径`，路径中的所有顶点都由边连接。

3. `路径的长度`用路径中`第一个顶点`到`最后一个顶点`之间的`边的数量`表示。

4. 由`指向自身的顶点`组成的路径称为`环`，环的长度为0.


## 图：由顶点和边构建

### 顶点
创建`Vertex`类保存顶点和边。这个类的作用与[链表](http://www.kelinghong.com/2020/12/11/linkedlist/)和[二叉查找树](http://www.kelinghong.com/2020/12/20/BST/)的Node类一样。
``` js
  function Vertex(label, wasVisited){
    this.label = label; // 顶点
    this.wasVisited = wasVisited; // 顶点是否被访问过(也就是是否被遍历过)
  }
```

### 边
我们将表示图的`边`的方法称为`邻接表`或者`邻接表数组`。这种方法将边存储为由顶点的相邻顶点列表构成的数组，并以此顶点作为索引。  
另一种表示图边的方法被称为`邻接矩阵`。它是一个`二维数组`，其中的元素表示两个顶点之间是否有一条边。  

## 构建图
``` js
  function Graph(v){
    this.vertices = 0;
    this.edges = 0;
    this.adj = [];
    // 构建二维数组this.adj,保存所有相邻顶点。
    for(var i = 0;i < this.vertices.length;i++){
      this.adj[i] = [];
      this.adj[i].push('');
    }
    this.addEdge = addEdge;
    this.toString = toString.
  }

  // 调用函数传入顶点A和B，函数先查找顶点A的邻接表，将顶点B添加到列表中。
  // 然后再查找B的邻接表，将顶点A加入列表，最后这个函数的边数量加1。
  function addEdge(v, w){
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }

  // 相当于遍历图的`边`和`列`
  function showGraph(){
    for(var i = 0; i < this.vertices; i++){
      console.log(i + '->');
      for(var j = 0; j < this.vertices; ++j){
        if(this.adj[i][j] != undefined){
          console.log(this.adj[i][j] + '');
        }
      }
    }
  }
```

## 搜索图

1. DFS 深度优先搜索
`深度优先搜索`包括从一条路径的`起始顶点开始追溯，直到到达最后一个顶点`，然后回溯，继续追溯下一条路径，直到到达最后的顶点。如此往复，直到没有路径为止。这不是在搜索特定的路径，而是通过搜索来查看在图中有哪些路径可以选择。  
深度优先搜索的算法比较简单：访问一个没有访问过的顶点，将它标记为以访问，再递归的去访问在初始顶点的邻接表中其他没有访问过的顶点。

``` js
  function Graph(v){
    this.vertices = v;
    this.edges = 0;
    this.adj = []; // 创建图的二维数组
    for(var i = 0; i < this.vertices;i++){
      this.adj[i] = [];
      this.adj[i].push('');
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.marked = [];
    for(var i = 0;i < this.vertices; i++){
      this.marked[i] = false;
    }
  }

  function addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }

  function showGraph(){
    for(var i = 0; i < this.vertices; ++i){
      console.log(i + '->');
      for(var j = 0; j < this.vertices; ++i){
        if(this.adj[i][j] != undefined){
          console.log(this.add[i][j] + ' ');
        }
      }
    }
  }

  function dfs(v){
    this.marked[v] = true;
    if(this.adj[v] != undefined){
      console.log('visited vertex:' + v);
      for(let w in this.adj[v]){
        if(!this.marked[w]){
          this.dfs(w);
        }
      }
      // for(var i = 0; i <)
      // if(marked[w]){
      //   dfs(w);
      // }
    }
  }

```
2. BFS




