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
      this.state.DataTodos[todoIndex].completed = true;
    },
    upd(state, todo) {
      const buff = state.DataTodos.find(x => x.id === todo.id);
      buff.title = todo.title;
      buff.project = todo.project;
      buff.done = todo.done;
    },
    addMany(state, many) {
      this.state.DataTodos = many;
    },
  },
  actions: {
    addToDo(context, todo) {
      WebApi.AddTodo(todo);
      context.commit('add', todo);
    },
    delToDo(context, todo) {
      WebApi.DelTodo(todo.id);
      context.commit('del', todo.id);
    },
    cmpToDo(context, todo) {
      context.commit('cmp', todo.id);
      WebApi.UpdTodo(todo);
    },
    updToDo(context, tudo) {
      WebApi.UpdTodo(tudo.newTodo);
      context.commit('upd', tudo.newTodo);
    },
    readToDos(context) {
      WebApi.GetTodos().then(response => context.commit('addMany', response.data));
    },
  },
});
