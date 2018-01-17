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

function displayTodo(todos) {
  document.getElementById('todoList').innerHTML = `
  title ${todos[0].title}
  <p>description ${todos[1].description}</p>
  `
}
