
// основной шаблон
<template>
  <div id="app">
    <div class='content'>
      <!-- тут какогото хера (ну хтмл всетаки) непашет // 
           кароче в template херачим основной шаблон, в него можем добовлять компаненты которые мы импортили.

           Откуда беруться эти названия тегов (напр TodoList)?
           -доподленно неизвестно, однако мы предполагаем следующие:
            1. имена соответствуют наименованиям компонентов см импорты или components
            2. все былобы збс но это тоже работает  create-todo при этом ЧСХ компонент называеться CreateTodo
               из этого с невероятной неочевидностью => 
               CreateTodo всюдо эквивалентно create-todo за исключением быть может конечного числа точек

            Что за хрень (v-bind:todos="DataTodos")?
            -v-bind Динамически связывает атрибуты тега или входной параметр компонента с выражением.
             в нашем случае <TodoList v-bind:todos="DataTodos"></TodoList> мы взяли компонент  TodoList
             добрались до переменной todos и связали её с DataTodos которая ретурниться из даты.

            Ок, но что делает этот атрибут (v-on)?
            -вообще говоря эта хрень позволяет подписываться на события
             в нашем случае идет: Подписка на пользовательское событие в дочернем элементе, обработчик вызываеться когда дочерний элимент вызывает
             т.е когда компонент CreateTodo вызовет CreateTodoEvent (событие). А подписываем мы методы которые определены в export default через их имя
      -->
      <TodoList></TodoList>
      <CreateTodo v-on:CreateTodoEvent="createTodo"></CreateTodo>
    </div>
  </div>
</template>

<script>
// тут происходит импорт компонентов
// вначале идет то как мы именуем импортируемый компанент а потом откуда мы его импортим

import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import store from './store/store';

export default {
  name: 'app',
  // тут мы декларируем какие компоненты будем юзать
  components: {
    TodoList,
    CreateTodo,
  },
  // тут пишуться методы для роботы с подключенными компонентами
  methods: {
    // этот метод мы подписываем на событие CreateTodoEvent
    // <CreateTodo v-on:CreateTodoEvent="createTodo"></CreateTodo>
    createTodo(newTodo) {
      store.dispatch('cmpToDo', newTodo);
    },
  },
};
</script>