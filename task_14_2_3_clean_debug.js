/**
 * Task 14.2: Clean Code Practices
 */

// --- Exercise 1: Meaningful Names ---
const currentDate = new Date();
const users = [{ name: "Alice", age: 25 }, { name: "Bob", age: 15 }];
const adultUsers = users.filter(user => user.age > 18);

function calculateDiscount(price, quantity) {
    const DISCOUNT_RATE = 0.1;
    return price * quantity * DISCOUNT_RATE;
}

// --- Exercise 2: Single Responsibility ---
function validateUser(userData) {
    if (!userData.email.includes("@")) throw new Error("Invalid email");
    if (userData.age < 18) throw new Error("Must be adult");
    return true;
}

function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.toLowerCase(),
        name: userData.name.trim()
    };
}

async function createUser(userData) {
    validateUser(userData);
    const normalizedUser = normalizeUser(userData);
    // await database.save(normalizedUser);
    // await emailService.sendWelcome(normalizedUser.email);
    console.log("User created successfully:", normalizedUser.name);
    return normalizedUser;
}

// --- Exercise 3: Avoid Magic Numbers ---
const MIN_PASSWORD_LENGTH = 8;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const HTTP_NOT_FOUND = 404;


/**
 * Task 14.3: Debugging Skills
 */

// --- Exercise 1: Console Methods ---
console.group("Debugging Demo");
console.log("%cStyled Log", "color: blue; font-weight: bold;");
console.table([{ id: 1, name: "Task 1" }, { id: 2, name: "Task 2" }]);
console.groupEnd();


// --- Exercise 3: Debug This Code (Fixed) ---

function calculateOrderTotal(items) {
    let total = 0;

    // BUG FIX 1: Changed i <= items.length to i < items.length
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // BUG FIX 2: Fixed typo "quanity" to "quantity"
        total += item.price * item.quantity;
    }

    if (total > 100) {
        total = total * 0.9;  // 10% discount
    }

    return total;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 }
];

const result = calculateOrderTotal(order);
console.log("Calculated Total (Expected 69):", result);
