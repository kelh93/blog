---
title: 反转链表
date: 2020-12-14 00:20:01
tags: Leetcode 
category: Leetcode
---

# 反转链表
LeetCode 206
反转一个单链表。
示例:
``` js
  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL
```
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

## 方法1：双指针
1. prev、cur
2. prev记录前一个位置，prev总是在cur的后面。
3. 依次实现局部反转。
``` js
  // 核心代码
  while(cur != null){ // 退出条件，当cur=null代表已经遍历完成。
    let nextNode = cur.next;//记录下一个的位置，使得cur指针后移
    cur.next = prev; // 链表局部反转。prev初始值为null
    prev = cur; // prev指针移动
    cur = nextNode; // cur指针移动 
  }

  //完整代码
  function reverseList(head){
    let prev = null, cur = head;
    while(cur != null){
      let nextNode = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nextNode;
    }
    return prev; // 返回头指针
  }
```
时间复杂度： O(n);
空间复杂度：O(1);
