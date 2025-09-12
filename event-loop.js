// call stack >> event queue
function one(){
    two()
    console.log(1);
}
function two(){
    three()
    console.log(2);
}
function three(){
    setTimeout(() =>{
        console.log("inside three")
    }, 1000)
    four()
    console.log(3);
}
function four(){
    five()
    console.log(4);
}
function five(){
    setTimeout(() =>{
        console.log("inside five")
    }, 0)
    six()
    console.log(5);
}
function six(){
    console.log(6);
}
one();