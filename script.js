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
const expression = [];

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

outputBox.innerText = ConvertToPostfix("( 1 + 2 ) * 3");

function append(value){
    outputBox.innerText += value;
}

function checkOperatorPriority(op)
{
    switch (op)
    {
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

function ConvertToPostfix(infixExpression)
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
            postfixExpression.push(infixExpression[i]);
        }
        
    }

    while (stack.length > 0)
    {
        postfixExpression.push(stack.pop());
    }

    return postfixExpression.join("");
}
