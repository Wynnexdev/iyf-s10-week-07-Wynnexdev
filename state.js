/**
 * state.js - State management
 */

import * as storage from './storage.js';

export const state = {
    todos: storage.load('todos', []),
    filter: 'all'
};

export function setTodos(newTodos) {
    state.todos = newTodos;
    storage.save('todos', state.todos);
}

export function setFilter(newFilter) {
    state.filter = newFilter;
}
