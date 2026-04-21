/**
 * app.js - Main entry point
 */

import { generateId } from './utils.js';
import { state, setTodos } from './state.js';
import * as ui from './ui.js';

export function init() {
    console.log("To-Do application initialized.");
    ui.renderTodos(state.todos, state.filter);
}

export function handleAddTodo(text) {
    const newTodo = {
        id: generateId(),
        text,
        completed: false
    };

    setTodos([...state.todos, newTodo]);
    ui.renderTodos(state.todos, state.filter);
}

// In a real browser app, this would be:
// document.addEventListener('DOMContentLoaded', init);
init();
