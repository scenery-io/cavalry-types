type integer = number
type float = number

/**
 * The following methods are only available to the JavaScript Utility.
 *
 * Everything in this module is in the `ctx` namespace and so methods need
 * prefixing with `ctx.` e.g `var index = ctx.index;`
 */
declare namespace ctx {
	/**
	 * The current point index. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	const index: integer

	/**
	 * The number of points in total. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	const count: integer

	/**
	 * The X position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	const positionX: float

	/**
	 * The Y position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	const positionY: float

	/**
	 * Save an object for use later. The normal use case for this feature is
	 * when creating solvers – for example, a script that needs to know a
	 * previous value.
	 *
	 * If writing a Path for use later, please use the `path.toObject()` and
	 * `path.fromObject(obj)` methods when saving/loading them.
	 *
	 * @param name
	 * @param objectLiteralToSave
	 *
	 * @example
	 * // Simple example
	 * ctx.saveObject("test", { "someKey": 10 });
	 *
	 * @example
	 * // A path example
	 * const path = new cavalry.Path()
	 * path.moveTo(0, 0)
	 * path.lineTo(0, -100)
	 * path.lineTo(300, -100)
	 * // Save it
	 * ctx.saveObject('path', path.toObject())
	 * // Safety check that there is a saved value
	 * if (ctx.hasObject('path')) {
	 * 	// Load the object
	 * 	const previous = ctx.loadObject('path')
	 * 	// set the path from the object
	 * 	path.fromObject(previous)
	 * }
	 */
	// TODO: Create interface
	function saveObject(name: string, objectLiteralToSave: unknown): void

	/**
	 * Load a saved object.
	 *
	 * @param name
	 *
	 * @example
	 * ctx.saveObject("test", { "someKey": 10 });
	 * const textObj = ctx.loadObject("test");
	 * console.log(textObj.someKey)
	 */
	// TODO: Create interface
	function loadObject(name: string): unknown

	/**
	 * Returns `true` if an object of `name` has been saved and can be loaded.
	 *
	 * @param name
	 *
	 * @example
	 * ctx.saveObject("test", { "someKey": 10 });
	 * if (ctx.hasObject("test")) {
	 * 	const textObj = ctx.loadObject("test");
	 * 	console.log(textObj.someKey)
	 * }
	 */
	function hasObject(name: string): boolean
}
