const ListNode = require('./ListNode');

module.exports = class LinkedList {
    constructor() {
        this._head = null;
        this._last = null;
        this.totalChars = 0;
    }

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


    add(data) {
        const newNode = new ListNode(data);

        this.totalChars += data.length;

        // if first element of List
        if (this.head === null && this.last === null) {

            this.head = newNode;
            this.last = newNode;

        } else if (this.size() === 1) {

            this.last = newNode;
            this.head.next = this.last;

        } else {

            const tempNode = this.last;


            this.last = newNode;
            tempNode.next = this.last;
        }
    }

    size() {
        let curNode = this.head;
        let size = 0;
        while (curNode !== null) {
            curNode = curNode.next;
            size++;
        }
        return size;
    }

    getLine() {
        if (this.head === null)
            return;
        let curNode = this.head;

        let line = '';

        while (curNode !== null) {
            line += curNode.word;
            curNode = curNode.next;
        }
        return line;
    }

    removeLast() {
        if (this.size() === 1 || this.size() === 0) {
            this.clear()
            return;
        }

        let node = this.head;
        this.totalChars -= this.last.word.length;
        while (node.next.next !== null) {
            node = node.next;
        }
        this.last = node;
        this.last.next = null;
    }

    clear() {
        this._head = null;
        this._last = null;
        this.totalChars = 0
    }
}
