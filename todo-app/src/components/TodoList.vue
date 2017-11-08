<template>
  <div>
    <!-- Тут выводиться количество сделанных тасков и несделанных .filter это стандарнтный метод js аля LINQ-->
    <p>Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
    <!--
      тут мы подвесили методы на события которые делают дочернии сомпонентыю, отметим что названия методов невключают параметры т.к нечего нам туда передовать ненадо
      v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo"

      v-bind:todo="todo" свяхываем todo (этот todo получаеться при проходе todos и являеться элиментом todo (текущим)) с todo компонента todo

      v-for="(todo,index) in todos" :key="index" это фигня обойдет все элементы в массиве todos и выведит их.
      Оно работает анологично форичу (если дословно то мы проходимся по todos используя индекс, текущий элимент храним в todo)
      в качестве буферного элимента выступает todo, в последствии он и связываеться (см комент выше)  v-bind:todo="todo"

      :key="index" В версиях 2.2.0+, при использовании v-for на компонентах теперь обязательно требуется указывать key.
      
      :todo.sync="todo"  это двухсторонняя привязка данных т.е данный компонент может изменять входные данные опасная фича т.к делает все запутанной
      в процессе фреймворка ее пару раз правили и по итогу вот что:
       В версии 2.3.0+ мы снова ввели модификатор .sync для входных данных, но на этот раз это просто синтаксический сахар, 
       который автоматически преобразуется в дополнительный обработчик v-on:
      Следующее
        <comp :foo.sync="bar"></comp>
      будет преобразовано в:
        <comp :foo="bar" @update:foo="val => bar = val"></comp>

    -->
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="(todo,index) in todos" v-bind:todo="todo" :key="index" :todo.sync="todo"></todo>
  </div>
</template>

<script type = "text/javascript" >

import Todo from './Todo';

export default {
  // props это атрибут который указывает входные параметры
  // для передачи информации из родительского компонента.
  // в нашем случае это переменная todos,
  // именно через неё идет передача данных из родительского компонента
  props: ['todos'],
  components: {
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].done = true;
    },
  },
};
</script>