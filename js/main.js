import Task from "./Task.js";
import TaskService from "./TaskService.js";
const taskService = new TaskService();

const getELE = (id) => document.getElementById(id);

// Get list tasks from API
const getTaskApi = () => {
  taskService.getListTasks()
    .then((result) => {
      console.log(result);
      renderData(result.data);
    })
    .catch((error) => console.log(error))
}
getTaskApi();

//Render data
const renderData = (data) => {
  let completed = '';
  let todo = '';
  data.forEach((task) => {
    if (task.status === 'completed') {
      completed += 
      `<li>
        <span>${task.textTask}</span>
        <div class="buttons">
          <button class="remove">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete">
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
          <button class="remove">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete">
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