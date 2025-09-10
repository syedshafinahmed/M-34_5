console.log("one");
console.log("two");

setTimeout(callThree, 5000);
setTimeout(() =>{
    console.log("new");
}, 4000);

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => console.log(data))

// callThree();

console.log("four");
console.log("five");

function callThree() {
    console.log("three");
}