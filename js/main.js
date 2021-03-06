import Task from "./Task.js";
import TaskService from "./TaskService.js";
import Validation from "./Validation.js";
const taskService = new TaskService();
const validation = new Validation();
let  isLoading = true;
const getELE = (id) => document.getElementById(id);
const checkLoading = () => (isLoading) ? getELE("myClass").classList.add('loader') : getELE("myClass").classList.remove('loader');
checkLoading();
// Get list tasks from API
const getTaskApi = () => {
  taskService.getListTasks()
    .then((result) => {
      // console.log(result);
      renderData(result.data);
      isLoading = false;
      checkLoading();
      isLoading = true;
    })
    .catch((error) => {
      console.log(error);
      isLoading = true;
      checkLoading();
    })
}
getTaskApi();

//Render data
const renderData = (data) => {
  let completed = '';
  let todo = '';
  data?.forEach((task) => {
    if (task.status === 'completed') {
      completed += 
      `<li>
        <span>${task.textTask}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteTaskApi(${task.id})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="updateTaskApi(${task.id})">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>`
    }
    else {
      todo += 
      `<li>
        <span>${task.textTask}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteTaskApi(${task.id})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="updateTaskApi(${task.id})">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>`
    }
  })
  getELE("todo").innerHTML = todo;
  getELE("completed").innerHTML = completed;
}

//Add task
const addTaskToApi = () => {
  checkLoading();
  let taskName = getELE("newTask").value;
  let taskStatus = 'todo';
  let isValid = true;
  isValid &= validation.checkEmpty(taskName, 'Task cannot be empty') && validation.checkFormat(taskName, 'Task has at least 3 and maximum 10 characters');
  if (isValid) {
    const newTask = new Task('',taskName, taskStatus);
    taskService.addTask(newTask)
      .then((result) =>{
        // console.log(result);
        alert('Task added successfully');
        getELE("newTask").value = '';
        getTaskApi();
      })
      .catch((error) => console.error(error));
  }else{
    isLoading = false;
    checkLoading();
    isLoading = true;
  }
}
window.addTaskToApi = addTaskToApi;

//Delete a task
const deleteTaskApi = (id) => {
  checkLoading();
  taskService.deleteTask(id)
    .then((result) => {
      // console.log(result);
      alert('Task deleted successfully');
      getTaskApi();
    })
    .catch((error) => console.error(error));
}
window.deleteTaskApi = deleteTaskApi;
//Update a task
const updateTaskApi = (id) => {
  checkLoading();
  taskService.getTaskById(id)
  .then(result => {
    // console.log(JSON.parse(JSON.stringify(result)));
    (result.data.status === 'todo') ? result.data.status = 'completed' : result.data.status = 'todo';
    const updateTask = new Task(id, result.data.textTask, result.data.status);
    taskService.updateTask(updateTask)
      .then((result) => {
        // console.log(JSON.parse(JSON.stringify(result)));
        alert('Task updated successfully');
        getTaskApi();
      })
      .catch((error) => console.log(error))
  })
  .catch(error => console.error(error))
}
window.updateTaskApi = updateTaskApi;