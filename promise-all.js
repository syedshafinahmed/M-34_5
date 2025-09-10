const getData = new Promise((resolve, reject) => {
    const num = Math.random() * 10;
    console.log("generated nmber", num);
    if (num > 5) {
        resolve({ num: num })
    }
    else {
        reject({ err: "Data is not available" })
    }
});

// getData
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

const getData1 = new Promise((resolve, reject) => {
    const num = Math.random() * 10;
    console.log("generated number", num);
    if (num > 5) {
        resolve({ num1: num })
    }
    else {
        reject({ err: "Data1 is not available" })
    }
});


const getData2 = new Promise((resolve, reject) => {
    const num = Math.random() * 10;
    console.log("generated number", num);
    if (num > 5) {
        resolve({ num2: num })
    }
    else {
        reject({ err: "Data2 is not available" })
    }
});

const getData3 = new Promise((resolve, reject) => {
    const num = Math.random() * 10;
    console.log("generated number", num);
    if (num > 5) {
        resolve({ num3: num })
    }
    else {
        reject({ err: "Data3 is not available" })
    }
});

Promise.all([getData, getData1, getData2, getData3])
    .then(res => console.log(res))
    .catch(err => console.log(err))