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
      this.state.DataTodos.push(todo);
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
      WebApi.AddTodo(todo).then(response => context.commit('add', response.data));
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
