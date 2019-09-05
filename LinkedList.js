class Node{
    constructor(data){
        // a Node starts with a given data property
        // a Node also has a .next property initialized as null
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        // a Linked List starts with a "head" property intialized as null
        this.head = null;
    }
    appendNode(data){
        // creates a new node with the given data and adds it to back of the list
        // new Node(data)
        let appendableNode = new Node(data)
        if (this.head == null) {
          this.head = appendableNode
        } else {
          let walker = this.head //start at head
          while (walker.next) { //while walker.next is truthy (not "null")
            walker = walker.next //set walker to next node
          }
          return walker.next = appendableNode
        }
    }
    prependNode(data){
        // creates a new node with the given data and adds it to the front of the list
        let prependableNode = new Node(data)
        prependableNode.next = this.head
        this.head = prependableNode
        return
    }
    pop(){
        // removes the last node from the list and returns it

        //0 nodes
        if (this.head == null) {
          return this.head
        }

        //1 nodes
        if (this.head.next == null) {
          let currentHead = this.head;
          this.head = null;
          return currentHead
        }

        // 2+ nodes
        let walker = this.head //start at head
        let follower; //goal is to have this one step behind walker
        while (walker.next) { //while walker.next is truthy (not "null")
          follower = walker
          walker = walker.next //set walker to next node
        }
        follower.next = null
        return walker
    }
    removeFromFront(){
        // remove the head node from the list and return it
        // the next node in the list is the new head node
        let currentHead = this.head;
        this.head = this.head.next;
        currentHead.next = null; //passes test without seting next to null
        return currentHead
    }
    insertAt(X, data){
        // insert a new node into the list with the given data
        // place it after X nodes in the list
        // if X exceeds the bounds of the list, put the node at the end
        // insertAt(0, 7) would add the new node as the head

        // if X == 0, new node is head (prepended)
        if (X == 0) {
          this.prependNode(data)
          return
        }

        // if not head, place after X nodes in list
        let nodeToInsert = new Node(data)

        // if X == 1
        if (X == 1) {
          nodeToInsert.next = this.head.next
          this.head.next = nodeToInsert
        }

        // if X > 1
        let walker = this.head
        let follower;

        for (let i = 0; i < X; i++) {
          follower = walker
          walker = walker.next
        }

        //if follower.next is null we went past end of List
        if (follower.next == null) {
          this.appendNode(data)
        }

        // once walker and follower are in correct location and edge cases handled
        nodeToInsert.next = walker;
        follower.next = nodeToInsert;


    }
    removeAt(X){
        // remove the Xth node from the list, considering 0 to be the first node
        // return the node that has been removed

        //empty list check
        if (this.head == null) {
          return this.head
        } else if (X == 0) { //1 node list check; and asked to remove first node
          let removedNode = this.head
          this.head = removedNode.next
          removedNode.next = null
          return removedNode
        } else if (X == 1) {
          let removedNode = this.head.next
          this.head.next = this.head.next.next
          return removedNode
        } else if (X > 1) {
          let walker = this.head
          let follower;
          // moves walker to node to delete
          for (let i = 0; i < X; i++) {
            follower = walker
            walker = walker.next
          }
          follower.next = walker.next
          walker.next = null
          return walker
        }
    }
    search(data){
        // searches the list for a node with the given data
        // if it is found, return the "index" of the node, considering 0 to be the first node
        // if not, return false

        let walker = this.head; //initialize walker
        let indexCounter = 0; //initialize counter

        while (walker) {
          if (walker.data == data) {
            return indexCounter
          } else {
            walker = walker.next;
            indexCounter++;
          }
        }
        return false //if walker becomes false while will escape and return false
    }
    sort(){
        // sort the Linked List in ascending order of data values

        //0 nodes
        if (this.head == null) { return null }

        //1 node
        if (this.head.next == null) { return this.head }

        //2+ node -- need walker and follower to switch pointers as appropriate
        let walker = this.head.next
        let follower = this.head;
        let creeper; //third follower (need this to point to smaller data value) // may not need this
        let changed;

        function sortCycle() {
          changed = false
          while (walker) {
            let nodeA = follower;
            let nodeB = walker;
            // creeper = follower
            follower = walker
            walker = walker.next
            if (nodeA == this.head && nodeA.data > nodeB.data) {
              changed = true
              let temp = this.head
              this.head = temp.next
              temp.next = nodeB.next
              nodeB.next = nodeA
            } else if (nodeA.data > nodeB.data) {
              //:::::::::TODO:::::::::
              changed = true
              let temp = nodeA
              nodeA = temp.next
              temp.next = nodeB.next
              nodeB.next = nodeA
            }
          }
          return changed
        }
        while(changed) {
          sortCycle()
        }
    }
}

module.exports = {
    Node,
    LinkedList
}
