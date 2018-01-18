const Item= require('./item.js').Item;

class Todo extends Item {
  constructor(title,desc) {
    super(title,desc);
  }
    addTask(task) {
      this.tasks.push(task);
      return this.tasks;
    }
    //getters
    get allTasks() {
      return this.tasks;
    }
}
module.exports = Todo;
