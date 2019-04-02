
/**
 *  The Big Boy
 *  This is where everything comes together.
 * 
 *  Once the DOM is ready, this function builds the site.
 *  
 *  1. Set parameters for things like the page title and the text content
 * 		(from the "?p=" parameter provided by 404.html)
 *  2. Modify the URL bar to make the "?p=" parameter look like a path
 *  3. Play the selected audio file (if not false)
 *  4. Set the page title to the title variable
 *  5. Make BG rows to make the rainbow look diagonal
 *  6. Make an SVG containing a black rectangle with a cutout of the selected text
 * 		(so the rainbow background shows through it)
 *      CSS makes the image tile forever, filling the whole page with its beauty
 *  7. Move the text around indefinitely
 *
 *  Result: rainbow text flying around the screen with Brazilian Flower playing in the background
 *  I can't believe I spent one year working on this
 */
document.addEventListener("DOMContentLoaded", function() {
		
	let title       = "h";
	let text        = "h"; // Set false for no text
	let fontSize    = 24;
	let bgRowHeight = 20;
	let container   = document.getElementById("h");
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
		}   
	}

	if (text) {

		let tilingText = document.createElement("div");
		container.innerHTML = text + "<br>" + divideString(text);
		tilingText.textContent = " ";
		tilingText.id = "tiling-text";
		document.body.appendChild(tilingText);
		
		moveAround(tilingText);
		
		
	}

	spaIfy();

	document.title = title;

	generateBgRows(bgRowHeight, bgRowHeight); // Generate the background divs that offset the rainbow pattern

	if (audioFile) {
		const audioPlayer = new Audio(audioFile);

		// Weird StackOverflow code to play a media object without making Chrome angry
		const playPromise = audioPlayer.play();
		if (playPromise !== undefined)
			playPromise.then(_ => {}).catch(error => {});

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
 *  Divide String
 *  Returns the divided version of a string
 *
 *  I initially wrote this in Python and you
 *  can really tell because it SUCKS lol
 *  
 *  Example:
 *  Input:  "1234"
 *  Output: "34 12"
 *
 *  Used for turning this:
 *  1234 1234
 *  1234 1234
 *  1234 1234
 *
 *  Into this:
 *  1234 1234
 *  34 1234 3
 *  1234 1234
 */
function divideString(string) {

	const ORIGINAL = string;
	const LEN      = string.length;

	if (LEN == 1) // Don't bother doing anything if it's only one character long
		return ORIGINAL;

	let midpoint   = 0;
	let firstHalf  = "";
	let secondHalf = "";

	if (LEN % 2 == 0) // If the text's length is an even number,
		midpoint = LEN / 2;    // put Midpoint at half its length
	else // Text's length is an odd number;
		midpoint = (LEN - 1) / 2; // put Midpoint 1 to the left of half its length

	firstHalf  = string.substring(0,midpoint); // "1234" -> "12"
	secondHalf = string.substring(midpoint);   // "1234" -> "34"
	string = secondHalf + " " + firstHalf;     // "34 12"
	return string;

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
        newDiv.style.backgroundPosition = rowNum*offsetAmount%screen.width + "px";
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
