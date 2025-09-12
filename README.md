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
# How does JS handle Asynchronus call?
# Differences between SetTimeOut and SetInterval
# Differences between async function and a normal function
# What's the error handling strategy for promises that were rejected while awaiting?
# States of Promise
# .then() method
