
// calculator.js


const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let expression = [];


// Button Click Events

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            appendNumber(value);
        }
        else if (value === "C") {
            clearAll();
        }
        else if (value === "DEL") {
            deleteLast();
        }
        else if (value === "=") {
            operate();
        }
        else {
            appendOperator(value);
        }
    });
});


// Append Number

function appendNumber(num) {
    if (display.value.includes("Error")) {
        display.value = "";
        expression = [];
    }

    if (num === ".") {
        if (expression.length === 0 || isOperator(expression[expression.length - 1])) {
            expression.push("0.");
            display.value += "0.";
            return;
        }

        let current = expression[expression.length - 1];
        if (current.includes(".")) return; // prevent second decimal
    }

    if (expression.length === 0 || isOperator(expression[expression.length - 1])) {
        expression.push(num);
    } else {
        expression[expression.length - 1] += num;
    }

    display.value = expression.join("");
}


// Append Operator

function appendOperator(op) {
    if (expression.length === 0) {
        // Only allow "-" at the start for negative numbers
        if (op === "-") {
            expression.push(op);
            display.value = expression.join("");
        }
        return;
    }

    const lastToken = expression[expression.length - 1];

    if (isOperator(lastToken)) {
        // Replace last operator with the new one (prevents ++, *+)
        expression[expression.length - 1] = op;
    } else {
        expression.push(op);
    }

    display.value = expression.join("");
}


// Clear All

function clearAll() {
    display.value = "";
    expression = [];
}


// Delete Last

function deleteLast() {
    if (display.value.includes("Error")) {
        display.value = "";
        expression = [];
        return;
    }

    if (expression.length === 0) return;

    let lastToken = expression[expression.length - 1];

    if (lastToken.length > 1) {
        expression[expression.length - 1] = lastToken.slice(0, -1);
    } else {
        expression.pop();
    }

    display.value = expression.join("");
}


// Operator Checker

function isOperator(val) {
    return ["+", "-", "*", "/", "%"].includes(val);
}


// Calculator Engine

function operate() {
    if (expression.length === 0) return;

    let tokens = [...expression];

    try {
        // PASS 1: * / %
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "*" || tokens[i] === "/" || tokens[i] === "%") {
                let left = parseFloat(tokens[i - 1]);
                let right = parseFloat(tokens[i + 1]);
                let result;

                if (tokens[i] === "*") result = left * right;
                if (tokens[i] === "/" && right !== 0) result = left / right;
                else if (tokens[i] === "/" && right === 0) throw "Error: Division by zero";
                if (tokens[i] === "%") result = left % right;

                tokens.splice(i - 1, 3, result.toString());
                i--;
            }
        }

        // PASS 2: + -
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "+" || tokens[i] === "-") {
                let left = parseFloat(tokens[i - 1]);
                let right = parseFloat(tokens[i + 1]);
                let result;

                if (tokens[i] === "+") result = left + right;
                if (tokens[i] === "-") result = left - right;

                tokens.splice(i - 1, 3, result.toString());
                i--;
            }
        }

        display.value = tokens[0];
        expression = [tokens[0]];
    } catch (err) {
        display.value = err;
        expression = [];
    }
}


// Keyboard Support

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        e.preventDefault();
        appendNumber(key);
    } 
    else if (isOperator(key)) {
        e.preventDefault();
        appendOperator(key);
    } 
    else if (key === "Enter" || key === "=") {
        e.preventDefault();
        operate();
    } 
    else if (key === "Backspace") {
        e.preventDefault();
        deleteLast();
    } 
    else if (key.toUpperCase() === "C") {
        e.preventDefault();
        clearAll();
    }
});