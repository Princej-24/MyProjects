// // function in js
// // synchronous js 
// console.log("hello world abes");
// function hello(){
//     console.log("hello world ");

// }
// hello();
// console.log("hello world abes 2 ");
// // asynchronous  js
// // arrow function 
// // variable: var,let,const
// const Hello = () => {
//     console.log("hello world ");
//     setTimeout(() => {
//         console.log("hello world 2");
//     }, 2000);
// };
// Hello();
// console.log("hello world 3");
// blocking synchronous js
// non blocking asynchronous js



function hello(n1,n2){
    console.log(n1+n2);
    console.log(arguments);
}
let a=10;
let b=20;
hello(a,b);



const app=()=>{
    console.log(arguments);
};
app();