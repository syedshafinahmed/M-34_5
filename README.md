# ⚡ V8 JavaScript Engine – Internal Mechanism


Google’s **V8** is a high-performance JavaScript engine, written in **C++**, and used in **Chrome**, **Node.js**, **Deno**, and more.  
It takes **JavaScript code** and turns it into **fast machine code**.  

---

## 🔹 How V8 Works Internally

### 1. Parsing (AST Creation)
- The source code is **parsed** by V8’s parser.  
- It first **tokenizes** the code into smaller parts (`let`, `x`, `=`, `5`).  
- Then it builds an **AST (Abstract Syntax Tree)** representing the program structure.  

Example:
```js
let x = 5;
```
AST:
```bash
VariableDeclaration -> Identifier(x), Literal(5)
```
### 2. Ignition (Interpreter)
- The AST is passed to Ignition, V8’s **interpreter**.  
- Ignition translates the AST into **bytecode**.
- Bytecode starts execution immediately without waiting for heavy optimizations.

### 3. Profiler (Hot Code Detection)
- While running bytecode, V8 monitors function calls and loops.
- Frequently executed code is marked as hot code (candidate for optimization).
  
### 4. Turbofan (Optimizing JIT Compiler)
- Hot code is sent to Turbofan, the optimizing compiler.
- Turbofan generates highly optimized machine code specific to your CPU.
- Next time, the function skips the interpreter and runs directly on the CPU.

### 5. De-optimization (Fallback)
- Optimizations rely on assumptions (e.g., a variable is always a number).
- If assumptions fail (variable changes type), V8 de-optimizes and falls back to bytecode execution.
- This guarantees correctness without errors.

### 6. Garbage Collection (Memory Management)

V8 uses a **Generational Garbage Collector**:

- **New Space** → short-lived objects (like inside functions).  
- **Old Space** → long-lived objects (like globals).  

It uses algorithms like **mark-sweep**, **incremental**, and **concurrent GC**.  

This allows V8 to clean unused memory efficiently **without blocking execution**.  




 

# ⚡ JS Event Loop
The **JavaScript Event Loop** is the mechanism that allows JavaScript to handle **asynchronous operations** despite being **single-threaded**.  
It ensures non-blocking execution by managing tasks, callbacks, and events efficiently.

---

## 🔹 How It Works

### 1. Call Stack
   - Where JavaScript keeps track of function execution.
   - Functions are pushed onto the stack when called and popped off when they return.

### 2. Web APIs (Browser / Node APIs)
   - Handle asynchronous operations like `setTimeout`, HTTP requests, or DOM events.
   - Once finished, they pass callbacks to the **Callback Queue**.

### 3. Callback Queue (Task Queue)
   - Stores callbacks waiting to be executed.
   - Examples: `setTimeout` callbacks, DOM events.

### 4. Microtask Queue
   - Stores **promises** and `MutationObserver` callbacks.
   - Always has higher priority than the callback queue.

### 5. Event Loop
   - Continuously checks:
     - If the **call stack** is empty.
     - If yes, it pushes tasks from the **microtask queue** first, then from the **callback queue**.

---

## 🔹 Execution Flow
```bash
Call Stack
    ↓
Web APIs → Callback Queue
    ↓
Microtask Queue (Promises, etc.)
    ↓
Event Loop (decides what runs next)

```


# ⚡ How Does JavaScript Handle Asynchronous Calls?

JavaScript is **single-threaded**, meaning it can only execute one task at a time.  
However, it uses the **Event Loop** along with **Web APIs, Callback Queue, and Microtask Queue** to handle asynchronous tasks **without blocking execution**.

---

## 🔹 The Process

### 1. Call Stack
   - JavaScript runs code line by line.
   - When it encounters an async task (like `setTimeout`, HTTP requests, or promises), it passes it to the **Web APIs**.

### 2. Web APIs
   - Provided by the browser (or Node.js environment).
   - Handle asynchronous tasks in the background (e.g., timers, network requests).
   - Once completed, they send callbacks to the appropriate queue.

### 3. Queues
   - **Callback Queue (Macrotask Queue)** → For tasks like `setTimeout`, event listeners, etc.  
   - **Microtask Queue** → For promises and `MutationObserver`.  
   - **Microtasks are always executed before macrotasks** when the call stack is free.

### 4. Event Loop
   - Constantly checks if the **call stack** is empty.
   - If yes, it pushes tasks from the **microtask queue** first, then from the **callback queue**.
   - This ensures smooth asynchronous execution.

---

## 🔹 Example: Asynchronous Behavior in Action

```js
console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End");
```
## 🖥️ Output:
```js
Start
End
Promise resolved
setTimeout callback
```

## 🔹 Flow Diagram
```vbnet
Call Stack
    ↓
Web APIs
    ↓
Microtask Queue (Promises, MutationObserver)
    ↓
Callback Queue (setTimeout, events)
    ↓
Event Loop → pushes tasks back to Call Stack
```


# ⚡ Differences between  `setTimeout` vs `setInterval`

In JavaScript, `setTimeout` and `setInterval` are two functions used to schedule code execution after a certain delay. While they might seem similar, they work differently.

---

##  `setTimeout`

`setTimeout` runs a function **once** after a specified delay (in milliseconds).

**Syntax:**
```js
setTimeout(function, delayInMilliseconds);
```
### 🔹 Example:
```bash
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);
```
### 🖥️ Output:
```bash
This runs after 2 seconds
```
### Key Points:
- Executes only **once**.
- Can be canceled using `clearTimeout(timeoutId)`.


##  `setInterval`

`setInterval` runs a function repeatedly at specified intervals (in milliseconds).

**Syntax:**
```js
setInterval(function, intervalInMilliseconds);
```
### 🔹 Example:
```bash
const intervalId = setInterval(() => {
  console.log("This runs every 3 seconds");
}, 3000);
```
### 🖥️ Output:
```bash
This runs every 3 seconds
This runs every 3 seconds
This runs every 3 seconds
This runs every 3 seconds
...
```
### Key Points:
- Executes **multiple times** at regular intervals..
- Can be stopped using `clearInterval(intervalId)`.


###  Main Differences

| Feature        | setTimeout           | setInterval          |
|----------------|--------------------|--------------------|
| Execution      | Once               | Repeatedly         |
| Return Value   | Timeout ID         | Interval ID         |
| Cancel Method  | `clearTimeout()`   | `clearInterval()`   |
| Use Case       | Delay a single task | Run tasks repeatedly |



# ⚡ Differences between async function and a normal function
In JavaScript, functions can be **normal (synchronous)** or **async (asynchronous)**. Understanding the differences is important when handling operations like API calls, timers, or reading files.

---

## 1. Normal Function

A normal function runs **synchronously**, meaning the code executes **line by line**, waiting for each statement to finish before moving to the next.
- Runs **line by line**.
- Returns a **direct value**.
- Cannot use `await` inside it.

## 2. Async Function

An async function runs asynchronously, meaning it can pause execution at `await` and resume later, without blocking other code.
- Always **returns a Promise**.
- Can use `await` to wait for asynchronous operations.
- Doesn’t block other code while waiting.

## Main Differences
| Feature         | Normal Function         | Async Function                      |
| --------------- | ----------------------- | ----------------------------------- |
| Execution       | Synchronous             | Asynchronous                        |
| Return Value    | Direct value            | Promise                             |
| Can use `await` | ❌ No                    | ✅ Yes                               |
| Use Case        | Simple, immediate tasks | API calls, timers, async operations |



# ⚡ Error Handling Strategy for Rejected Promises in `async/await`

When working with JavaScript `async/await`, handling errors from rejected promises is crucial to avoid uncaught exceptions. This guide explains the strategies to handle such errors effectively.

--- 
## 1. Using `try...catch`

The most common way to handle errors in `async/await` is wrapping the awaited promise in a `try...catch` block.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```
### Explanation:
- If the promise is rejected, the catch block executes.
- Prevents the program from crashing due to unhandled rejections.

## 2. Handling Multiple Promises with `Promise.allSettled()`

When awaiting multiple promises, use `Promise.allSettled()` to handle both fulfilled and rejected promises without throwing an error immediately.

```javascript
const promises = [
  fetch('https://api.example.com/data1'),
  fetch('https://api.example.com/data2')
];

const results = await Promise.allSettled(promises);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Failed:', result.reason);
  }
});
```
### Explanation:
- `Promise.all()` rejects immediately on the first failure, but `Promise.allSettled()` waits for all promises and gives individual statuses.

## 3. Inline `.catch()` for Single Promises

You can also handle errors directly on a single promise without `try...catch`.

```javascript
const data = await fetch('https://api.example.com/data')
  .then(res => res.json())
  .catch(error => {
    console.error('Error fetching data:', error);
    return null; // Fallback value
  });
```
### Explanation:
- Useful when you want to continue execution even if the promise fails.

### Key Points:
- Always handle promise rejections to avoid unhandled promise rejections.
- Prefer `try...catch` for `async/await` code for clarity.
- Use `Promise.allSettled()` when running multiple promises concurrently to get full insight.
- Provide fallback values or error logging to ensure the app remains stable.
- Rejected promises while using `async/await` can be safely handled using `try...catch`, inline `.catch()`, or `Promise.allSettled()` for multiple promises. Proper error handling ensures smoother, more resilient JavaScript applications.





# ⚡ States of Promise
# ⚡ `.then()` method
