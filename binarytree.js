class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  } 
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      array = [...new Set(array)].sort((a, b) => a - b);
      return this.buildTreeHelper(array, 0, array.length - 1);
    }
  
    buildTreeHelper(array, start, end) {
      if (start > end) return null;
  
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
  
      node.left = this.buildTreeHelper(array, start, mid - 1);
      node.right = this.buildTreeHelper(array, mid + 1, end);
  
      return node;
    }
  
    insert(value) {
      this.root = this.insertHelper(this.root, value);
    }
  
    insertHelper(node, value) {
      if (node === null) {
        return new Node(value);
      }
  
      if (value < node.data) {
        node.left = this.insertHelper(node.left, value);
      } else if (value > node.data) {
        node.right = this.insertHelper(node.right, value);
      }
  
      return node;
    }
  
    deleteItem(value) {
      this.root = this.deleteHelper(this.root, value);
    }
  
    deleteHelper(node, value) {
      if (node === null) return null;
  
      if (value < node.data) {
        node.left = this.deleteHelper(node.left, value);
      } else if (value > node.data) {
        node.right = this.deleteHelper(node.right, value);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
  
        node.data = this.findMin(node.right).data;
        node.right = this.deleteHelper(node.right, node.data);
      }
  
      return node;
    }
  
    findMin(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }
  
    find(value) {
      return this.findHelper(this.root, value);
    }
  
    findHelper(node, value) {
      if (node === null || node.data === value) return node;
  
      if (value < node.data) {
        return this.findHelper(node.left, value);
      } else {
        return this.findHelper(node.right, value);
      }
    }
  
    levelOrder(callback) {
      if (!this.root) return [];
  
      const queue = [this.root];
      const result = [];
  
      while (queue.length > 0) {
        const node = queue.shift();
  
        if (callback) {
          callback(node);
        } else {
          result.push(node.data);
        }
  
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
  
      return result;
    }
  
    inOrder(callback) {
      return this.inOrderHelper(this.root, callback, []);
    }
  
    inOrderHelper(node, callback, result) {
      if (node) {
        this.inOrderHelper(node.left, callback, result);
        if (callback) {
          callback(node);
        } else {
          result.push(node.data);
        }
        this.inOrderHelper(node.right, callback, result);
      }
      return result;
    }
  
    preOrder(callback) {
      return this.preOrderHelper(this.root, callback, []);
    }
  
    preOrderHelper(node, callback, result) {
      if (node) {
        if (callback) {
          callback(node);
        } else {
          result.push(node.data);
        }
        this.preOrderHelper(node.left, callback, result);
        this.preOrderHelper(node.right, callback, result);
      }
      return result;
    }
  
    postOrder(callback) {
      return this.postOrderHelper(this.root, callback, []);
    }
  
    postOrderHelper(node, callback, result) {
      if (node) {
        this.postOrderHelper(node.left, callback, result);
        this.postOrderHelper(node.right, callback, result);
        if (callback) {
          callback(node);
        } else {
          result.push(node.data);
        }
      }
      return result;
    }
  
    height(node) {
      if (node === null) return -1;
  
      return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }
  
    depth(node) {
      return this.depthHelper(this.root, node, 0);
    }
  
    depthHelper(current, node, depth) {
      if (current === null) return -1;
      if (current === node) return depth;
  
      if (node.data < current.data) {
        return this.depthHelper(current.left, node, depth + 1);
      } else {
        return this.depthHelper(current.right, node, depth + 1);
      }
    }
  
    isBalanced() {
      return this.isBalancedHelper(this.root);
    }
  
    isBalancedHelper(node) {
      if (node === null) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
      return this.isBalancedHelper(node.left) && this.isBalancedHelper(node.right);
    }
  
    rebalance() {
      const nodesArray = this.inOrder();
      this.root = this.buildTree(nodesArray);
    }
  }
  

function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }
  
  const randomArray = generateRandomArray(17, 100);
  
  const tree = new Tree(randomArray);
  
  console.log("Initial tree:");
  prettyPrint(tree.root);
  
  console.log("is the tree balanced?", tree.isBalanced());
  
  // Print out all elements in level, pre, post, and in order
  console.log("Level order:", tree.levelOrder());
  console.log("Pre order:", tree.preOrder());
  console.log("In order:", tree.inOrder());
  console.log("Post order:", tree.postOrder());
  
  tree.insert(101);
  tree.insert(102);
  tree.insert(103);
  
  console.log("unbalanced tree:");
  prettyPrint(tree.root);
  
  console.log("is the tree unbalanced?", !tree.isBalanced());
  
  tree.rebalance();
  
  console.log("Rebalanced tree:");
  prettyPrint(tree.root);
  
  console.log("Is the tree balanced after rebalanccingg?", tree.isBalanced());
  
  console.log("Level order:", tree.levelOrder());
  console.log("Pre order:", tree.preOrder());
  console.log("In order:", tree.inOrder());
  console.log("Post order:", tree.postOrder());
  