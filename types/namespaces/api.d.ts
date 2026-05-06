declare namespace api {
  /**
   * Retrieves the preference value for a specified key.
   */
  function getPreference(key: string): unknown;
  /**
   * Sets a preference value for a specified key.
   */
  function setPreference(key: string, object: unknown): void;
  /**
   * Move the playhead to a specific frame.
   * @example
   * // Move the playhead to frame 100
   * api.setFrame(100)
   */
  function setFrame(frame: number): void;
  /**
   * Return the frame number the playhead is on.
   * @example
   * // Move the playhead to frame 50 and then print that frame number to the Console.
   * api.setFrame(50)
   * console.log(api.getFrame())
   */
  function getFrame(): number;
  /**
   * Start playback.
   */
  function play(): void;
  /**
   * Stop playback (must be called from a UI Script).
   */
  function stop(): void;
  /**
   * Returns all Layer Ids from the active Composition with an option to filter for 'top level' Layers.
   * @example
   * var primId = api.primitive('polygon', 'My Polygon')
   * var nullId = api.create('null', 'My Null')
   * api.parent(primId, nullId)
   * // The boolean indicates top level layers only (ie. ignore all children)
   * var topLevelIds = api.getCompLayers(true)
   * // Prints: 1
   * console.log(topLevelIds.length)
   * // Get all the layers in the composition
   * var allIds = api.getCompLayers(false)
   * // Prints: 2
   * console.log(allIds.length)
   */
  function getCompLayers(topLevel: boolean): string[];
  /**
   * Return all the Layers in the active Composition of a certain type.
   * @example
   * api.create('null', 'My Null')
   * api.create('null', 'My Other Null')
   * api.create('group', 'My Folder')
   * api.create('spreadsheet', 'My Spreadsheet')
   * var nulls = api.getCompLayersOfType(false, 'null')
   * for (var layer of nulls) {
   * 	console.log(api.getNiceName(layer))
   * }
   */
  function getCompLayersOfType(topLevel: boolean, type: string): string[];
  /**
   * Return the Id of a given Layer's parent Composition.
   * @example
   * var shapeId = api.create('basicShape')
   * console.log(api.getParentComp(shapeId))
   */
  function getParentComp(layerId: string): string;
  /**
   * Adds a new Time Marker. The second example sets up a Time Marker as a controller for a Scheduling Group.
   * @example
   * var markerId = api.createTimeMarker(10)
   * api.set(markerId, {
   * 	label: 'Hello, World',
   * 	drawColorId: 0,
   * 	useRelPlacement: true,
   * })
   * @example
   * /// After running this script, move the Time Marker around
   * var rectId = api.primitive('rectangle', 'My Rectangle')
   * var ellipseId = api.primitive('ellipse', 'My Ellipse')
   *
   * var scheduleGroup = api.create('schedulingGroup', 'Marker Controlled Group')
   * api.parent(rectId, scheduleGroup)
   * api.parent(ellipseId, scheduleGroup)
   *
   * var markerId = api.createTimeMarker(10)
   * api.set(markerId, {
   * 	label: 'Hello, World',
   * 	drawColorId: 0,
   * 	useRelPlacement: true,
   * })
   *
   * api.connect(markerId, 'id', scheduleGroup, 'childOffset')
   */
  function createTimeMarker(time: number): string;
  /**
   * Returns a list of all the Time Marker Ids in this Composition
   * @example
   * api.createTimeMarker(10)
   * api.createTimeMarker(40)
   * var markers = api.getTimeMarkers()
   * for (let markerId of markers) {
   * 	console.log(markerId)
   * }
   */
  function getTimeMarkers(): string[];
  /**
   * A convenience function for removing Time Markers. This forwards to `api.Layer(layerId)`.
   */
  function removeTimeMarker(markerId: string): void;
  /**
   * Return the frame of the 'n'th beat from the Beat Marker settings. For example, an argument of 3 will return the frame number that the 3rd beat falls on.
   * @example
   * var frame = api.getNthBeat(3)
   * console.log(frame)
   */
  function getNthBeat(n: number): number;
  /**
   * Add a Ruler Guide to the given Composition. This function returns an id which can be used to delete the Guide later. Note that 0,0 is the centre of the Composition.
   * @example
   * var id = api.addGuide(api.getActiveComp(), false, 100)
   * console.log(id)
   */
  function addGuide(
    compId: string,
    isVertical: boolean,
    position: number,
  ): number;
  /**
   * Delete a Ruler Guide with the corresponding id from the given Composition.
   * @example
   * var id = api.addGuide(api.getActiveComp(), false, 100)
   * console.log(id)
   * api.deleteGuide(api.getActiveComp(), 1)
   * // If you run this in a new scene, there should be no guides.
   */
  function deleteGuide(compId: string, rulerId: number): void;
  /**
   * Clear all Ruler Guide from the given Composition.
   * @example
   * api.addGuide(api.getActiveComp(), true, -100)
   * api.addGuide(api.getActiveComp(), false, 100)
   * api.clearGuides(api.getActiveComp())
   * // If you run this in a new scene, there should be no guides.
   */
  function clearGuides(compId: string): void;
  /**
	* Get the Ids of all the Ruler Guides in the given Composition.

Direction returns:

* 0 for Horizontal Guides.
* 1 for Vertical Guides.
	* @example
	* api.addGuide(api.getActiveComp(), true, -100)
	* api.addGuide(api.getActiveComp(), false, 100)
	* console.log(JSON.stringify(api.getGuideInfo(api.getActiveComp())))
	*/
  function getGuideInfo(compId: string): object[];
  /**
   * Get a list of all the Attributes that have been added to the Control Centre.
   * @example
   * console.log(api.getControlCentreAttributes(api.getActiveComp()))
   */
  function getControlCentreAttributes(): string[];
  /**
   * Converts a given frame number into an equivalent timecode based on a given frame rate. Note that a timecode starts at frame 0 regardless of the Frame Range set in the Composition Settings.
   * @example
   * console.log(api.timecodeToFrames('00:00:06:05', 30))
   */
  function timecodeToFrames(timecode: string, fps: number): number;
  /**
   * Converts a given timecode into an equivalent frame number based on a given frame rate. Note that a timecode starts at frame 0 regardless of the Frame Range set in the Composition Settings.
   * @example
   * console.log(api.framesToTimecode(100, 25))
   */
  function framesToTimecode(frames: number, fps: number): string;
  /**
   * Creates a Primitive Shape.
   * @example
   * /// returns the layerId for the new shape
   * var primId = api.primitive('rectangle', 'My Rectangle')
   */
  function primitive(primitiveType: string, name: string): string;
  /**
   * Creates an Editable Shape from a Path.
   * @example
   * var path = new cavalry.Path()
   * path.moveTo(0, 0)
   * path.lineTo(0, -100)
   * path.lineTo(300, -100)
   * path.cubicTo(210, 110, 240, 140, 280, 260)
   * path.close()
   * api.createEditable(path, 'My Path')
   */
  function createEditable(object: unknown, name: string): string;
  /**
   * Create a Layer of any type. The optional `name` argument can be used to specify the name of the Layer in the Scene Window. The optional `allowDefaultPreset` argument can be used to apply a [Preset](../../user-interface/menus/window-menu../../../general/presets.mdx) which is 'Set as Default Settings' in the Presets Manager.
   * @example
   * api.create('null', 'My Null', true)
   */
  function create(
    layerType: string,
    name?: string,
    allowDefaultPreset?: boolean,
  ): string;
  /**
   * Delete a Layer.
   * @example
   * /// Delete all render queue items
   * var items = api.getRenderQueueItems()
   * for (var layer of items) {
   * 	api.deleteLayer(layer)
   * }
   */
  function deleteLayer(layerId: string): void;
  /**
   * Returns `true` if a Layer with the given `layerId` exists.
   * @example
   * var layerId = api.create('basicShape', 'Layer')
   * console.log(
   * 	'Layer exists:' +
   * 		api.layerExists(layerId) +
   * 		'. Active Comp exists: ' +
   * 		api.layerExists(api.getActiveComp()),
   * )
   */
  function layerExists(layerId: string): boolean;
  /**
   * Get the layer's type (which can be used to create new instances of this layer).
   * @example
   * var layerId = api.create('null', 'My Null')
   * console.log(api.getLayerType(layerId))
   */
  function getLayerType(layerId: string): string;
  /**
   * Returns `true` if the given Layer is from an external developer.
   */
  function isThirdPartyLayer(layerId: string): boolean;
  /**
   * Reset all Attributes on a Layer back to the default state.
   */
  function resetLayerAttributes(
    layerId: string,
    includeTransformAttributes?: boolean,
  ): void;
  /**
   * Gets the currently selected Layers from the Composition or Assets Window. When the optional `sortByHierarchyOrder` argument is `true`, the selection list is returned in hierarchy order, otherwise it's returned in selection order.
   * @example
   * // Print the selected Layer's nice names to the console.
   * // Create some Layers and select them:
   * var sel = api.getSelection()
   * for (var layer of sel) {
   * 	console.log(api.getNiceName(layer))
   * }
   */
  function getSelection(sortByHierarchyOrder?: boolean): string[];
  /**
   * Selects the specified Layers.
   * @example
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.select([primId])
   */
  function select(array: string[]): void;
  /**
   * Deselect any selected Layers and select any deselected Layers.
   * @example
   * var rect1 = api.primitive('rectangle', 'Selected')
   * var rect2 = api.primitive('rectangle', 'Not Selected')
   * api.select([rect2])
   * api.invertSelection()
   */
  function invertSelection(): void;
  /**
   * Duplicate a Layer with an option to also duplicate any input connections.
   */
  function duplicate(layerId: string, withInputConnections: boolean): void;
  /**
   * Gets the children of the specified Layer.
   * @example
   * var primId = api.primitive('polygon', 'My Polygon')
   * var nullId = api.create('null', 'My Null')
   * api.parent(primId, nullId)
   * var childIds = api.getChildren(nullId)
   * console.log(childIds.length)
   */
  function getChildren(layerId: string): string[];
  /**
   * Make one Layer the child of another.
   * @example
   * var primId = api.primitive('polygon', 'My Polygon')
   * var nullId = api.create('null', 'My Null')
   * api.parent(primId, nullId)
   */
  function parent(layerId: string, newParentId: string): void;
  /**
   * Move a Layer up one level of hierarchy to its parent's parent. This is the equivalent of the Un-Parent context menu item available in the Scene Tree.
   * @example
   * // Given basicShape#1 is the child of another Layer...
   * api.unParent('basicShape#1')
   */
  function unParent(layerId: string): void;
  /**
   * Return the layerId of a Layer's parent.
   * @example
   * var primId = api.primitive('polygon', 'My Polygon')
   * var nullId = api.create('null', 'My Null')
   * api.parent(primId, nullId)
   * console.log(api.getParent(primId))
   */
  function getParent(layerId: string): string;
  /**
   * Return the 'nice name' of a Layer.
   * @example
   * var nullId = api.create('null', 'My Null')
   * console.log(api.getNiceName(nullId))
   */
  function getNiceName(layerId: string): string;
  /**
   * Rename a Layer.
   * @example
   * /// rename all selected items
   * var sel = api.getSelection()
   * sel.forEach(function (item, index) {
   * 	api.rename(item, 'My Name ' + index)
   * })
   */
  function rename(layerId: string, newName: string): void;
  /**
   * Offset a Layer's Clip and any related animation in time.
   * @example
   * var layerId = api.primitive('rectangle', 'Rectangle')
   * api.setOutFrame(layerId, 50)
   * api.offsetLayerTime(layerId, 100)
   */
  function offsetLayerTime(layerId: string, timeDelta: number): void;
  /**
   * Enable/disable the Stroke for a Shape.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * api.setFill(primId, false)
   * api.setStroke(primId, true)
   * api.set(primId, { 'stroke.strokeColor': '#049dd9', 'stroke.width': 20 })
   */
  function setStroke(layerId: string, on: boolean): void;
  /**
   * Returns `true` if a Shape has a Stroke.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * api.setStroke(primId, true)
   * console.log(api.hasStroke(primId))
   */
  function hasStroke(layerId: string): boolean;
  /**
   * Enable/disable the Fill for a Shape.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * api.setFill(primId, false)
   * api.setStroke(primId, true)
   */
  function setFill(layerId: string, on: boolean): void;
  /**
   * Returns `true` if a Shape has a Fill.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * console.log(api.hasFill(primId))
   */
  function hasFill(layerId: string): boolean;
  /**
   * Return the bounding box of the specified Layer.
   * @example
   * var primId = api.primitive('polygon', 'My Polygon')
   * var bbox = api.getBoundingBox(primId, true)
   * console.log(JSON.stringify(bbox))
   */
  function getBoundingBox(
    layerId: string,
    worldSpace: boolean,
  ): {
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
   * Return the world space bounding box of the selected Layers.
   * @example
   * var shape1 = api.create('basicShape')
   * api.set(shape1, { position: [450, -120] })
   * var shape2 = api.create('basicShape')
   * api.set(shape2, { position: [-100, 210] })
   * api.select([shape1, shape2])
   * var bbox = api.getSelectionBoundingBox()
   * console.log(JSON.stringify(bbox))
   */
  function getSelectionBoundingBox(worldSpace: boolean): {
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
   * Determines if a Layer is visible in the Viewport. This considers the Layer's 'Hidden' attribute and the state of the Layer's Clip at the current frame. When the **includeHierarchy** argument is `true`, if the Layer is the child of another Layer, the visibility of that Layer (and its parent's and so on) is also considered.
   * @example
   * var layerId = api.create('basicShape')
   * console.log(api.isVisible(layerId, false))
   */
  function isVisible(layerId: string, testHierarchy: boolean): boolean;
  /**
   * Returns true if a specified Layer has transform Attributes (e.g. Position and Scale).
   */
  function isTransform(layerId: string): boolean;
  /**
   * Returns true if a specified Layer has its 3d transform Attributes activated.
   */
  function has3dTransforms(layerId: string): boolean;
  /**
   * Return the first frame of a Clip.
   * @example
   * var sel = api.getSelection()
   * for (let layerId of sel) {
   * 	console.log(api.getInFrame(layerId))
   * }
   */
  function getInFrame(layerId: string): number;
  /**
   * Set the first frame of a Clip.
   * @example
   * var layerId = api.primitive('rectangle', 'Rectangle')
   * api.setInFrame(layerId, 50)
   */
  function setInFrame(layerId: string, frame: number): void;
  /**
   * Return the last frame of a Clip.
   * @example
   * var sel = api.getSelection()
   * for (let layerId of sel) {
   * 	console.log(api.getOutFrame(layerId))
   * }
   */
  function getOutFrame(layerId: string): number;
  /**
   * Set the last frame of a Clip.
   * @example
   * var layerId = api.primitive('rectangle', 'Rectangle')
   * api.setOutFrame(layerId, 50)
   */
  function setOutFrame(layerId: string, frame: number): void;
  /**
   * Returns an array of objects containing the keyframe ids of all the in and out points for a Layer.
   * @example
   * var layer1 = api.create('basicShape')
   * var keyIds = api.getInOutKeyframeIds(layer1)
   * console.log(JSON.stringify(keyIds))
   */
  function getInOutKeyframeIds(layerId: string): unknown;
  /**
   * Return the active Camera's Layer Id. A Camera is considered 'active' when its visibility is on at the current frame. Where more than one Camera is visible on the same frame, the Camera highest in the hierarchy is considered the active one.
   * @example
   * api.create('planarCamera')
   * console.log(api.getActiveCamera())
   */
  function getActiveCamera(): string;
  /**
   * Return whether there is an active Camera in the active Composition. A Camera is considered 'active' when its visibility is on at the current frame.
   * @example
   * console.log(api.hasActiveCamera())
   */
  function hasActiveCamera(): boolean;
  /**
   * Move the selected Layers up the layer stack by one place.
   * @example
   * var shape1 = api.create('basicShape', 'Shape1')
   * var shape2 = api.create('basicShape', 'Shape2')
   * api.select([shape1])
   * api.bringForward()
   */
  function bringForward(): void;
  /**
   * Move the selected Layers to the top of the layer stack.
   * @example
   * var shape1 = api.create('basicShape', 'Shape1')
   * var shape2 = api.create('basicShape', 'Shape2')
   * var shape3 = api.create('basicShape', 'Shape3')
   * api.select([shape1])
   * api.bringToFront()
   */
  function bringToFront(): void;
  /**
   * Move the selected Layers down the layer stack by one place.
   * @example
   * var shape1 = api.create('basicShape', 'Shape1')
   * var shape2 = api.create('basicShape', 'Shape2')
   * api.select([shape2])
   * api.moveBackward()
   */
  function moveBackward(): void;
  /**
   * Move the selected Layers to the bottom of the layer stack.
   * @example
   * var shape1 = api.create('basicShape', 'Shape1')
   * var shape2 = api.create('basicShape', 'Shape2')
   * var shape3 = api.create('basicShape', 'Shape3')
   * api.select([shape3])
   * api.moveToBack()
   */
  function moveToBack(): void;
  /**
   * Checks if a specified Layer is a Shape.
   * @example
   * var shape1 = api.primitive('ellipse', 'Ellipse')
   * console.log(api.isShape(shape1))
   */
  function isShape(layerId: string): boolean;
  /**
   * Sets the editing mode for a Component.
   * @example
   * // Collapse a Component containing an Ellipse.
   * var ellipseId = api.primitive('ellipse', 'Ellipse')
   * var componentId = api.create('component')
   * api.connect(ellipseId, 'position', componentId, 'promotedAttributes')
   * api.parent(ellipseId, componentId)
   * api.editComponent(componentId, false)
   */
  function editComponent(layerId: string, editing: boolean): void;
  /**
   * Returns the Ids of the given Layers in the order they appear in the hierarchy.
   * @example
   * var cId = api.primitive('circle', 'Circle (Bottom)')
   * var rId = api.primitive('rectangle', 'Rectangle (Middle)')
   * var pId = api.primitive('polygon', 'Polygon (Top)')
   *
   * var layerIds = [rId, pId, cId]
   *
   * var ordered = api.sortLayerIdsByHierarchy(layerIds)
   * for (let layerId of ordered) {
   * 	console.log(api.getNiceName(layerId))
   * }
   */
  function sortLayerIdsByHierarchy(layerIds: string[]): string[];
  /**
   * Reorder Layers in the hierarchy, re-parenting if required.
   * @example
   * var cId = api.primitive('circle', 'Circle')
   * var rId = api.primitive('rectangle', 'Rectangle')
   * var pId = api.primitive('polygon', 'Polygon')
   * var sId = api.primitive('star', 'Star')
   *
   * // Make the Circle and Star children of the Rectangle.
   * api.parent(sId, rId)
   * api.parent(cId, rId)
   *
   * // Reorder the Polygon to be below the Circle and so automatically a child of the Rectangle.
   * api.reorder(pId, cId)
   * api.rename(pId, 'Polygon - Reordered')
   */
  function reorder(layerIdToReorder: string, underLayerId: string): void;
  /**
   * Returns the version of a specified Layer – useful for third-party developers.
   */
  function getLayerVersion(layerId: string): string;
  /**
   * Returns true if the first version is less than the second version.
   * @example
   * let isLower = api.compareVersions('1.0', '2.0')
   * console.log(isLower) // true
   *
   * isLower = api.compareVersions('3.0.1', '3.0')
   * console.log(isLower) // false
   */
  function compareVersions(
    firstVersion: string,
    secondVersion: string,
  ): boolean;
  /**
   * Returns `true` if the specified layer requires a Pro licence to use.
   * @example
   * console.debug(api.isProLayerType('extrude'))
   */
  function isProLayerType(layerType: string): boolean;
  /**
   * Load the given Layer's UI into the Attribute Editor.
   * @example
   * var shapeId = api.create('basicShape')
   * api.showInAttributeEditor(shapeId)
   */
  function showInAttributeEditor(layerId: string): void;
  /**
   * Clear the Attribute Editor.
   * @example
   * api.clearAttributeEditor()
   */
  function clearAttributeEditor(): void;
  /**
   * Returns true if the Composition layer has been imported as part of a Reference.
   * @example
   * // Via Assets Window
   * var refId = 'yourReferenceAssetId' // Update the to the Asset Id of an imported Reference (parent) in the Assets Window.
   * var refChildComps = api.getChildren(refId)
   * console.log(api.isReferenced(refChildComps[0]))
   *
   * // Via Scene Window
   * var layerId = 'yourPreCompLayerId' // Update to the Layer Id of a Pre-Comp in the Scene Window.
   * var compId = api.getCompFromReference(layerId)
   * console.log(api.isReferenced(compId))
   */
  function isReferenced(layerId: string): boolean;
  /**
   * This will return an array containing the paths of the selected attributes.
   * @example
   * var selAttr = api.getSelectedAttributes()
   * for (let [layerId, attr] of selAttr) {
   * 	console.log(layerId + '.' + attr)
   * }
   */
  function getSelectedAttributes(): unknown;
  /**
   * Set values for a Layer's attributes.
   * @example
   * // Create a Rectangle and set its Size, Position, Rotation and Fill Color
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.set(primId, {
   * 	'generator.dimensions': [100, 370],
   * 	position: [100, 200],
   * 	rotation: 50,
   * 	'material.materialColor': '#8dc429',
   * })
   * @example
   * // Create a Text Shape and set its Font Family and Style
   * var textId = api.create('textShape', 'My Text')
   * api.set(textId, { font: { font: 'Arial', style: 'Bold' } })
   * @example
   * // Collapse the hierarchy of a layer
   * api.set('basicShape#1', { hierarchy: false })
   */
  function set(layerId: string, dictionary: unknown): void;
  /**
   * Get the values for a Layer's attributes.
   * @example
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.set(primId, {
   * 	'material.materialColor': '#8dc429',
   * 	'generator.dimensions': [100, 370],
   * 	rotation: 50,
   * 	position: [100, 200],
   * })
   * var obj = api.get(primId, 'position')
   * console.log(JSON.stringify(obj))
   */
  function get(layerId: string, attrId: string): unknown;
  /**
	* Returns an object containing detailed information about an Attribute.

The returned object contains keys for:

* `attrId` // the attribute's Id
* `type` // e.g double, string, int2
* `prefix` // the prefix used in the UI
* `placeholder` // a string attribute's placeholder (e.g. A Stroke's Dash Pattern contains `Dash, Gap (e.g. “4, 2“)`)
* `isAttrReadOnly` // true if the attribute is read only
* `allowsAspectRatioLocking` // the attribute's proportions can be constrained
* `numericInfo` // an object where any of the child keys can be null
  * `hardMin` // the minimum value allowed
  * `hardMax` // the maximum value allowed
  * `softMin` // the minimum value that can be set by scrubbing in the UI
  * `softMax` // the maximum value that can be set by scrubbing in the UI
  * `step` // the increment values increase/decrease when scrubbing
  * `isBound` // this checks if hardMin and hardMax exist. i.e. the attributeis a slider
* `multiline` // true if the attribute is a multi-line string
* `enumValues` // the valid indices for dropdown attributes
* `children` // child attribute definitions (for example position attributes have three children, x, y and z).
* `isArray` // true if the attribute is an array
* `isCompound` // true if the attribute is a compound (for example a point within a Graph attribute)
* `isDynamic` // true if this attribute is a dynamic attributes (for example the array that contains uniforms in a JavaScript Layer)
* `default` // return the default value for the attribute. Note that lists/compound attributes do not have defaults.
	* @example
	* var shapeId = api.create('basicShape')
	* var definition = api.getAttributeDefinition(shapeId, 'motionBlur')
	* console.log(definition.type)
	*/
  function getAttributeDefinition(layerId: string, attrId: string): unknown;
  /**
   * Some Layers in Cavalry contain Generators, these are discrete feature blocks that are used to extend the functionality of Layers. For example the Basic Shape Layer has a Generator to determine the shape it creates (e.g Ellipse, Rectangle...). Generators can be set with this function.
   * @example
   * // Create an Ellipse and set it up
   * var ellipseId = api.primitive('ellipse', 'Ellipse')
   * api.set(ellipseId, {
   * 	'generator.radius.x': 10,
   * 	'generator.radius.y': 10,
   * 	hidden: true,
   * })
   * // Create a Duplicator
   * var duplicatorId = api.create('duplicator', 'Duplicator')
   * // Connect the Ellipse to the Duplicator
   * api.connect(ellipseId, 'id', duplicatorId, 'shapes')
   * // Change the Distribution on the Duplicator to a Custom Distribution
   * api.setGenerator(duplicatorId, 'generator', 'circleDistribution')
   * // Set the Distribution count
   * api.set(duplicatorId, { 'generator.count': 10 })
   */
  function setGenerator(
    layerId: string,
    attrId: string,
    generatorType: string,
  ): void;
  /**
   * Returns the generatorId for an attribute on a Layer or empty if there isn't one.
   * @example
   * var duplicatorId = api.create('duplicator', 'Duplicator')
   * console.log(api.getCurrentGenerator(duplicatorId, 'generator'))
   */
  function getCurrentGenerator(layerId: string, attrId: string): string;
  /**
   * Some Layers in Cavalry contain Generators, these are discrete feature blocks that are used to extend the functionality of Layers. For example the Basic Shape Layer has a Generator to determine the shape it creates (e.g Ellipse, Rectangle). Generators on a Layer can be listed with this command.
   * @example
   * var layerId = api.create('connectShape', 'Connect Shape')
   * var generatorId = api.getGenerators(layerId)
   * for (gId of generatorId) {
   * 	console.log(gId)
   * }
   */
  function getGenerators(layerId: string): string[];
  /**
   * Returns the current Generator type (which can be used with `setGenerator`).
   * @example
   * var ellipseId = api.primitive('ellipse', 'My Ellipse')
   * console.log(api.getCurrentGeneratorType(ellipseId, 'generator'))
   */
  function getCurrentGeneratorType(
    layerId: string,
    generatorId: string,
  ): string;
  /**
   * Set an attribute expression, this will take whatever the input value is in the expression, and manipulate it in some way (multiply, add to it etc.).
   * @example
   * var rectId = api.primitive('rectangle', 'My Rectangle')
   * api.set(rectId, { 'position.x': 300 })
   *
   * var starId = api.primitive('star', 'Star')
   * api.set(starId, { 'position.x': -300 })
   *
   * // Connect the result of the Star to the Rectangle
   * api.connect(starId, 'position.y', rectId, 'position.y')
   *
   * // Add an attribute expression
   * api.setAttributeExpression(rectId, 'position.y', '*2')
   * //api.setAttributeExpression(rectId, "position.y", "%50");
   * //api.setAttributeExpression(rectId, "position.y", "clamp(-45, value, 45)");
   * //api.setAttributeExpression(rectId, "position.y", "sqrt(value)");
   *
   * // Power the stars movement with an Oscillator
   * var oscillatorId = api.create('oscillator', 'Oscillator')
   * api.set(oscillatorId, { strength: 1500 })
   *
   * api.connect(oscillatorId, 'id', starId, 'position.y')
   * api.play()
   */
  function setAttributeExpression(
    layerId: string,
    attrId: string,
    expression: string,
  ): void;
  /**
   * Returns true if the given attribute has an Attribute Expression.
   * @example
   * var rectId = api.primitive('rectangle', 'Rectangle')
   * api.connect(rectId, 'position.x', rectId, 'position.y')
   * api.setAttributeExpression(rectId, 'position.y', '*2')
   * console.log(api.hasAttributeExpression(rectId, 'position.y'))
   */
  function hasAttributeExpression(layerId: string, attrId: string): boolean;
  /**
   * Returns an Attribute's Attribute Expression.
   * @example
   * var rectId = api.primitive('rectangle', 'Rectangle')
   * api.connect(rectId, 'position.x', rectId, 'position.y')
   * api.setAttributeExpression(rectId, 'position.y', '*2')
   * console.log(api.getAttributeExpression(rectId, 'position.y'))
   */
  function getAttributeExpression(layerId: string, attrId: string): string;
  /**
   * Connect one attribute to another. The result or output of a Layer is referred to as the `id` connection. Optionally forcing a connection will overwrite any existing connections.
   * @example
   * var starId = api.primitive('star', 'Star')
   * var ellipseId = api.primitive('ellipse', 'Ellipse')
   * var pathfinderId = api.create('pathfinder', 'Pathfinder')
   * api.set(starId, { 'generator.radius': 300 })
   * api.set(ellipseId, {
   * 	'generator.radius': [50, 50],
   * 	'material.materialColor': '#4ffd7a',
   * })
   * // Connect the result of the Star to the Pathfinder
   * api.connect(starId, 'id', pathfinderId, 'inputShape')
   * // Connect the result of the Pathfinder to the Text.Position
   * api.connect(pathfinderId, 'id', ellipseId, 'position')
   * var fillId = api.create('colorMaterial')
   * api.set(fillId, { materialColor: '#6437ff' })
   * // Connect the Fill to the Star and overwrite the default Fill.
   * api.connect(fillId, 'id', starId, 'material', true)
   */
  function connect(
    fromId: string,
    fromAttrId: string,
    toId: string,
    toAttrId: string,
    force?: boolean,
  ): void;
  /**
   * Remove connections between attributes.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * var oscillatorId = api.create('oscillator', 'Oscillator')
   * api.connect(oscillatorId, 'id', primId, 'rotation')
   * console.log(api.getInConnection(primId, 'rotation'))
   * api.disconnect(oscillatorId, 'id', primId, 'rotation')
   * console.log(api.getInConnection(primId, 'rotation'))
   */
  function disconnect(
    fromId: string,
    fromAttrId: string,
    toId: string,
    toAttrId: string,
  ): void;
  /**
   * Disconnect an Attribute's input connection.
   * @example
   * api.disconnectInput('basicShape#1', 'position.x')
   */
  function disconnectInput(layerId: string, attrId: string): void;
  /**
   * Disconnect all the output connections from an Attribute.
   * @example
   * api.disconnectOutputs('basicShape#1', 'position.x')
   */
  function disconnectOutputs(layerId: string, attrId: string): void;
  /**
   * Returns the input connection to an Attribute. An empty string is returned if there's no input on the Attribute in question.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * var oscillatorId = api.create('oscillator', 'Oscillator')
   * api.connect(oscillatorId, 'id', primId, 'rotation')
   * console.log(api.getInConnection(primId, 'rotation'))
   */
  function getInConnection(layerId: string, attrId: string): string;
  /**
   * Returns all the output connections from an Attribute.
   * @example
   * var primId = api.primitive('rectangle', 'Rectangle')
   * var oscillatorId = api.create('oscillator', 'Oscillator')
   * api.connect(oscillatorId, 'id', primId, 'rotation')
   * console.log(api.getOutConnections(oscillatorId, 'id'))
   */
  function getOutConnections(layerId: string, attrId: string): string[];
  /**
   * This returns the selected keyframes as an enumerable string-keyed object. Each string is an attribute path, and each key is an array of frame numbers on which a keyframe resides.
   * @example
   * var selKeys = api.getSelectedKeyframes()
   * for (let [key, value] of Object.entries(selKeys)) {
   * 	console.log(key + ': ' + value)
   * }
   */
  function getSelectedKeyframes(): unknown;
  /**
   * Set keyframes for Layers and return the keyframeId.
   * @example
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * var kfId1 = api.keyframe(primId, 0, { 'scale.x': 5 })
   * console.log(kfId1)
   * var kfId2 = api.keyframe(primId, 100, { 'scale.x': 1 })
   * console.log(kfId2)
   * @example
   * // 1. Draw a Path with the Pencil tool.
   * // 2. Set a Path keyframe at frame 0.
   * // 3. Move to frame 50.
   * // 4. Move some points with the Edit Shape tool to set a second Path keyframe.
   * // 5. Run script:
   * var layerId = 'editableShape#1'
   * var keyData = api.get('keyframe#3', 'data')
   * console.log(JSON.stringify(keyData))
   * api.keyframe(layerId, 100, { inputPath: keyData['pathValue'] })
   */
  function keyframe(
    layerId: string,
    frame: number,
    dictionary: unknown,
  ): string;
  /**
   * Remove a Layer's keyframes.
   * @example
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.keyframe(primId, 0, { 'scale.x': 5 })
   * api.keyframe(primId, 50, { 'scale.x': 7 })
   * api.keyframe(primId, 100, { 'scale.x': 1 })
   * api.deleteKeyframe(primId, 'scale.x', 50)
   */
  function deleteKeyframe(layerId: string, attrId: string, frame: number): void;
  /**
	* Modify the keyframe time (frame number) or value.
The supplied object must include a `frame` key, in addition to this it can also include:

* `newFrame` // Specify a new frame for the keyframe (optional).
* `newValue` // Specify a new value for the keyframe (optional).
* `type` // The keyframe type as an integer `0` Bezier, `1` Linear, `2` Step (optional).

Example of modifying keyframe values and frames:

Example of setting all keyframes to step interpolation.
	* @example
	* var primId = api.primitive('rectangle', 'My Rectangle')
	* api.keyframe(primId, 0, { 'scale.x': 5 })
	* api.keyframe(primId, 100, { 'scale.x': 1 })
	* api.modifyKeyframe(primId, {
	* 	'scale.x': { frame: 0, newValue: 3.5, newFrame: 10 },
	* })
	* @example
	* var ellipseId = api.primitive('ellipse', 'Ellipse')
	* // Create some values to set as keyframes
	* var keyValues = [-200, 200, -300, 300]
	* var keyTime = 0
	* // Set some keyframes for us to modify
	* for (let value of keyValues) {
	* 	api.keyframe(ellipseId, keyTime, { 'position.x': value })
	* 	keyTime += 40
	* }
	* 
	* // Get the keyframe times
	* var times = api.getKeyframeTimes('basicShape#1', 'position.x')
	* for (let frame of times) {
	* 	// Set the keyframes to step interpolation
	* 	api.modifyKeyframe(ellipseId, { 'position.x': { frame: frame, type: 2 } })
	* }
	*/
  function modifyKeyframe(layerId: string, dictionary: unknown): void;
  /**
	* Modify the keyframe tangents.
The supplied object must include a `frame` key.
Both the in and out handle will be affected unless a handle is specified and the handle is not weight and angle locked.

* `inHandle` // An optional boolean value used to specify the inHandle to be affected.
* `outHandle` // An optional boolean value used to specify the outHandle to be affected.
* `angleLocked` // Boolean stating if the key tangents are angle locked or not (optional).
* `weightLocked` // Boolean stating if the key tangents are weight locked or not (optional).
* `angle` // Set a new angle for the keyframe tangent, 0 is flat (optional).
* `weight` // Set a new weight for the keyframe tangent (optional).
* `xValue` // The absolute value for the bezier handle's X position (frame).
* `yValue` // The absolute value for the bezier handle's Y position (value).

Example setting flat keyframes:

Example breaking tangents and weighting the outHandles.
	* @example
	* // Make a new ellipse
	* var ellipseId = api.primitive('ellipse', 'Ellipse')
	* // Create some values to set as keyframes
	* var keyValues = [-200, 200, -300, 300]
	* var keyTime = 0
	* // Set some keyframes for us to modify
	* for (let value of keyValues) {
	* 	api.keyframe(ellipseId, keyTime, { 'position.x': value })
	* 	keyTime += 40
	* }
	* 
	* // Get the keyframe times
	* var times = api.getKeyframeTimes(ellipseId, 'position.x')
	* for (let frame of times) {
	* 	// Modify the tangents, giving them all a weight of 20 and an angle of 0 (flat)
	* 	api.modifyKeyframeTangent(ellipseId, {
	* 		'position.x': { angle: 0, frame: frame, weight: 20 },
	* 	})
	* }
	* @example
	* // Create a Shape
	* var ellipseId = api.primitive('ellipse', 'Ellipse')
	* // Store some values to set as keyframes
	* var keyValues = [-200, 200, -300, 300]
	* var keyTime = 0
	* // Set some keyframes to modify
	* for (let value of keyValues) {
	* 	api.keyframe(ellipseId, keyTime, { 'position.x': value })
	* 	keyTime += 40
	* }
	* 
	* // Get the keyframe times
	* var times = api.getKeyframeTimes(ellipseId, 'position.x')
	* for (let frame of times) {
	* 	// Set the handle weights to 0
	* 	api.modifyKeyframeTangent(ellipseId, {
	* 		'position.x': { frame: frame, weight: 0 },
	* 	})
	* 	// Set the weight for only the out handles
	* 	api.modifyKeyframeTangent(ellipseId, {
	* 		'position.x': {
	* 			frame: frame,
	* 			weight: 20,
	* 			outHandle: true,
	* 			weightLocked: false,
	* 		},
	* 	})
	* }
	*/
  function modifyKeyframeTangent(layerId: string, dictionary: unknown): void;
  /**
   * Set speed and influence values on a Layer's keyframes.
   * @example
   * api.setKeyframeVelocity('basicShape#1', {
   * 	'position.x': {
   * 		frame: 30,
   * 		leftSpeed: 0.0, // incoming speed (0.0..2.0)
   * 		rightSpeed: 1.0, // outgoing speed
   * 		leftInfluence: 0.7, // incoming influence (0.01..1.0)
   * 		rightInfluence: 0.333, // outgoing influence
   * 	},
   * 	'position.y': {
   * 		frame: 30,
   * 		leftSpeed: 0.0,
   * 		rightSpeed: 1.0,
   * 		leftInfluence: 0.7,
   * 		rightInfluence: 0.333,
   * 	},
   * })
   */
  function setKeyframeVelocity(layerId: string, dictionary: unknown): void;
  /**
   * Reset all four speed/influence fields on a keyframe.
   * @example
   * api.clearKeyframeVelocity('basicShape#1', { 'position.x': { frame: 30 } })
   */
  function clearKeyframeVelocity(layerId: string, dictionary: unknown): void;
  /**
   * Get all keyframeIds for a particular layerId's attribute. This can be used in combination with [setUserData](#setuserdata).
   * @example
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.keyframe(primId, 0, { 'position.x': 10 })
   * console.log(api.getKeyframeIdsForAttribute(primId, 'position.x'))
   */
  function getKeyframeIdsForAttribute(layerId: string, attrId: string): void;
  /**
   * Get the ids for selected keyframes. This can be used in combination with [setUserData](#setuserdata).
   * @example
   * // Create a Shape, add some keyframes and then select them before running:
   * console.log(api.getSelectedKeyframeIds())
   */
  function getSelectedKeyframeIds(): string[];
  /**
   * Set the keyframe selection. To clear the keyframe selection send an empty array through.
   * @example
   * // Create a Shape and add some keyframes to scale.x
   * var primId = api.primitive('rectangle', 'My Rectangle')
   * api.keyframe(primId, 0, { 'scale.x': 4 })
   * api.keyframe(primId, 50, { 'scale.x': 3 })
   * api.keyframe(primId, 100, { 'scale.x': 1 })
   *
   * //console.log(api.getKeyframeIdsForAttribute(primId, "scale.x"));
   *
   * // Select the first and third keyframes (uncomment above to return keyframeIds)
   * api.setSelectedKeyframeIds(['keyframe#3', 'keyframe#5'])
   */
  function setSelectedKeyframeIds(keyframeIdArray: string[]): void;
  /**
   * Get the attribute path for a given keyframe.
   * @example
   * var keyIds = api.getSelectedKeyframeIds()
   *
   * for (let keyId of keyIds) {
   * 	console.log(api.getAttributeFromKeyframeId(keyId))
   * }
   */
  function getAttributeFromKeyframeId(keyframeId: string): string;
  /**
   * Resynchronise path keyframe data after using [set()](#set) on Path Animation keyframes.
   */
  function resyncPathKeyframes(layerId: string, attrId: string): void;
  /**
	* Apply **Magic Easing** to an Attribute's keyframe and optionally add an expression.

Valid **Magic Easing** names are:

* "SlowIn"
* "SlowOut"
* "SlowInSlowOut"
* "VerySlowIn"
* "VerySlowOut"
* "VerySlowInVerySlowOut"
* "SpringIn"
* "SpringOut"
* "SpringInSpringOut"
* "SmallSpringIn"
* "SmallSpringOut"
* "SmallSpringInSmallSpringOut"
* "AnticipateIn"
* "OvershootOut"
* "AnticipateInOvershootOut"
* "BounceIn"
* "BounceOut"
* "BounceInBounceOut"
* "Custom" // This must be used if adding an expression
* "None"
	* @example
	* // Add SlowOut Magic Easing
	* var shapeId = api.create('basicShape')
	* api.keyframe(shapeId, 0, { 'position.x': 0 })
	* api.keyframe(shapeId, 24, { 'position.x': 200 })
	* api.magicEasing(shapeId, 'position.x', 0, 'SlowOut')
	* @example
	* // Add Custom Magic Easing
	* var shapeId = api.create('basicShape')
	* api.keyframe(shapeId, 0, { 'position.x': 0 })
	* api.keyframe(shapeId, 24, { 'position.x': 200 })
	* api.magicEasing(shapeId, 'position.x', 0, 'Custom', '1 - pow(1 - x, 5)')
	*/
  function magicEasing(
    layerId: string,
    attrId: string,
    frame: number,
    easingName: string,
    expression?: string,
  ): void;
  /**
   * Get the keyframe times for an attribute.
   */
  function getKeyframeTimes(layerId: string, attrId: string): void;
  /**
   * Delete all keyframes on an attribute.
   */
  function deleteAnimation(layerId: string, attrId: string): void;
  /**
   * Get the data type of the Attribute.
   * @example
   * var layerId = api.create('javaScript', 'JS Layer')
   * api.addDynamic(layerId, 'array', 'string')
   * console.log(api.getAttrType(layerId, 'array.1'))
   */
  function getAttrType(layerId: string, attrId: string): string;
  /**
   * Reset an Attribute back to its default value.
   */
  function resetAttribute(layerId: string, attrId: string): void;
  /**
   * Add a new child to an array Attribute.
   * @example
   * var arrayId = api.create('valueArray', 'My Value Array')
   * api.addArrayIndex(arrayId, 'array')
   * api.addArrayIndex(arrayId, 'array')
   * api.set(arrayId, { 'array.0': 10, 'array.1': 20, 'array.2': 30 })
   */
  function addArrayIndex(layerId: string, attrId: string): number;
  /**
   * Remove an Attribute from an array.
   * @example
   * var arrayId = api.create('colorArray')
   * api.addArrayIndex(arrayId, 'array')
   * api.addArrayIndex(arrayId, 'array')
   * api.renameAttribute(arrayId, 'array.0', 'Color1')
   * api.renameAttribute(arrayId, 'array.1', 'Color2')
   * api.renameAttribute(arrayId, 'array.2', 'Color3')
   * api.removeArrayIndex(arrayId, 'array.1') // Remove Color2
   */
  function removeArrayIndex(layerId: string, attrId: string): void;
  /**
   * Reorder an Array attribute from one index to another.
   * @example
   * var colorId = api.create('colorArray')
   * api.addArrayIndex(colorId, 'array')
   * api.addArrayIndex(colorId, 'array')
   * api.set(colorId, { 'array.1': '#ffff00', 'array.2': '#6437ff' })
   * // Green, Yellow, Purple
   * api.reorderArrayAttr(colorId, 'array', 2, 0)
   * // Purple, Green, Yellow
   */
  function reorderArrayAttr(
    layerId: string,
    attrId: string,
    oldIndex: number,
    newIndex: number,
  ): void;
  /**
   * Return the number of Attributes in the array
   * @example
   * var arrayId = api.create('valueArray', 'My Value Array')
   * api.addArrayIndex(arrayId, 'array')
   * api.addArrayIndex(arrayId, 'array')
   * console.log(api.getArrayCount(arrayId, 'array'))
   */
  function getArrayCount(layerId: string, attrId: string): number;
  /**
	* Add a dynamic attribute to a Layer. Dynamic attributes are a special kind of Array Attribute in that they can be of different types. Only certain special Layers can have dynamic attributes added to them, for example the JavaScript Utility.
Once added, these attributes can be renamed by using [renameAttribute](#renameattribute) or removed by using [removeArrayIndex](#removearrayindex). The name of the attribute is used in the JavaScript execution, and in the UI, but getting and setting these attributes is done by index (e.g. array.0) and not by the Attribute name.
	* @example
	* var layerId = api.create('javaScript', 'JS Layer')
	* api.addDynamic(layerId, 'array', 'double')
	* api.addDynamic(layerId, 'array', 'bool')
	* api.addDynamic(layerId, 'array', 'string')
	* api.addDynamic(layerId, 'array', 'int2')
	* api.addDynamic(layerId, 'array', 'double2')
	* api.addDynamic(layerId, 'array', 'color')
	* 
	* /// an example of setting and getting a Dynamic Attribute
	* var layerId = api.create('javaScript', 'JS Layer')
	* api.addDynamic(layerId, 'array', 'double')
	* api.set(layerId, { 'array.1': 10 })
	* var value = api.get(layerId, 'array.1')
	* console.log(value)
	*/
  function addDynamic(layerId: string, attrId: string, attrType: string): void;
  /**
   * Return the nice name for Dynamic or Array Attributes.
   * @example
   * var arrayId = api.create('valueArray', 'My Value Array')
   * api.renameAttribute(arrayId, 'array.0', 'Example Name')
   * console.log(api.getCustomAttributeName(arrayId, 'array.0'))
   */
  function getCustomAttributeName(layerId: string, attrId: string): string;
  /**
   * Returns true if the specified attribute has a custom name.
   * @example
   * var shapeId = api.create('basicShape')
   * api.renameAttribute(shapeId, 'position', 'Example Name')
   * console.log(api.hasCustomAttributeName(shapeId, 'position'))
   */
  function hasCustomAttributeName(layerId: string, attrId: string): boolean;
  /**
   * Return the Id of the parent attribute. If there is no parent attribute, an empty string is returned.
   * @example
   * var shapeId = api.create('basicShape')
   * var parentAttrId = api.getAttrParent(shapeId, 'position.x')
   * console.log(parentAttrId)
   */
  function getAttrParent(layerId: string, attrId: string): string;
  /**
   * Return the Ids of any child attributes. If there are no child attributes, an empty array is returned.
   * @example
   * var arrayId = api.create('valueArray', 'My Value Array')
   * api.addArrayIndex(arrayId, 'array')
   * api.addArrayIndex(arrayId, 'array')
   * var children = api.getAttrChildren(arrayId, 'array')
   * console.log(children)
   */
  function getAttrChildren(layerId: string, attrId: string): string[];
  /**
   * Rename a specified Attribute for a Layer.
   * @example
   * var arrayId = api.create('valueArray', 'My Value Array')
   * api.renameAttribute(arrayId, 'array.0', 'Example Name')
   */
  function renameAttribute(layerId: string, attrId: string, name: string): void;
  /**
   * Return the 'nice name' of an Attribute based on its Scripting Path.
   * @example
   * var shapeId = api.create('basicShape')
   * api.renameAttribute(shapeId, 'position', 'Custom Name')
   * console.log(api.getAttributeNiceName(shapeId, 'position'))
   */
  function getAttributeNiceName(layerId: string, attrId: string): string;
  /**
   * Returns the 'nice name' of the given index for an enum (dropdown) Attribute.
   * @example
   * var shapeId = api.create('basicShape')
   * console.log(api.getDropdownNiceName(shapeId, 'motionBlur', 1))
   */
  function getDropdownNiceName(
    layerId: string,
    attrId: string,
    index: number,
  ): string;
  /**
   * List the output connections from a Layer.
   * @example
   * var layer = api.primitive('ellipse', 'Ellipse')
   * api.connect(layer, 'scale.x', layer, 'scale.y')
   * api.connect(layer, 'position.x', layer, 'position.y')
   * var outConn = api.getOutConnectedAttributes(layer)
   * console.log(outConn)
   */
  function getOutConnectedAttributes(layerId: string): string[];
  /**
   * List the input connections to a Layer.
   * @example
   * var ayer = api.primitive('ellipse', 'Ellipse')
   * api.connect(layer, 'scale.x', layer, 'scale.y')
   * api.connect(layer, 'position.x', layer, 'position.y')
   * var inConn = api.getInConnectedAttributes(layer)
   * console.log(inConn)
   */
  function getInConnectedAttributes(layerId: string): string[];
  /**
   * Return a list of all the attributes that exist on a Layer.
   * @example
   * var layerId = api.create('null', 'My Null')
   * var attrIds = api.getAttributes(layerId)
   * for (aId of attrIds) {
   * 	console.log(aId)
   * }
   */
  function getAttributes(layerId: string): string[];
  /**
   * Select attributes by their full paths (e.g., "layerId.attrId.subAttr") with an option to add to the current selection. Pass an empty array to clear the selection.
   */
  function selectAttribute(attributePaths: string[], add?: boolean): void;
  /**
   * Deselect attributes by their full paths (e.g., "layerId.attrId.subAttr").
   */
  function deselectAttribute(attributePaths: string[]): void;
  /**
   * Check to find out if a particular attribute exists on a Layer.
   * @example
   * var layer = api.primitive('ellipse', 'Ellipse')
   * var attr = api.hasAttribute(layer, 'position.x')
   * console.log(attr)
   */
  function hasAttribute(layerId: string, attrId: string): boolean;
  /**
   * Return a list of all the animated attributes that exist on a Layer.
   * @example
   * var layerId = api.create('null', 'My Null')
   * api.keyframe(layerId, 0, { 'scale.x': 5 })
   * api.keyframe(layerId, 100, { 'scale.x': 1 })
   * var attrIds = api.getAnimatedAttributes(layerId)
   * for (aId of attrIds) {
   * 	console.log(aId)
   * }
   */
  function getAnimatedAttributes(layerId: string): string[];
  /**
   * Check to find out if a particular attribute on a Layer is animated.
   * @example
   * var layerId = api.create('null', 'My Null')
   * api.keyframe(layerId, 0, { 'scale.x': 5 })
   * api.keyframe(layerId, 100, { 'scale.x': 1 })
   * console.log(api.isAnimatedAttribute(layerId, 'scale.x'))
   */
  function isAnimatedAttribute(layerId: string, attrId: string): boolean;
  /**
	* Sets a preset for a Graph Attribute.
The preset index can be:
0: s-curve
1: ramp
2: linear
3: flat
	*/
  function graphPreset(
    layerId: string,
    attrId: string,
    presetNumber: number,
  ): void;
  /**
   * Flips the points on a Graph Attribute - valid direction arguments are "horizontal" and "vertical".
   * @example
   * var staggerId = api.create('stagger', prefix + 'Stagger')
   * api.flipGraph(staggerId, 'graph', 'vertical')
   */
  function flipGraph(layerId: string, attrId: string, flipType: string): void;
  /**
   * Add an attribute to the [Control Centre](../../user-interface/menus/window-menu/control-centre.mdx).
   * @example
   * var shapeId = api.create('null', 'My Null')
   * api.addToControlCentre(shapeId, 'position.x')
   */
  function addToControlCentre(layerId: string, attrId: string): void;
  /**
   * Remove an attribute from the [Control Centre](../../user-interface/menus/window-menu/control-centre.mdx).
   * @example
   * //Create a Null and add position.x to Control Centre
   * var shapeId = api.create('null', 'My Null')
   * api.addToControlCentre(shapeId, 'position.x')
   * //Then, assuming the null's LayerId is null#1, remove position.x from the Control Centre
   * api.removeFromControlCentre('null#1', 'position.x')
   */
  function removeFromControlCentre(layerId: string, attrId: string): void;
  /**
   * Add a Pre-Comp Override to an Attribute.
   * @example
   * var layerId = api.primitive('ellipse', 'My Ellipse')
   * api.select([layerId])
   * var preCompId = api.preCompose()
   * api.addPreCompOverride(layerId, 'generator.radius')
   */
  function addPreCompOverride(layerId: string, attrId: string): void;
  /**
   * Remove a Pre-Comp Override to an Attribute.
   * @example
   * var layerId = api.primitive('ellipse', 'My Ellipse')
   * api.select([layerId])
   * var preCompId = api.preCompose()
   * api.addPreCompOverride(layerId, 'generator.radius')
   * var numOfOverrides = api.listPreCompOverrides(preCompId).length
   * // Remove Pre-Comp Override
   * api.removePreCompOverride(layerId, 'generator.radius')
   * var numOfOverridesAfterRemove = api.listPreCompOverrides(preCompId).length
   *
   * console.log(
   * 	'Overrides after add: ' +
   * 		numOfOverrides +
   * 		'. Overrides after remove: ' +
   * 		numOfOverridesAfterRemove,
   * )
   */
  function removePreCompOverride(layerId: string, attrId: string): void;
  /**
   * Return a list of `key:value` pairs where the `key` is the Attribute being overridden and the `value` is the attribute stored on the Pre-Comp.
   * @example
   * var layerId = api.primitive('ellipse', 'My Ellipse')
   * api.select([layerId])
   * var preCompId = api.preCompose()
   * api.addPreCompOverride(layerId, 'generator.radius')
   * api.addPreCompOverride(layerId, 'position')
   * console.log(JSON.stringify(api.listPreCompOverrides('compositionReference#1')))
   */
  function listPreCompOverrides(layerId: string): unknown;
  /**
   * Create evenly distributed Color Stops for a gradient attribute from an array of hex color strings.
   * @example
   * var gradientId = api.create('gradientShader', 'Gradient Shader')
   * api.setGradientFromColors(gradientId, 'generator.gradient', [
   * 	'#ffffff',
   * 	'#4ffd7a',
   * 	'#ffff00',
   * 	'#ff24e0',
   * 	'#6437ff',
   * 	'#ffffff',
   * ])
   */
  function setGradientFromColors(layerId?: string): void;
  /**
   * Set the interpolation for every Color Stop on a gradient attribute: Linear = 0, Step = 1, Smooth = 2, Crush = 3, Smooth Blend = 4, Contrast = 5.
   * @example
   * var gradientId = api.create('gradientShader', 'Gradient Shader')
   * api.setGradientFromColors(gradientId, 'generator.gradient', [
   * 	'#ffffff',
   * 	'#4ffd7a',
   * 	'#ffff00',
   * 	'#ff24e0',
   * ])
   * api.setGradientInterpolation(gradientId, 'generator.gradient', 1)
   */
  function setGradientInterpolation(layerId?: string): void;
  /**
   * Returns true if an attribute value matches its default value.
   */
  function isAttrDefault(layerId: string, attrId: string): boolean;
  /**
   * Returns true if two attributes are identical in value, expression and custom name (if set).
   * @example
   * let grad1id = api.create('gradientShader')
   * let grad2id = api.create('gradientShader')
   *
   * console.log(api.areAttributeValuesEqual(grad1id, 'alpha', grad2id, 'alpha')) // true
   * api.set(grad1id, { alpha: 50 })
   * console.log(api.areAttributeValuesEqual(grad1id, 'alpha', grad2id, 'alpha')) // false
   * console.log(
   * 	api.areAttributeValuesEqual(
   * 		grad1id,
   * 		'generator.gradient',
   * 		grad2id,
   * 		'generator.gradient',
   * 	),
   * ) // true
   * api.set(grad1id, { 'generator.gradient.0.color': '#d9695f' })
   * console.log(
   * 	api.areAttributeValuesEqual(
   * 		grad1id,
   * 		'generator.gradient',
   * 		grad2id,
   * 		'generator.gradient',
   * 	),
   * ) // false
   */
  function areAttributeValuesEqual(
    layerId1: string,
    attrId1: string,
    layerId2: string,
    attrId2: string,
  ): boolean;
  /**
   * Return true if an attribute has any definition overrides (limits).
   */
  function hasAttributeDefinitionOverrides(
    layerId: string,
    attrId: string,
  ): boolean;
  /**
   * Clear all definition overrides (limits) for an attribute.
   */
  function clearAttributeDefinitionOverrides(
    layerId: string,
    attrId: string,
  ): void;
  /**
	* Get a definition override (limit) for an attribute.

keys: "hardMin", "hardMax", "softMin", "softMax", "step"
	*/
  function getAttributeDefinitionOverride(
    layerId: string,
    attrId: string,
    key: string,
  ): number | null;
  /**
	* Set a definition override (limit) for an attribute.

keys: "hardMin", "hardMax", "softMin", "softMax", "step"
	*/
  function setAttributeDefinitionOverride(
    layerId: string,
    attrId: string,
    key: string,
    value?: number,
  ): void;
  /**
   * Get the attribute definition including any overrides which can be set via Edit Limits... in the UI.
   */
  function getEffectiveAttributeDefinition(
    layerId: string,
    attrId: string,
  ): unknown;
  /**
   * Centre the Pivot of the specified Layer. If Centroid is true the Pivot will be moved to the centre of mass.
   */
  function centrePivot(layerId: string, doCentroid: boolean): void;
  /**
   * Returns the position of a specified Layer's pivot in local or world space.
   */
  function getPivotPosition(
    layerId: string,
    worldSpace: boolean,
  ): { x: number; y: number };
  /**
   * Freeze the transform (position, rotation, scale, pivot, skew) of the specified Layer. This can be used to make a Shape's current position its zero position.
   */
  function freezeTransform(layerId: string): void;
  /**
   * Reset a Shape's transform back to the default state (this will also clear any frozen transformations).
   */
  function resetTransform(layerId: string): void;
  /**
   * Copy the selected Shape(s) as code. The resulting code can be pasted into a new tab and run to create a new Editable Shape based on those copied.
   * @example
   * var path = api.getDrawInstructionsForSelection()
   * console.log(path)
   */
  function getDrawInstructionsForSelection(): string;
  /**
   * Move the selected Shapes.
   * @example
   * var layer1Id = api.primitive('ellipse', 'Ellipse1')
   * var layer2Id = api.primitive('ellipse', 'Ellipse2')
   * api.set(layer2Id, { position: [200, 0] })
   * api.select([layer1Id, layer2Id])
   * api.move(100, 100)
   */
  function move(x: number, y: number): void;
  /**
	* This will convert the selected Shape into an Editable Shape, which can then be edited with the `getEditablePath` and `setEditablePath` functions.
If `makeACopy` is set to false the original Layer will be deleted.
	* @example
	* var primId = api.primitive('ellipse', 'Ellipse')
	* var editableId = api.makeEditable(primId, false)
	*/
  function makeEditable(layerId: string, makeCopy: boolean): string;
  /**
	* This function returns an `Editable Path` object which can be edited and then set back to any `Editable Shape` Layer.

`Editable Paths` and ordinary Paths (like the one in the [Cavalry Module](cavalry-module.mdx)) are distinct. The `worldSpace` argument can be used to determine if path point coordinates are returned in **local** – unaware of the Editable Shape's position, rotation and scale – or **world** space where those transformations are applied. An `Editable Path`'s points have **in handles** and **out handles** just like the points that are edited in the Viewport. They also have weight and angle locking settings. Ordinary Paths are constructed using `moveTo`, `lineTo` and `cubicTo`. In an `Editable Path`, an extra point can be added to the Contour's `points` array.

The schema is as follows:

The `inHandle` and `outHandle` objects are optional (when they are missing a linear point will be created). Values marked `bool` need to be `true` or `false`.
	* @example
	* ;[
	* 	{
	* 		points: [
	* 			{
	* 				position: {
	* 					x: 0.0,
	* 					y: 0.0,
	* 				},
	* 				outHandle: {
	* 					x: 0.0,
	* 					y: 0.0,
	* 					selected: bool,
	* 				},
	* 				inHandle: {
	* 					x: 0.0,
	* 					y: 0.0,
	* 					selected: bool,
	* 				},
	* 				weightLocked: bool,
	* 				angleLocked: bool,
	* 				selected: bool,
	* 			},
	* 		],
	* 		isClosed: bool,
	* 	},
	* ]
	* @example
	* var multiplier = 1.5
	* var primId = api.primitive('ellipse', 'Ellipse')
	* var editableId = api.makeEditable(primId, false)
	* 
	* var path = api.getEditablePath(editableId, false)
	* for (let contour of path) {
	* 	for (let point of contour.points) {
	* 		point.inHandle.x *= multiplier
	* 		point.outHandle.x *= multiplier
	* 		point.inHandle.y *= multiplier
	* 		point.outHandle.y *= multiplier
	* 	}
	* }
	* api.setEditablePath(editableId, true, path)
	*/
  function getEditablePath(layerId: string, worldSpace: boolean): unknown;
  /**
	* This will set the Editable Path on an Editable Shape (Primitives are not supported). See [getEditablePath](#geteditablepath) for details on the Editable Path schema. The `worldSpace` argument will determine if path point coordinates are set in **local** space – unaware of the Editable Shape's position, rotation and scale – or **world** space where those transformations are applied. If the Editable Path is accessed in world space, it should also be set in world space.

This example will flatten the selected bezier points to 0 on the Y axis.
	* @example
	* var sel = api.getSelection()
	* 
	* for (let layerId of sel) {
	* 	if (api.getLayerType(layerId) != 'editableShape') {
	* 		continue
	* 	}
	* 	let path = api.getEditablePath(layerId, true)
	* 	for (let contour of path) {
	* 		for (let point of contour.points) {
	* 			if (!point.selected) {
	* 				continue
	* 			}
	* 			point.position.y = 0
	* 			point.inHandle.y = 0
	* 			point.outHandle.y = 0
	* 		}
	* 	}
	* 	api.setEditablePath(layerId, true, path)
	* }
	*/
  function setEditablePath(
    layerId: string,
    worldSpace: boolean,
    pathObject: unknown,
  ): void;
  /**
   * This will make the selected point the first point in an Editable Path. This is like running the command in the Shape menu.
   */
  function makeFirstPoint(layerId: string): void;
  /**
   * Move selected points by given X and Y values.
   * @example
   * //select some editable points
   * api.movePoint(0, 50, true)
   */
  function movePoint(x: number, y: number, localSpace: boolean): void;
  /**
   * Move selected points to given X and Y positions. Values in the `positionObject` are optional, i.e `{"x":20}` and `{"x":20, "y":50}` are both valid. Use the `handles` argument to specify if in/out handles should be moved instead of the point. To move both, run the command twice with `handles` set to true and false.
   * @example
   * //select some editable points
   * api.setPointPosition({ y: -50 }, false, false)
   * api.setPointPosition({ y: -50 }, false, true)
   */
  function setPointPosition(
    xAndOrYObject: unknown,
    localSpace: boolean,
    handles: boolean,
  ): void;
  /**
   * Render a specific Render Queue Item.
   * @example
   * var itemId = api.addRenderQueueItem(api.getActiveComp())
   * api.render(itemId)
   */
  function render(renderQueueItemId: string): void;
  /**
   * Render all Render Queue Items in the Render Manager.
   * @example
   * api.addRenderQueueItem(api.getActiveComp())
   * api.renderAll()
   */
  function renderAll(): void;
  /**
	* Render the current frame out as a PNG with a given scale set by `scalePercent`.
Rendering in this way will only render the visible Layers (i.e any soloed Layers).
The render extension (.png) will be added to the filename.
	* @example
	* // This example will export each selected Layer individually as a PNG at 100% and 200% scale.
	* // Get the selection
	* var sel = api.getSelection()
	* for (let layerId of sel) {
	* 	// Solo each layer
	* 	api.soloLayers([layerId])
	* 	// Build a file path to export the render to
	* 	let filePath = api.getRenderPath() + '/' + api.getNiceName(layerId)
	* 	// Render out the image at 100% scale.
	* 	api.renderPNGFrame(filePath, 100)
	* 	// Add @2x to the file path
	* 	filePath += '@2x'
	* 	// Render out at 200% scale.
	* 	api.renderPNGFrame(filePath, 200)
	* 	// Log where we put the file
	* 	console.log('Rendered layer: ' + layerId + ' to: ' + filePath + '.png')
	* }
	* // Clear soloing
	* api.soloLayers([])
	*/
  function renderPNGFrame(filePath: string, scalePercentage: number): void;
  /**
	* Render the current frame out as an SVG with a given scale set by `scalePercent`.
Setting `skipComps` to true will mean that Composition backgrounds do not get exported.
Rendering in this way will only render the visible Layers (i.e any soloed Layers).
The render extension (.svg) will be added to the filename.
	*/
  function renderSVGFrame(
    filePath: string,
    scalePercentage: number,
    skipComps?: boolean,
  ): void;
  /**
   * Return a list of the Render Queue Items in the Render Manager.
   * @example
   * api.addRenderQueueItem(api.getActiveComp())
   * api.addRenderQueueItem(api.getActiveComp())
   * var items = api.getRenderQueueItems()
   * for (var item of items) {
   * 	console.log(item)
   * }
   */
  function getRenderQueueItems(): string[];
  /**
   * Add a new Render Queue Item to the Render Manager.
   * @example
   * var itemId = api.addRenderQueueItem(api.getActiveComp())
   * console.log(itemId)
   */
  function addRenderQueueItem(compId: string): string;
  /**
   * Connect the Render Manager's Dynamic Index to another attribute.
   * @example
   * var spreadsheetId = api.create('spreadsheet', 'My Spreadsheet')
   * api.connectDynamicIndex(spreadsheetId, 'rowIndex')
   * api.set(spreadsheetId, { useFixedRow: true })
   */
  function connectDynamicIndex(nodeId: string, attrId: string): void;
  /**
   * Return the current Dynamic Index.
   * @example
   * console.log(api.getDynamicIndex())
   */
  function getDynamicIndex(): number;
  /**
   * Set the Render Manager's Dynamic Index Offset.
   * @example
   * api.setDynamicIndexOffset(10)
   */
  function setDynamicIndexOffset(value: number): void;
  /**
   * Render a specific **Render Queue Item** in the background. Note - there are no notifications for the render's status.
   */
  function backgroundRender(renderQueueItemId: string): void;
  /**
   * Render all (active) **Render Queue Items** in the background. Note - there are no notifications for the render's status.
   */
  function backgroundRenderAll(): void;
  /**
   * Cancel the current render.
   */
  function cancelRender(): void;
  /**
   * Opens a new Scene, discarding any changes to the current Scene.
   */
  function newScene(): void;
  /**
   * Open a Scene at the given location, this may present a Save Changes dialog unless `force` is set to `true`.
   */
  function openScene(path: string, force?: boolean): void;
  /**
   * Save the current Scene to a new location and return a boolean to confirm if it was successful.
   */
  function saveSceneAs(filePath: string): boolean;
  /**
   * Save the current Scene file and return a boolean to confirm if it was successful. If the current Scene has not yet been saved, a dialog will be presented asking where to save the scene.
   */
  function saveScene(): boolean;
  /**
   * Return true if there have been any changes made to the Scene since the last save.
   * @example
   * console.log(api.sceneHasUnsavedChanges())
   */
  function sceneHasUnsavedChanges(): boolean;
  /**
   * Import a Cavalry Scene (.cv) or Component (.cvc). A `.cv` file will be added to the Assets Window, a `.cvc` file will be added to the active Composition.
   * @example
   * api.importScene('path/to/scene.cv')
   */
  function importScene(path: string): void;
  /**
   * Load an asset with the given path. Set `isSequence` to `true` to attempt to load an image sequence from the file path.
   * @example
   * // Load an image
   * api.loadAsset('/Path/To/image.png', false)
   *
   * // Load an image sequence
   * api.loadAsset('/Path/To/sequence.00000.png', true)
   */
  function loadAsset(path: string, isImageSequence: boolean): string;
  /**
   * Load a Smart Folder Asset from a file path. The type can be 'image' or 'audio'.
   * @example
   * // Load an Image Smart Folder
   * api.loadSmartFolderAsset('/path/to/smartfolder.png', 'image')
   */
  function loadSmartFolderAsset(path: string, type: string): string;
  /**
   * Reloads an Asset with the given `assetId`
   * @example
   * // First load an Asset, then run:
   * api.reloadAsset('asset#2')
   */
  function reloadAsset(assetId: string): void;
  /**
   * Replace a file asset (e.g an image or CSV file).
   */
  function replaceAsset(assetId: string, newPath: string): void;
  /**
   * Creates a Footage Shape and Image Shader for each Asset specified and returns the Ids of the newly created Footage Shapes. The argument/return can be a string or an array of strings.
   * @example
   * // Import an image/video
   * var assetId = api.loadAsset('/image.png', false)
   * // Create the Footage Shape
   * var footageId = api.addAssetToComp(assetId)
   * // Find the Image Shader (e.g. to rename it).
   * var imageShaderId = api.getChildren(footageId)
   */
  function addAssetToComp(assetId: string | string[]): string | string[];
  /**
	* Given a Text Asset (which is a .json file) or a Spreadsheet Asset, get the JSON object that Asset represents.

For the following example, first select a Text Asset (a JSON file imported into Cavalry).

It's also possible to use `jsonFromAsset` to query a .csv asset. CSV Assets will contain three members. `rows` will provide access to the row data. `min` will provide access to the minimum value of the column (if there is one), and `max` will give the maximum value.
	* @example
	* var sel = api.getSelection()
	* if (sel.length) {
	* 	if (api.getLayerType(sel[0]) == 'asset') {
	* 		let data = api.jsonFromAsset(sel[0])
	* 		console.log(Object.keys(data).length)
	* 	}
	* }
	* @example
	* // Return the first entry in the 'Text' column of a .csv asset (asset#2)
	* var csv = api.jsonFromAsset('asset#2')
	* var text = csv['Text'].rows[0]
	* console.log(text)
	*/
  function jsonFromAsset(assetId: string): unknown;
  /**
   * Given a Text Asset, get the raw string that Asset represents.
   */
  function textFromAsset(assetId: string): string;
  /**
   * Load a Google Sheet Asset. If the `sheetId` argument is left blank (e.g. "") then the first sheet will be loaded. This function returns the newly created `assetId`.
   */
  function loadGoogleSheet(fileId: string, sheetId?: string): string;
  /**
   * Replace an existing Google Sheet Asset with another. If the `sheetId` argument is left blank (e.g. "") then the first sheet will be loaded.
   */
  function replaceGoogleSheet(
    assetId: string,
    fileId: string,
    sheetId?: string,
  ): void;
  /**
   * Returns true if the Asset is a file asset (image, video, audio, Smart Folder etc.). A Google Sheet, Composition or Group will return false.
   */
  function isFileAsset(assetId: string): boolean;
  /**
   * Returns the ICC profile name of an image/video asset. Returns an empty string for sRGB or untagged images.
   */
  function getProfileName(assetId: string): string;
  /**
   * Returns true if the Asset is a Google Sheet.
   */
  function isGoogleSheetAsset(assetId: string): boolean;
  /**
   * Returns the name of the font family associated with a Font Asset.
   */
  function getFontAssetFamilyName(assetId: string): string;
  /**
   * Returns the name of the font style associated with a Font Asset.
   */
  function getFontAssetStyleName(assetId: string): string;
  /**
   * Set the location of projectDescription.json in order to use relative filepaths.
   * @example
   * api.setProject('path/to/project')
   */
  function setProject(path: string): void;
  /**
   * Clear the Project.
   * @example
   * api.clearProject()
   */
  function clearProject(): void;
  /**
   * Returns the currently active (open) Composition's id. This can be used to set Composition settings such as Resolution and Frame Range.
   * @example
   * console.log(api.getActiveComp())
   */
  function getActiveComp(): string;
  /**
   * Returns an array containing all the Compositions in the Scene.
   * @example
   * var newCompId = api.createComp('Shiny New Comp')
   * var allComps = api.getComps()
   * for (let compId of allComps) {
   * 	console.log(compId)
   * }
   */
  function getComps(): string[];
  /**
   * Create a new composition and return its id.
   * @example
   * api.createComp('Shiny New Comp')
   */
  function createComp(name: string): string;
  /**
   * Set the currently active composition.
   * @example
   * var newCompId = api.createComp('Shiny New Comp')
   * api.setActiveComp(newCompId)
   */
  function setActiveComp(compId: string): void;
  /**
   * Create a new Composition containing the current selection and then reference that new Composition into the active Composition. The optional `name` argument specifies the name of the Layer in the Scene Window. The `layerId` of the newly created Composition Reference is returned. To return the `compId` of the Composition itself, use [getCompFromReference](#getcompfromreference).
   * @example
   * // Create two Shapes.
   * var shape1 = api.primitive('superEllipse', 'Super Ellipse')
   * var shape2 = api.primitive('rectangle', 'Rectangle')
   * // Select them both.
   * api.select([shape1, shape2])
   * // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
   * api.preCompose('New Pre-Comp')
   */
  function preCompose(name?: string): string;
  /**
   * Given the `layerId` of a Composition Reference, get the `compId` of the Composition it references from the [Assets Window](../../user-interface/menus/window-menu/assets-window/intro.mdx).
   * @example
   * // Create a Shape and select it.
   * var shape1 = api.primitive('superEllipse', 'Super Ellipse')
   * api.select([shape1])
   * // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
   * var preCompId = api.preCompose('New Pre-Comp')
   * // Rename the Composition in the Assets Window to match.
   * var compId = api.getCompFromReference(preCompId)
   * api.set(compId, { niceName: 'New Pre-Comp' })
   */
  function getCompFromReference(layerId: string): string;
  /**
   * Create a Composition Reference from an existing Composition and add it to the active Composition.
   * @example
   * var newCompId = api.createComp('Shiny New Comp')
   * api.createCompReference(newCompId)
   */
  function createCompReference(compId: string): string;
  /**
   * This will return an array of all the Layers in the Asset Window. If topLevel is `true` then only the top level Layers will be returned.
   * @example
   * var assetLayerIds = api.getAssetWindowLayers(false)
   * for (let alId of assetLayerIds) {
   * 	console.log(alId)
   * }
   */
  function getAssetWindowLayers(topLevel: boolean): string[];
  /**
   * Return the asset type (i.e `image`, `audio`, `spreadsheet`, `movie`, `svg`).
   * @example
   * // First load an Asset, then run:
   * console.log(api.getAssetType('asset#2'))
   */
  function getAssetType(assetId: string): string;
  /**
   * Get the file path of a `file asset` such as a spreadsheet, image, or font.
   * @example
   * var assets = api.getAssetWindowLayers(false)
   * for (let assetId of assets) {
   * 	let type = api.getAssetType(assetId)
   * 	if (type != 'unknown') {
   * 		let filePath = api.getAssetFilePath(assetId)
   * 		console.log(
   * 			'Checking: ' +
   * 				filePath +
   * 				' of type ' +
   * 				type +
   * 				' exists: ' +
   * 				api.filePathExists(filePath),
   * 		)
   * 	}
   * }
   */
  function getAssetFilePath(assetId: string): string;
  /**
   * Retrieves all the file paths from an image sequence Asset.
   * @example
   * // Select an Image Sequence in the Assets Window
   * var assetId = api.getSelection()
   * console.log(api.getImageSequenceFilePaths(assetId[0]))
   */
  function getImageSequenceFilePaths(assetId: string): string[];
  /**
   * Return the URL for a given Google Sheet Asset.
   * @example
   * var assets = api.getAssetWindowLayers(false)
   * for (let assetId of assets) {
   * 	let type = api.getAssetType(assetId)
   * 	if (type == 'spreadsheet') {
   * 		console.log(api.getGoogleSheetAssetURL(assetId))
   * 	}
   * }
   */
  function getGoogleSheetAssetURL(assetId: string): string;
  /**
   * Create a Group in the Assets Window, this will return the layerId of the new Group.
   * @example
   * api.createAssetGroup('My Asset Group')
   */
  function createAssetGroup(name: string): string;
  /**
   * This will solo the Layer ids supplied in the array argument.
   * @example
   * // This example will export each selected Layer individually as a PNG at 100% and 200% scale.
   * // Get the selection
   * var sel = api.getSelection()
   * for (let layerId of sel) {
   * 	// Solo each layer
   * 	api.soloLayers([layerId])
   * 	// Build a file path to export the render to
   * 	let filePath = api.getRenderPath() + '/' + api.getNiceName(layerId)
   * 	// Render out the image at 100% scale.
   * 	api.renderPNGFrame(filePath, 100)
   * 	// Add @2x to the file path
   * 	filePath += '@2x'
   * 	// Render out at 200% scale.
   * 	api.renderPNGFrame(filePath, 200)
   * 	// Log where we put the file
   * 	console.log('Rendered layer: ' + layerId + ' to: ' + filePath + '.png')
   * }
   * // Clear soloing
   * api.soloLayers([])
   */
  function soloLayers(layerIdArray: string[]): void;
  /**
   * Return a list of all Layers in a Scene.
   * @example
   * var layers = api.getAllSceneLayers()
   * for (layer of layers) {
   * 	console.log(layer)
   * }
   */
  function getAllSceneLayers(): string[];
  /**
   * This will load and run a JavaScript file making the functions contained within it available to use in the current script. This is not a module loader. Scripts loaded in this way are not placed into a namespace/ module and are free functions/objects.
   * @example
   * // Contents of script.js
   * function helloWorld() {
   * 	console.log('Hello World.')
   * }
   * @example
   * // Then in Cavalry
   * api.load('path/to/script.js')
   * helloWorld()
   */
  function load(scriptPath: string): boolean;
  /**
	* Open and filter a dialogue window to load/import files. Returns the file name to be loaded or an empty string if the user cancels the dialogue.
The fileFilter is a title, followed by parenthesis containing space separated file type descriptions. e.g. `"Data File (*.json *.csv)"`, `"Cavalry File (*.cv *.cvc)"`, `"Palettes (*.pal)"`.
	* @example
	* // Create a button
	* var button = new ui.Button('Import File')
	* // Set the onClick callback function
	* button.onClick = function () {
	* 	console.log(
	* 		api.presentOpenFile(
	* 			api.getProjectPath(),
	* 			'Import JSON or CSV',
	* 			'Data File (*.json *.csv)',
	* 		),
	* 	)
	* }
	* // Add the button to the layout
	* ui.add(button)
	* // Show the window
	* ui.show()
	*/
  function presentOpenFile(
    startPath: string,
    title: string,
    fileFilter: string,
  ): string;
  /**
	* Open a dialogue window to save files. Returns the saved file name or an empty string if the user cancels the dialogue.
The fileFilter is a title, followed by parenthesis containing the file type description. e.g. `"Save JSON", "JSON File (*.json)", "Config File.json"`. Multiple fileFilters can be added by separating the file types with a double semi-colon (`;;`) – a drop down menu will then appear within the dialogue for a user to choose a file type from.
	* @example
	* // Simple example
	* 
	* // Create a button
	* var button = new ui.Button('Save File')
	* // Set the onClick callback function
	* button.onClick = function () {
	* 	var filePath = api.presentSaveFile(
	* 		api.getProjectPath(),
	* 		'Save JSON',
	* 		'JSON File (*.json)',
	* 		'test.json',
	* 	)
	* 	api.writeToFile(filePath, 'Test file contents', (overwrite = false))
	* }
	* // Add the button to the layout
	* ui.add(button)
	* // Show the window
	* ui.show()
	* @example
	* // Example including a filter for multiple file types
	* 
	* // Create a button
	* var button = new ui.Button('Save File')
	* // Set the onClick callback function
	* button.onClick = function () {
	* 	console.log(
	* 		api.presentSaveFile(
	* 			api.getProjectPath(),
	* 			'Save Data',
	* 			'JSON File (*.json);;CSV File (*.csv)',
	* 			'Config File',
	* 		),
	* 	)
	* }
	* // Add the button to the layout
	* ui.add(button)
	* // Show the window
	* ui.show()
	*/
  function presentSaveFile(
    startPath: string,
    title: string,
    fileFilter: string,
    defaultFileName: string,
  ): string;
  /**
   * Presents a dialog for the user to select a folder.
   * @example
   * var startPath = ''
   * if (api.getPlatform() == 'macOS') {
   * 	startPath = '/macos/start/path' // Update this path
   * } else {
   * 	startPath = '/windows//start/path' // Update this path
   * }
   * var filePath = api.presentChooseFolder(startPath, 'Testing')
   * console.log(filePath)
   */
  function presentChooseFolder(startPath: string, title: string): string;
  /**
	* Like `load`, `exec` will load and run JavaScript but it does not require a saved file.

The first argument is a `scriptId`. The `scriptId` exists because Cavalry asks for permission to perform certain tasks (like using the WebAPIs or writing to the hard drive) on a per-script basis. This information is stored using the `scriptId` so that permission will only be requested once per Id.

We recommend using reverse domain notation `com.<yourCompany>.<yourScript>` as a basis for `scriptId`s.
	* @example
	* var myScript = "console.log('Hello World!')"
	* api.exec('com.scenegroup.scriptName', myScript)
	*/
  function exec(scriptId: string, script: string): boolean;
  /**
   * Gets the Project path (if a Project is set). This path does not include a trailing `/`
   * @example
   * console.log(api.getProjectPath())
   */
  function getProjectPath(): string;
  /**
   * Gets the Render path (if a [Project](../../user-interface/menus/window-menu/assets-window/project-settings.mdx) is set). This path does not include a trailing `/`
   * @example
   * console.log(api.getRenderPath())
   */
  function getRenderPath(): string;
  /**
   * Gets the Project Asset path (if a [Project](../../user-interface/menus/window-menu/assets-window/project-settings.mdx) is set). This path does not include a trailing `/`
   * @example
   * console.log(api.getAssetPath())
   */
  function getAssetPath(): string;
  /**
   * Gets the Project Asset path (if a [Project](../../user-interface/menus/window-menu/assets-window/project-settings.mdx) is set). This path does not include a trailing `/`
   * @example
   * console.log(api.getPalettesPath())
   */
  function getPalettesPath(): string;
  /**
   * Gets the Scene's path (if a [Project](../../user-interface/menus/window-menu/assets-window/project-settings.mdx) is set). This path does not include a trailing `/`
   * @example
   * console.log(api.getScenesPath())
   */
  function getScenesPath(): string;
  /**
   * If the current Scene has been saved this will return its filepath, otherwise it will return an empty string.
   * @example
   * console.log(api.getSceneFilePath())
   */
  function getSceneFilePath(): string;
  /**
   * Get the location of the Cavalry preferences folder.
   * @example
   * console.log(api.getPreferencesPath())
   */
  function getPreferencesPath(): string;
  /**
   * Get the location of the Cavalry Presets folder.
   * @example
   * console.log(api.getPresetsPath())
   */
  function getPresetsPath(): string;
  /**
   * Get the location of the App Assets (this is useful for accessing app icons for a script).
   * @example
   * var icon = `${api.getAppAssetsPath()}/icons/transform@2x.png`
   * var button = new ui.ImageButton(icon)
   * button.setSize(32, 32)
   * ui.add(button)
   * ui.show()
   */
  function getAppAssetsPath(): string;
  /**
   * Get the location of the User's home directory.
   * @example
   * console.log(api.getHomeFolder())
   */
  function getHomeFolder(): string;
  /**
   * Get the location of the user's desktop directory.
   * @example
   * console.log(api.getDesktopFolder())
   */
  function getDesktopFolder(): string;
  /**
   * Get the location of the User's 'Downloads' directory.
   * @example
   * console.log(api.getDownloadsFolder())
   */
  function getDownloadsFolder(): string;
  /**
   * Get the location of the User's 'Fonts' directory.
   * @example
   * console.log(api.getFontsFolder())
   */
  function getFontsFolder(): string;
  /**
   * Get the location of the temporary files directory.
   * @example
   * console.log(api.getTempFolder())
   */
  function getTempFolder(): string;
  /**
   * Get the location of the user's preferences/configuration directory.
   * @example
   * console.log(api.getPreferencesFolder())
   */
  function getPreferencesFolder(): string;
  /**
   * Get the location of the user's application data directory.
   * @example
   * console.log(api.getAppDataFolder())
   */
  function getAppDataFolder(): string;
  /**
   * Return whether a path to a file or folder exists.
   * @example
   * console.log(api.filePathExists(api.getPreferencesPath()))
   */
  function filePathExists(path: string): boolean;
  /**
   * Return the file name from a path with an optional argument to include the file extension.
   * @example
   * /// will return `file`
   * console.log(api.getFileNameFromPath('/path/to/file.png'))
   *
   * /// will return `file.png`
   * console.log(api.getFileNameFromPath('/path/to/file.png', true))
   */
  function getFileNameFromPath(
    path: string,
    includeExtension?: boolean,
  ): string;
  /**
   * Return the extension of a file.
   * @example
   * /// will return `.png`
   * console.log(api.getExtensionFromPath('/path/to/file.png'))
   */
  function getExtensionFromPath(path: string): string;
  /**
   * Return the containing folder of a file.
   * @example
   * /// will return `/path/to`
   * console.log(api.getFolderFromPath('/path/to/file.png'))
   */
  function getFolderFromPath(path: string): string;
  /**
   * Create a folder at the location given in `path` and return if the operation was a success. Set the 'overwriteExisting' argument to `true` to override the error and replace the existing file - proceed with caution.
   * @example
   * // Update the example path below and uncomment the line
   * // var newFolder = api.makeFolder("/path/to/newFolder");
   * var message = ''
   * if (newFolder == true) {
   * 	message = 'New folder created.'
   * } else {
   * 	message = 'New folder failed.'
   * }
   * console.log(message)
   */
  function makeFolder(path: string, overwriteExisting?: boolean): boolean;
  /**
   * Delete a file from the file system and return true if successful. Typically this can be used for temporary files a user should never see.
   */
  function deleteFilePath(path: string): boolean;
  /**
	* Write a string to a file. Returns if the write was successful. If a file already exists, an error is returned. Set the 'overwriteExisting' argument to `true` to override the error and replace the existing file - proceed with caution.

Binary data cannot be written from this API, for that, please use `writeEncodedToBinaryFile`. [filePathExists](#filepathexists) can also be used to add any additional success/warning messages to the console.
	* @example
	* // Export an .obj example
	* var primId = api.primitive('polygon', 'My Polygon')
	* var mesh = api.get(primId, 'polyMesh')
	* 
	* var objContents = '#this is an example obj export from Cavalry\n\n'
	* objContents += 'o testShape\n\n'
	* var face = 'f '
	* 
	* var path = mesh.getPathAtIndex(0)
	* var pd = path.pathData()
	* var index = 1 // obj face index starts at 1
	* 
	* // Add vertices and vertex normals
	* for (var verb of pd) {
	* 	if (verb.type != 'close') {
	* 		objContents +=
	* 			'v ' +
	* 			verb.point.x.toFixed(4) +
	* 			' ' +
	* 			verb.point.y.toFixed(4) +
	* 			' 0.0\n'
	* 		objContents += 'vn 0.0 0.0 1.0\n' // Normal vector for 2D plane
	* 		face += index + '//' + index + ' ' // Vertex and normal indices
	* 	}
	* 	++index
	* }
	* 
	* objContents += '\nusemtl None\n'
	* objContents += 's off\n'
	* objContents += face.trim() + '\n'
	* 
	* // This line is commented out as you will need to provide a file path
	* // api.writeToFile("/some/folder/test.obj", objContents);
	*/
  function writeToFile(
    filePath: string,
    content: string,
    overwriteExisting?: boolean,
  ): boolean;
  /**
	* Write a base64-encoded string to a file and return if the write was successful. Caution - this will overwrite any existing file.
Please note, only files encoded using `encodeBinary` will be properly decoded.
	* @example
	* var encoded = api.encodeBinary('/some/folder/original.png')
	* api.writeEncodedToBinaryFile('/some/folder/copy.png', encoded)
	*/
  function writeEncodedToBinaryFile(filePath: string, content: string): boolean;
  /**
   * Read a file as a string.
   * @example
   * // Please note this file path will need to point to an existing file.
   * var text = api.readFromFile('/some/folder/test.obj')
   * console.log(text)
   */
  function readFromFile(filePath: string): string;
  /**
   * Read a binary file (like an image), and encode it into base64. This can then be stored as a variable in JavaScript for use later (i.e with `writeEncodedToBinaryFile`).
   * @example
   * // Please note this file path will need to point to an existing file.
   * var encoded = api.encodeBinary('/some/folder/test.png')
   * api.writeToFile('/some/folder/encoderDump.txt', encoded)
   */
  function encodeBinary(filePath: string): string;
  /**
   * Convert an SVG file to Layers without the need to import the SVG as an asset first.
   * @example
   * var svg = api.convertSVGToLayers('/path/to/filename.svg')
   * console.log(svg)
   */
  function convertSVGToLayers(filename: string): string[];
  /**
   * Gets the last modified time of the file in milliseconds since epoch.
   * @example
   * var mod = new Date(api.getFileModifiedDate('/path/to/file.mp4'))
   * console.log(mod.toDateString())
   */
  function getFileModifiedDate(path: string): number;
  /**
   * Gets the file size in kilobytes (KB).
   * @example
   * console.log(api.getFileSize('/path/to/file.mp4'))
   */
  function getFileSize(path: string): number;
  /**
   * Returns true if the path exists and is a directory.
   */
  function isDirectory(path: string): boolean;
  /**
   * Returns all visible file paths in a directory, optionally including subdirectories.
   */
  function listDirectoryPaths(
    path: string,
    includeDirectories?: boolean,
  ): string[];
  /**
   * Returns true if the path exists and is a regular file.
   */
  function isFile(path: string): boolean;
  /**
   * Returns an absolute, canonical path string, resolving any aliases/symlinks.
   */
  function getAbsolutePath(path: string): string;
  /**
   * Computes the relative path from one location to another.
   */
  function getRelativePath(from: string, to: string): string;
  /**
   * Returns an array of all file and folder paths directly under the given directory.
   */
  function listDirectory(path: string): string[];
  /**
   * Returns an array of all file and folder paths under the given directory (recursively).
   */
  function listDirectoryRecursive(path: string): string[];
  /**
   * Unzips a zip file to a given location, returning a list of extracted top level files.
   * @example
   * var zipContents = api.unzip('/path/to/example.zip', '/path/to/unzip/')
   * console.log(zipContents)
   */
  function unzip(zipPath: string, destinationPath: string): string[];
  /**
   * Copy a file from one specified path to another.
   * @example
   * var copy = api.copyFilePath('/path/to/file.jpg', '/path/to/copy/file.jpg')
   * console.log(copy)
   */
  function copyFilePath(fromPath: string, toPath: string): boolean;
  /**
   * Export the current Scene to a specified file path. If a `.cv` file extension is not included it will be automatically added.
   * @example
   * var exportAs = api.exportSceneAs('/path/to/file.cv')
   * console.log(exportAs)
   */
  function exportSceneAs(filePath: string): boolean;
  /**
   * Export any selected (and connected) Layers to a specified file path. If a `.cvc` file extension is not included it will be automatically added.
   * @example
   * var exportSel = api.exportSelected('/path/to/file.cvc')
   * console.log(exportSel)
   */
  function exportSelected(
    filePath: string,
    exportingAsProject?: boolean,
  ): boolean;
  /**
   * Add a string to the clipboard.
   * @example
   * api.setClipboardText('Copy test from Cavalry')
   */
  function setClipboardText(content: string): void;
  /**
   * Return the contents of the clipboard as a string.
   * @example
   * api.setClipboardText('Copy test from Cavalry')
   * console.log(api.getClipboardText())
   */
  function getClipboardText(): string;
  /**
   * This runs a system process and waits for the result which is returned as an object. GUI scripts that try to run this function will trigger a warning asking for users to trust the script. This is a blocking action, the UI will freeze until the process completes. For non blocking processes see `runDetachedProcess` below.
   * @example
   * // macOS example
   * var res = api.runProcess('sh', ['-c', 'python3 --version'])
   * if (res.error) {
   * 	console.log(res.error)
   * } else {
   * 	console.log(res.output)
   * }
   * // Windows example
   * // The command to run (the first argument) would be "cmd.exe" or "path/to/powerShell.exe" and so forth.
   * var res = api.runProcess('cmd.exe', ['/c echo hello world'])
   * if (res.error) {
   * 	console.log(res.error)
   * } else {
   * 	console.log(res.output)
   * }
   * @example
   * // Example converting a macOS filepath to Windows
   * // Set a path to convert
   * var iconPath = `${api.getAppAssetsPath()}/icons/transform@2x.png`
   * // Convert the path to a native filepath (on Windows this will replace all / with \)
   * iconPath = api.toNativeFilePath(iconPath)
   * // Run an example command using that path
   * var result = api.runProcess('cmd.exe', ['/c', 'dir', iconPath])
   * console.log(result.output)
   * @example
   * // Example using a hard coded file path which requires escaped backslashes
   * // Note how each argument needs to be a separate entry in the argument array
   * result = api.runProcess('cmd.exe', [
   * 	'/c',
   * 	'fsutil',
   * 	'file',
   * 	'queryfileid',
   * 	'C:\\Users\\YourUser\\Desktop\\AudioTest.mov',
   * ])
   * console.log(result.error)
   * console.log(result.output)
   */
  function runProcess(cmd: string, argArray: string[]): unknown;
  /**
   * This runs a system process in a separate thread. GUI scripts that try to run this function will trigger a warning asking for users to trust the script. This is a non-blocking action.
   * @example
   * // macOS example
   * api.runDetachedProcess('sh', ['-c', 'python3 --version'])
   * // Windows example - the command to run (the first argument) would be e.g. "cmd.exe" or "path/to/powerShell.exe".
   * api.runDetachedProcess('cmd.exe', ['/c echo hello world'])
   */
  function runDetachedProcess(cmd: string, argArray: string[]): void;
  /**
   * Open a URL in a browser.
   * @example
   * api.openURL('http://cavalry.studio')
   * api.openURL('file:///Users/User/Desktop')
   */
  function openURL(url: string): void;
  /**
   * Returns `true` if this is a GUI session of the app, and `false` if not (e.g the CLI is running).
   * @example
   * console.log(api.isGuiSession())
   */
  function isGuiSession(): boolean;
  /**
   * Get the current hardware platform. This will return either `macOS` or `Windows`
   * @example
   * console.log(api.getPlatform())
   */
  function getPlatform(): string;
  /**
	* Return the current hardware system info as an object with the following keys:

* **cpu** - The current CPU architecture (e.g. "arm64").
* **os** - The current OS (e.g. "macos").
* **uniqueId** - A unique identifier that can be used to track a machine for an extended period of time – useful for network operations. Note that this value may change between reboots.
	* @example
	* console.log(JSON.stringify(api.getSystemInfo()))
	*/
  function getSystemInfo(): { cpu: string; os: string; uniqueId: string };
  /**
   * Return the Cavalry version as a string (e.g. "1.5.6").
   * @example
   * console.log(api.getCavalryVersion())
   */
  function getCavalryVersion(): string;
  /**
   * Convert a macOS file path to a Windows file path. This replaces `/` with `\` (and escapes them as needed).
   * @example
   * console.log(api.toNativeFilePath('/path/to/my folder'))
   * // This will return "\path\to\my folder" on Windows.
   */
  function toNativeFilePath(filePath: string): string;
  /**
	* Convert a list of Layers into their 'save file' representation.

The first argument is an array of strings `[string]` containing the Layers to be serialised. The second argument is `withConnections` - if this is `true`, any input connections will also be serialised. For example, if a **Shape** in the array is connected to a **Color Array**, setting `withConnections` to `true` will also serialise the **Color Array**.
	* @example
	* var primId = api.primitive('polygon', 'My Polygon')
	* api.set(primId, { 'material.materialColor': '#8dc429' })
	* api.writeToFile(
	* 	'/Users/username/Desktop/textExport.txt',
	* 	api.serialise([primId], false),
	* )
	*/
  function serialise(layerIds: string[], withConnections: boolean): void;
  /**
   * Deserialise a JSON string to Layers. This function is the opposite of `serialise`.
   * @example
   * // Select a Layer
   * var sel = api.getSelection()
   * var str = api.serialise(sel, true)
   * api.deserialise(str)
   */
  function deserialise(string: string): void;
  /**
   * Save a preference.
   * @example
   * var hello = { first: 'Hello, ', second: 'World', third: '!' }
   * api.setPreferenceObject('testKey', hello)
   */
  function setPreferenceObject(key: string, object: unknown): void;
  /**
   * Query to see if preference exists.
   * @example
   * var hello = { first: 'Hello, ', second: 'World', third: '!' }
   * api.setPreferenceObject('testKey', hello)
   * console.log(api.hasPreferenceObject('testKey'))
   */
  function hasPreferenceObject(key: string): boolean;
  /**
   * Return any existing preferences.
   * @example
   * var hello = { first: 'Hello, ', second: 'World', third: '!' }
   * api.setPreferenceObject('testKey', hello)
   * var myPrefs = api.getPreferenceObject('testKey')
   * console.log(myPrefs.first + myPrefs.second + myPrefs.third)
   */
  function getPreferenceObject(key: string): unknown;
  /**
   * Save arbitrary data to a Layer. This could be a string, or an object.
   * @example
   * // Save String
   * var primId1 = api.primitive('star', 'Star')
   * api.setUserData(primId1, 'test', 'Hello, World!')
   * console.log(api.getUserDataKey(primId1, 'test'))
   *
   * // Save Object
   * var primId2 = api.primitive('star', 'Star')
   * api.setUserData(primId2, 'test', {
   * 	type: 'Software',
   * 	model: 'Cavalry',
   * 	starRating: 5,
   * })
   * var data = api.getUserDataKey(primId2, 'test')
   * console.log(data.model)
   */
  function setUserData(layerId: string, key: string, value: unknown): void;
  /**
   * Checks if a specific `key` exists within the user data of a specified Layer.
   * @example
   * var primId = api.primitive('star', 'Star')
   * api.setUserData(primId, 'test', 'Hello, World!')
   * console.log(api.hasUserDataKey(primId, 'test'))
   */
  function hasUserDataKey(layerId: string, key: string): boolean;
  /**
   * Return any existing user data for the given `key`.
   * @example
   * var primId = api.primitive('star', 'Star')
   * api.setUserData(primId, 'test', 'Hello, World!')
   * console.log(api.getUserDataKey(primId, 'test'))
   */
  function getUserDataKey(layerId: string, key: string): unknown;
  /**
   * Return a UUIDv4 string.
   */
  function uuid(): string;
  /**
	* Each Layer in Cavalry has a unique identifier (a UUID). Layers based on the UUID can be identified with this API.
See the example for how to get a UUID from a Layer.
	* @example
	* var primId = api.primitive('star', 'Star')
	* var uuid = api.get(primId, 'uuid')
	* var idCheck = api.getLayerFromUUID(uuid)
	* console.log(primId + ' === ' + idCheck)
	*/
  function getLayerFromUUID(uuid: string): string;
  /**
   *
   * @example
   * // Define a callback class to be used by the timer
   * function Callbacks() {
   * 	// This callback will be called whenever the timer times out
   * 	this.onTimeout = function () {
   * 		console.log('Timer Expired')
   * 	}
   * }
   *
   * // Create the callback class
   * var callbackObj = new Callbacks()
   *
   * // Make the timer and feed it the callback object
   * var timer = new api.Timer(callbackObj)
   */
  class Timer {
    constructor(callback: unknown);
    /** start the timer. */
    start(): void;
    /** stop the timer. */
    stop(): void;
    /** returns if the timer is currently running. */
    isActive(): void;
    /** set how long the timer is (in milliseconds). */
    setInterval(interval: number): void;
    /** set if the timer is repeating (true by default). */
    setRepeating(repeat: boolean): void;
    /** Implement this callback function on a timer object and it will be called when the timer runs out. */
    onTimeout: () => void;
  }
  /**
   * Check if the <kbd>Option/Alt</kbd> key is held down.
   */
  function isAltHeld(): boolean;
  /**
   * Check if the <kbd>Shift</kbd> key is held down.
   */
  function isShiftHeld(): boolean;
  /**
   * Check if the <kbd>Control</kbd> (Windows) or <kbd>⌘ command</kbd> (macOS) key is held down.
   */
  function isControlHeld(): boolean;
  /**
   * Check if the <kbd>Meta</kbd> (Windows) or <kbd>control</kbd> (macOS) key is held down. Note that this deviates from the standard where <kbd>Meta</kbd> refers to the <kbd>⌘ command</kbd> key.
   */
  function isMetaHeld(): boolean;
  /**
   * Return all the user facing types and names of Layers in Cavalry.
   * @example
   * var layerTypes = api.getAllLayerTypes(false)
   * for (data of layerTypes) {
   * 	console.log(data.name + '. Type: ' + data.type)
   * }
   *
   * // data.type - the internal Layer type.
   * // data.name - the English name of the Layer.
   */
  function getAllLayerTypes(includeExperimentalTypes: boolean): unknown;
  /**
   * Return the SuperTypes of a Layer.
   * @example
   * var ellipseId = api.primitive('ellipse', 'Ellipse')
   * console.log(api.getSuperTypes(ellipseId))
   */
  function getSuperTypes(layerId: string): string[];
  /**
   * Encrypt text. Useful for script authors to automate the encryption of scripts.
   * @example
   * console.log(api.encrypt('Hello.'))
   */
  function encrypt(content: string): string;
  /**
   * Flush the event queue to ensure all pending GUI updates have finished.
   */
  function processEvents(): void;
  /**
   * Set a Cavalry preference. Open Preferences.json via 'Help > Show Preferences Folder' for all available preference keys.
   * @example
   * api.setCavalryPreference('showGrid', true)
   * api.setCavalryPreference('gridColor', '#4df24c3d')
   */
  function setCavalryPreference(key: string, value: unknown): void;
  /**
   * Get a Cavalry preference's setting or null if there is no preference with the given key or the preference type is unsupported. Open Preferences.json via 'Help > Show Preferences Folder' for all available preference keys.
   * @example
   * console.log(api.getCavalryPreference('fontSize'))
   */
  function getCavalryPreference(key: string): unknown;
  /**
   * Saves the contents of the viewport to a PNG.
   */
  function saveViewportContentsAsImage(filePath: string): void;
  /**
   * Encrypts the given file, and saves it to the specified location.
   * @example
   * api.encryptFile('path/to/file.sksl', 'path/to/encryptedFile.skslc')
   */
  function encryptFile(filePath: string, newFilePath: string): void;
  /**
   * Returns true if a Starter (free) licence is in use.
   */
  function isRestrictedLicence(): boolean;
  /**
   * Force the app's title bar to update. This can be used to e.g. trigger Restricted Mode for Starter users when Pro features are added to a Composition.
   */
  function updateAppTitleBar(string: string): void;
  /**
   * Returns the viewport's active tool.
   * @example
   * console.log(api.getActiveTool())
   */
  function getActiveTool(): string;
  /**
   *
   */
  class WebClient {
    constructor(origin: string);
    /** Sets basic authentication for any subsequent requests. */
    setBasicAuthentication(username: string, password: string): void;
    /** Sets digest authentication for any subsequent requests. */
    setDigestAuthentication(username: string, password: string): void;
    /** Sets token based authentication for any subsequent requests. */
    setTokenAuthentication(token: string): void;
    /** Adds a header for any following requests. API keys, app keys, content types and so forth can be added in this way. */
    addHeader(key: string, value: string): void;
    /**  */
    getHeaders(): void;
    /** Returns the status of the request. For example 200 means `OK`. */
    status(): void;
    /** The returned body. This is often in the form of JSON but you can check the `Content-Type` header with `getHeaders()` if you're unsure. */
    body(): void;
    /** Performs a `get` request. Once done, `status()` and if successful, `body()` should be available. */
    get(path: string): void;
    /** Performs a `post` request. Once done, `status()` and if successful, `body()` should be available. */
    post(path: string, content: string, contentType: string): void;
    /** Performs a `put` request. Once done, `status()` and if successful, `body()` should be available. */
    put(path: string, content: string, contentType: string): void;
    /** A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies).
Performs a `post` request. Once done, `status()` and if successful, `body()` should be available. */
    postFromFile(path: string, filePath: string, contentType: string): void;
    /** A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies).
Performs a `put` request. Once done, `status()` and if successful, `body()` should be available. */
    putFromFile(path: string, filePath: string, contentType: string): void;
    /** If `get` has been used to retrieve binary data (i.e an image or a movie), this cannot be passed to the usual `api.writeToFile()` call. You must instead use this function to write the *body* data to file (which you can then pull into Cavalry as an Asset for example). */
    writeBodyToBinaryFile(path: string): void;
    /** Enter a proxy server's IP and port number. */
    setProxy(hostAddress: string, port: number): void;
    /** Enter a username and password to authenticate to a proxy server. */
    setProxyBasicAuthentication(username: string, password: string): void;
    /** Enter a password for a proxy server that uses a bearer token. */
    setProxyBearerAuthentication(password: string): void;
  }
  /**
	* A complete example of a UI script which implements a Cavalry Server. Please save this into the Cavalry Scripts folder `Help > Scripts` and then load it via the `Window > Scripts` menu.

Once this script is running, run this in the JavaScript Editor, the `/post` text should print to the console.
	* @example
	* var server = new api.WebServer()
	* 
	* var button = new ui.Button('Start Server')
	* 
	* button.onClick = function () {
	* 	if (!server.isRunning()) {
	* 		server.listen('localhost', 1234)
	* 		button.setText('Stop Server')
	* 	} else {
	* 		server.stop()
	* 		button.setText('Start Server')
	* 	}
	* }
	* 
	* function Callbacks() {
	* 	this.onPost = function () {
	* 		console.log('Queue length: ' + server.postCount())
	* 		processButton.setEnabled(true)
	* 	}
	* }
	* 
	* var processButton = new ui.Button('Process Posts')
	* processButton.setEnabled(false)
	* 
	* processButton.onClick = function () {
	* 	while (server.postCount()) {
	* 		let obj = server.getNextPost()
	* 		console.log('Process: ' + obj.result)
	* 	}
	* 	processButton.setEnabled(false)
	* }
	* 
	* var callbackObj = new Callbacks()
	* server.addCallbackObject(callbackObj)
	* 
	* ui.add(button)
	* ui.add(processButton)
	* ui.show()
	* @example
	* var client = new api.WebClient('http://localhost:1234')
	* client.post('/post', 'Cavalry Needs You!', 'text/plain')
	* client.post('/post', 'Join the Cavalry!', 'text/plain')
	*/
  class WebServer {
    /** Start the server listening on the host address (e.g `localhost`) on the specified port number. */
    listen(host: string, port: number): void;
    /** Stop the server, any polling will also stop. */
    stop(): void;
    /** Set the result for `/get` requests, only `text/plain` is currently supported. */
    setResultForGet(resultText: string): void;
    /** As many `/post` events may happen before you have a chance to react, Cavalry will queue them for you.
This function will get the next (the oldest) post and will pop the post from the queue meaning once you get it, you can no longer access it from the server.
The object will contain a `result` string, and an `headers` array, each header is an object with a `name` and `value`. Please note only non binary data is supported for `/post` events. */
    getNextPost(): void;
    /** This is just like the above method, only instead of getting the oldest unprocessed `/post`, it will skip to the newest and pop that from the queue. */
    getNewestPost(): void;
    /** Returns the number of unprocessed `/post` events. Process posts using the `getNextPost()` or `getNewestPost()` functions. */
    postCount(): void;
    /** Clear all unprocessed `/post` events. Process posts using the `getNextPost()` or `getNewestPost()` functions. */
    clearPosts(): void;
    /** Set a Callback object (much like the UI callback object). This is a JavaScript object with an `onPost` function implemented.
Setting a Callback object will start the server polling for new information, by default we poll the server once every 3 seconds. */
    addCallbackObject(callbackObj: unknown): void;
    /** Calling this after setting a Callback object will change the polling frequency to once per second. */
    setHighFrequency(): void;
    /** Calling this after setting a Callback object will change the polling frequency to 60 times a second. This is useful for realtime communication with things like midi-controllers. */
    setRealtime(): void;
  }
}
