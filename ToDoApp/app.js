const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



addToDo = (event) => {
    event.preventDefault();

    //div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //local storage 
    saveLocalTodos(todoInput.value);

    //checked btn
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add('checked-btn');
    todoDiv.appendChild(checkedButton);

    //del btn
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);


    //add it to list
    todoList.appendChild(todoDiv);

    //remove text after input
    todoInput.value="";

}

//delete assignment
deleteCheck = (e) =>{
    const item = e.target;
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", ()=>{
            todo.remove();
        });
    }
}

checkedCheck = (e) =>{
    const item = e.target;
    if(item.classList[0] === 'checked-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('checked');
    }
}


filterToDo=(e)=>{
    const todos = todoList.childNodes
    todos.forEach((todo)=>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'checked':
                if(todo.classList.contains('checked')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'unchecked':
                if(!todo.classList.contains('checked')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//how about local storage
saveLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


//grab from local storage
getTodos=()=>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo)=>{
        //div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        //checked btn
        const checkedButton = document.createElement('button');
        checkedButton.innerHTML = '<i class="fas fa-check"></i>';
        checkedButton.classList.add('checked-btn');
        todoDiv.appendChild(checkedButton);

        //del btn
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);


        //add it to list
        todoList.appendChild(todoDiv);
    });
}


removeLocalTodos=(todo)=>{
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}


document.addEventListener('DOMContentLoaded',getTodos)
filterOption.addEventListener("click",filterToDo);
todoList.addEventListener("click",checkedCheck);
todoList.addEventListener("click",deleteCheck);
todoButton.addEventListener("click", addToDo);