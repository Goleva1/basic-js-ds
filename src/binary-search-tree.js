const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);
    this.rootNode === null ? this.rootNode = node : this.addNodeToTree(this.rootNode, node);
  }

  addNodeToTree(whereAdd, whatAdd) {
    if (whereAdd.data > whatAdd.data) {
      whereAdd.left === null ? whereAdd.left = whatAdd : this.addNodeToTree(whereAdd.left, whatAdd);
    } else {
      whereAdd.right === null ? whereAdd.right = whatAdd : this.addNodeToTree(whereAdd.right, whatAdd);
    }
  }

  has(data) {
    return this.lookForData(this.rootNode, data) !== null;
  }

  lookForData(where, what) {
    if (where === null) return null;
    if (where.data === what) return where;
    else if (where.data > what) return this.lookForData(where.left, what);
    else return this.lookForData(where.right, what);
  }

  find(data) {
    return this.lookForData(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this.deleteNode(this.rootNode, data);
  }

  deleteNode(where, what) {
    if (where === null) return null;
    if (where.data === what) {
      if (where.left === null && where.right === null) {
        where = null;
        return where;
      } else if (where.left === null) {
        return where.right;
      } else if (where.right === null) {
        return where.left;
      } else {
        const tmp = this.findMin(where.right);
        where.data = tmp.data;
        where.right = this.deleteNode(where.right, tmp.data);
        return where;
      }
    } else if (what < where.data) {
      where.left = this.deleteNode(where.left, what);
      return where;
    }
    else {
      where.right = this.deleteNode(where.right, what);
      return where;
    }
  }

  findMin(where) {
    if (where.left === null) return where;
    return this.findMin(where.left);
  }

  findMax(where) {
    if (where.right === null) return where;
    return this.findMax(where.right);
  }

  min() {
    return this.findMin(this.rootNode).data;
  }

  max() {
    return this.findMax(this.rootNode).data;
  }
}

module.exports = {
  BinarySearchTree
};
