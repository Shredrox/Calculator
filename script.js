const outputBox = document.getElementById("output");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");

const elements = [];
elements.push(num1);
elements.push(num2);
elements.push(num3);
elements.push(num4);
elements.push(num5);
elements.push(num6);
elements.push(num7);
elements.push(num8);
elements.push(num9);
elements.push(plus);
elements.push(minus);
elements.push(multiply);
elements.push(divide);


for(let i = 0;i<elements.length;i++){
    elements[i].addEventListener("click", () =>{
        append(elements[i].innerText);
    });
}

function append(value){
    outputBox.innerText += value;
}