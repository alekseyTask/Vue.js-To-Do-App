import axios from 'axios';

const pathTodo = 'https://jsonplaceholder.typicode.com/todos';
const pathDel = 'https://jsonplaceholder.typicode.com/posts/';
const pathUpd = 'https://jsonplaceholder.typicode.com/posts';

export default {
  GetTodos() { return axios.get(pathTodo); },
  AddTodo(newTodo) { return axios.post(pathUpd, { body: newTodo }); },
  UpdTodo(newTodo) { return axios.put(pathUpd, { body: newTodo }); },
  DelTodo(id) { return axios.delete(pathDel + id); },
};
