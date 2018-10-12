/**
 * Make Text
 * 
 * Input:  a list of two strings, the width and height for the SVG, the text's size, and an element ID
 * Output: an SVG, in the form of a new style attribute for the specified element
 *
 * here be dragons
 *
 */
function makeText(stringList, width, height, fontSize, elemID) {

    // Set default values
    if (stringList === undefined) { stringList   = ["h","h"]; }
    if (width      === undefined) { width        = "14";      }
    if (height     === undefined) { height       = "38";      }
    if (fontSize   === undefined) { fontSize     = "20";      }
    if (elemID     === undefined) { elemID       = "text";    }

    var textmask = document.getElementById(elemID);
    
    // SVG data in a background-image
    var styleInfo = "background-image:url(\"data:image/svg+xml;uft8,<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='" + width + "' height='" + height + "'><rect width='100%' height='100%' fill='#000' x='0' y='0' fill-opacity='1' mask='url(#mask)' /><mask id='mask'><rect width='100%' height='100%' fill='#fff' x='0' y='0' /><text x='0' y='15' font-size='" + fontSize + "' fill='#000'>" + stringList[0] + "</text><text x='0' y='34' font-size='" + fontSize + "' fill='#000'>" + stringList[1] + "</text></mask></svg>\");"

    textmask.setAttribute("style", styleInfo);

}
