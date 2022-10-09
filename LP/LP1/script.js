let isResult = false;

const handleClick = (clicked) => {
  const display = document.querySelector("#display p");

  if (isNaN(clicked)) {
    clicked = clicked.trim();

    switch (clicked) {
      case "AC":
        display.innerHTML = "";
        break;
      case "C":
        if (isResult) {
          display.innerHTML = "";
        } else {
          display.innerHTML = display.innerHTML.slice(0, -1);
        }
        break;
      case "=":
        if (["+", "-", "x", "/"].includes(display.innerHTML.slice(-1))) {
          break;
        }
        if (display.innerHTML.includes("+")) {
          if (
            Number(
              display.innerHTML.substring(0, display.innerHTML.indexOf("+"))
            ) === 0 &&
            Number(
              display.innerHTML.substring(display.innerHTML.indexOf("+") + 1)
            ) === 0
          ) {
            display.innerHTML = "0";
            break;
          }
        }
        if (display.innerHTML.includes("-")) {
          if (
            Number(
              display.innerHTML.substring(0, display.innerHTML.indexOf("-"))
            ) === 0 &&
            Number(
              display.innerHTML.substring(display.innerHTML.indexOf("-") + 1)
            ) === 0
          ) {
            display.innerHTML = "0";
            break;
          }
        }
        if (display.innerHTML.includes("x")) {
          if (
            Number(
              display.innerHTML.substring(0, display.innerHTML.indexOf("x"))
            ) === 0 ||
            Number(
              display.innerHTML.substring(display.innerHTML.indexOf("x") + 1)
            ) === 0
          ) {
            display.innerHTML = "0";
            break;
          }
          display.innerHTML = display.innerHTML.replace("x", "*");
        }
        if (display.innerHTML.includes("/")) {
          if (
            Number(
              display.innerHTML.substring(display.innerHTML.indexOf("/") + 1)
            ) === 0
          ) {
            display.innerHTML = "";
            alert("Cannot divide by zero");
            break;
          }
          if (
            Number(
              display.innerHTML.substring(0, display.innerHTML.indexOf("/"))
            ) === 0
          ) {
            display.innerHTML = "0";
            break;
          }
        }
        const result = eval(display.innerHTML);
        if (result) {
          display.innerHTML = result;
        }
        break;
      case ".":
        if (
          display.innerHTML === "" ||
          (display.innerHTML.match(/[-+x/]/) &&
            !display.innerHTML.slice(
              display.innerHTML.match(/[-+x/]/).index + 1
            ))
        ) {
          display.innerHTML += "0.";
        } else {
          const lastChar = display.innerHTML.slice(-1);
          if (lastChar !== ".") {
            display.innerHTML += clicked;
          }
        }
        break;
      default:
        if (display.innerHTML === "") {
          switch (clicked) {
            case "+":
            case "-":
            case "x":
            case "/":
            default:
              display.innerHTML = "";
              break;
          }
        } else {
          if ([".", "+", "-", "x", "/"].includes(display.innerHTML.slice(-1))) {
            display.innerHTML = display.innerHTML.slice(0, -1);
            display.innerHTML += clicked;
          } else {
            display.innerHTML += clicked;
          }
        }
    }
  } else {
    if (display.innerHTML.match(/[-+x/]/) !== null) {
      const index = display.innerHTML.match(/[-+x/]/).index;
      const digit = display.innerHTML.slice(index + 1);
      if (!digit) {
        display.innerHTML += clicked;
      } else {
        if (digit === "0" && clicked === "0") {
          display.innerHTML += "";
        } else if (digit === "0" && clicked !== ".") {
          display.innerHTML = display.innerHTML.slice(0, -1) + clicked;
        } else {
          display.innerHTML += clicked;
        }
      }
    } else {
      if (display.innerHTML === "0" && clicked === "0") {
        display.innerHTML = "0";
      } else if (display.innerHTML === "0" && clicked !== ".") {
        display.innerHTML = clicked;
      } else {
        display.innerHTML += clicked;
      }
    }
  }

  isResult = clicked === "=";
};

window.onload = () => {
  for (let i = 9; i > -1; i--) {
    const btn = document.createElement("button");
    btn.innerHTML = i;
    btn.setAttribute("class", "buttons-color");
    if (i === 0) {
      btn.setAttribute("id", "zero");
    }
    document.getElementById("digits").appendChild(btn);

    btn.setAttribute("onClick", "handleClick(this.innerHTML)");
  }

  const btn = document.createElement("button");
  btn.innerHTML = ".";
  btn.setAttribute("class", "buttons-color");
  btn.setAttribute("onClick", "handleClick(this.innerHTML)");
  document.getElementById("digits").appendChild(btn);
};
