import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    DataTodos: [{
      title: 'Todo A',
      project: 'Project A',
      done: false,
      id: 1,
    }, {
      title: 'Todo B',
      project: 'Project B',
      done: true,
      id: 2,
    }, {
      title: 'Todo C',
      project: 'Project C',
      done: false,
      id: 3,
    }, {
      title: 'Todo D',
      project: 'Project D',
      done: false,
      id: 4,
    }],
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
      buff.id = state.DataTodos.map(x => x.id).sort().pop() + 1;
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
  },
});
