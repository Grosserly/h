/**
*   Generate Div Chunks
*   Generate divs in groups of 20 that offset the background's rainbow texture
*/
function generateDivChunks(bgHeight) {

    // Set default values
    if (bgHeight === undefined) { bgHeight = 21; }

    // Amount of divs takes to fill the screen at 25% zoom.
    // There are 20 divs for the 20 bg classes in the CSS.
    // bgHeight is how tall each div will be.
    // Rounded up to make sure the last chunk doesn't just barely not stretch all the way to the end.
    var needed = Math.ceil((screen.height * 5) / (20 * bgHeight));
    var made;
    var rowNum;
    
    for (made = 0; made < needed; made++) {                 // Make [needed] many chunks
        for (rowNum = 1; rowNum < bgHeight; rowNum++) {     // I'm sorry... index starts at 1 because the div ID's do :(
            var currentDiv = document.createElement("div"); // Create a div
            currentDiv.className = "bg row" + rowNum;       // Add its class information with rowNum
            document.body.appendChild(currentDiv);          // Inject it to the bottom of <body>
        }
    }
}
