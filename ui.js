/**
 * ui.js - DOM manipulation
 */

export function renderTodos(todos, filter) {
    console.log(`Rendering UI with filter: ${filter}`);
    console.table(todos);
    // Real implementation would interact with document.getElementById etc.
}

export function updateStatsView(total, active, completed) {
    console.log(`Stats updated - Total: ${total}, Active: ${active}, Completed: ${completed}`);
}
