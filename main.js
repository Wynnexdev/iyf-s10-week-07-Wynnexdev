/**
 * Week 7: JavaScript Best Practices
 * Refactored To-Do List with localStorage persistence and cleaner state management.
 */

// --- State Management ---
let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];
let currentFilter = 'all';

// --- DOM Elements ---
const elements = {
    taskInput: document.getElementById('taskInput'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    taskList: document.getElementById('taskList'),
    emptyState: document.getElementById('emptyState'),
    totalCount: document.getElementById('totalCount'),
    activeCount: document.getElementById('activeCount'),
    completedCount: document.getElementById('completedCount'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn')
};

// --- Storage Functions ---
function saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// --- Core Functions ---
function handleAddTask() {
    const text = elements.taskInput.value.trim();

    if (!text) {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(), // Unique ID based on timestamp
        text: text,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(task);
    saveTasks();

    elements.taskInput.value = '';
    elements.taskInput.focus();
    render();
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
    render();
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    render();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    render();
}

// --- UI Logic ---
function getFilteredTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;

    elements.totalCount.textContent = total;
    elements.activeCount.textContent = active;
    elements.completedCount.textContent = completed;
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.taskId = task.id;

    li.innerHTML = `
        <div class="checkbox"></div>
        <span class="task-text">${task.text}</span>
        <button class="delete-btn" title="Delete task">✕</button>
    `;

    return li;
}

function render() {
    elements.taskList.innerHTML = '';
    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        elements.taskList.appendChild(li);
    });

    updateStats();

    // Toggle empty state visibility
    if (tasks.length === 0) {
        elements.emptyState.classList.add('show');
    } else {
        elements.emptyState.classList.remove('show');
    }
}

// --- Event Listeners ---
elements.addTaskBtn.addEventListener('click', handleAddTask);

elements.taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleAddTask();
    }
});

elements.clearCompletedBtn.addEventListener('click', clearCompleted);

elements.taskList.addEventListener('click', (event) => {
    const taskId = parseInt(event.target.closest('.task-item')?.dataset.taskId);
    if (!taskId) return;

    if (event.target.matches('.checkbox') || event.target.matches('.task-text')) {
        toggleTask(taskId);
    } else if (event.target.matches('.delete-btn')) {
        deleteTask(taskId);
    }
});

elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        elements.filterBtns.forEach(b => b.classList.remove('filter-btn-active'));
        event.target.classList.add('filter-btn-active');
        currentFilter = event.target.dataset.filter;
        render();
    });
});

// --- Initialization ---
window.addEventListener('load', () => {
    elements.taskInput.focus();
    render();
});