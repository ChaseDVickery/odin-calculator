
// Math functions
function add(a, b)      { return a + b };
function sub(a, b) { return a - b };
function mul(a, b) { return a * b };
function div(a, b)   { if (b === 0) { alert("Next try to square a circle."); } return b == 0 ? 0 : a / b };

let num1 = 0;
let num2 = 0;
let op = "add";

function operate(op, n1, n2) {
    switch (op) {
        case "sub":
            return sub(n1, n2);
        case "mul":
            return mul(n1, n2);
        case "div":
            return div(n1, n2);
        case "add":
        default:
            return add(n1, n2);
    }
}

