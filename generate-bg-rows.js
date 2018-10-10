/**
*   Generate Bg Rows
*   Generate bg rows in groups of 20 that offset the background's rainbow texture
*
*   Example of a div it makes:
*   <div class="bg row1"></div>
*/
function generateBgRows(bgRowHeight) { // If you set a bgRowHeight here, you also gotta do it in the CSS.

    // Set default values
    if (bgRowHeight === undefined) { bgRowHeight = 21; }

    // Needed is the amount of divs it will take to fill the user's screen at 25% zoom.
    // There are 20 divs for the 20 bg classes in the CSS.
    // bgRowHeight is how tall each div will be.
    // The result is rounded up to make sure the divs don't come up short at the end.
    var needed = Math.ceil((screen.height * 5) / (20 * bgRowHeight));

    for (var made = 0; made < needed; made++) {       // Make [needed] many chunks
        for (var rowNum = 0; rowNum < 20; rowNum++) { // 20 is how many rows there are in the CSS
            makeARow(rowNum + 1, bgRowHeight); // Index of the for loop starts at 0, but the index of the bg row numbers in the CSS starts at 1
        }
    }
}

function makeARow(rowNum, bgRowHeight) {
    var currentDiv = document.createElement("div"); // Create a div
    var classInfo = "bg row" + rowNum;
    var styleInfo = "height: " + bgRowHeight + "px;";
    currentDiv.setAttribute("class", classInfo);    // Give it its class information
    currentDiv.setAttribute("style", styleInfo);    // Set its height
    document.body.appendChild(currentDiv);          // Inject it to the bottom of <body>
}
