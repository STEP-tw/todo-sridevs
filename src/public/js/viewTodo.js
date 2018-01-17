let url = 'data/todoList.json'
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

function displayTitleWithDesc(todos) {
  return `
  title - ${todos.title}
  <p>description - ${todos.description}</p>
  <br>
  `
}
function displayTodo(todos) {
  let contents = todos.map(displayTitleWithDesc).join("");
  document.getElementById('todoList').innerHTML = contents;
}
