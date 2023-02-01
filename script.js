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
const equals = document.getElementById("equals");
const openPar = document.getElementById("open-par");
const closePar = document.getElementById("close-par");
const del = document.getElementById("del");
const dot = document.getElementById("dot");
const power = document.getElementById("power");

let finishedEval = false;

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
elements.push(openPar);
elements.push(closePar);
elements.push(dot);
elements.push(power);

for(let i = 0;i<elements.length;i++){
    elements[i].addEventListener("click", () =>{
        append(elements[i].innerText);
    });
}

equals.addEventListener("click", () =>{

    let postfixExp = convertToPostfix(outputBox.innerText);
    let tree = createTree(postfixExp);
    let result = evaluate(tree);

    outputBox.innerText = result;
    finishedEval = true;
})

del.addEventListener("click", () =>{
    outputBox.innerText = removeLast(outputBox.innerText);
})

function append(value){

    let isNotValidInput = (outputBox.innerText[outputBox.innerText.length-1] == "^"
    || outputBox.innerText[outputBox.innerText.length-1] == "+"
    || outputBox.innerText[outputBox.innerText.length-1] == "-"
    || outputBox.innerText[outputBox.innerText.length-1] == "*"
    || outputBox.innerText[outputBox.innerText.length-1] == "/")
    && (value == "^" ||value == "/" || value == "+" || value == "-"
    || value == "*" || value == "/");

    if(finishedEval){
        outputBox.innerText = "";
        finishedEval = false;
    }
    if(isNotValidInput){
        outputBox.innerText = removeLast(outputBox.innerText);
    }

    outputBox.innerText += value;
}

function checkOperatorPriority(op)
{
    switch (op)
    {
        case '^': return 3;
        case '*': return 2;
        case '/': return 2;
        case '+': return 1;
        case '-': return 1;
    }

    return 0;
}

function isOperator(op) {
    if (op == '+' || op == '-' ||
        op == '^' || op == '*' ||
        op == '/' || op == '(' ||
        op == ')') {
        return true;
    }
    else
        return false;
}

function convertToPostfix(infixExpression)
{
    let stack = [];
    let postfixExpression = [];

    for (let i = 0; i < infixExpression.length; i++)
    {
        if(isOperator(infixExpression[i])){
            if (infixExpression[i] == '(')
            {
                stack.push(infixExpression[i]);
            }
            else if (infixExpression[i] == ')')
            {
                while (stack.length > 0 && stack[stack.length-1] != '(')
                {
                    postfixExpression.push(stack.pop());
                }
    
                stack.pop();
            }
            else
            {
                while (stack.length > 0 && checkOperatorPriority(stack[stack.length-1]) >= checkOperatorPriority(infixExpression[i]))
                {
                    postfixExpression.push(stack.pop());
                }
    
                stack.push(infixExpression[i]);
            }
        }
        else
        {
            while(!isOperator(infixExpression[i]) && i < infixExpression.length){
                postfixExpression.push(infixExpression[i]);
                i++;
            }
            postfixExpression.push("@");
            i--;
        }
        
    }

    while (stack.length > 0)
    {
        postfixExpression.push(stack.pop());
    }

    return postfixExpression.join("");
}

function removeLast(expression){
    let result = [];
    for(let i = 0;i<expression.length;i++){
        if(expression[i] == " "){
            continue;
        }

        result.push(expression[i]);
    }

    result.pop();

    return result.join("");
}

class Node{
    constructor(value)
    {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function evaluate(root)
{
    if (root === null)
    {
        return 0;
    }

    if (root.left === null && root.right === null)
    {
        return parseFloat(root.value);
    }

    let left = evaluate(root.left);
    let right = evaluate(root.right);

    switch (root.value)
    {
        case "^": return Math.pow(left,right);
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
        default: return 0;
    }
}

function createTree(tokens)
{
    let nodes = [];

    for (let i = 0; i < tokens.length; i++)
    {
        let temp = "";
        while(tokens[i] != "@" && !["+","-","*","/","^"].includes(tokens[i])){
            temp += tokens[i];
            i++;
        }
        const node = new Node();
        if(temp !== ""){
            node.value = temp;
        }
        else{
            node.value = tokens[i];
        }

        if(["+","-","*","/","^"].includes(tokens[i])){
            node.right = nodes.pop();
            node.left = nodes.pop();
        }

        nodes.push(node);
    }

    return nodes.pop();
}
