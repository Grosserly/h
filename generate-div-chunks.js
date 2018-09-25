/**
*   Generate Div Chunks
*   Generate divs in groups of 20 that offset the background's rainbow texture
*/
function generateDivChunks(bgHeight = 21) {

    // Amount of divs takes to fill the screen at 25% zoom.
    // There are 20 divs for the 20 bg classes in the CSS.
    // bgHeight is how tall each div will be.
    // Always rounded up to [TODO: INSERT EXPLANATION FOR ROUNDING UP HERE]
    var needed = Math.ceil((screen.height * 5) / (20 * bgHeight));
    var made;
    var rowNum;
    
    for (made = 0; made < needed; made++) { // Make needed many chunks
        for (rowNum = 1; rowNum < bgHeight; rowNum++) { // I'm sorry... index starts at 1 because the div ID's do :(
            var currentDiv = document.createElement("div"); // Create a div
            currentDiv.className = "bg row" + rowNum;       // Add its class information
            document.body.appendChild(currentDiv);          // Inject it to the bottom of <body>
        }
    }
}
