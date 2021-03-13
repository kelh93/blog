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

### 1. DFS (深度优先搜索)
`深度优先搜索`包括从一条路径的`起始顶点开始追溯，直到到达最后一个顶点`，然后回溯，继续追溯下一条路径，直到到达最后的顶点。如此往复，直到没有路径为止。这不是在搜索特定的路径，而是通过搜索来查看在图中有哪些路径可以选择。  
深度优先搜索的算法比较简单：访问一个没有访问过的顶点，将它标记为以访问，再递归的去访问在初始顶点的邻接表中其他没有访问过的顶点。
> 总结：DFS搜索方式是`纵向遍历`。
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
    for(var i = 0; i < this.adj; ++i){
      console.log(i + '->');
      for(var j = 0; j < this.adj[i]; ++i){
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
    }
  }

  // 测试dfs
  let g = new Graph(5); // [[],[],[],[],[]]
  // this.adj[0].push(1);
  // this.adj[1].push(0);
  g.addEdge(0,1); // [[1],[0],[],[],[]]
  g.addEdge(0,2); // [[1,2],[0],[0],[],[]]
  g.addEdge(1,3); // [[1,2],[0,3],[0],[1],[]]
  g.addEdge(2,4); // [[1,2],[0,3],[0,4],[1],[2]]
  g.showGraph(); // 1,2 0,3 0,4 1, 2
  g.dfs(0); // 从this.adj[v], v=0开始遍历

  // 输出结果：
  // [[1,2],[0,3],[0,4],[1],[2]]

```
### 2. BFS (广度优先搜索)
`广度优先搜索`从第一个顶点开始，尝试访问尽可能靠近它的顶点。本质上，这种搜索在图上是`逐层移动`的，首先检查最靠近第一个顶点的层，再逐渐`向下移动`到离起始顶点最远的层。
> 总结：`BFS`的搜索方式是`横向搜索`，就近原则遍历。

广度优先搜索算法使用了`抽象的队列`而不是数组来对`已访问过的顶点进行排序`。其算法的工作原理如下：  
1. 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中。
2. 从图中取出下一个顶点v，添加到已访问的顶点列表。
3. 将所有与v相邻的未访问顶点添加到队列。 

```js
// 广度优先搜索的遍历过程
function bfs(s){
  var queue = [];
  this.marked[s] = true;
  queue.push(s); // 添加到队尾
  while(queue.length > 0){
    var v = queue.shift(); // 从队首移除
    if(this.adj[v] != undefined){
      console.log('已访问过的顶点：', v);
    }
    for(var w in this.adj[v]){
      if(!this.marked[w]){
        this.marked[w] = true;
        queue.push(w);
      }
    }
  }
}
// 测试：
var g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
g.bfs(0);

```
#### 广度优先搜索-查找最短路径
要查找最短路径，需要修改广度优先搜索算法来记录从一个顶点到另一个顶点的路径。这需要对Graph类做一些修改。  
首先，需要一个数组来保存从一个顶点到下一个顶点的所有边。我们将这个数组命名为 edgeTo。因为从始至终使用的都是广度优先搜索函数，所以每次都会遇到一个没有标记的顶点，除了对它进行标记外，还会从邻接列表中我们正在探索的那个顶点添加一条边到这个顶点。  
```js
  function Graph(){
    this.edgeTo = edgeTo;
  }
  function bfs(s){
    var queue = [];
    this.marked[s] = true;
    queue.push(s);
    while(queue.length > 0){
      var v = queue.shift();
      if(v == undefined){
        console.log('已经访问过的顶点', v);
      }
      for(var w in this.adj[v]){
        if(!this.marked[w]){
          this.edgeTo[w] = v;
          this.marked[w] = true;
          queue.push(w);
        }
      }
    }
  }
```
新增一个函数用于展示图中连接到不同顶点的路径，创建函数`pathTo`用来存储与指定顶点有共同边的所有顶点。
``` js
  function Graph(){
    this.edgeTo = edgeTo;
    this.pathTo = pathTo;
    this.hasPathTo = hasPathTo;
  }

  function pathTo(v){
    var source = 0;
    if(!this.hasPathTo(v)){
      return undefined;
    }
    var path = [];
    for(var i = v; i != source; i = this.edgeTo[i]){
      path.push(i);
    }
    path.push(source);
    return path;
  }
  function hasPathTo(v){
    return this.marked[v];
  }
```
测试程序: 顶点0-4的最短路径
```js
  var g = new Graph(5);
  g.bfs(0);
  g.addEdge(0,1);
  g.addEdge(0,2);
  g.addEdge(1,3);
  g.addEdge(2,4);
  var vertex = 4;
  var paths = g.pathTo(vertex);
  var pathStr = '';
  while(paths.length > 0){
    if(paths.length > 1){
      pathStr = paths.pop() + '-';
    } else {
      pathStr += paths.pop();
    }
  }
  console.log(pathStr); // 0-2-4
```

#### 拓扑排序 (TopSort)


