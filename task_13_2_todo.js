/**
 * Task 13.2: Persistent To-Do List
 * Upgrade To-Do List with localStorage helpers and persistence.
 */

const STORAGE_KEY = "todos";

// Reusable Helper Functions (from Task 13.1)
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// Load todos from storage on startup
function loadTodos() {
    return getFromStorage(STORAGE_KEY, []);
}

// Save todos whenever they change
function saveTodos(todos) {
    saveToStorage(STORAGE_KEY, todos);
}

// Mock render function (since we aren't linking to HTML)
function renderTodos() {
    const todos = loadTodos();
    console.log("--- Currently Saved Todos ---");
    if (todos.length === 0) {
        console.log("No tasks found.");
    } else {
        todos.forEach(todo => {
            const status = todo.completed ? "[X]" : "[ ]";
            console.log(`${status} ${todo.text} (ID: ${todo.id})`);
        });
    }
}

// Updated addTodo function
function addTodo(text) {
    const newTodo = {
        id: Date.now(),  // Simple unique ID
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    const todos = loadTodos();
    todos.push(newTodo);
    saveTodos(todos);

    console.log(`Added task: "${text}"`);
    renderTodos();
}

// Updated toggleTodo
function toggleTodo(id) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        console.log(`Toggled status for ID: ${id}`);
        renderTodos();
    }
}

// Updated deleteTodo
function deleteTodo(id) {
    let todos = loadTodos();
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);

    if (todos.length < initialLength) {
        saveTodos(todos);
        console.log(`Deleted task with ID: ${id}`);
    } else {
        console.log(`Task with ID: ${id} not found.`);
    }
    renderTodos();
}

// Mock Initialization logic
console.log("To-Do App Initializing...");
renderTodos();

// Example Usage Demo
console.log("\n--- Demo Actions ---");
addTodo("Finish Lesson 13");
const currentTodos = loadTodos();
if (currentTodos.length > 0) {
    const firstId = currentTodos[0].id;
    toggleTodo(firstId);
    // deleteTodo(firstId); // Uncomment to test deletion
}
