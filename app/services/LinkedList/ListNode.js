
/**
 * class that represents a node of a linked list
 * @class
 * @property {string} - word
 * @property {ListNode} - next
 */
module.exports =  class ListNode {
    /**
     * constructor of ListNode
     * @param {*} data 
     */
    constructor(data) {
        this.word = data;
        this.next = null;
    }
}