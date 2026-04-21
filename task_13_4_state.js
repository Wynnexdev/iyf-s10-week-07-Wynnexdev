/**
 * Task 13.4: State Management Patterns
 */

// --- Exercise 1: Centralized State Pattern ---

const app = {
    // Centralized state
    state: {
        todos: [],
        filter: "all",
        theme: "light"
    },

    // State update function (Single source of truth)
    setState(updates) {
        Object.assign(this.state, updates);
        this.saveState();
        this.render(); // Triggers UI update logic
    },

    // Specific logic handlers
    setFilter(filter) {
        this.setState({ filter });
    },

    addTodo(text) {
        const newTodo = { id: Date.now(), text, completed: false };
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
        console.log(`Added todo via state: "${text}"`);
    },

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        });
        console.log(`Toggled todo ID: ${id}`);
    },

    // Persistence
    saveState() {
        localStorage.setItem("appState", JSON.stringify(this.state));
    },

    loadState() {
        const saved = localStorage.getItem("appState");
        if (saved) {
            Object.assign(this.state, JSON.parse(saved));
            console.log("State loaded from storage.");
        }
    },

    // Mock Render
    render() {
        console.log("--- State Updated ---");
        console.log("Current State:", JSON.stringify(this.state, null, 2));
    }
};

// Demo Centralized State
console.log("Demo: Centralized State");
app.addTodo("Learn State Management");
app.setFilter("completed");


// --- Exercise 2: Observer Pattern ---

/**
 * A store creator that allows parts of the app to "subscribe"
 * to changes without knowing about each other.
 */
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            // Notify all listeners
            listeners.forEach(listener => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            // Return unsubscribe function
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
                console.log("A subscriber removed.");
            };
        }
    };
};

// Usage Demo
console.log("\nDemo: Observer Pattern");
const store = createStore({ count: 0 });

// 1. Subscribe to changes
const unsubscribe = store.subscribe(state => {
    console.log("UI Observer 1: Count is now", state.count);
});

const unsubscribe2 = store.subscribe(state => {
    console.log("Analytics Observer: Heartbeat pulse received. State:", state);
});

// 2. Update state - triggers subscribers
store.setState({ count: 1 });
store.setState({ count: 2 });

// 3. Stop listening
unsubscribe();
unsubscribe2();
console.log("All subscribers detached.");
