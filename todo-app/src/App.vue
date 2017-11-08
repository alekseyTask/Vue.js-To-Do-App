<template>
  <div id="app">
    <div class='content'>
      <TodoList v-bind:todos="todos"></TodoList>
      <create-todo v-on:create-todo="createTodo"></create-todo>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo,
  },
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
    };
  },
  methods: {
    createTodo(newTodo) {
      this.todos.push(newTodo);
    },
  },
};
</script>