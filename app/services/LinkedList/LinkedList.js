const ListNode = require('./ListNode');


/**
 * @class
 * @property {ListNode} _head - first node of the linked list
 * @property {ListNode} _last - last node of the linked list
 * @property {ListNode} totalChars - total number of characters of all the words contained in the list
 */
module.exports = class LinkedList {
    constructor() {
        this._head = null;
        this._last = null;
        this.totalChars = 0;
    }

    // SETTERS AND GETTERS

    get head() {
        return (this._head);
    }

    set head(newValue) {
        this._head = newValue;
    }

    get last() {
        return (this._last);
    }

    set last(newValue) {
        this._last = newValue;
    }

    /**
     * creates a new node and adds it to the end of the current linked list
     * @param {string} data 
     */
    add(data) {
        const newNode = new ListNode(data);

        this.totalChars += data.length;

        // if first element of List
        if (this.head === null && this.last === null) {

            this.head = newNode;
            this.last = newNode;

        } else if (this.size() === 1) { // if list has one element

            this.last = newNode;
            this.head.next = this.last;

        } else { // other cases

            const tempNode = this.last;


            this.last = newNode;
            tempNode.next = this.last;
        }
    }
    /**
     * add a new node in the beginning of the list
     * @param {string} data 
     * @returns 
     */
    pre(data) {
        const newNode = new ListNode(data);

        if (!this.size()) {
            this.add(data);
            return;
        }

        newNode.next = this.head;
        this.head = newNode

    }

    /**
     * return the number of nodes presents in the list
     * @returns {number} size
     */
    size() {
        // we initialize the size and copy the first element to iterate over it
        let curNode = this.head;
        let size = 0;

        // we iterate over the list, counting the element as we go
        while (curNode !== null) {
            curNode = curNode.next;
            size++;
        }
        return size;
    }

    /**
     * concatenate all the words present in the list, in order and returns the string
     * @returns {string} line
     */
    getLine() {
        //  if list is empty
        if (this.head === null)
            return;

        // we make a copy of the first element to iterate over it
        let curNode = this.head;

        // init the result
        let line = '';

        // while we iterate to the end of it, we concatenate each word into our string line
        while (curNode !== null) {
            line += curNode.word;
            curNode = curNode.next;
        }
        return line;
    }

    /**
     * removes the last node of the list
     * @returns {void}
     */
    removeLast() {
        // if theres 1 node max in the list, just clear it
        if (this.size() === 1 || this.size() === 0) {
            this.clear()
            return;
        }
        // make a copy of the first element to have an iterator
        let node = this.head;

        // we adjust the totalChars by removing the length of the last element
        this.totalChars -= this.last.word.length;

        // we iterate over node to get to the one before last element
        while (node.next.next !== null) {
            node = node.next;
        }

        // we set the last current node to be the one pointing the the one before last
        this.last = node;
        //and make sure it becomes the last element by setting this next pointer to null
        this.last.next = null;
    }

    /**
     * empties the current list
     */
    clear() {
        this._head = null;
        this._last = null;
        this.totalChars = 0
    }
}
