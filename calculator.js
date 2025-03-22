const ops = "+-*/";
let num1 = "";
let num2 = "";
let op = "";
let result = "";

const states =[
    "operand",
    "operator",
    "end"
];
let state = "operand";

// Get DOM elements
let display = document.querySelector("#calc-display div");


// Math functions
function add(a, b)      { return a + b };
function sub(a, b) { return a - b };
function mul(a, b) { return a * b };
function div(a, b)   { if (b === 0) { alert("Next try to square a circle."); } return b == 0 ? 0 : a / b };

function operate(op, n1, n2) {
    switch (op) {
        case "-":
            return sub(n1, n2);
        case "*":
            return mul(n1, n2);
        case "/":
            return div(n1, n2);
        case "+":
        default:
            return add(n1, n2);
    }
}

function isValidNumber(numberString) {
    return !isNaN(Number(numberString));
}

function isDigit(input) {
    return /[0-9]/.test(input);
}
function isOp(input) {
    return ops.includes(input);
}
function isDot(input) {
    return input === "." || input === "dot";
}
function isValidCalculation() {
    return  isValidNumber(num1) &&
            isValidNumber(num2) &&
            isOp(op);
}

// Do things depending on our calculator state.
function setNextCalculationInput(input) {
    console.log(input);
    if (state === "operand") { handleOperandInput(input); }
    else if (state === "operator") { handleOperatorInput(input); }
    else if (state === "end") { handleEndInput(input); }
    buildDisplay();
}
function handleOperandInput(input) {
    if (isDigit(input) || isDot(input)) {
        // If we haven't parsed the op yet,
        // then we are on the first operand
        if (op === "") {
            let numCheck = num1 + input;
            if (numCheck === ".") { numCheck = "0."; }
            if (isValidNumber(numCheck)) { num1 = numCheck; }
        }
        else {
            let numCheck = num2 + input;
            if (numCheck === ".") { numCheck = "0."; }
            if (isValidNumber(numCheck)) { num2 = numCheck; }
        }
    }
    else if (isOp(input)) {
        // If we still need another operand
        if (num2 === "") {
            if (isValidNumber(num1)) {
                state = "operator";
                handleOperatorInput(input);
            }
        }
        // Otherwise, we typed an operator when num2
        // already exists, so op should also exist,
        // and we should evaluate the current calculation
        // and swap values
        else {
            if (isValidCalculation()) {
                num1 = operate(op, Number(num1), Number(num2));
                num2 = "";
                state = "operator";
                handleOperatorInput(input);
            }
        }
    }
    else if (input === "=") {
        if (isValidCalculation()) {
            state = "end";
            handleEndInput(input);
        }
    }
}
function handleOperatorInput(input) {
    // Overwrite current op with new op
    if (isOp(input)) {
        op = input;
    }
    else if (isDigit(input) || isDot(input)) {
        state = "operand";
        handleOperandInput(input);
    }
}
function handleEndInput(input) {
    if (input === "=" && isValidCalculation()) {
        result = operate(op, Number(num1), Number(num2));
    }
    else if (isOp(input) && isValidCalculation()) {
        num1 = operate(op, Number(num1), Number(num2));
        result = "";
        num2 = "";
        state = "operator";
        handleOperatorInput(input);
    }
    else {
        clearAll();
        handleOperandInput(input);
    }
}

function clearAll() {
    // Reset states, values, etc...
    num1 = "";
    num2 = "";
    op = "";
    result = "";
    state = states[0];
}

function initializeCalculator() {
    console.log("initializing");
    numberButtons = document.querySelectorAll(".calc-btn.num");
    addButton = document.querySelector("#add");
    subButton = document.querySelector("#sub");
    mulButton = document.querySelector("#mul");
    divButton = document.querySelector("#div");
    dotButton = document.querySelector("#dot");
    resButton = document.querySelector("#resolve");
    clsButton = document.querySelector("#cls");

    console.log(numberButtons);
    for (const numButton of [...numberButtons]) {
        numButton.addEventListener("click", (e) => {
            setNextCalculationInput(e.target.id);
        });
    }
    addButton.addEventListener("click", (e) => { setNextCalculationInput("+"); });
    subButton.addEventListener("click", (e) => { setNextCalculationInput("-"); });
    mulButton.addEventListener("click", (e) => { setNextCalculationInput("*"); });
    divButton.addEventListener("click", (e) => { setNextCalculationInput("/"); });
    dotButton.addEventListener("click", (e) => { setNextCalculationInput("."); });
    resButton.addEventListener("click", (e) => { setNextCalculationInput("="); });

    clsButton.addEventListener("click", (e) => { clearAll(); buildDisplay(); });
    
}

function buildDisplay() {
    let resultString = result === '' ? '' : '= '+(Number.isInteger(result) ? result : result.toFixed(2));
    display.textContent = `${num1} ${op} ${num2} ${resultString}`;
}

initializeCalculator();