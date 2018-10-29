
(function() {
	
    spaIfy();
    
})();


/**
 *  The Big Boy
 *  This is where everything comes together.
 * 
 *  Once the HTML is ready, this function builds the site.
 *  TODO: Finish the docstring once this is actually done
*/
document.addEventListener('DOMContentLoaded', function() {

    var title       = "h";
    var text        = "h"; // Set false for no text
    var width       = 14;
    var height      = 38;
    var fontSize    = 20;
    var bgRowHeight = 21;
    var textDiv     = document.getElementById("text");
    var audioFile   = "flower.mp3"; // Set false for no audio
    
    var srch = window.location.search;
    
    if ((srch) && (srch.includes("?p=/"))) {
	    
        var query = srch.substring(3); // Everything after ?p=/"
        alert("If: " + query); // debug
        
        if (query == "r") {
            title = "r";
            text  = false;

        } else if (query == "autism") {
            title = "Y O U H A V E";
            text  = "A U T I S M";
            width = 100;
            audioFile = "monty.ogg";

        } else if (query == "dense") {
            title = "dense";
            bgRowHeight = 1;

        } else if (query == "nk") {
            title = "Me";
            text  = "Nate Kean";
            width = 97;
            audioFile = false;

        } else {
            text  = query;
            width = textWidth(text);
        }
	    
    } else {
        alert("Else: " + query);
    }
    
    alert("End: " + query);
    
    if (audioFile) {
        var audioPlayer = new Audio(audioFile);
        audioPlayer.play();
    }

    document.title = title;
    
    generateBgRows(bgRowHeight); // Generate the background divs that offset the rainbow pattern

    if (text) {
	    
        var dividedString = divideString(text); // If something goes wrong, this will return False
        if (!dividedString)
            dividedString = ["h","h"]; // Fall back to h's if False

        var textSVG = makeTextSVG(dividedString, width, height, fontSize);

        var styleInfo = "background-image:url(" + textSVG + ");"; // Set the background for element selected in textDiv 
        textDiv.setAttribute("style",styleInfo);                  // to the SVG that was just generated 
        
        moveTextAround();
	    
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

    var l = window.location;
    
    if (l.search) {
        var q = {};
        l.search.slice(1).split('&').forEach(function(v) {
            var a = v.split('=');
            q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (q.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + (q.p || '') +
                (q.q ? ('?' + q.q) : '') +
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
function textWidth(text) {
    var myCanvas = document.createElement("canvas");
    var context = myCanvas.getContext("2d");
    context.font = "19px Arial";
    
    var metrics = context.measureText(text);
    return metrics.width;
};


/**
 *  Divide String
 *  Takes a string, returns a list with two strings
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
function divideString(string) {

    const ORIGINAL    = string;
    const LEN         = string.length;
    var   isOneChar   = false;
    var   midpoint    = 0;
    var   firstHalf   = "";
    var   secondHalf  = "";
    var   stringList  = [];

    if (LEN == 1) { // Don't bother scrambling the text if it's only one character long
        return [ORIGINAL,ORIGINAL];
    } else if (LEN % 2 == 0) { // If the text's length is an even number,
        midpoint = LEN / 2;    // put Midpoint at half its length
    } else { // Text's length is an odd number,
        midpoint = (LEN - 1) / 2; // so put Midpoint 1 to the left of half its length
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


/**
 *  Make Text SVG
 *  Puts together an SVG from a template and some parameters
 * 
 *  Input:  a list of two strings, the width and height for the SVG, and the text's size
 *  Output: SVG data with quotes around it
 *
 *  This is used for #text's background-image.
 */
function makeTextSVG(stringList, width, height, fontSize) {
    return "\"data:image/svg+xml;uft8,<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='" + width + "' height='" + height + "'><rect width='100%' height='100%' fill='#000' x='0' y='0' fill-opacity='1' mask='url(#mask)' /><mask id='mask'><rect width='100%' height='100%' fill='#fff' x='0' y='0' /><text x='0' y='15' font-family='sans-serif' font-size='" + fontSize + "' fill='#000'>" + stringList[0] + "</text><text x='0' y='34' font-family='sans-serif' font-size='" + fontSize + "' fill='#000'>" + stringList[1] + "</text></mask></svg>\"";

}


/**
 *  bg.js
 *  I have no idea how this works
 *  @author Alexander Farkas
 *  v. 1.21
 */
(function($) {

	var oldAnim = $.fn.animate;
	$.fn.animate = function(prop){
		if('background-position' in prop){
			prop.backgroundPosition = prop['background-position'];
			delete prop['background-position'];
		}
		if('backgroundPosition' in prop){
			prop.backgroundPosition = '('+ prop.backgroundPosition;
		}
		return oldAnim.apply(this, arguments);o
	};
	
	function toArray(strg){
		strg = strg.replace(/left|top/g,'0px');
		strg = strg.replace(/right|bottom/g,'100%');
		strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
		var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
		return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
	}
	
	$.fx.step. backgroundPosition = function(fx) {
		if (!fx.bgPosReady) {
			var start = $.curCSS(fx.elem,'backgroundPosition');
			
			if(!start){//FF2 no inline-style fallback
				start = '0px 0px';
			}
			
			start = toArray(start);
			
			fx.start = [start[0],start[2]];
			
			var end = toArray(fx.options.curAnim.backgroundPosition);
			fx.end = [end[0],end[2]];
			
			fx.unit = [end[1],end[3]];
			fx.bgPosReady = true;
		}
		//return;
		var nowPosX = [];
		nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
		nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
		fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

	};
})(jQuery);


/**
 *  Generate BG Rows
 *  Generate bg rows in groups of 20 that offset the background's rainbow texture
 *
 *  Example of a div it makes:
 *  <div class="bg row1" style="height:21px"></div>
*/
function generateBgRows(bgRowHeight) {

    function _makeARow(rowNum, bgRowHeight) {
        var currentDiv = document.createElement("div"); // Create a div
        var classInfo = "bg row" + rowNum;
        var styleInfo = "height:" + bgRowHeight + "px;";
        currentDiv.setAttribute("class", classInfo);    // Give it its class information
        currentDiv.setAttribute("style", styleInfo);    // Set its height
        document.body.appendChild(currentDiv);          // Inject it to the bottom of <body>
    }

    var needed = Math.ceil((screen.height * 5) / bgRowHeight);
    var rowNum = 1;

    while (needed > 0) { // Make [needed] many chunks
        if (rowNum < 21) {
            _makeARow(rowNum, bgRowHeight);
            rowNum++;
        } else {
            rowNum = 1;
        }
        needed--;
    }

    /*var needed = Math.ceil((screen.height * 5) / (20 * bgRowHeight));
    for (var made = 0; made < needed; made++) {       // Make [needed] many chunks
        for (var rowNum = 0; rowNum < 20; rowNum++) { // 20 is how many rows there are in the CSS
            _makeARow(rowNum + 1, bgRowHeight); // Index of the for loop starts at 0, but the index of the bg row numbers in the CSS starts at 1
        }
    }*/
}


/**
 *  Move Text Around
 *  Moves the text around to random places on the screen
 *
 *  Pick a random x value, y value, and time value
 *  Move the text to that position on the screen in that amount of time
 *  Repeat forever
*/
function moveTextAround() {

    var xDest = -1 * (Math.floor(Math.random() * 201));
    var yDest = -1 * (Math.floor(Math.random() * 201));
    var time  =       Math.floor(Math.random() * 1001) + 2000;
    
    $("#text").animate({
        backgroundPosition: "(" + xDest + "px " + yDest + "px)"
    }, time, "swing", function() {
        moveTextAround();
    });
}
