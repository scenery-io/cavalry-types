/**
 * The following methods are only available to the JavaScript Utility.
 * Everything in this module is in the `ctx` namespace and so methods need
 * prefixing with `ctx.` e.g `var index = ctx.index;`
 */
declare namespace ctx {
	// TODO: All of these are readonly?
	/**
	 * The current point index. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	let index: integer

	/**
	 * The number of points in total. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	let count: integer

	/**
	 * The X position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	let positionX: float

	/**
	 * The Y position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	let positionY: float

	/**
	 * Saved an object for use later. The normal use case for this feature
	 * is when creating solvers, i.e a script that needs to know a previous
	 * value. The value to be saved needs to be an object. If writing a
	 * Path for use later, please use the `path.toObject()` or
	 * `path.fromObject(obj)` methods when saving/loading them.
	 *
	 * @param name
	 * @param objectLiteralToSave
	 */
	// TODO: Create interface
	function saveObject(name: string, objectLiteralToSave: object): any
	// ```js
	// // Simple example
	// ctx.saveObject("test", {"someKey": 10});
	// // A path example
	// // Create a path
	// var path = new cavalry.Path();
	// path.moveTo(0.,0.);
	// path.lineTo(0.,-100.);
	// path.lineTo(300.,-100.);
	// // Save it
	// ctx.saveObject("path", path.toObject());
	// // Safety check that there is a saved value
	// if (ctx.hasObject("path")
	//     // Load the object
	//     let previous = ctx.loadObject("path");
	//     // set the path from the object
	//     path.fromObject(previous);
	// }
	// ```
	// TODO: Create interface
	function loadObject(name: string): object
	// ```js
	// ctx.saveObject("test", {"someKey": 10});
	// var textObj = ctx.loadObject("test");
	// console.log(textObj["someKey"])
	// ```

	/**
	 * Returns `true` is an object of name has been saved and can be loaded.
	 *
	 * @param name
	 */
	function hasObject(name: string): boolean
	// ```js
	// ctx.saveObject("test", {"someKey": 10});
	// if (ctx.hasObject("test")) {
	//     /// do something
	// }
	// ```
}
