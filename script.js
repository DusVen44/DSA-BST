class BinarySearchTree {
    constructor(key = null, value = null, parent = null) { //default props for the BST
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null; //pointer to the left
        this.right = null; //pointer to the right
    };

    insert(key, value) { //add new node to BST
        if (this.key == null) { //If the tree is empty then this key being inserted is the root node of the tree
            this.key = key;
            this.value = value;
        }

        else if (key < this.key) { //start at the root, compare to (key), if (key) is less than node's key...
            if (this.left == null) { //if there is no left child
                this.left = new BinarySearchTree(key, value, this); //the new node becomes the left child - 'this' is the parents
            }
            else { //if there is a left child
                this.left.insert(key, value); //recursively run the method until a null left is found
            }
        }

        else { //if the new (key) is greater than the node, do the same on the right side
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            };
        };
    };

    find(key) { //find a node given the (key)
        if (this.key == key) { //if the item is round at the root...
            return this.value; //return that item
        }

        else if (key < this.key && this.left) { //if (key) is less than root...
            return this.left.find(key); //recursively check the left side until item is found
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) { //if (key) is greater than root...
            return this.right.find(key); //recursively check the right side until item is found
        }

        else { //if the item is not found
            throw new Error('Key Error'); //throw this error
        };
    };

    remove(key) { //remove an item
        if (this.key == key) { //if (key) is the root...
            if (this.left && this.right) { //if there is a left AND right child...
                const successor = this.right._findMin(); //successor will be minimum value from right children
                this.key = successor.key; //replace removed node with successor's values
                this.value = successor.value;
                successor.remove(successor.key); //apply remove() to the right subtree to remove the duplicate
            }
            else if (this.left) { //if node has ONLY a left child...
                this._replaceWith(this.left); //replace the node with the left child
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else { //if there are no children
                this._replaceWith(null); //replace all values with null
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else { //if key is not found
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) { //helper method for remove
        if (this.parent) { //if there is a parent
            if (this == this.parent.left) { 
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

};

function numbers() {
    let BST = new BinarySearchTree();
    BST.insert(3, 3);
    BST.insert(1, 1);
    BST.insert(4, 4);
    BST.insert(6, 6);
    BST.insert(9, 9);
    BST.insert(2, 2);
    BST.insert(5, 5);
    BST.insert(7, 7);
    return BST;
}

let numBST = numbers();
console.log(numBST);