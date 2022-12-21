/**
 * This module gives access to the Path class, functions for creating noise and
 * random numbers along with a number of utilities to make working with color
 * easier, and, a whole host of maths functions such as clamp, norm, map and
 * dist. The following methods are available to the JavaScript Utility, and the
 * JavaScript Editor. Everything in this module is in the cavalry namespace and
 * so methods need prefixing with `cavalry.` e.g `var distance = cavalry.dist(0,0,100,200);`
 */
declare namespace cavalry {
	// TODO: Improve description
	/**
	 * The Cavalry module contains a Path class which can be used to construct paths which
	 * can then be drawn on screen. Path itself contains several methods.
	 */
	class Path {
		/**
		 * Start a new contour
		 *
		 * @param x
		 * @param y
		 */
		moveTo(x: float, y: float): void

		/**
		 * Draw a line to x, y
		 *
		 * @param x The `x` coordinate
		 * @param y The `y` coordinate
		 */
		lineTo(x: float, y: float): void

		/**
		 * Draw a cubic bezier with two control points, and an end point.
		 *
		 * @param cp1X
		 * @param cp1Y
		 * @param cp2X
		 * @param cp2Y
		 * @param endX
		 * @param endY
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
		 * Close the path
		 */
		close(): void

		/**
		 * Add text to the path and position it. You could add the text to a
		 * separate path and then `.append()` it into this one if needed. The
		 * position arguments may be removed as a result of this.
		 *
		 * @param text
		 * @param fontSize
		 * @param positionX
		 * @param positionY
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
		 * @param fromX
		 * @param fromY
		 * @param toX
		 * @param toY
		 */
		addRect(fromX: float, fromY: float, toX: float, toY: float): void

		/**
		 * Convenience method for drawing an ellipse.
		 *
		 * @param centreX
		 * @param centreY
		 * @param radiusX
		 * @param radiusY
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
		 * Returns a boolean signifying if the path is closed.
		 */
		isClosed(): boolean

		/**
		 * Returns the length of the path
		 */
		length(): float

		/**
		 * Move the path by x and y.
		 *
		 * @param x
		 * @param y
		 */
		translate(x: float, y: float): void

		/**
		 * Rotate the path.
		 *
		 * @param degrees
		 */
		rotate(degrees: float): void

		/**
		 * Scale the path.
		 *
		 * @param x
		 * @param y
		 */
		scale(x: float, y: float): void

		/**
		 * Add one path to another
		 *
		 * @param pathToAdd
		 */
		append(pathToAdd: Path): void

		/**
		 * Perform a Boolean intersection.
		 *
		 * @param intersectPath
		 */
		intersect(intersectPath: Path): void

		/**
		 * Perform a Boolean unite.
		 *
		 * @param unitePath
		 */
		unite(unitePath: Path): void

		/**
		 * Perform a Boolean difference.
		 *
		 * @param differencePath
		 */
		difference(differencePath: Path): void

		// TODO: Improve example to get a result
		// The below example can be set on the JavaScript Shape.
		// ```js
		// function boolTest() {
		//     var mainPath = new cavalry.Path();
		//     mainPath.addRect(-100,100,100,-100);
		//     var boolTest = new cavalry.Path();
		//     boolTest.addEllipse(0,0,200,40);
		//     mainPath.difference(boolTest);
		//     return mainPath;
		// }

		// boolTest();
		// ```

		/**
		 * Resample lines as curves (the algorithm used by our Pencil Tool).
		 * TODO: Requires clarification
		 */
		convertToCurves(): void

		/**
		 * Convert (vectorise) any curves into a series of lines.
		 *
		 * @param linesPerCurve
		 */
		convertToLines(linesPerCurve: integer): void

		/**
		 * Converts the Path to an object that can be saved and read at a later time
		 */
		// TODO: Create interface
		toObject(): object

		// ```js
		// var path = new cavalry.Path();
		// path.moveTo(0.,0.);
		// path.lineTo(0.,-100.);
		// path.lineTo(300.,-100.);
		// // Convert to an Object
		// var js = path.toObject();
		// // Convert from a saved object
		// path.fromObject(js);
		// console.log(path.length);
		// ```

		/**
		 * Sets the path data from an object
		 *
		 * @param objectToRead
		 */
		// TODO: Create interface
		fromObject(objectToRead: object): void

		// ```js
		// var path = new cavalry.Path();
		// path.moveTo(0.,0.);
		// path.lineTo(0.,-100.);
		// path.lineTo(300.,-100.);
		// // Convert to an Object
		// var js = path.toObject();
		// // Convert from a saved object
		// path.fromObject(js);
		// console.log(path.length);
		// ```
	}

	// Math Helper Functions
	/**
	 * Returns a random number
	 *
	 * @param min
	 * @param max
	 * @param seed
	 */
	function random(min: float, max: float, seed: integer): float
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.random(0, 10, i));
	// }

	/**
	 * Returns random numbers with a uniform distribution
	 *
	 * @param min
	 * @param max
	 * @param seed
	 */
	function uniform(min: float, max: float, seed: integer): float
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.uniform(0, 10, i));
	// }

	/**
	 * Returns 1d Improved Perlin noise
	 *
	 * @param x
	 * @param seed
	 * @param frequency
	 */
	function noise1d(x: float, seed: integer, frequency: float)
	// for (var i = 1; i < 10; i += 1){
	//     console.log(cavalry.noise1d(i, 0, 1));
	// }

	/**
	 * Returns 2d Improved Perlin noise
	 *
	 * @param x
	 * @param y
	 * @param seed
	 * @param frequency
	 */
	function noise2d(x: float, y: float, seed: integer, frequency: float)
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.noise2d(i, api.getFrame(), 0, 1));
	// }

	/**
	 * Returns 3d Improved Perlin noise
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @param seed
	 * @param frequency
	 */
	function noise3d(
		x: float,
		y: float,
		z: float,
		seed: integer,
		frequency: float
	)
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.noise3d(i, i+100, api.getFrame(), 0, 0.1));
	// }

	/**
	 * Get the distance between two points
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	function dist(x1: float, y1: float, x2: float, y2: float)
	// var d = cavalry.dist(0,0,100,100)
	// console.log(d);

	/**
	 * Remap a value into a new range
	 *
	 * @param value
	 * @param inMin
	 * @param inMax
	 * @param outMin
	 * @param outMax
	 */
	function map(
		value: float,
		inMin: float,
		inMax: float,
		outMin: float,
		outMax: float
	)
	// remap 30 from the range 0..60 to the range 100..300. Prints 200.
	// console.log(cavalry.map(30,0,60,100,300));

	/**
	 * Normalise a value between 0..1
	 *
	 * @param value
	 * @param min
	 * @param max
	 */
	function norm(value: float, min: float, max: float)
	// Prints 0.55;
	// console.log(cavalry.norm(55,0,100));

	/**
	 * Clamp a value min and max.
	 *
	 * @param value
	 * @param min
	 * @param max
	 */
	function clamp(value: float, min: float, max: float)
	// Prints 100;
	// console.log(cavalry.clamp(150,0,100));

	/**
	 * Interpolate between a minimum and maximum value. The value returned is the value at `t` (between 0 and 1).
	 *
	 * @param min
	 * @param max
	 * @param t
	 */
	function lerp(min: float, max: float, t: float)

	/**
	 * Convert an angle (radians) into a vector (x, y) with values between 0..1
	 *
	 * @param angle
	 */
	// TODO: Doesn't exist?
	function angleToVector(angle: float): object
	// var ang = cavalry.angleFromVector(1,0);
	// console.log(ang);
	// var vec = cavalry.vectorFromAngle(ang);
	// console.log(vec["x"]+" "+vec["y"]);

	/**
	 * Convert a vector into an angle (radians)
	 *
	 * @param x
	 * @param y
	 */
	function vectorToAngle(x: float, y: float): float
	// var ang = cavalry.angleFromVector(1,0);
	// console.log(ang);
	// var vec = cavalry.vectorFromAngle(ang);
	// console.log(vec["x"]+" "+vec["y"]);

	// Color Helper Functions
	/**
	 * Convert an RGB color to HSV. RGB values should be in the range 0..1
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function rgbToHsv(h: float, s: float, v: float): object
	// var result = cavalry.rgbToHsv(0.5,1,0.5);
	// console.log(JSON.stringify(result));

	/**
	 * Convert an RGB color to a Hex string. RGB values should be in the range 0..1
	 *
	 * @param r
	 * @param g
	 * @param b
	 */
	function rgbToHex(r: float, g: float, b: float): string
	// var result = cavalry.rgbToHex(1,1,1);
	// console.log(result);

	/**
	 * Convert an HSV color to RGB.
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function hsvToRgb(h: float, s: float, v: float): object
	// var result = cavalry.hsvToRgb(180,1,0.5);
	// console.log(JSON.stringify(result));

	/**
	 * Convert an HSV color to a Hex string.
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function hsvToHex(h: float, s: float, v: float): object
	// var result = cavalry.rgbToHsv(0.5,1,0.5);
	// console.log(result);

	/**
	 * Convert an Hex value (e.g `#ffffff`) color to RGB.
	 *
	 * @param hexValue
	 */
	function hexToRgb(hexValue: string): object
	// var result = cavalry.hexToRgb("#fc5900");
	// console.log(JSON.stringify(result));

	/**
	 * Convert an Hex value (e.g `#ffffff`) color to HSV.
	 *
	 * @param hexValue
	 */
	function hexToHsv(hexValue: string): object
	// var result = cavalry.hexToHsv("#ff9801");
	// console.log(JSON.stringify(result));

	// Utilities
	/**
	 * This will return if the specified version is less than the currently open app version. This is useful to add support for features in scripts depending on the version of Cavalry currently running.
	 *
	 * @param version
	 */
	function versionLessThan(version: string): boolean
	/// this will return true in Cavalry 1.3, and false in Cavalry 2.0
	// console.log(cavalry.versionLessThan("1.5.1"));
}
