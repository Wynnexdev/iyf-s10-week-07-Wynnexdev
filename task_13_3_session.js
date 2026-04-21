/**
 * Task 13.3: Session Storage & Comparison
 */

// --- Exercise: Understanding the Difference ---

// sessionStorage - cleared when browser tab closes
sessionStorage.setItem("tempData", "This disappears on close");

// localStorage - persists until explicitly cleared
localStorage.setItem("permanentData", "This stays forever");

console.log("Session Storage item:", sessionStorage.getItem("tempData"));
console.log("Local Storage item:", localStorage.getItem("permanentData"));

/**
 * When to use which:
 * - sessionStorage: 
 *     - Shopping cart (for current session)
 *     - Form data backup (in case of accidental navigation)
 * - localStorage: 
 *     - User preferences, theme settings
 *     - Authentication tokens (with security considerations)
 *     - Cached API data
 */


// --- Build: Form Auto-Save ---
// Note: This implementation assumes a DOM environment. 
// Since we aren't linking to HTML, this logic is written for reference.

function initFormAutosave() {
    // These would normally select actual elements from index.html
    const mockForm = { id: "contact-form", addEventListener: (type, cb) => { } };
    const mockInputs = [
        { name: "fullname", value: "", addEventListener: (type, cb) => { } },
        { name: "email", value: "", addEventListener: (type, cb) => { } },
        { name: "message", value: "", addEventListener: (type, cb) => { } }
    ];

    console.log("\n--- Form Auto-Save Logic (SessionStorage) ---");

    // Save on every input (Logic implementation)
    mockInputs.forEach(input => {
        // 1. Load saved value on "page load"
        const saved = sessionStorage.getItem(`form_${input.name}`);
        if (saved) {
            input.value = saved;
            console.log(`Restored ${input.name}: ${saved}`);
        }

        // 2. Mock event listener for "input"
        input.onInputMock = (newValue) => {
            input.value = newValue;
            sessionStorage.setItem(`form_${input.name}`, newValue);
            console.log(`Saved ${input.name} to session storage: ${newValue}`);
        };
    });

    // 3. Clear on successful "submit"
    mockForm.onSubmitMock = () => {
        console.log("Form submitted. Clearing session storage...");
        mockInputs.forEach(input => {
            sessionStorage.removeItem(`form_${input.name}`);
        });
    };

    // Demo actions
    mockInputs[0].onInputMock("Jane Doe");
    mockForm.onSubmitMock();
}

initFormAutosave();
