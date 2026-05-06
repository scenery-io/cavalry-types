declare namespace ctx {
  /**
   * The current point index. Available when using a [Duplicator](../../nodes/shapes/duplicator.mdx) (or other Layer that generates indices, such as the [Connect Shape](../../nodes/shapes/connect-shape.mdx) or [Trails](../../nodes/shapes/trails.mdx)).
   */
  const index: number;
  /**
   * The number of points in total. Available when using a [Duplicator](../../nodes/shapes/duplicator.mdx) (or other Layer that generates indices, such as the [Connect Shape](../../nodes/shapes/connect-shape.mdx) or [Trails](../../nodes/shapes/trails.mdx)).
   */
  const count: number;
  /**
   * The X position of the current point. Available when using a [Duplicator](../../nodes/shapes/duplicator.mdx) (or other Layer that generates indices, such as the [Connect Shape](../../nodes/shapes/connect-shape.mdx) or [Trails](../../nodes/shapes/trails.mdx)).
   */
  const positionX: number;
  /**
   * The Y position of the current point. Available when using a [Duplicator](../../nodes/shapes/duplicator.mdx) (or other Layer that generates indices, such as the [Connect Shape](../../nodes/shapes/connect-shape.mdx) or [Trails](../../nodes/shapes/trails.mdx)).
   */
  const positionY: number;
  /**
   * The Id of the Attribute being calculated.
   */
  const attributeId: string;
  /**
   * The Id of the Layer being calculated.
   */
  const layerId: string;
  /**
	* Save an object for use later. The normal use case for this feature is when creating solvers – for example, a script that needs to know a previous value.

The value to be saved needs to be an object.

If writing a Path for use later, please use the `path.toObject()`/ `path.fromObject(obj)` methods when saving/loading them.
	* @example
	* // Simple example
	* ctx.saveObject('test', { someKey: 10 })
	* 
	* // A path example
	* // Create a path
	* var path = new cavalry.Path()
	* path.moveTo(0, 0)
	* path.lineTo(0, -100)
	* path.lineTo(300, -100)
	* // Save it
	* ctx.saveObject('path', path.toObject())
	* // Safety check that there is a saved value
	* if (ctx.hasObject('path')) {
	* 	// Load the object
	* 	let previous = ctx.loadObject('path')
	* 	// set the path from the object
	* 	path.fromObject(previous)
	* }
	*/
  function saveObject(name: string, object: unknown): void;
  /**
   * Load a saved object.
   * @example
   * ctx.saveObject('test', { someKey: 10 })
   * var textObj = ctx.loadObject('test')
   * console.log(textObj['someKey'])
   */
  function loadObject(name: string): unknown;
  /**
   * Returns true if an object of `name` has been saved and can be loaded.
   * @example
   * ctx.saveObject('test', { someKey: 10 })
   * if (ctx.hasObject('test')) {
   * 	/// do something
   * }
   */
  function hasObject(name: string): boolean;
  /**
   * Get the nice name of the Layer that requested the JavaScript Utility for a value.
   * @example
   * console.log(ctx.niceName)
   */
  function niceName(): string;
  /**
   * Returns the upstream local 2D transformation matrix, or null if there isn't one.
   * @example
   * // 1. Create a Shape.
   * // 2. On the Shape's Deformers attribute, click the + button and choose JavaScript Deformer.
   * // 3. Copy the below in the JavaScript Deformer's Expression.
   *
   * var tm = ctx.transformationMatrix()
   * console.log(tm.position().x)
   */
  function transformationMatrix(): cavalry.Matrix;
  /**
   * Returns the upstream global 2D transformation matrix, or null if there isn't one.
   * @example
   * // 1. Create a Shape.
   * // 2. On the Shape's Deformers attribute, click the + button and choose JavaScript Deformer.
   * // 3. Copy the below into the JavaScript Deformer's Expression.
   * // 4. Group the Shape.
   *
   * var tm = ctx.globalTransformationMatrix()
   * console.log(tm.position().x)
   */
  function globalTransformationMatrix(): cavalry.Matrix;
}
