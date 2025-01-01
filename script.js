const dinitha = {
    name: 'Dinitha'
};

function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const date = now.toLocaleDateString(undefined, dateOptions);
    const time = now.toLocaleTimeString(undefined, timeOptions);
    document.getElementById('datetime').textContent = `${date}, ${time}`;

    const hour = now.getHours();
    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good Evening';
    } else if (hour >= 22 || hour < 5) {
        greeting = 'Good Night';
    }
    document.querySelector('h1').innerHTML = `${greeting}, Dinitha <span class="wave">👋</span>`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const todoCreateButton = document.querySelector('.todo_create_button');
const todoInput = document.querySelector('.todo_input');
const todoContainer = document.querySelector('.todo_list_container');

const todoValues = [];
let todoElements = [];

function renderTodos() {
    todoElements = todoValues.map((val, index) => {
        return `
        <div class="todo_item" id="todo-${index}">
            <div class="todo_item_left">
                <input type="checkbox" id="completed-${index}" name="completed" />
                <span id="task-${index}">${val}</span>
            </div>
            <div class="todo_item_right">
                <button class="delete_button" data-index="${index}">Delete</button>
            </div>
        </div>
        `;
    });
    todoContainer.innerHTML = todoElements.join(" ");

    todoValues.forEach((_, index) => {
        const checkbox = document.getElementById(`completed-${index}`);
        const taskText = document.getElementById(`task-${index}`);
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
        });

        const deleteButton = document.querySelector(`.delete_button[data-index="${index}"]`);
        deleteButton.addEventListener('click', () => {
            todoValues.splice(index, 1);
            renderTodos();
        });
    });
}

function addTodo() {
    const value = todoInput.value;
    if (value === "") {
        return;
    }
    todoValues.push(value);
    console.log(todoValues);
    todoInput.value = "";
    renderTodos();
}

todoCreateButton.addEventListener('click', addTodo);

// Add event listener for Enter key
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

todoContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete_button')) {
        const index = event.target.getAttribute('data-index');
        todoValues.splice(index, 1);
        renderTodos();
    }
});