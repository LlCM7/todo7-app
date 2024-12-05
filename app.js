let newTask = '';
let tasks = [
  { name: 'Learn Vue', completed: false },
  { name: 'Create a Vue project with the CLI', completed: true },
  { name: 'Study ECharts', completed: false },
  { name: 'Use Element Plus', completed: false }
];
let dialogVisible = false;
let editTaskName = '';
let editingIndex = null;

function addTask() {
  const taskInput = document.getElementById('newTask');
  if (taskInput.value) {
    tasks.push({ name: taskInput.value, completed: false });
    taskInput.value = '';
    updateTaskList();
  }
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

function editTask(index) {
  editingIndex = index;
  editTaskName = tasks[index].name;
  dialogVisible = true;
  document.getElementById('editTaskName').value = editTaskName;
  document.getElementById('dialog').style.display = 'block';
}

function saveTask() {
  if (editTaskName) {
    tasks[editingIndex].name = editTaskName;
    dialogVisible = false;
    editingIndex = null;
    updateTaskList();
  }
}

function cancelEdit() {
  dialogVisible = false;
  editingIndex = null;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${index})">
        ${task.name}
      </label>
      <button onclick="editTask(${index})">Edit</button>
      <button type="danger" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
  document.getElementById('taskCount').innerText = `${tasks.filter(task => task.completed).length} out of ${tasks.length} items completed`;
}

updateTaskList();