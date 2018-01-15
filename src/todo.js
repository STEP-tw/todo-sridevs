class Todo {
  constructor(owner,title,desc) {
    this.owner = owner;
    this.title = title;
    this.description = desc;
    this.status = 'undone';
  }
  //mark done
  markDone () {
    return this.status = 'done';
  }
  //mark undone
  markUndone(){
    return this.status = 'undone'
  }
}



exports.Todo = Todo;
