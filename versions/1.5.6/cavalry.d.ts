/**
 * This namespace gives access to the `Path` class, functions for creating noise and
 * random numbers along with a number of utilities to make working with color
 * easier, and, a whole host of maths functions such as `clamp`, `norm`, `map` and
 * `dist`. The methods are available to the JavaScript Utility, and the JavaScript
 * Editor. Everything in this namespace needs to be prefixed with `cavalry.`
 *
 * @example
 * var distance = cavalry.dist(0, 0, 100, 200);
 */
declare namespace cavalry {
	/**
	 * Construct paths which can then be drawn on screen.
	 */
	class Path {
		/**
		 * Returns a boolean signifying if the path is closed.
		 */
		readonly isClosed: boolean

		/**
		 * Returns the length of the path
		 */
		readonly length: float

		/**
		 * Start a new contour
		 *
		 * @param x X coordinate
		 * @param y Y coordinate
		 */
		moveTo(x: float, y: float): void

		/**
		 * Draw a line to x, y
		 *
		 * @param x X coordinate
		 * @param y Y coordinate
		 */
		lineTo(x: float, y: float): void

		/**
		 * Draw a cubic bezier with two control points, and an end point.
		 *
		 * @param cp1X X position of the 1st control point
		 * @param cp1Y Y position of the 1st control point
		 * @param cp2X X position of the 2nd control point
		 * @param cp2Y Y position of the 2nd control point
		 * @param endX X position of the end point
		 * @param endY Y position of the end point
		 */
		cubicTo(
			cp1X: float,
			cp1Y: float,
			cp2X: float,
			cp2Y: float,
			endX: float,
			endY: float
		): void

		/**
		 * Draw an arc with two control points and a radius
		 *
		 * @param x1 X-axis of the arc's start point
		 * @param y1 Y-axis of the arc's start point
		 * @param x2 X-axis of the arc's end point
		 * @param y2 Y-axis of the arc's end point
		 * @param radius Distance from arc to circle center
		 */
		arcTo(x1: float, y1: float, x2: float, y2: float, radius: float): void

		/**
		 * Close the path
		 */
		close(): void

		/**
		 * Add text to the path and position it. The text could be added to a
		 * separate path and then `.append()` it into this one if needed. The
		 * position arguments may be removed as a result of this.
		 *
		 * @param text Text to draw
		 * @param fontSize Font size of the text
		 * @param positionX X position of the text
		 * @param positionY Y position of the text
		 */
		addText(
			text: string,
			fontSize: integer,
			positionX: float,
			positionY: float
		): void

		/**
		 * Convenience method for drawing a rectangle.
		 *
		 * @param fromX X position of the starting corner
		 * @param fromY Y position of the starting corner
		 * @param toX X position of the ending corner
		 * @param toY Y position of the ending corner
		 */
		addRect(fromX: float, fromY: float, toX: float, toY: float): void

		/**
		 * Convenience method for drawing an ellipse.
		 *
		 * @param centreX X position of the centre
		 * @param centreY Y position of the centre
		 * @param radiusX Radius on the X axis
		 * @param radiusY Radius on the Y axis
		 */
		addEllipse(
			centreX: float,
			centreY: float,
			radiusX: float,
			radiusY: float
		): void

		/**
		 * Empty the path
		 */
		clear(): void

		/**
		 * Move the path by x and y.
		 *
		 * @param x Amount of translation on the X axis
		 * @param y Amount of translation on the Y axis
		 */
		translate(x: float, y: float): void

		/**
		 * Rotate the path.
		 *
		 * @param degrees Amount of degrees to rotate the path
		 */
		rotate(degrees: float): void

		/**
		 * Scale the path.
		 *
		 * @param x Amount to scale on the X axis
		 * @param y Amount to scale on the Y axis
		 */
		scale(x: float, y: float): void

		/**
		 * Add one path to another
		 *
		 * @param pathToAdd `Path` to be added to the current path
		 */
		append(pathToAdd: Path): void

		/**
		 * Perform a Boolean intersection.
		 *
		 * @param intersectPath `Path` that acts as the intersect on the current path
		 */
		intersect(intersectPath: Path): void

		/**
		 * Perform a Boolean unite.
		 *
		 * @param unitePath `Path` that gets united with the current path
		 */
		unite(unitePath: Path): void

		/**
		 * Perform a Boolean difference.
		 *
		 * @param differencePath `Path` that acts as the boolean on the current path
		 *
		 * @example
		 * // The below example can be set on the JavaScript Shape.
		 * function boolTest() {
		 *   var mainPath = new cavalry.Path();
		 *   mainPath.addRect(-100, 100, 100, -100);
		 *   var boolTest = new cavalry.Path();
		 *   boolTest.addEllipse(0, 0, 200, 40);
		 *   mainPath.difference(boolTest);
		 *   return mainPath;
		 * }
		 * boolTest();
		 */
		difference(differencePath: Path): void

		/**
		 * Resample lines as curves (the algorithm used by our Pencil Tool).
		 */
		convertToCurves(): void

		/**
		 * Convert (vectorise) any curves into a series of lines.
		 *
		 * @param linesPerCurve Number of lines per curve
		 */
		convertToLines(linesPerCurve: integer): void

		/**
		 * Converts the Path to an object that can be saved and read at a later time
		 *
		 * @example
		 * const path = new cavalry.Path();
		 * path.moveTo(0.,0.);
		 * path.lineTo(0.,-100.);
		 * path.lineTo(300.,-100.);
		 * // Convert to an Object
		 * const js = path.toObject();
		 * // Convert from a saved object
		 * path.fromObject(js);
		 * console.log(path.length);
		 */
		// TODO: Define return value
		toObject(): object

		/**
		 * Sets the path data from an object
		 *
		 * @param objectToRead TODO: Description
		 *
		 * @example
		 * const path = new cavalry.Path();
		 * path.moveTo(0.,0.);
		 * path.lineTo(0.,-100.);
		 * path.lineTo(300.,-100.);
		 * // Convert to an Object
		 * const js = path.toObject();
		 * // Convert from a saved object
		 * path.fromObject(js);
		 * console.log(path.length);
		 */
		// TODO: Define `objectToRead` value
		fromObject(objectToRead: object): void

		/**
		 * Return an object containing `x` and `y` keys describing the final point in a path.
		 */
		back(): { x: number; y: number }

		/**
		 * Return the bounding box of a path.
		 *
		 * @example
		 * const path = new cavalry.Path();
		 * path.addText("Some text!", 22, 0, 10);
		 * const bbox = path.boundingBox();
		 * console.log(JSON.stringify(bbox));
		 */
		boundingBox(): { posX: float; posY: float; width: float; height: float }
	}

	// Math Helper Functions

	/**
	 * Returns a random number
	 *
	 * @param min Minimum allowed value
	 * @param max Maximum allowed value
	 * @param seed Seed value
	 *
	 * @example
	 * for (let i = 1; i < 10; i++) {
	 *   console.log(cavalry.random(0, 10, i));
	 * }
	 */
	function random(min: float, max: float, seed: integer): float

	/**
	 * Returns random numbers with a uniform distribution
	 *
	 * @param min Minimum allowed value
	 * @param max Maximum allowed value
	 * @param seed Seed value
	 *
	 * @example
	 * 	for (var i = 1; i < 10; i++) {
	 *   console.log(cavalry.uniform(0, 10, i));
	 * }
	 */
	function uniform(min: float, max: float, seed: integer): float

	/**
	 * Returns 1D improved Perlin noise
	 *
	 * @param x TODO: Description
	 * @param seed TODO: Description
	 * @param frequency TODO: Description
	 *
	 * @example
	 * for (let i = 1; i < 10; i++) {
	 *   console.log(cavalry.noise1d(i, 0, 1));
	 * }
	 */
	function noise1d(x: float, seed: integer, frequency: float): float

	/**
	 * Returns 2D improved Perlin noise
	 *
	 * @param x TODO: Description
	 * @param y TODO: Description
	 * @param seed TODO: Description
	 * @param frequency TODO: Description
	 *
	 * @example
	 * for (let i = 1; i < 10; i++) {
	 *   console.log(cavalry.noise2d(i, api.getFrame(), 0, 1));
	 * }
	 */
	function noise2d(x: float, y: float, seed: integer, frequency: float): float

	/**
	 * Returns 3D improved Perlin noise
	 *
	 * @param x TODO: Description
	 * @param y TODO: Description
	 * @param z TODO: Description
	 * @param seed TODO: Description
	 * @param frequency TODO: Description
	 *
	 * @example
	 * for (let i = 1; i < 10; i++) {
	 *   console.log(cavalry.noise3d(i, i + 100, api.getFrame(), 0, 0.1));
	 * }
	 */
	function noise3d(
		x: float,
		y: float,
		z: float,
		seed: integer,
		frequency: float
	): float

	/**
	 * Returns the distance between two points
	 *
	 * @param x1 X position of first point
	 * @param y1 Y position of first point
	 * @param x2 X position of second point
	 * @param y2 Y position of second point
	 *
	 * @example
	 * const d = cavalry.dist(0, 0, 100, 100);
	 * console.log(d);
	 */
	function dist(x1: float, y1: float, x2: float, y2: float): float

	/**
	 * Remap a value into a new range
	 *
	 * @param value TODO: Description
	 * @param inMin TODO: Description
	 * @param inMax TODO: Description
	 * @param outMin TODO: Description
	 * @param outMax TODO: Description
	 *
	 * @example
	 * // Remap 30 from the range 0..60 to the range 100..300. Returns 200.
	 * console.log(cavalry.map(30, 0, 60, 100, 300));
	 */
	function map(
		value: float,
		inMin: float,
		inMax: float,
		outMin: float,
		outMax: float
	): float

	/**
	 * Normalise a value between 0 and 1
	 *
	 * @param value Value to be normalised
	 * @param min TODO: Description
	 * @param max TODO: Description
	 *
	 * @example
	 * // Returns 0.55
	 * console.log(cavalry.norm(55, 0, 100));
	 */
	function norm(value: float, min: float, max: float): float

	/**
	 * Clamp a value between min and max.
	 *
	 * @param value Value to be clamped
	 * @param min Minimum allowed value
	 * @param max Maximum allowed value
	 *
	 * @example
	 * // Returns 100
	 * console.log(cavalry.clamp(150, 0, 100));
	 */
	function clamp(value: float, min: float, max: float): float

	/**
	 * Interpolate between a minimum and maximum value. The value returned is the value at `t` (between 0 and 1).
	 *
	 * @param min Minimum value
	 * @param max Maximum value
	 * @param t Time between 0 and 1
	 */
	function lerp(min: float, max: float, t: float): float

	/**
	 * Convert a vector into an angle (radians)
	 *
	 * @param x X position
	 * @param y Y position
	 *
	 * @example
	 * const ang = cavalry.angleFromVector(1, 0);
	 * console.log(ang);
	 * const vec = cavalry.vectorFromAngle(ang);
	 * console.log(JSON.stringify(vec));
	 */
	function angleFromVector(x: float, y: float): number

	/**
	 * Convert an angle (radians) into a vector (x, y) with values between 0 and 1
	 *
	 * @param angle Angle as a float
	 *
	 * @example
	 * const ang = cavalry.angleFromVector(1, 0);
	 * console.log(ang);
	 * const vec = cavalry.vectorFromAngle(ang);
	 * console.log(JSON.stringify(vec));
	 */
	function vectorFromAngle(angle: float): { x: number; y: number }

	// Color Helper Functions

	/**
	 * Convert an RGB color to HSV
	 *
	 * If the scaled argument is set to `true` (default) then RGB values
	 * should be in the range 0 to 1.
	 *
	 * If set to `false` then RGB values should be in the 0 to 255 range.
	 *
	 * @param r Red, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param g Green, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param b Blue, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param scaled Accept normalised input range. Defaults to `true`
	 *
	 * @example
	 * const unscaled = cavalry.rgbToHsv(255, 0, 255, false)
	 * const scaled = cavalry.rgbToHsv(1, 0, 1, true)
	 * console.log(
	 * 	`Unscaled = ${JSON.stringify(unscaled)} - Scaled = ${JSON.stringify(scaled)}`
	 * )
	 */
	function rgbToHsv(
		r: float,
		g: float,
		b: float,
		scaled?: boolean
	): { h: number; s: number; v: number }

	/**
	 * Convert an RGB color to a Hex string, exluding the `#`
	 *
	 * If the scaled argument is set to `true` (default) then RGB values should
	 * be in the range 0 to 1.
	 *
	 * If set to `false` then RGB values should be in the 0 to 255 range.
	 * @param r Red, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param g Green, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param b Blue, between 0 and 1 (or 0 and 255 when `scaled` is `false`)
	 * @param scaled Accept normalised input range. Defaults to `true`
	 *
	 * @example
	 * const label1 = new ui.Label('Unscaled')
	 * label1.setTextColor(`#${cavalry.rgbToHex(255, 0, 255, false)}`)
	 * ui.add(label1)
	 * const label2 = new ui.Label('Scaled')
	 * label2.setTextColor(`#${cavalry.rgbToHex(1, 0, 1, true)}`)
	 * ui.add(label2)
	 * ui.show()
	 */
	function rgbToHex(r: float, g: float, b: float, scaled?: boolean): string

	/**
	 * Convert an HSV color to RGB.
	 *
	 * @param h Hue, between 0 and 360
	 * @param s Saturation, between 0 and 1
	 * @param v Value, between 0 and 1
	 *
	 * @example
	 * const result = cavalry.hsvToRgb(180, 1, 0.5);
	 * console.log(JSON.stringify(result));
	 */
	function hsvToRgb(
		h: float,
		s: float,
		v: float
	): { r: number; g: number; b: number }

	/**
	 * Convert an HSV color to a Hex string excluding `#`
	 *
	 * @param h Hue, between 0 and 360
	 * @param s Saturation, between 0 and 1
	 * @param v Value, between 0 and 1
	 *
	 * @example
	 * const result = cavalry.hsvToHex(1, 1, 1);
	 * console.log(result);
	 */
	function hsvToHex(h: float, s: float, v: float): string

	/**
	 * Convert an Hex value (e.g `#ffffff`) color to RGB.
	 *
	 * @param hexValue The RGB hex value (`#` is optional)
	 *
	 * @example
	 * const result = cavalry.hexToRgb("#fc5900");
	 * console.log(JSON.stringify(result));
	 */
	function hexToRgb(hexValue: string): { r: number; g: number; b: number }

	/**
	 * Convert an Hex value (e.g `#ffffff`) color to HSV.
	 *
	 * @param hexValue The RGB hex value (`#` is optional)
	 *
	 * @example
	 * const result = cavalry.hexToHsv("#ff9801");
	 * console.log(JSON.stringify(result));
	 */
	function hexToHsv(hexValue: string): { h: number; s: number; v: number }

	// Utilities
	/**
	 * This will return `true` if the version of Cavalry in use is less
	 * than the specified version. This is useful to add support for
	 * features in scripts that depend on the version of Cavalry.
	 *
	 * @param version Formatted as `1.5.0` (`MAJOR.MINOR.PATCH`) or for prereleases `1.6.0-beta.1` (`MAJOR.MINOR.PATCH.PRE-RELEASE-TYPE.NUMBER`)
	 *
	 * @example
	 * console.log(cavalry.versionLessThan("1.5.1"));
	 */
	function versionLessThan(version: string): boolean

	/**
	 * Returns `true` if a font is available to Cavalry.
	 *
	 * @param fontFamily Display name of the font family
	 * @param fontStyle Name of the font style
	 *
	 * @example
	 * // Prints `true`
	 * console.log(cavalry.fontExists("Lato", "Regular"));
	 */
	function fontExists(fontFamily: string, fontStyle: string): boolean

	/**
	 * Returns a list of all the font families available to Cavalry.
	 *
	 * @example
	 * console.log(cavalry.getFontFamilies());
	 */
	function getFontFamilies(): string[]

	/**
	 * Returns a list of all the available styles for the given font family.
	 *
	 * @param fontFamily Display name of the font family
	 *
	 * @example
	 * console.log(cavalry.getFontStyles("Lato"));
	 */
	function getFontStyles(fontFamily: string): string[]

	/**
	 * Returns an object representing the bounding box of some text without the
	 * need to actually create a text shape.
	 *
	 * @param string Text to be measured
	 * @param fontFamily Display name of the font family
	 * @param fontStyle Name of the font style
	 * @param fontSize Size of the font in points
	 *
	 * @example
	 * const measure = cavalry.measureText("Some text to measure", "Lato", "Regular", 72);
	 * console.log(JSON.stringify(measure));
	 */
	function measureText(
		string: string,
		fontFamily: string,
		fontStyle: string,
		fontSize: number
	): {
		width: float
		height: float
		x: float
		y: float
		centreX: float
		centreY: float
	}
	// - width - The width of the text
	// - height - The height of the text
	// - x - The left edge of the text
	// - y - The top edge of the text
	// - centreX - The average of the left and right edges
	// - centreY - The average of the top and bottom edges

	/**
	 * Returns an object containing information about the given font. The
	 * resulting metrics are scaled by the font size.
	 *
	 * @param fontFamily Display name of the font family
	 * @param fontStyle Name of the font style
	 * @param fontSize Size of the font in points
	 *
	 * @example
	 * const metrics = cavalry.fontMetrics("Lato", "Regular", 72);
	 * console.log(JSON.stringify(metrics));
	 */
	function fontMetrics(
		fontFamily: string,
		fontStyle: string,
		fontSize: number
	): {
		top: float
		ascent: float
		descent: float
		bottom: float
		leading: integer
		averageCharacterWidth: float
		maxCharacterWidth: float
		xMin: float
		xMax: float
		xHeight: float
		capHeight: float
	}
	// - top - greatest extent above origin of any glyph bounding box, typically negative; deprecated with variable fonts
	// - ascent - distance to reserve above baseline, typically negative
	// - descent - distance to reserve below baseline, typically positive
	// - bottom - greatest extent below origin of any glyph bounding box, typically positive; deprecated with variable fonts
	// - leading - distance to add between lines, typically positive or zero
	// - averageCharacterWidth - average character width, zero if unknown
	// - maxCharacterWidth - maximum character width, zero if unknown
	// - xMin - greatest extent to left of origin of any glyph bounding box, typically negative; deprecated with variable fonts
	// - xMax - greatest extent to right of origin of any glyph bounding box, typically positive; deprecated with variable fonts
	// - xHeight - height of lower-case 'x', zero if unknown, typically negative
	// - capHeight - height of an upper-case letter, zero if unknown, typically negative
}
