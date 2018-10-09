/**
*   Generate Bg Rows
*   Generate bg rows in groups of 20 that offset the background's rainbow texture
*/
function generateBgRows(bgRowHeight) {

    // Set default values
    if (bgRowHeight === undefined) { bgRowHeight = 21; }

    // needed is amount of divs it takes to fill the screen at 25% zoom.
    // There are 20 divs for the 20 bg classes in the CSS.
    // bgHeight is how tall each div will be.
    // Rounded up to make sure the last chunk doesn't just barely not stretch all the way to the end.
    var needed = Math.ceil((screen.height * 5) / (20 * bgRowHeight));
    
    for (var made = 0; made < needed; made++) {       // Make [needed] many chunks
        for (var rowNum = 1; rowNum < 21; rowNum++) { // This is a different 21 from the default bgRowHeight. This one is 20 bg rows in the CSS + 1.
            var currentDiv = document.createElement("div"); // Create a div
            currentDiv.setAttribute("class", "bg row" + (rowNum + 1)); // Give it its class information with rowNum + 1 to match the number it should have from the CSS
            document.body.appendChild(currentDiv);          // Inject it to the bottom of <body>
        }
    }
}
