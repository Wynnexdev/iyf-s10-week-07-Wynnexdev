/**
 * Task 13.1: Local Storage Basics
 */

// --- Exercise 1: Getting Started with localStorage ---

// Store a simple value
localStorage.setItem("username", "John");

// Retrieve the value
const username = localStorage.getItem("username");
console.log("Username:", username);  // "John"

// Remove a value
localStorage.removeItem("username");

// Clear everything
localStorage.clear();

// Check if key exists
if (localStorage.getItem("username")) {
    console.log("User exists");
} else {
    console.log("User does not exist (expected after clearing)");
}


// --- Exercise 2: Storing Objects (JSON) ---

// localStorage only stores strings!
const user = {
    name: "John",
    age: 30,
    hobbies: ["coding", "reading"]
};

// WRONG - doesn't work as expected
localStorage.setItem("user_wrong", user);
console.log("Wrong storage result:", localStorage.getItem("user_wrong"));  // "[object Object]"

// RIGHT - serialize to JSON
localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log("Correct retrieved object:", retrieved);  // { name: "John", age: 30, hobbies: [...] }


// --- Exercise 3: Helper Functions ---

// Create reusable helpers
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Usage
saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("settings", { theme: "light", fontSize: 14 });
console.log("Retrieved settings:", settings);


// --- Build: Simple Notes App ---

const notesApp = {
    STORAGE_KEY: "my-notes",

    getNotes() {
        return getFromStorage(this.STORAGE_KEY, []);
    },

    addNote(content) {
        const notes = this.getNotes();
        const newNote = {
            id: Date.now(),
            content,
            timestamp: new Date().toLocaleString()
        };
        notes.push(newNote);
        saveToStorage(this.STORAGE_KEY, notes);
        console.log("Added note:", newNote);
    },

    deleteNote(id) {
        let notes = this.getNotes();
        notes = notes.filter(n => n.id !== id);
        saveToStorage(this.STORAGE_KEY, notes);
        console.log(`Deleted note with ID: ${id}`);
    },

    displayNotes() {
        const notes = this.getNotes();
        console.log("--- Current Notes ---");
        if (notes.length === 0) {
            console.log("No notes saved.");
        } else {
            notes.forEach(note => {
                console.log(`[${note.timestamp}] ${note.content} (ID: ${note.id})`);
            });
        }
    }
};

// Demo
notesApp.addNote("Remember to buy milk");
notesApp.addNote("Study JavaScript best practices");
notesApp.displayNotes();
