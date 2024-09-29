// app.js
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));

            const span = document.createElement('span');
            span.textContent = todo.title;
            if (todo.completed) {
                span.classList.add('completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => deleteTodo(index));

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    };

    const addTodo = () => {
        const title = todoInput.value.trim();
        if (title === '') return;
        todos.push({ title, completed: false });
        todoInput.value = '';
        saveAndRender();
    };

    const toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveAndRender();
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    };

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    renderTodos();
});
