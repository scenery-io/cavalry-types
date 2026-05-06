declare namespace def {
  /**
   * Returns the root [cavalry.Mesh](./cavalry-module.mdx#mesh-class) of the shape being deformed. Use this to access the complete mesh hierarchy for modification.
   * @example
   * var root = def.getRootMesh()
   * // Traverse and modify the mesh hierarchy
   * def.setRootMesh(root)
   */
  function getRootMesh(): cavalry.Mesh;
  /**
   * Sets the root mesh back after modification. This must be called to apply changes made to the mesh hierarchy.
   * @example
   * // Helper function to recursively visit all meshes
   * function visitAllMeshes(mesh, func) {
   * 	for (var i = 0; i < mesh.childMeshCount(); i++) {
   * 		var child = mesh.getChildMeshAtIndex(i)
   * 		visitAllMeshes(child, func)
   * 		mesh.setChildMeshAtIndex(i, child)
   * 	}
   * 	func(mesh)
   * }
   *
   * function deformMesh(mesh) {
   * 	var pathCount = mesh.count()
   * 	for (var p = 0; p < pathCount; p++) {
   * 		var path = mesh.getPathAtIndex(p)
   * 		var pd = path.pathData()
   *
   * 		for (var idx = 0; idx < pd.length; idx++) {
   * 			// Move each point along its normal
   * 			pd[idx].point.x += pd[idx].normal.x * amount
   * 			pd[idx].point.y += pd[idx].normal.y * amount
   * 		}
   *
   * 		path.setPathData(pd)
   * 		mesh.setPathAtIndex(p, path)
   * 	}
   * }
   *
   * var root = def.getRootMesh()
   * visitAllMeshes(root, deformMesh)
   * def.setRootMesh(root)
   */
  function setRootMesh(mesh: cavalry.Mesh): void;
  /**
   * Returns the combined falloff value (0-1) at the specified position. This includes the deformer's Strength setting and any connected falloff shapes. Coordinates should be in local mesh space.
   * @example
   * function deformMesh(mesh) {
   * 	var pathCount = mesh.count()
   * 	for (var p = 0; p < pathCount; p++) {
   * 		var path = mesh.getPathAtIndex(p)
   * 		var pd = path.pathData()
   *
   * 		for (var idx = 0; idx < pd.length; idx++) {
   * 			var pt = pd[idx].point
   * 			var normal = pd[idx].normal
   *
   * 			// Get falloff at this point (includes Strength)
   * 			var falloff = def.getFalloffAtPoint(pt.x, pt.y)
   * 			if (falloff <= 0) continue
   *
   * 			pd[idx].point.x += normal.x * amount * falloff
   * 			pd[idx].point.y += normal.y * amount * falloff
   * 		}
   *
   * 		path.setPathData(pd)
   * 		mesh.setPathAtIndex(p, path)
   * 	}
   * }
   */
  function getFalloffAtPoint(x: number, y: number): number;
  /**
   * Return an object containing details about the selection's bounding box.
   */
  function getBoundingBox(): {
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
  /**
   * Return an array of positions for each point of a Shape. These can then be looped through these to manipulate them.
   * @example
   * // Connect the Deformer to a Shape's Deformers attribute and hit 'Return'.
   * var points = def.getPoints()
   * console.log(JSON.stringify(points))
   */
  function getPoints(): cavalry.Point;
  /**
   * Set the position for each point of a Shape.
   * @example
   * // A simple sine wave deformer
   * var points = def.getPoints()
   * var bbox = def.getBoundingBox()
   * var maxX = bbox.x + bbox.width
   * var frequency = 10
   * var amplitude = 50
   *
   * for (let pt of points) {
   * 	let normX = cavalry.norm(pt.x, bbox.x, maxX)
   * 	pt.y += Math.sin((normX + n0 * 0.1) * frequency) * amplitude
   * }
   *
   * def.setPoints(points)
   */
  function setPoints(points: unknown): void;
  /**
   * The depth of the mesh tree (the highest number reported in the [Mesh Explorer](../../user-interface/menus/window-menu/mesh-explorer.mdx)). This is a property/variable, not a method.
   */
  const meshDepth: void;
  /**
   * Return the number of meshes at a given depth.
   */
  function meshCountAtDepth(depth: number): number;
  /**
   * Return an array of [cavalry.Mesh](./cavalry-module.mdx#mesh-class) objects.
   */
  function getMeshesAtDepth(depth: number): cavalry.Mesh;
  /**
   * Replace the meshes at the given depth with a [cavalry.Mesh](./cavalry-module.mdx#mesh-class). This will not remove any un-replaced meshes.
   */
  function setMeshesAtDepth(depth: number, meshes: cavalry.Mesh): void;
  /**
   * Return a mesh at the given depth and index.
   */
  function getMeshAtDepthAtIndex(depth: number, index: number): cavalry.Mesh;
  /**
   * Replace a mesh at the given depth and index.
   */
  function setMeshAtDepthAtIndex(
    depth: number,
    index: number,
    mesh: unknown,
  ): void;
  /**
   * Set the position of a mesh at the given depth and index. Position and Scale are optional objects with x and y values (e.g. `{"x":20, "y": 5}`).
   */
  function setTransformAtDepthAtIndex(
    depth: number,
    index: number,
    position?: unknown,
    rotation?: number,
    scale?: unknown,
  ): void;
  /**
   * Reset the transform of the mesh at a given depth and index.
   */
  function clearTransformAtDepthAtIndex(depth: number, index: number): void;
  /**
   * Centres the pivot of the mesh at a given depth and index.
   */
  function centrePivotAtDepthAtIndex(depth: number, index: number): void;
  /**
   * Sets the Material object for the mesh at a given depth and index.
   */
  function setMaterialAtDepthAtIndex(
    depth: number,
    index: number,
    material: unknown,
  ): void;
  /**
   * Returns the highest depth within a Mesh that contains a Path.
   */
  function highestDepthWithPath(): number;
}
