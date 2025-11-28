document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return; 

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  addTaskToDOM(task);
  saveTask(task);
  input.value = "";
}


function addTaskToDOM(task) {
  const list = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = task.id;

  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", toggleTask);

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;
  if (task.completed) {
    span.classList.add("completed");
  }

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  deleteBtn.addEventListener("click", deleteTask);

  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);

  list.appendChild(li);
}


function getTasksFromStorage() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}


function saveTask(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(addTaskToDOM);
}


function toggleTask(event) {
  const checkbox = event.target;
  const li = checkbox.closest(".task-item");
  const id = Number(li.dataset.id);
  const span = li.querySelector(".task-text");

  const tasks = getTasksFromStorage();
  const updated = tasks.map(task => {
    if (task.id === id) {
      task.completed = checkbox.checked;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updated));

  if (checkbox.checked) {
    span.classList.add("completed");
  } else {
    span.classList.remove("completed");
  }
}


function deleteTask(event) {
  const li = event.target.closest(".task-item");
  const id = Number(li.dataset.id);

  li.remove();

  const tasks = getTasksFromStorage();
  const filtered = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(filtered));
}
