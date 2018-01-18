let url = 'showTodo';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState < 4) {
    document.getElementById('todoList').innerHTML = `
    Loading...readyState is ${this.readyState} and status is ${this.status}`;
  } else if (this.readyState == 4 && this.status == 200) {
    var todos = JSON.parse(this.responseText);
    displayTodo(todos);
  }
};
xhttp.open("GET", url, true);
xhttp.send();

function displayTitleWithDesc(todo) {
  return `
  title - ${todo.title}
  <p>description - ${todo.description}</p>
  <br>
  `
}
function displayTodo(todos) {
  debugger;
  let todoList = Object.values(todos);
  let contents = todoList.map(displayTitleWithDesc).join('');
  document.getElementById('todoList').innerHTML = contents;
}
