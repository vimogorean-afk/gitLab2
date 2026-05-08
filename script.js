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
     bindEvents(){
        this.form.addEventListener("submit", this.onSubmit.bind(this));   
        this.todoContent.addEventListener("click", this.onClick.bind(this));  
    }
    createTodoElements(id, text){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('is-flex');
        todoDiv.setAttribute('id', id);

        const todoText = document.createElement('h3');
        todoText.textContent = text;

        const todoDelete = document.createElement('button');
        todoDelete.textContent = 'X';
        todoDelete.setAttribute('id','delete');

        const todoEdit = document.createElement('button');
        todoEdit.textContent = 'Edit';
        todoEdit.setAttribute('id','edit');

        todoDiv.appendChild(todoText);
        todoDiv.appendChild(todoDelete);
        todoDiv.appendChild(todoEdit);

        this.todoContent.appendChild(todoDiv);
    }
}