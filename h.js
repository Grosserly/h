(() => {
	const patternElement = document.querySelector("#text-tile");
	const textElement = document.querySelector("#text");
	const xElement = document.querySelector("#text-x");
	const yElement = document.querySelector("#text-y");


	/**
	 * Uses canvas.measureText to compute and return the width of the given text of
	 * given font in pixels.
	 * 
	 * @param {string} text The text to be rendered.
	 * @param {string} font The css font descriptor that text is to be rendered with
	 *                      (e.g. "bold 14px verdana").
	 * @return {void}
	 * 
	 * @see https://stackoverflow.com/a/21015393/16247437
	 */
	function getTextWidth(text, font) {
		// re-use canvas object for better performance
		const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		const context = canvas.getContext("2d");
		context.font = font;
		return context.measureText(text).width;
	}


	/**
	 * Set the text based on the URL hash (e.g. bruh.com/h#texthere).
	 * 
	 * @param {HashChangeEvent} [event]
	 * @return {void}
	 */
	function updateText(event) {
		event?.preventDefault();
		const text = window.location.hash.slice(1) || "h";
		textElement.textContent = text;
		patternElement.setAttribute(
			"width",
			getTextWidth(text, "16pt sans-serif") + 4
		);
	}


	function moveText(lastX, lastY, newX, newY, speed) {
		xElement.setAttribute("from", lastX);
		xElement.setAttribute("to", newX);
		xElement.setAttribute("dur", speed + "ms");
		yElement.setAttribute("from", lastY);
		yElement.setAttribute("to", newY);
		yElement.setAttribute("dur", speed + "ms");

		// Trigger animation restart
		xElement.beginElement();
		yElement.beginElement();
	}


	// Move the text a random distance every 2-3 seconds
	function moveTextAround(lastX=0, lastY=0) {
		const speed = Math.floor(Math.random() * 1000) + 2000;
		const newX = (Math.random() * 200 + lastX) * (Math.random() * 2 - 1);
		const newY = (Math.random() * 200 + lastY) * (Math.random() * 2 - 1);
		setTimeout( () => {
			moveText(lastX, lastY, newX, newY, speed);
			moveTextAround(newX, newY);
		}, speed);
	}


	updateText();
	window.addEventListener("hashchange", updateText, false);
	moveTextAround();
})();
