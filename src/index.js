// Input example
// type,name,row,column
// 7,staggered square pin fin,0,0
// 7,staggered square pin fin,0,1
// 6,in-line square pin fin,0,2
// 4,in-line circular pin fin,1,0
// 4,in-line circular pin fin,1,1
// 0,none,1,2

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

    layout = parseLayout(layoutText);

    if (layout.length === 1 && isNaN(layout[0])) {
        showErrorMessage();
    } else {
        clearErrorMessage();
        createLayout(layout);
    }
}

function parseLayout(layout) {
    // Minimal specification length (e.g. [0, none, 1, 2])
    const WHITE_SPACE_LEN = 1;
    // All lines from the textarea
    const allLines = layout.split("\n");
    // First line containing the line keys
    const lineKeys = allLines[0].split(',');
    // Specification lines
    const specLines = allLines.slice(1);
    // Index of elements that should be ints
    const intIndex = [0, 2, 3];

    // Array of objects that holds each line made into an object
    let parsedLines = [];

    // Make objects from each line
    for (let i = 0; i < specLines.length; i++) {
        // Each line should be a csv
        const specs = specLines[i].split(',');

        // Check that the line is not empty nor has extra empty space
        if (specs.length != WHITE_SPACE_LEN) {
            // The object that will be appended to parsedLines
            const obj = {}

            // Loop through each spec and assign the key to value
            for (let j=0; j < specs.length; j++) {
                let value = specs[j];

                if (value != 'none') {

                    // Check if we need to convert the value to int
                    if (intIndex.includes(j)) {
                        value = parseInt(value);
                    }

                    obj[lineKeys[j]] = value;
                    }
            }
            parsedLines.push(obj);
        }
    }

    console.log(parsedLines);
    return parsedLines;
}

function createSquare(text, width, height, pattern='none') {
    console.log("Row-Col: " + text);
    console.log("Pattern: " + pattern);
    const square = document.createElement("div");
    const innerSquare = document.createElement("div");
    const textSpan = document.createElement("span");

    textSpan.textContent = text;

    square.classList.add("square");
    square.style.width = width;
    // We want the square to maintain a "heat sink look"
    square.style.maxHeight = '113px';
    square.style.maxWidth = '145px';
    square.style.height = height;

    innerSquare.classList.add("inner")
    innerSquare.classList.add(pattern);
    innerSquare.appendChild(textSpan);

    square.appendChild(innerSquare);

    return square;
}

function clearMainSquare() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function appendFans() {
    const fansParent = document.getElementById("fans");

    console.log(fansParent);
    for (i = 0; i < 8; i++) {
        const fan = document.createElement("div");
        fan.classList.add("fan");

        const textSpan = document.createElement("span");
        textSpan.textContent = "Fan";
        fan.appendChild(textSpan);

        fansParent.appendChild(fan);
    }

}

function createLayout(layout) {
    clearMainSquare();
    appendFans();

    // Find the max row in the array of objects (add once since we index from 0)
    const maxRow = layout.reduce((prev, curr) => {
        return (prev.row > curr.row) ? prev : curr
    }).row + 1;

    // Find the max col in the array of objects (add once since we index from 0)
    const maxCol = layout.reduce((prev, curr) => {
        return (prev.column > curr.column) ? prev : curr
    }).column + 1;


    for (let i = 1; i <= maxRow; i++) {
        for (let j = 1; j <= maxCol; j++) {
            // The content in the square (e.g. (3, 1) )
            squareText = "(" + i + "," + j + ")";

            // Calculate the percentage for the width depending on the columns number
            squareWidth = 100 / maxCol - 5 + "%";
            // Calculate the percentage for the height depending on the row(s) number
            squareHeight = 100 / maxRow - 10 + "%";

            // Filter the element that matches row column from the layout array
            const currElement = layout.filter(e => e.row == i-1 && e.column == j-1)[0];
            // Replace spaces with dashes to match the CSS class
            const squarePattern = currElement.name.replace(/\s/g, "-");

            newSquare = createSquare(squareText, squareWidth, squareHeight, squarePattern);
            main.appendChild(newSquare);
        }
    }
}

function saveImage () {
    const imageElements = document.getElementById("image-selection");

    html2canvas(imageElements, { scale: 3 }).then(function (canvas) {
        document.body.appendChild(canvas);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main = document.getElementById("main");
});
