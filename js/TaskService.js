export default class TaskService {
  getListTasks() {
    return axios({
      url: 'https://6183caea91d76c00172d1b5f.mockapi.io/api/todo',
      method: 'GET'
    });
  };
  addTask(task) {
    return axios({
      url: 'https://6183caea91d76c00172d1b5f.mockapi.io/api/todo',
      method: 'POST',
      data: task
    });
  };
  deleteTask(id) {
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/todo/${id}`,
      method: 'DELETE'
    });
  };
  getTaskById(id) {
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/todo/${id}`,
      method: 'GET'
    });
  };
  updateTak(task) {
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/todo/${task.id}`,
      method: 'PUT',
      data: task
    });
  };
}