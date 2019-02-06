
/**
 *  The Big Boy
 *  This is where everything comes together.
 * 
 *  Once the HTML is ready, this function builds the site.
 *  
 *  1. Set parameters for things like the page title and the text content (from the "?p=" parameter provided by 404.html)
 *  2. Modify the URL bar to make the "?p=" parameter look like a path
 *  3. Play the selected audio file (if not false)
 *  4. Set the page title to the title parameter
 *  5. Make bg rows to offset the rainbow pattern (r.gif)
 *  6. Make an SVG containing a black rectangle with a cutout of the selected text (so the rainbow background shows through it)
 *       Since it goes into CSS's background-image, it tiles by default, filling the whole page with its beauty
 *  7. Move the text around indefinitely
 *
 *  Result: rainbow text flying around the screen with Brazilian Flower playing in the background
 *  I can't believe I spent one year working on this
 */
document.addEventListener("DOMContentLoaded", function() {
		
	let title       = "h";
	let text        = "h"; // Set false for no text
	let width       = 14;
	let height      = 38;
	let fontSize    = 20;
	let bgRowHeight = 21;
	let textDiv     = document.getElementById("text");
	let audioFile   = "flower.mp3"; // Set false for no audio
	
	let srch = window.location.search;
	
	if ((srch) && (srch.includes("?p=/"))) {
		
		let query = decodeURIComponent(srch.substring(4)); // Everything after "?p=/"
		
		// Add space at the beginning of text with a space in it, so the SVG text gets spaced properly
		if ((query.includes(" ")) && (query.charAt(0) != " ")) { // If text has a space and it's not at the beginning
			query = " " + query; // Add a space
		}
		
		if (query == "r") {
			title = "r";
			text  = false;

		} else if (query == "autism") {
			audioFile = "monty.ogg";

		} else if (query == "dense") {
			title = "dense";
			bgRowHeight = 1;

		} else {
			title = query;
			text  = query;
			width = textWidth(text, "19px Arial");
		}   
	}

	if (text) {

		moveAround(textDiv);

		let textSVG = generateSVGCode(text, width, height, fontSize);
		textDiv.setAttribute("style", `background-image: url(${textSVG});`);
		
	}

	spaIfy();

	document.title = title;

	generateBgRows(bgRowHeight, bgRowHeight); // Generate the background divs that offset the rainbow pattern

	if (audioFile) {
		const audioPlayer = new Audio(audioFile);
		audioPlayer.play();
			
		audioPlayer.addEventListener("ended", function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
});


/**
 *  Single Page Apps for GitHub Pages
 *  https://github.com/rafrex/spa-github-pages
 *  Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
 *  ----------------------------------------------------------------------
 *  This script checks to see if a redirect is present in the query string
 *  and converts it back into the correct url and adds it to the
 *  browser's history using window.history.replaceState(...),
 *  which won't cause the browser to attempt to load the new url.
 *  When the single page app is loaded further down in this file,
 *  the correct url will be waiting in the browser's history for
 *  the single page app to route accordingly.
 */
function spaIfy() {

    let l = window.location;
    
    if (l.search) {
        let q = {};
        l.search.slice(1).split("&").forEach(function(v) {
            let a = v.split("=");
            q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");
        });
        if (q.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + (q.p || "") +
                (q.q ? ("?" + q.q) : "") +
                l.hash
            );
}}}


/**
 *  Text Width
 *  Given text, calculate its width in px
 *  
 *  Input:  String
 *  Output: Whole number
*/
function textWidth(text, font) {
    let myCanvas = document.createElement("canvas");
    let context = myCanvas.getContext("2d");
    context.font = font;
    
    let metrics = context.measureText(text);
    return metrics.width;
};


/**
 *  Make Text SVG
 *  Puts together an SVG from a template and some parameters
 * 
 *  Input:  a string, the width and height for the SVG, and the text's size
 *  Output: SVG data with quotes around it
 *
 *  This is used for #text's background-image.
 */
function generateSVGCode(string, width, height, fontSize) {

	let stringList = _divideString(string) || ["h","h"];
    return `"data:image/svg+xml;uft8,<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${width}' height='${height}'><rect width='100%' height='100%' fill='#000' x='0' y='0' fill-opacity='1' mask='url(#mask)' /><mask id='mask'><rect width='100%' height='100%' fill='#fff' x='0' y='0' /><text x='0' y='15' font-family='sans-serif' font-size='${fontSize}' fill='#000'>${stringList[0]}</text><text x='0' y='34' font-family='sans-serif' font-size='${fontSize}' fill='#000'>${stringList[1]}</text></mask></svg>"`;

	/**
	 *  Divide String
	 *  Takes a string, returns a list with two strings
	 *
	 *  I initially wrote this in Python and you can
	 *  tell because it SUCKS lol
	 *  
	 *  Example:
	 *  Input:  "1234"
	 *  Output: ["1234","34 12"]
	 *
	 *  Used for turning this:
	 *  1234 1234
	 *  1234 1234
	 *  1234 1234
	 *
	 *  Into:
	 *  1234 1234
	 *  34 1234 3
	 *  1234 1234
	 */
	function _divideString(string) {

		const ORIGINAL = string;
		const LEN      = string.length;

		if (LEN == 1) // Don't bother scrambling the text if it's only one character long
			return [ORIGINAL,ORIGINAL];

		let midpoint   = 0;
		let firstHalf  = "";
		let secondHalf = "";
		let stringList = [];

		if (LEN % 2 == 0) { // If the text's length is an even number,
			midpoint = LEN / 2;    // put Midpoint at half its length
		} else { // Text's length is an odd number;
			midpoint = (LEN - 1) / 2; // put Midpoint 1 to the left of half its length
		}

		// "This is where the fun begins." -- Anakin Skywalker
		try {
			firstHalf  = string.substring(0,midpoint); // "1234" -> "12"
			secondHalf = string.substring(midpoint);   // "1234" -> "34"
			string = secondHalf + " " + firstHalf;     // "34 12"

			stringList = [ORIGINAL,string];

			return stringList;
		} catch(err) {
			return false;
		}

	}
}


/**
 *  Generate BG Rows
 *  Generate offset BG rows to make the background rainbow diagonal
 *
 *  Example of a div it makes:
 *  <div class="bg" style="height:21px; background-position: -30px;"></div>
 */
function generateBgRows(bgRowHeight, offsetAmount) {

	let masterDiv = document.createElement("div"); // Create a div
	masterDiv.classList.add("bg");
	masterDiv.style.height = bgRowHeight + "px;"   // Set its height

    function _makeARow(rowNum) {
        let newDiv = masterDiv.cloneNode(false); // Create a div
        newDiv.style.backgroundPosition = rowNum*offsetAmount + "px";
        document.body.appendChild(newDiv);       // Inject it to the bottom of <body>
    }

    let needed = Math.ceil((screen.height * 5) / bgRowHeight);

    while (needed > 0) { // Make [needed] many divs to fit the screen
        _makeARow(needed);
		needed--;
    }
}


/**
 *  Move Around
 *  Slides an element to random places on the screen repeatedly
 *
 *  Pick a random x value, y value, and time value
 *  Move the text to that position on the screen over that amount of time
 *  Repeat forever
 */
function moveAround(el) {

    let xDest = Math.floor(Math.random() * -201);
    let yDest = Math.floor(Math.random() * -201);
    let time  = Math.floor(Math.random() * 3) + 3; // in seconds

	el.style.transition = `left ${time}s, top ${time}s`; // CSS uses seconds
	el.style.left = xDest + "px";
	el.style.top  = yDest + "px";

	setTimeout(moveAround, time*1000, el); // JS uses milliseconds
}
