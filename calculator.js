

function add(a, b)      { return a + b };
function sub(a, b) { return a - b };
function mul(a, b) { return a * b };
function div(a, b)   { if (b === 0) { alert("Next try to square a circle."); } return b == 0 ? 0 : a / b };


console.log(add(1,2));
console.log(add(6,-1));

console.log(sub(1,2));
console.log(sub(5,2));

console.log(mul(7,2));
console.log(mul(7,-2));

console.log(div(12,2));
console.log(div(11,2));
console.log(div(11,0));