console.log(1);
console.log(2);
// clearInterval --> stops the interval 
let count = 0;
const interval = setInterval(() =>{
    console.log(count++);
    if(count > 3){
        clearInterval(interval);
    }
}, 2000)
console.log(4);
console.log(5);
console.log(6);