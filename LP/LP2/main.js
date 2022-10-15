var display = "0";
var operand1 = 0;
var operand2 = null;
var operation = null;

function initialization() {
  display = "0";
  operand1 = 0;
  operand2 = null;
  operation = null;
}

function updateDisplay() {
  document.getElementById("display").innerText = display;
}

var digits = Array.from(document.getElementsByClassName("cifra"));

digits.forEach((element) => {
  element.addEventListener("click", pressedDigit);
});

function pressedDigit(e) {
  if (operation === null) {
    operand1 = operand1 * 10 + Number(e.target.innerText);
  } else if (operand2 === null) {
    operand2 = Number(e.target.innerText);
  } else {
    operand2 = operand2 * 10 + Number(e.target.innerText);
  }

  display = operand1;
  if (operation) {
    display += operation;
  }
  if (operand2) {
    display += operand2;
  }

  updateDisplay();
}

var functions = Array.from(document.getElementsByClassName("functie"));

functions.forEach((element) => {
  element.addEventListener("click", pressedFunction);
});

function pressedFunction(e) {
  switch (e.target.innerText) {
    case "C":
      initialization();
      break;
    case "=":
      if (operand2 !== null) {
        if (display.includes("x")) {
          operand1 *= operand2;
        } else {
          operand1 = eval(display);
        }
        operation = null;
        operand2 = null;
        display = operand1;
      }
      break;
    case "Șterge":
      if (operand2 !== null) {
        operand2 = Math.floor(operand2 / 10);
        display = operand1 + operation + operand2;
      } else if (operation !== null) {
        operation = null;
        display = operand1;
      } else {
        operand1 = Math.floor(operand1 / 10);
        display = operand1;
      }
      break;
    default:
      if (operation === null) {
        operation = e.target.innerText;
      }
      display += operation;
      break;
  }

  updateDisplay();
}
