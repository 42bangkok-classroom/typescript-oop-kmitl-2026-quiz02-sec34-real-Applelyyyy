
import { getTodosByUserId } from './index';

async function runTest() {
    console.log("--- Test Case 1: Valid ID (Real API) ---");
    const result1 = await getTodosByUserId(1);
    if (typeof result1 !== 'string' && !Array.isArray(result1) && result1.id === 1 && result1.todos.length > 0) {
        console.log("PASS: Got user 1 with todos.");
    } else {
        console.log("FAIL: Expected user 1 with todos. Got:", JSON.stringify(result1, null, 2));
    }

    console.log("\n--- Test Case 2: Invalid ID (Real API) ---");
    const result2 = await getTodosByUserId(9999);
    if (result2 === "Invalid id") {
        console.log("PASS: Got 'Invalid id' for user 9999.");
    } else {
        console.log("FAIL: Expected 'Invalid id'. Got:", result2);
    }
}

runTest();
