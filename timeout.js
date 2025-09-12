console.log(1);
console.log(2);
const timeOutId = setTimeout(() =>{
    console.log(3);
}, 5000)
const timeOutId2 = setTimeout(() =>{
    console.log(33);
}, 5000)
// clearTimeout(timeOutId) --> clears the timeout function
console.log('timeOutId', timeOutId);
console.log(4);
console.log(5);
console.log(6);