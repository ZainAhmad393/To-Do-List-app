const inputTask = document.getElementById("inputtask");
const taskList = document.getElementById("tasklist");

// Page load hote hi LocalStorage se data nikalna
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    savedTasks.forEach(task => renderTask(task.text, task.completed));
    
    // Date dikhana
    document.getElementById("date-display").innerText = new Date().toDateString();
};

function addTasks() {
    let taskValue = inputTask.value.trim();
    if (taskValue === "") {
        inputTask.style.border = "1px solid red";
        return;
    }
    inputTask.style.border = "none";

    renderTask(taskValue, false);
    saveToStorage();
    inputTask.value = "";
}

// Task ko screen par dikhane ka function
function renderTask(text, isCompleted) {
    let li = document.createElement("li");
    
    li.innerHTML = `
        <span class="task-text ${isCompleted ? 'completed' : ''}" onclick="toggleTask(this)">
            ${text}
        </span>
        <i class="fas fa-trash-alt delete-btn" onclick="removeTask(this)"></i>
    `;
    
    taskList.appendChild(li);
}

// Task complete karne ke liye click
function toggleTask(element) {
    element.classList.toggle("completed");
    saveToStorage();
}

// Task delete karna
function removeTask(element) {
    element.parentElement.remove();
    saveToStorage();
}

// Enter key support
inputTask.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTasks();
});

// Data ko save karne ka logic
function saveToStorage() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.querySelector(".task-text").classList.contains("completed")
        });
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}
let currentFilter = 'all';

// Logic to filter and show tasks
function renderAllTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    taskList.innerHTML = "";
    
    let filteredTasks = savedTasks;
    if (currentFilter === 'active') {
        filteredTasks = savedTasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = savedTasks.filter(t => t.completed);
    }

    filteredTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed-item" : "active-item";
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <i class="fas fa-trash-alt delete-btn" onclick="deleteTask(${index})"></i>
        `;
        taskList.appendChild(li);
    });

    // Count items left
    const left = savedTasks.filter(t => !t.completed).length;
    document.getElementById("items-left").innerText = `${left} items left`;
}

// Global functions update
function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("myTasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderAllTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("myTasks"));
    tasks.splice(index, 1);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderAllTasks();
}

// Filter buttons event listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderAllTasks();
    });
});

function clearCompleted() {
    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    const activeTasks = tasks.filter(t => !t.completed);
    localStorage.setItem("myTasks", JSON.stringify(activeTasks));
    renderAllTasks();
}

// Initial Call
window.onload = () => {
    renderAllTasks();
    document.getElementById("date-display").innerText = new Date().toDateString();
};