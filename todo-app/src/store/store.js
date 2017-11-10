import Vue from 'vue';
import Vuex from 'vuex';
import WebApi from '../API/todoWebApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    DataTodos: [],
  },
  getters: {
    results(state) {
      return state.DataTodos;
    },
    complitedTasks(state) {
      return state.DataTodos.filter(x => x.done).length;
    },
    pendingTasks(state) {
      return state.DataTodos.filter(x => !x.done).length;
    },
  },
  mutations: {
    add(state, todo) {
      const buff = todo;
      if (state.DataTodos === undefined || state.DataTodos.length === 0) {
        buff.id = 1;
      } else {
        buff.id = state.DataTodos.map(x => x.id).sort().pop() + 1;
      }
      this.state.DataTodos.push(buff);
    },
    del(state, id) {
      const todoIndex = state.DataTodos.map(x => x.id).indexOf(id);
      state.DataTodos.splice(todoIndex, 1);
    },
    cmp(state, id) {
      const todoIndex = state.DataTodos.map(x => x.id).indexOf(id);
      this.state.DataTodos[todoIndex].done = true;
    },
    upd(state, id, newTodo) {
      const buff = state.DataTodos.find(x => x.id === id);
      buff.title = newTodo.title;
      buff.project = newTodo.project;
      buff.done = newTodo.done;
    },
    addMany(state, many) {
      this.state.DataTodos = many;
    },
  },
  actions: {
    addToDo(context, todo) {
      context.commit('add', todo);
    },
    delToDo(context, todo) {
      context.commit('del', todo.id);
    },
    cmpToDo(context, todo) {
      context.commit('cmp', todo.id);
    },
    updToDo(context, todo, newTodo) {
      context.commit('upd', todo.id, newTodo);
    },
    readToDos(context) {
      WebApi.GetTodos().then(response => context.commit('addMany', response.data));
    },
  },
});
