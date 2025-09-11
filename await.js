async function loadData() {
    console.log("one");
    console.log("two");

    // fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(data => console.log("three"))

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log("three", data[0]);

    console.log("four");
    console.log("five");
}

// loadData();


// try{

// }
// catch(err){

// }


const loadData2 = async () =>{
    console.log(1);
    console.log(2);
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        console.log("3", data.length);
    }
    catch(err) {
        console.log("err");
    }
    console.log(4);
    console.log(5);
}
loadData2();