# Week 7: JavaScript Best Practices & Advanced State

## Author
- **Name:** Maisori Kitayama
- **GitHub:** [@MaisoriKitayama](https://github.com/MaisoriKitayama)
- **Date:** April 21, 2026

## Project Description
This week was focused on transitioning from basic DOM manipulation to professional JavaScript development. I refactored my To-Do List application to follow industry best practices, implemented robust data persistence, and completed a series of advanced learning exercises focused on code quality and state management.

## Technologies & Methodologies
- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Storage:** Web Storage API (localStorage/sessionStorage)
- **Architecture:** Modular JS, Observer Pattern, Centralized State
- **Quality Assurance:** ESLint, Prettier, Advanced Debugging

## Key Accomplishments

### 1. Refactored To-Do Application
- **[NEW] Persistent Storage:** Tasks are automatically saved to `localStorage` and restored on reload.
- **[NEW] Component Modularization:** Reorganized the codebase into separate logic modules (`state.js`, `storage.js`, `ui.js`, `utils.js`).
- **[NEW] Robust ID Generation:** Switched to timestamp-based unique identifiers.

### 2. Lesson 13: Browser Storage & State
- **LocalStorage Basics:** Mastered JSON serialization for storing complex data structures.
- **SessionStorage:** Implemented form auto-save logic that preserves data during browsing sessions.
- **State Management:** Explored the Observer pattern for reactive UI updates.

### 3. Lesson 14: Professional Coding Standards
- **Clean Code:** Applied the Single Responsibility Principle and meaningful naming conventions.
- **Debugging:** Fixed critical logic bugs in order processing and mastered Chrome DevTools profiling.
- **Tooling:** Configured ESLint and Prettier to enforce consistent code style across the project.

## How to Run
1. Clone this repository: `git clone https://github.com/MaisoriKitayama/toDoList.git`
2. Open `index.html` in your web browser.
3. Explore the `week-7/` folder for specific lesson exercises.

## Lessons Learned
The biggest takeaway this week was the importance of **Separation of Concerns**. By splitting our code into modules, we make it vastly easier to maintain and debug. Learning to manage state as a "single source of truth" helped me understand how modern frameworks like React handle data flow.
