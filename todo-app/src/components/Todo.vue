<template>
  <div class='ui centered card'>
    <!-- v-show="!isEditing"  true чтобы показывало и false чтоб непоказовало (разворачиваеться в css свойство dysplay:none вроде) -->
    <div class="content" v-show="!isEditing">
      <div class='header'>
          <!-- задает данные для этого итема -->
          {{ todo.title }}
      </div>
      <div class='meta'>
          {{ todo.project }}
      </div>
      <div class='extra content'>
          <!-- v-on:click="showForm" вешает функцию (showForm) на клик по этому спану, функция должна быть определена в export default -> methods -->
          <span class='right floated edit icon' v-on:click="showForm">
          <i class='edit icon'></i>
        </span>
        <!-- v-on:click="deleteTodo(todo)" если подвешываемая функция должна принимать в себя параметр и нам надо его передать то делаем это -->
        <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
         <i class='trash icon'></i>
        </span>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Title</label>
          <!-- Вы можете использовать директиву v-model для двунаправленного связывания данных с элементами форм input и textarea. -->
          <input type='text' v-model="todo.title" >
        </div>
        <div class='field'>
          <label>Project</label>
          <input type='text' v-model="todo.project" >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic button' v-show="!isEditing && todo.done" disabled>
        Completed
    </div>
    <div class='ui bottom attached red basic button' v-show="!isEditing && !todo.done" v-on:click="completeTodo(todo)">
        Pending
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['todo'],
    data() {
      return { isEditing: false };
    },
    methods: {
      showForm() {
        this.isEditing = true;
      },
      hideForm() {
        this.isEditing = false;
      },
      deleteTodo(todo) {
        // вот так происходит вызов события
        // первый параметр это название или имя события
        // воторой,  передоваемый параметр
        this.$emit('DeleteTodoEvent', todo);
      },
      completeTodo(todo) {
        this.$emit('CompleteTodoEvent', todo);
      },
    },
  };
</script>