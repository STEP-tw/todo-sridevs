const Counter = require('./Counter.js').Counter;
const idCounter = new Counter;

class Item {
  constructor(title,desc) {
    this.id = idCounter.increment();
    this.title = title;
    this.description = desc;
    this.status = 'undone';
    this.tasks = [];
  }
  //should mark status as done.
  markDone () {
    return this.status = 'done';
  }
  //should mark status as undone.
  markUndone(){
    return this.status = 'undone'
  }
  //edit should change name and description.
  edit(title,description){
    this.title = title;
    this.description = description;
  }

  markDeleted() {
    return this.status = 'deleted';
  }
}



exports.Item = Item;
