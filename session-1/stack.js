//In a previous exercise, we wrote a queue from scratch. For your homework, try implementing a stack from scratch. Whereas a queue follows FIFO, a stack follows Last In, First Out (LIFO). push, pop, check. Name this file stack.js
class Stack {
  constructor() {
    this.stack = []
  }
  
  push(item) {
      this.stack[this.stack.length] = item //#1
  }
  pop(){
      if (this.stack.length === 0) {
          console.log('Stack is currently empty.')
          return;
    }
      this.stack.length = this.stack.length-1 //#2
  }
  check() {
    console.log(this.stack)
  }
}

const stack = new Stack()
stack.push("Milk")
stack.push("Eggs")
//stack.push("Jam")
console.log(stack)
stack.check()  // [“Milk”, “Eggs”]
stack.pop()
stack.check()  // [“Milk”]
stack.pop()
stack.check()  // []
stack.pop()    // “Stack is currently empty.”

/* 
Notes to self
#1 item is assigned to this.stack[this.stack.length], which copies what pushing does
  -> why this.stack.length?
    -> e.g stack = [coin1, coin2, coin3], if you want to add coin4, it goes to stack[3], which is also the length of the stack
#2 this.stack.length is assigned a value of this.stack.length -1
  -> why this.stack.length -1?
    -> by reducing the length by 1, you limit up to which element you can access, BUT it does not remove the item itself 
*/
