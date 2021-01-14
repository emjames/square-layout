let main = null;

function showErrorMessage() {
    errorTag = document.getElementById("error");
    errorTag.textContent = "Enter at least one int";
}

function clearErrorMessage() {
    errorTag = document.getElementById("error");
    errorTag.textContent = "";
    errorTag.appendChild(document.createElement("br"));
}

function makeFigure() {
    const layoutText = document.getElementById("layout").value;
    const layout = layoutText.split(",").map(num => parseInt(num));

    if (layout.length === 1 && isNaN(layout[0])) {
        showErrorMessage();
    } else {
        clearErrorMessage();
        createLayout(layout);
    }
}

function createSquare(text, width, height) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.textContent = text;
    square.style.width = width;
    square.style.height = height;

    return square;
}

function clearMainSquare() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function createLayout(layout) {
    clearMainSquare();

    rows = layout.length;
    for (let i = rows; i > 0; i--) {
        rowElements = layout[i - 1];
        for (let j = 0; j < rowElements; j++) {
          // The content in the square (e.g. (3, 1) )
          squareText = "(" + i + "," + (j + 1) + ")";

          // Calculate the percentage for the width depending on the rowElements
          squareWidth = 100 / rowElements - 10 + "%";

          // Calculate the percentage for the height depending on the row(s) number
          squareHeight = 100 / rows - 10 + "%";

          newSquare = createSquare(squareText, squareWidth, squareHeight);

          main.appendChild(newSquare);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    main = document.getElementById("main");
});
