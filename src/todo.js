const IdHandler = require('./IdHandler.js').IdHandler;
const idHandler = new IdHandler;

class Todo {
  constructor(owner,title,desc) {
    this.id = idHandler.generateId();
    this.owner = owner;
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

  delete() {
    return this.status = 'deleted';
  }
  //should add items in the todo.
  addTask(task) {
    this.tasks.push(task);
    return this.tasks;
  }
  //getters
  get allTasks() {
    return this.tasks;
  }
}



exports.Todo = Todo;
