function divideString(text) {

    // Set default values
    if (text === undefined) { text = "h"; }

    const ORIGINAL    = text;
    const LEN         = text.length;
    var   isOneChar   = false;
    var   midpoint    = 0;
    var   firstHalf   = "";
    var   secondHalf  = "";
    var   finalString = "";

    if (LEN == 1) { // Remember if the text is one character long
        isOneChar = true;
    } else if (LEN % 2 == 0) { // If the text's length is an even number
        midpoint = LEN / 2;    // Put Midpoint at half its length
    } else { // Text's length is an odd number,
        midpoint = (LEN - 1) / 2; // So put Midpoint 1 to the left of half its length
    }

    if (isOneChar) { return [ORIGINAL,ORIGINAL]; } // Don't bother scrambling the text
    else { // "This is where the fun begins." -- Anakin Skywalker
        firstHalf  = text.substring(0,midpoint); // E.g., "1234" -> "12"
        secondHalf = text.substring(midpoint);   // E.g., "1234" -> "34"
        text = secondHalf + " " + firstHalf;     // "34 12"

        finalString = [ORIGINAL,text];
        
        return finalString;
    }

}
