<template>
  <div>
    <!-- Тут выводиться количество сделанных тасков и несделанных .filter это стандарнтный метод js аля LINQ-->
    <p>Completed Tasks: {{complitedTasks}}</p>
    <p>Pending Tasks: {{pendingTasks}}</p>
    <!--
      тут мы подвесили методы на события которые делают дочернии сомпонентыю, отметим что названия методов невключают параметры т.к нечего нам туда передовать ненадо
      v-on:DeleteTodoEvent="deleteTodo" v-on:CompleteTodoEvent="completeTodo"

      v-bind:todo="buffTodo" свяхываем buffTodo (этот buffTodo получаеться при проходе todos и являеться элиментом todo (текущим)) с todo компонента todo

      v-for="(buffTodo,index) in todos" :key="index" это фигня обойдет все элементы в массиве todos и выведит их.
      Оно работает анологично форичу (если дословно то мы проходимся по todos используя индекс, текущий элимент храним в buffTodo)
      в качестве буферного элимента выступает buffTodo, в последствии он и связываеться (см комент выше)  v-bind:todo="buffTodo"

      :key="index" В версиях 2.2.0+, при использовании v-for на компонентах теперь обязательно требуется указывать key.
    -->
    <todo v-on:DeleteTodoEvent="deleteTodo" v-on:CompleteTodoEvent="completeTodo" v-for="(buffTodo,index) in todos" v-bind:todo="buffTodo" :key="index"></todo>
  </div>
</template>

<script type = "text/javascript" >


import Todo from './Todo';
import store from '../store/store';

export default {
  // props это атрибут который указывает входные параметры
  // для передачи информации из родительского компонента.
  // в нашем случае это переменная todos,
  // именно через неё идет передача данных из родительского компонента
  components: {
    Todo,
  },
  computed: {
    todos() {
      return store.getters.results;
    },
    complitedTasks() {
      return store.getters.complitedTasks;
    },
    pendingTasks() {
      return store.getters.pendingTasks;
    },
  },
  methods: {
    deleteTodo(todo) {
      store.dispatch('delToDo', todo);
    },
    completeTodo(todo) {
      store.dispatch('cmpToDo', todo);
    },
  },
};
</script>