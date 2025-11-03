const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.$root = null;
  }

  root() {
    return this.$root;
  }

  add(data) {
    this.$root = addNode(this.$root, data);

    function addNode(node, data) {
      if (!node) return new Node(data);

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else if (data > node.data) {
        node.right = addNode(node.right, data);
      }
      // если data === node.data, ничего не делаем (уникальные значения)
      return node;
    }
  }

  has(data) {
    return searchNode(this.$root, data);

    function searchNode(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data
        ? searchNode(node.left, data)
        : searchNode(node.right, data);
    }
  }

  find(data) {
    let current = this.$root;
    while (current) {
      if (current.data === data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this.$root = removeNode(this.$root, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // node.data === data
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // два потомка
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.$root) return null;
    let current = this.$root;
    while (current.left) current = current.left;
    return current.data;
  }

  max() {
    if (!this.$root) return null;
    let current = this.$root;
    while (current.right) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
