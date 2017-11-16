import axios from 'axios';

// const pathTodo = 'https://jsonplaceholder.typicode.com/todos';
// const pathDel = 'https://jsonplaceholder.typicode.com/todos/';
// const pathUpd = 'https://jsonplaceholder.typicode.com/todos/';

const pathTodo = 'http://localhost:54933/api/Todo';
const pathDel = 'http://localhost:54933/api/Todo/';
const pathUpd = 'http://localhost:54933/api/Todo/';
const pathAdd = 'http://localhost:54933/api/Todo/';

export default {
  GetTodos() { return axios.get(pathTodo); },
  AddTodo(newTodo) {
    return axios.post(pathAdd, {
      title: newTodo.title,
      userId: newTodo.userId,
      project: newTodo.project,
      completed: newTodo.completed,
      id: newTodo.id,
    });
  },
  UpdTodo(newTodo) {
    return axios.put(pathUpd + newTodo.id, newTodo);
  },
  DelTodo(id) { return axios.delete(pathDel + id); },
};
