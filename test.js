let myData = "30.11-2019";

const reg = /,|\.|-/g;

myData = myData.replace(reg, '/');
let arr = myData.split('/');
arr = arr.reverse();
myData = arr.join('/');

console.log(myData);