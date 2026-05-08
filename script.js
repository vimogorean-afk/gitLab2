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
    save(){
        localStorage.setItem('todosDB', JSON.stringify(this.todosArr));
    }

    onSubmit(e){
        e.preventDefault();  

        const text = this.todoInput.value;

        const id = Date.now();

        this.createTodoElements(id, text);

        this.todosArr.push({
            id: id,
            todoText: text
        });
   this.save();
        this.form.reset();  
    }
    onClick(e){
        const target = e.target;

        if(target.id === 'delete'){
            this.deleteTodo(e);
        }
        else if(target.id === 'edit'){
            this.editTodo(e);
        }
        else if(target.id === 'save'){
            this.saveTodo(e);
        }
    }
    deleteTodo(e){
        const parent = e.target.parentNode;
        const todoId = Number(parent.getAttribute('id'));

        parent.remove();

        this.todosArr = this.todosArr.filter(todo => todo.id != todoId);
        this.save();
    }
    editTodo(e){
        const parent = e.target.parentNode;
        const textEl = parent.children[2];

        const input = document.createElement('input');
        input.value = textEl.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.setAttribute('id','save');

        parent.removeChild(textEl);
        parent.removeChild();

        parent.appendChild(input);
        parent.appendChild(saveBtn);
    }
    saveTodo(e){
        const parent = e.target.parentNode;
        const input = parent.children[0];

        const text = input.value;

        const textEl = document.createElement('h3');
        textEl.textContent = text;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('id','edit');

        parent.removeChild(input);
        parent.removeChild(e.target);

        parent.appendChild(textEl);
        parent.appendChild(editBtn);

        const todoId = Number(parent.getAttribute('id'));

        const todoObj = this.todosArr.find(todo => todo.id == todoId);
        if(todoObj){
            todoObj.todoText = text;
        }

        this.save();
    }

    

    }
    new TodoApp();
