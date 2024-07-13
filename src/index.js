import "./css/base.css";

const newTodoInput = document.querySelector(".new-todo");
const mainSection = document.querySelector(".main");
const footerSection = document.querySelector(".footer");
const todoListSection = document.querySelector(".todo-list");

/**
 * id {string}
 * title {string}
 * completed {boolean}
 */
const todoList = [];

newTodoInput.addEventListener("keydown", (e) => {
  if (newTodoInput.value.trim() === "" || e.key !== "Enter") {
    return;
  }

  const newTodo = createTodo(newTodoInput.value);
  todoList.push({ ...newTodo });
  newTodoInput.value = "";
  console.log(todoList);

  checkTodos();
  renderTodo(newTodo);
});

// check if there are todos in the list and show the main and footer sections
function checkTodos() {
  if (todoList.length === 0) {
    mainSection.classList.add("hidden");
    footerSection.classList.add("hidden");
  } else {
    mainSection.classList.remove("hidden");
    footerSection.classList.remove("hidden");
  }
}

// render the todos in the list
/*
<li>
  <div class="view">
    <input class="toggle" type="checkbox" />
    <label>Buy a unicorn</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Buy a unicorn" />
</li>
*/
function renderTodos() {
  todoList.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoListSection.appendChild(todoElement);
  });
}

// render a todo in the list
function renderTodo(todo) {
  const todoElement = createTodoElement(todo);
  todoListSection.appendChild(todoElement);
}

// create a new todo html element
function createTodoElement(todo) {
  const todoContainer = document.createElement("li");
  const todoView = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  todoCheckbox.classList.add("toggle");
  todoCheckbox.type = "checkbox";

  const todoLabel = document.createElement("label");
  todoLabel.textContent = todo.title;

  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.classList.add("destroy");

  todoView.appendChild(todoCheckbox);
  todoView.appendChild(todoLabel);
  todoView.appendChild(todoDeleteButton);

  const todoEditInput = document.createElement("input");
  todoEditInput.classList.add("edit");
  todoEditInput.value = todo.title;

  todoContainer.appendChild(todoView);
  todoContainer.appendChild(todoEditInput);

  return todoContainer;
}

// create a new todo object
function createTodo(inputValue) {
  const newTodo = {
    id: Date.now().toString(),
    title: inputValue.trim(),
    completed: false,
  };

  return newTodo;
}
