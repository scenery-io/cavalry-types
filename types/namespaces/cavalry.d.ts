declare namespace cavalry {
  /**
	* The Cavalry module contains a Path class which can be used to construct paths which can then be drawn on screen. Path itself contains several methods.

Several of these methods use the word 'param' or 'parameter'. This is a number between 0..1 which represents a progression along the curve's control cage from 0 (the beginning) to 1 (the end). The control cage, formed by the curve's control points, outlines the basic shape of the curve. Note that a 'param' value of 0.5 does not necessarily represent a position half way along the curve. This is because the relationship between the param value and the curve's length is not linear due to the influence of the curve's control points and its resulting shape. To convert length values into param values, use [paramAtLength](#paramatlength).
	*/
  class Path {
    /**  */
    Drawing: undefined;
    /** Returns a boolean signifying if the path is closed. */
    isClosed: undefined;
    /** Return an object containing x and y keys describing the final point in a path. */
    back: undefined;
    /** Start a new contour. */
    moveTo(x: number, y: number): void;
    /** Draw a line to x,y. */
    lineTo(x: number, y: number): void;
    /** Draw a cubic bezier with two control points and an end point. */
    cubicTo(
      cp1X: number,
      cp1Y: number,
      cp2X: number,
      cp2Y: number,
      endX: number,
      endY: number,
    ): void;
    /** Add a quadratic bézier curve to the path. */
    quadTo(cp1X: number, cp1Y: number, endX: number, endY: number): void;
    /** Draw an arc with two control points and a radius. */
    arcTo(
      cp1X: number,
      cp1Y: number,
      cp2X: number,
      cp2Y: number,
      radius: number,
    ): void;
    /** Adds a conic to the path. Where weight:

* `= 1` - the curve is a quadratic bézier curve (a conic with a weight of 1 is mathematically equivalent to a quadratic curve).
* `< 1` - the curve approximates an ellipse. The smaller the weight, the more the curve leans towards being circular, with smaller weights resulting in sharper curves.
* `> 0` - the curve begins to resemble a hyperbola. As the weight increases, the curve opens up more.
* `= 0` (or a very low value) - these may produce degenerate cases or curves that don't visually change much from a straight line or a very sharp curve. */
    conicTo(
      cp1X: number,
      cp1Y: number,
      endX: number,
      endY: number,
      weight: number,
    ): void;
    /** Convert any conic verbs to quad verbs. This might be useful as not all features in Cavalry support conic verbs. */
    convertConicsToQuads(): void;
    /** Close the path. */
    close(): void;
    /** Add text to the path and position it. The text could be added to a separate path and then `.append()` it into this one if needed. The position arguments may be removed as a result of this. */
    addText(
      text: string,
      fontSize: number,
      positionX: number,
      positionY: number,
    ): void;
    /** Convenience method for drawing a rectangle. */
    addRect(fromX: number, fromY: number, toX: number, toY: number): void;
    /** Convenience method for drawing an ellipse. */
    addEllipse(
      centreX: number,
      centreY: number,
      radiusX: number,
      radiusY: number,
    ): void;
    /** Empty the path. */
    clear(): void;
    /** Move the path by `x` and `y`. */
    translate(x: number, y: number): void;
    /** Rotate the path. */
    rotate(degrees: number): void;
    /** Scale the path. */
    scale(x: number, y: number): void;
    /** Add one path to another. */
    append(pathToAdd: cavalry.Path): void;
    /** Perform a Boolean intersection. */
    intersect(intersectPath: cavalry.Path): void;
    /** Perform a Boolean unite. */
    unite(unitePath: cavalry.Path): void;
    /** Perform a Boolean difference.

The below example can be set on the JavaScript Shape. */
    difference(differencePath: cavalry.Path): void;
    /** Resample lines as curves (the algorithm used by the Pencil Tool). */
    convertToCurves(): void;
    /** Convert (vectorise) any curves into a series of lines. */
    convertToLines(linesPerCurve: number): void;
    /** Converts the Path to an object that can be saved. */
    toObject(): unknown;
    /** Sets the path from an object. */
    fromObject(objectToRead: unknown): void;
    /** Return the bounding box of a path. */
    boundingBox(): {
      x: number;
      y: number;
      width: number;
      height: number;
      centre: { x: number; y: number };
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    /** Return if a path is empty or not. */
    empty(): boolean;
    /** Return the number of points in the path. */
    pointCount(): number;
    /** Return if the point specified by x,y is inside the path (only works on a closed path). */
    contains(x: number, y: number): boolean;
    /** This returns an array of dictionaries and provides a convenient way to iterate and change an existing path as opposed to creating a new [Path Class](#path-class). Each dictionary contains the verb `type` variable e.g. `moveTo` or `lineTo` along with any 'point' objects relevant to the verb.

The dictionary will contain different objects depending on the verb type:

* `moveTo`: contains a `point` object (with x and y variables).
* `lineTo`: contains a `point` object (with x and y variables).
* `quadTo`: contains a `cp1` object representing the control point (with x and y variables) along with a `point` object (with x and y variables). This is the end point of the `quadTo` verb.
* `cubicTo`: contains `cp1` and `cp2` objects representing the first and second control points (both with x and y variables) along with a `point` object (with x and y variables). This is the end point of the `cubicTo` verb.
* `close`: contains no points. */
    pathData(): unknown;
    /** Set the path based on a [pathData](#pathdata) object. */
    setPathData(data: unknown): void;
    /** Grow or shrink a closed Path. The `round` argument determines whether the joins of the rebuilt Path's line segments are rounded or not. */
    offset(distance: number, round: boolean): void;
    /** Reduce the length of a Path by clipping it from its start/end points. */
    trim(start: number, end: number, travel: number, reverse: boolean): void;
    /** Rebuilds the path by sampling points based on a desired 'edgeLength'. */
    resample(edgeLength: number): void;
    /** Returns an array of points at which the path and line intersect. */
    lineIntersections(line: cavalry.Line): unknown;
    /** Returns an array of points at which this path and the given path intersect. */
    pathIntersections(path: cavalry.Path): unknown;
    /** Relax the points in the path away from each other. */
    relax(iterations: number, radius: number, relaxationStrength: number): void;
    /** Smooths the points by averaging their positions. */
    smooth(iterations: number, smoothStrength: number): void;
    /** Scatter points inside the path via dart throwing. Points are relaxed by default. */
    scatter(
      numberOfPoints: number,
      seed: number,
      sequence: number,
      relaxIterations: number,
      relaxDistance: number,
    ): unknown;
    /** Return the length of the path. */
    length(): number;
    /** Return the position of a point at a given parameter along the path. */
    pointAtParam(param: number): { x: number; y: number };
    /** Return a point object with x,y variables that corresponds to a tangent a given parameter along the path. */
    tangentAtParam(param: number): { x: number; y: number };
    /** Calculate the normal vector at the given parameter along the path. */
    normalAtParam(param: number): { x: number; y: number };
    /** Return an angle in degrees representing the tangent a given parameter along the path. */
    angleAtParam(param: number): number;
    /** Given a length, return the corresponding parameter value for that length value. */
    paramAtLength(length: number): number;
    /** Find the closest point on a path to the given x,y values and return an object with position, normal and tangent variables, each of which has x,y variables. */
    findClosestPoint(
      x: number,
      y: number,
    ): {
      position: { x: number; y: number };
      tangent: { x: number; y: number };
      normal: { x: number; y: number };
    };
    /** Converts the path into a set of non-overlapping contours that describe the same area as the original path. */
    mergeOverlaps(): void;
    /** Reverses the Path direction. */
    reverse(): void;
    /** Returns true if the path is clockwise. */
    isClockwise(): boolean;
    /** Multiply the path point positions by a matrix. */
    applyMatrix(matrix: unknown): void;
  }
  /**
	* Represent a line defined by two points with various geometric operations.

For examples see the **Closest Point**, **Intersections** and **Spikes** Demo Scenes via the `Create > Demo Scenes > JavaScript` menu.
	* @example
	* var line = new cavalry.Line(0, 0, 100, 100)
	* console.log(line.length())
	* @example
	* var line = new cavalry.Line(0, 0, 100, 100)
	* console.log(JSON.stringify(line.closestPointTo({ x: 100, y: 50 })))
	*/
  class Line {
    constructor(x1: number, y1: number, x2: number, y2: number);
    /** Gets the length of the line. */
    length(): number;
    /** Returns the angle of the line in degrees. */
    angle(): number;
    /** Sets the length of the line. */
    setLength(length: number): void;
    /** Sets the angle of the line in radians. */
    setAngle(angle: number): void;
    /** Retrieves the start point of the line. */
    start(): { x: number; y: number };
    /** Retrieves the end point of the line. */
    end(): { x: number; y: number };
    /** Calculates the delta (difference in coordinates) between the start and end points of the line. */
    delta(): { x: number; y: number };
    /** Calculates the point at a given parameter along the line. */
    pointAt(param: number): { x: number; y: number };
    /** Calculates the normal vector at a given parameter along the line. */
    normalAt(param: number): { x: number; y: number };
    /** Translates the line by a given point vector. */
    translate(object: unknown): void;
    /** Calculates the shortest distance from the line to a given point. */
    distance(object: unknown): number;
    /** Calculates the closest point on the line to a given point. */
    closestPointTo(object: unknown): { x: number; y: number };
    /** Returns the point at which two lines intersect, or null if there's no intersection. */
    lineIntersection(line: cavalry.Line): { x: number; y: number };
  }
  /**
	* Represents a collection of Points. These objects can be used as Distributions on the Duplicator (for example) via a Custom Distribution.

See `Create > Demo Scenes > JavaScript > Spirograph Distribution` or `Create > Demo Scenes > JavaScript > Circle Packing with Gradient Descent` for examples.
	*/
  class PointCloud {
    /** Append a Point to the cloud. */
    appendPoint(point: cavalry.Point): void;
    /** Append a rotation in degrees to the cloud. Make sure there's a corresponding point. */
    appendRotation(rotation: number): void;
    /** Append a size to the cloud. Make sure there's a corresponding point. */
    appendSize(point: cavalry.Point): void;
  }
  /**
	* Represents a simple point for use in a [Point Cloud](#point-cloud-class).

See `Create > Demo Scenes > JavaScript > Spirograph Distribution` or `Create > Demo Scenes > JavaScript > Circle Packing with Gradient Descent` for examples.
	*/
  class Point {}
  /**
   * The Mesh class is a container which can be used to construct multiple Paths and include [materials](#material-class). If unique Materials for each Path are not required, use [path.append()](#append) to add Paths together.
   */
  class Mesh {
    /** Add a Path to a Mesh with an optional Material. If no material is provided, the path inherits its appearance from the parent mesh or the shape's Fill/Stroke settings. */
    addPath(path: Path, material?: Material): void;
    /** Returns the number of paths in a Mesh. */
    count(): number;
    /** Returns whether or not the Mesh is empty. */
    empty(): boolean;
    /** Erases all Paths on the Mesh. */
    clear(): void;
    /** Returns a standard bounding box object. */
    getBoundingBox(): {
      x: number;
      y: number;
      width: number;
      height: number;
      centre: { x: number; y: number };
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    /** Returns a [pathData](#pathdata) array, which includes verbs and points. This data is designed for point level modification. */
    getPathDataAtIndex(index: number): unknown;
    /** Overwrite a path at a given index with a different Path object. */
    setPathAtIndex(index: number, path: unknown): void;
    /** Sets the [pathData](#pathdata) at a given depth and index. */
    setPathDataAtIndex(index: number, pathData: unknown): void;
    /** Overwrites the material at a given index with a different Material object. */
    setMaterialAtIndex(index: number, material: unknown): void;
    /** Retrieves the Path object at the specified index. Useful for adding to a path. */
    getPathAtIndex(index: number): cavalry.Path;
    /** Adds a child-mesh to this Mesh. */
    addChildMesh(mesh: cavalry.Mesh): void;
    /** Deletes all the child-meshes on this Mesh. */
    clearChildMeshes(): void;
    /** Returns the number of child-meshes. */
    childMeshCount(): number;
    /** Returns the child-mesh at the given index. */
    getChildMeshAtIndex(index: number): cavalry.Mesh;
    /** Sets the child-mesh at the given index. Used when modifying mesh hierarchies, such as in JavaScript Deformers. */
    setChildMeshAtIndex(index: number, mesh: cavalry.Mesh): void;
    /** Returns a Path representing the combined geometry of this mesh and all child meshes. */
    getFlattenedPath(): Path;
  }
  /**
   * Add material (Fill and Stroke) properties to a [Mesh](#mesh-class).
   */
  class Material {
    /** Enable Fill. `bool = true`. */
    fill: undefined;
    /** Enable Stroke. `bool = false`. */
    stroke: undefined;
    /** Set the Fill's color. `hex` */
    fillColor: undefined;
    /** Set the Stroke's color. `hex` */
    strokeColor: undefined;
    /** Set the Stroke's width. `number` */
    strokeWidth: undefined;
    /** Enable trim. `bool` */
    trim: undefined;
    /** Set the start point of the trim (0..1). `number` */
    trimStart: undefined;
    /** Set the end point of the trim (0..1). `number` */
    trimEnd: undefined;
    /** Move the trim along the path. 1.0 is a complete cycle of a closed path. `number` */
    trimTravel: undefined;
    /** Reverses the path direction for the trim effect. `bool` */
    trimReversed: undefined;
  }
  /**
   * Represent a 2D transformation matrix.
   */
  class Matrix {
    /** Sets the position (translation) of the matrix. */
    setPosition(x: number, y: number): void;
    /** Sets the rotation of the matrix in degrees. */
    setRotation(angle: number): void;
    /** Sets the scale factors of the matrix. */
    setScale(x: number, y: number): void;
    /** Sets the skew factors of the matrix. */
    setSkew(x: number, y: number): void;
    /** Return the skew. */
    skew(): void;
    /** Gets the scale factors of the matrix. */
    scale(): unknown;
    /** Gets the position (translation) of the matrix. */
    position(): { x: number; y: number };
    /** Gets the rotation of the matrix in degrees. */
    rotation(): number;
    /** Returns a new matrix that is the result of multiplying this matrix with another matrix. */
    multiply(matrix: cavalry.Matrix): cavalry.Matrix;
    /** Returns a new matrix that is the inverse of this matrix. */
    inverted(): cavalry.Matrix;
    /** Inverts this matrix in place. */
    invert(): void;
    /** Checks if all elements of the matrix are finite. */
    isFinite(): boolean;
    /** Checks if the matrix is an identity matrix. */
    isIdentity(): boolean;
    /** Maps a rectangle `{x:number, y:number, width:number, height:number}` using this matrix and returns the resulting rectangle. */
    mapRect(rect: unknown): {
      x: number;
      y: number;
      width: number;
      height: number;
      centre: { x: number; y: number };
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    /** Maps a point using this matrix and returns the resulting point. */
    mapPoint(point: unknown): { x: number; y: number };
    /** Maps an array of points using this matrix and returns the resulting array of points. */
    mapPoints(points: unknown): unknown;
    /** Set the 3x3 matrix from an array of 9 numbers.

Example usage: */
    setFromArray(array: number[]): void;
  }
  /**
   * Returns a random number. The sequence argument is optional.
   * @example
   * for (var i = 1; i < 10; i += 1) {
   * 	console.log(cavalry.random(0, 10, i))
   * }
   */
  function random(
    min: number,
    max: number,
    seed: number,
    sequence: number,
  ): number;
  /**
   * Returns random numbers with a uniform distribution.
   * @example
   * for (var i = 1; i < 10; i += 1) {
   * 	console.log(cavalry.uniform(0, 10, i))
   * }
   */
  function uniform(min: number, max: number, seed: number): number;
  /**
   * Returns 1d Improved Perlin noise.
   * @example
   * for (var i = 1; i < 10; i += 1) {
   * 	console.log(cavalry.noise1d(i, 0, 1))
   * }
   */
  function noise1d(x: number, seed: number, frequency: number): number;
  /**
   * Returns 2d Improved Perlin noise.
   * @example
   * for (var i = 1; i < 10; i += 1) {
   * 	console.log(cavalry.noise2d(i, api.getFrame(), 0, 1))
   * }
   */
  function noise2d(
    x: number,
    y: number,
    seed: number,
    frequency: number,
  ): number;
  /**
   * Returns 3d Improved Perlin noise.
   * @example
   * for (var i = 1; i < 10; i += 1) {
   * 	console.log(cavalry.noise3d(i, i + 100, api.getFrame(), 0, 0.1))
   * }
   */
  function noise3d(
    x: number,
    y: number,
    z: number,
    seed: number,
    frequency: number,
  ): number;
  /**
   * Get the distance between two points.
   * @example
   * var d = cavalry.dist(0, 0, 100, 100)
   * console.log(d)
   */
  function dist(x1: number, y1: number, x2: number, y2: number): number;
  /**
   * Remap a value into a new range.
   * @example
   * // remap 30 from the range 0..60 to the range 100..300. Prints 200.
   * console.log(cavalry.map(30, 0, 60, 100, 300))
   */
  function map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ): number;
  /**
   * Normalise a value between 0..1.
   * @example
   * // Prints 0.55;
   * console.log(cavalry.norm(55, 0, 100))
   */
  function norm(value: number, min: number, max: number): number;
  /**
   * Clamp a value min and max.
   * @example
   * // Prints 100;
   * console.log(cavalry.clamp(150, 0, 100))
   */
  function clamp(value: number, min: number, max: number): number;
  /**
   * Interpolate between a minimum and maximum value. The value returned is the value at `t` (between 0 and 1).
   */
  function lerp(min: number, max: number, t: number): number;
  /**
   * Convert a vector into an angle (radians).
   * @example
   * var ang = cavalry.angleFromVector(1, 0)
   * console.log(ang)
   * var vec = cavalry.vectorFromAngle(ang)
   * console.log(vec['x'] + ' ' + vec['y'])
   */
  function angleFromVector(x: number, y: number): number;
  /**
   * Convert an angle (radians) into a vector (x, y) with values between 0..1.
   * @example
   * var ang = cavalry.angleFromVector(1, 0)
   * console.log(ang)
   * var vec = cavalry.vectorFromAngle(ang)
   * console.log(vec['x'] + ' ' + vec['y'])
   */
  function vectorFromAngle(angle: number): { x: number; y: number };
  /**
   * Convert a value from radians to degrees.
   * @example
   * console.log(cavalry.radiansToDegrees(2))
   */
  function radiansToDegrees(radians: number): number;
  /**
   * Convert a value from degrees to radians.
   * @example
   * console.log(cavalry.degreesToRadians(90))
   */
  function degreesToRadians(degrees: number): number;
  /**
   * Convert an RGB color to HSV. If the optional normalised argument is set to `false` then RGB values should be within a range of 0..255 otherwise they should be within a range of 0..1.
   * @example
   * var unscaled = cavalry.rgbToHsv(255, 0, 255, false)
   * var scaled = cavalry.rgbToHsv(1, 0, 1, true)
   * console.log(
   * 	'Unscaled = ' +
   * 		JSON.stringify(unscaled) +
   * 		' - Scaled = ' +
   * 		JSON.stringify(scaled),
   * )
   */
  function rgbToHsv(
    r: number,
    g: number,
    b: number,
    normalised?: boolean,
  ): { h: number; s: number; v: number };
  /**
   * Converts normalised RGB color values to their hex color string representation. Set the optional normalised argument to `false` to enter RGB values within a range of 0..255.
   * @example
   * var label1 = new ui.Label('Unscaled')
   * label1.setTextColor(cavalry.rgbToHex(255, 0, 255, false))
   * ui.add(label1)
   *
   * var label2 = new ui.Label('Scaled')
   * label2.setTextColor(cavalry.rgbToHex(1, 0, 1, true))
   * ui.add(label2)
   *
   * ui.show()
   */
  function rgbToHex(
    r: number,
    g: number,
    b: number,
    normalised?: boolean,
  ): string;
  /**
   * Converts normalised RGBA color values to their hex color string representation. Set the optional normalised argument to `false` to enter RGBA values within a range of 0..255.
   * @example
   * var hexColor = cavalry.rgbaToHex(255, 36, 224, 50, false)
   * console.log(hexColor)
   * var shapeId = api.primitive('rectangle', 'My Rect')
   * api.set(shapeId, { 'material.materialColor': hexColor })
   */
  function rgbaToHex(
    r: number,
    g: number,
    b: number,
    a: number,
    normalised?: boolean,
  ): string;
  /**
   * Convert an HSV color value to its RGBA representation, optionally normalised to the range of 0..1. Values should be in the ranges H `0..360`, S `0..1`, V `0..1`.
   * @example
   * var result = cavalry.hsvToRgba(180, 1, 0.5)
   * console.log(JSON.stringify(result))
   */
  function hsvToRgba(
    h: number,
    s: number,
    v: number,
    normalised?: boolean,
  ): { r: number; g: number; b: number; a: number };
  /**
   * Convert a HSV color to a Hex string. Values should be in the ranges H `0..360`, S `0..1`, V `0..1`.
   * @example
   * var result = cavalry.hsvToHex(108, 0.85, 1.0)
   * console.log(result)
   */
  function hsvToHex(h: number, s: number, v: number): string;
  /**
   * Converts a hex color value (e.g `#4ffd7a`) to its RGBA representation, optionally normalised to the range of 0..1. The hex string can optionally include alpha (e.g `#4ffd7a7f`)
   * @example
   * var result = cavalry.hexToRgba('#4ffd7a7f')
   * console.log(JSON.stringify(result))
   */
  function hexToRgba(
    hex: string,
    normalised?: boolean,
  ): { r: number; g: number; b: number; a: number };
  /**
   * Convert a Hex value (e.g `#ffffff`) color to HSV.
   * @example
   * var result = cavalry.hexToHsv('#ff9801')
   * console.log(JSON.stringify(result))
   */
  function hexToHsv(hexValue: string): { h: number; s: number; v: number };
  /**
   * Returns a W3C color name that's the closest match to the specified hex color.
   * @example
   * console.log(cavalry.nameThatColor('#ff9801'))
   */
  function nameThatColor(hexValue: string): string;
  /**
   * Returns true if a font is available to Cavalry.
   * @example
   * console.log(cavalry.fontExists('Lato', 'Regular')) // prints `true`
   */
  function fontExists(fontFamily: string, fontStyle: string): boolean;
  /**
   * Returns a list of all the font families available to Cavalry.
   * @example
   * console.log(cavalry.getFontFamilies())
   */
  function getFontFamilies(): string[];
  /**
   * Returns a list of all the available styles for the given font family.
   * @example
   * console.log(cavalry.getFontStyles('Lato'))
   */
  function getFontStyles(fontFamily: string): string[];
  /**
	* Returns an object representing the bounding box of some text without the need to actually create a text shape.

* **width** - The width of the text
* **height** - The height of the text
* **x** - The left edge of the text
* **y** - The top edge of the text
* **centreX** - The average of the left and right edges
* **centreY** - The average of the top and bottom edges
	* @example
	* var measure = cavalry.measureText('Some text to measure', 'Lato', 'Regular', 72)
	* console.log(JSON.stringify(measure))
	*/
  function measureText(
    string: string,
    fontFamily: string,
    fontStyle: string,
    fontSize: number,
  ): {
    width: number;
    height: number;
    x: number;
    y: number;
    centreX: number;
    centreY: number;
  };
  /**
	* Returns an object containing information about the given font. The resulting metrics are scaled by the font size.

* **top** - greatest extent above origin of any glyph bounding box, typically negative; deprecated with variable fonts
* **ascent** - distance to reserve above baseline, typically negative
* **descent** - distance to reserve below baseline, typically positive
* **bottom** - greatest extent below origin of any glyph bounding box, typically positive; deprecated with variable fonts
* **leading** - distance to add between lines, typically positive or zero
* **averageCharacterWidth** - average character width, zero if unknown
* **maxCharacterWidth** - maximum character width, zero if unknown
* **xMin** - greatest extent to left of origin of any glyph bounding box, typically negative; deprecated with variable fonts
* **xMax** - greatest extent to right of origin of any glyph bounding box, typically positive; deprecated with variable fonts
* **xHeight** - height of lower-case 'x', zero if unknown, typically negative
* **capHeight** - height of an upper-case letter, zero if unknown, typically negative
	* @example
	* var metrics = cavalry.fontMetrics('Lato', 'Regular', 72)
	* console.log(JSON.stringify(metrics))
	*/
  function fontMetrics(
    fontFamily: string,
    fontStyle: string,
    fontSize: number,
  ): {
    top: number;
    ascent: number;
    descent: number;
    bottom: number;
    leading: number;
    averageCharacterWidth: number;
    maxCharacterWidth: number;
    xMin: number;
    xMax: number;
    xHeight: number;
    capHeight: number;
  };
  /**
   * This will return `true` if the version of Cavalry in use is less than the specified version. This is useful to add support for features in scripts that depend on the version of Cavalry.
   * @example
   * // This will return true in Cavalry 1.3.1, and false in Cavalry 1.5.0
   * console.log(cavalry.versionLessThan('1.4.0'))
   */
  function versionLessThan(version: string): boolean;
}
