class toDoList {
    constructor(){
        
        this.form = document.querySelector('form'); 
        this.todoInput = document.querySelector('#todo-input');
        this.todoContent = document.querySelector('#todo-content');

        
        this.todosArr = JSON.parse(localStorage.getItem('todosDB')) ?? [];

         
        this.loadInitialData(); 
        this.bindEvents();   
    }
    loadInitialData(){   
        for (const todo of this.todosArr){ 
            this.createTodoElements(todo.id, todo.todoText);   
        }
    }

}