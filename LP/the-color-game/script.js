function main() {
  const colorDisplay = document.getElementById("color-display");
  const easyButton = document.getElementById("easy-button");
  const hardButton = document.getElementById("hard-button");
  const messageDisplay = document.getElementById("message-display");
  const newColorsButton = document.getElementById("new-colors-button");
  let num = 6;
  let colors = generateRandomColors(num);

  newColorsButton.addEventListener("click", resetGame);

  easyButton.addEventListener("click", () => {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    num = 3;
    resetGame();
  });

  hardButton.addEventListener("click", () => {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    num = 6;
    resetGame();
  });

  function init() {
    const squareContainer = document.querySelector("#squares");
    squareContainer.innerHTML = "";
    colors = generateRandomColors(num);
    const pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < num; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.backgroundColor = colors[i];
      square.addEventListener("click", () => {
        const clickedColor = square.style.backgroundColor;
        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "Correct!";
          newColorsButton.textContent = "Play Again?";
          changeColors(clickedColor);
        } else {
          square.style.backgroundColor = "#232323";
          messageDisplay.textContent = "Try Again";
        }
      });
      squareContainer.appendChild(square);
    }
  }

  function resetGame() {
    document.querySelector("header > div:nth-child(1)").style.backgroundColor =
      "#5083b6";
    document.querySelectorAll("button:not(.selected)").forEach((button) => {
      button.style.backgroundColor = "white";
      button.style.color = "#5083b6";
    });
    document.querySelector(".selected").style.backgroundColor = "#5083b6";
    document.querySelector(".selected").style.color = "white";
    messageDisplay.textContent = "";
    newColorsButton.textContent = "New colors";
    init();
  }

  function changeColors(color) {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = color;
    }
    document.querySelector("header > div:nth-child(1)").style.backgroundColor =
      color;
    document.querySelectorAll("button:not(.selected)").forEach((button) => {
      button.style.color = color;
    });
    document.querySelector(".selected").style.backgroundColor = color;
  }

  function pickColor() {
    const random = Math.floor(Math.random() * num);
    return colors[random];
  }

  function generateRandomColors(num) {
    const arr = [];

    for (let i = 0; i < num; i++) {
      arr.push(randomColor());
    }

    return arr;
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  init();
}

window.onload = main;
