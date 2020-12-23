---
title: 二叉树
date: 2020-12-20 00:56:10 
tags: 数据结构与算法
category: 数据结构与算法
---

# 二叉树
二叉树的子节点不超过2个。

- `树`是计算机科学中经常用到的一种数据结构。  
- `树`是一种`非线性`的数据结构，以`分层的方式`存储数据。  
- `树`被用来存储具有`层级结构`的数据。
- 二叉树`添加`、`删除`、`查找`都非常快。

## 定义

`树`是由一组`以边连接的节点`组成。

- `根节点`： 一颗树最上面的节点称为`根节点`。
- `父节点`：如果一个节点下面连接很多个节点，那么这个节点称为下面节点的`父节点`，下面的节点称为这个节点的`子节点`。
- `叶子节点`：没有任何子节点的节点称为叶子节点。
- `路径`：从一个节点到另一个节点的`这一组边称为路径`。
- `键`：节点当中的值。
- `左节点`：二叉树父节点下左边的节点。
- `右节点`：二叉树父节点下右边的节点。

### 二叉查找树
特点： **相对较小的值保存在左节点**，**相对较大的值保存在右节点**。这一特性使得它的查找效率很高。

## 实现二叉查找树
二叉树新增步骤
1. 先实例化要新增的节点`data`，`new Node(data, null, null)`。
2. 遍历二叉树。
  - 如果不存在根节点,则将`data`设置为根节点。
  - 如果存在根节点，并且data < root.data，先将根节点指针指向左节点，如果左节点为空，则将`data`设置为左节点，否则，沿着左节点继续向下查找，将`data`与root.left.data进行比较大小，小于则设置为左节点，大于则设置为右节点。左右节点不为空则一直向下查找。
  - 如果存在根节点，并且 data > root.data，先将根节点指针指向右节点，如果右节点为空，则将`data`设置为右节点，否则，沿着右节点继续向下查找，将`data`与root.right.data进行比较大小，小于则设置为左节点，大于则设置为右节点。左右节点不为空则一直向下查找，直到找到空节点，放到对应的左右节点的位置。

**代码实现**  
``` js
  // 节点类
  function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
  }

  function show(){
    return this.data;
  }

  function BST(){
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
  }

  function insert(data){
    let node = new Node(data, null, null);
    if(this.root == null){
      this.root = node;
    } else {
      let parent;
      let current = this.root;
      while(true){
        parent = current; // copy对象到parent，让current进行移动
        if(data < current.data){
          current = current.left; // 将指针向左移动
          if(current == null){//当左节点为空时，设置为左节点，否则继续向下一层遍历
            parent.left = node;
            break;
          }
        } else {
          current = current.right;
          if(current == null){
            parent.right = node;
            break;
          }
        }
      }
    }
  }
  // 中序遍历
  function inOrder(node){
    if(node !== null){
      inOrder(node.left);
      console.log(node.show() + '');
      inOrder(node.right);
    }
  }
```

### 中序遍历
从根节点开始遍历，一直向左节点遍历，直到找到最小的左节点，再向父节点和右节点遍历，再往父节点的父节点遍历。

``` js
  function inOrder(node){
    if(node !== null){
      inOrder(node.left);
      console.log(node.show() + '');
      inOrder(node.right);
    }
  }
  // 测试代码
  var nums = new BST();
  nums.insert(23);
  nums.insert(45);
  nums.insert(16);
  nums.insert(37);
  nums.insert(3);
  nums.insert(99);
  nums.insert(22);
  inOrder(nums.root);

```

### 前序遍历
先输出自己的值，再输出左节点的值，最后输出右节点的值。
``` js
  function preOrder(node){
    if(node !== null){
      console.log(node.show() + ' ');
      preOrder(node.left);
      preOrder(node.right);
    }
  }
  // preOrder: 23 16 3 22 45 37 99
```

### 后序遍历 
根据例子的输出顺序去理解，实际上是递归的方式不一样
``` js
  function postOrder(node){
    if(node !== null){
      postOrder(node.left);
      postOrder(node.right);
      console.log(node.show() + ' ');
    }
  }
  // postOrder: 3 22 16 37 99 45 23
```

## 在二叉树上进行查找
- 查找给定值
- 查找最小值
- 查找最大值

### 查找最小值和最大值
- 查找最小值
因为最小值在左节点上，因此查找最小值只需要遍历到最后一个左节点。
``` js
  function findMin(node){
    if(node !== null){
      findMin(node.left);
      console.log(node.show());
    }
  }

  function getMin(){
    let current = this.root;
    if(current.left != null){
      current = current.left;
    }
    return current.data;
  }

```

- 查找最大值
因为最大值在右节点上，遍历右子树直到找到最后一个节点，该节点的值即为最大值。
``` js
  function getMax(){
    let current = this.root;
    if(current.right != null){
      current = current.right;
    }
    return current.data;
  }
```
测试代码
``` js
  let nums = new BST();
  nums.insert(23);
  nums.insert(45);
  nums.insert(16);
  nums.insert(37);
  nums.insert(3);
  nums.insert(99);
  nums.insert(22);
  
  let min = getMin();
  console.log('min', min);

  let min = getMax();
  console.log('max', max);

```

### 查找给定值
比较法，层层比较，小的向左子树遍历查找，大的向右子树遍历查找。


``` js
  function getValue(data) {
    let current = this.root;
    let parent;
    while(true){
      parent = current;
      if(data < current.data){
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }
  }

  function find(data){
    let current = this.root;
    while(current != null){
      if(current.data == data){
        return current;
      } else if (data < current.data){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }


```

## 从二叉树上删除节点
1. 判断当前节点是否包含待删除的数据，如果包含则删除该节点，如果不包含，则比较当前节点上的数据和待删除的数据，如果待删除的数据小于当前节点上的数据，则移至当前节点的左节点继续比较，如果待删除的数据大于当前节点的数据，则移至右节点继续比较。
2. 如果待删除的节点是叶子节点，那么只需要将从父节点指向它的链接指向null。
3. 如果待删除的节点只包含一个子节点，那么原本指向它的子节点就得做些调整，使其指向它的子节点。
4. **如果待删除的节点包含两个子节点，正确的做法有2种：
  - 查找待删除节点左子树上的最大值。
  - 查找其右子树上的最小值。
> 其实就是找到它离得最近的子节点

``` js
  function remove(data){
    root = removeNode(this.root, data);
  }

  function removeNode(node, data){
    if(node == null){
      return null;
    }
    if(data == node.data){
      //没有子节点的叶子节点
      if(node.left == null && node.right == null){
        return null;
      }
      //没有左子节点的节点
      if(node.left == null){
        return node.right;
      }
      //没有右子节点的节点
      if(node.right == null){
        return node.left;
      }
      //有两个子节点的节点
      let tempNode = getSmallest(node.right); // 查找到右节点的最小值
      node.data = tempNode.data; // ??
      node.right = removeNode(node.right, tempNode.data); // ??
      return node;
    } else if(data < node.data){
      node.left = removeNode(node.left, data);
      return node;
    } else if (data > node.data){
      node.right = removeNode(node.right, data);
      return node;
    }
  }
```

## 计数
BST的一个用途是记录一组数据集中数据出现的次数。  
需要先在`Node`中新增次数的属性，以及更新次数。

``` js
  funciton Node(data, left, right){
    this.data = data;
    this.count = 1;
    this.left = left;
    this.right = right;
    this.show = show;
  }

  function update(data){
    let current = this.find(data);
    current.count++;
    return current;
  }
```
