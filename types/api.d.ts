type integer = number
type float = number

// TODO: Document @returns
// The following APIs are all in the api namespace. They are ONLY available in the JavaScript Editor and not available when writing expressions in the JavaScript Utility.
// All commands in this namespace must be prefixed with api. e.g `api.create("null", "My Null")`;
// The API can communicate with the Web (see Web APIs) and execute shell commands. See `runProcess` below.
// When working with layers and attributes it is important to know their `layerId` and `attrId`.
// To find the `layerId`:
//     Right click on a layer in the Viewport, Scene Window or its header bar in the Attribute Editor.
//     Select Copy Layer Id.
// This will copy the layer's Id to the clipboard.
// To find the `attrId`:
//     Right click on an attribute in the Attribute Editor.
//     Choose Copy Scripting Path from the contextual menu.
//     Select and click an option from the list.
// This will copy the attribute's Id to the clipboard.
// These IDs can then be used within a script. In the example below, basicShape#1 is the `layerId` and position.x is the `attrId`.
// api.get("basicShape#1", "position.x");

// # Working with the Composition

/**
 * TODO: Description
 */
declare namespace api {
	/**
	 * Move the playhead to a specific frame.
	 *
	 * @param frame
	 *
	 * @example
	 * api.setFrame(100);
	 * console.log(api.getFrame());
	 */
	function setFrame(frame: integer): void

	/**
	 * Return the frame number the playhead is on.
	 */
	function getFrame(): integer

	// api.setFrame(100);
	// console.log(api.getFrame());

	/**
	 * Start playback.
	 */
	function play(): void

	/**
	 * Return all the Layers in the active Composition of a certain type.
	 *
	 * @param topLevel Only return layers in the top level
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const nullId = api.create("null", "My Null");
	 * api.parent(primId, nullId);
	 * // The boolean indicates top level layers only (ie. ignore all children)
	 * const topLevelIds = api.getCompLayers(false);
	 * // Prints: 1
	 * console.log(topLevelIds.length)
	 * // Get all the layers in the composition
	 * const allIds = api.getCompLayers(true);
	 * // Prints: 2
	 * console.log(allIds.length)
	 */
	function getCompLayers(topLevel: boolean): string[]

	// TODO: Complete allowed values
	type LayerTypes =
		| 'null'
		| 'group'
		| 'schedulingGroup'
		| 'spreadsheet'
		| 'duplicator'
		| 'textShape'
		| 'connectShape'
		| 'pathfinder'
		| 'oscillator'
		| 'javaScript'
		| 'valueArray'
		| 'colorArray'
		| 'stagger'

	/**
	 * TODO: Description
	 *
	 * @param topLevel Only return layers in the top level Only
	 * @param type Type of layer
	 *
	 * @example
	 * api.create("null", "My Null");
	 * api.create("null", "My Other Null");
	 * api.create("group", "My Folder");
	 * api.create("spreadsheet", "My Spreadsheet");
	 * const nulls = api.getCompLayersOfType(false, "null");
	 * for (let layer of nulls) {
	 *   console.log(api.getNiceName(layer));
	 * }
	 */
	function getCompLayersOfType(topLevel: boolean, type: string): string[]

	/**
	 * Adds a new Time Marker. The second example sets up a Time Marker as a
	 * controller for a Scheduling Group.
	 *
	 * @param time
	 *
	 * @returns The marker ID
	 *
	 * @example
	 * const markerId = api.createTimeMarker(10);
	 * api.set(markerId, { "label": "Hello, World", "drawColor": "Pink", "useRelPlacement": true });
	 * // After running this script, move the Time Marker around
	 * const rectId = api.primitive("rectangle", "My Rectangle");
	 * const ellipseId = api.primitive("ellipse", "My Ellipse");
	 * const scheduleGroup = api.create("schedulingGroup", "Marker Controlled Group");
	 * api.parent(rectId, scheduleGroup);
	 * api.parent(ellipseId, scheduleGroup);
	 * const markerId = api.createTimeMarker(10);
	 * api.set(markerId, { "label": "Hello, World", "drawColor": "Pink", "useRelPlacement": true });
	 * api.connect(markerId, "id", scheduleGroup, "childOffset");
	 */
	function createTimeMarker(time: integer): string

	/**
	 * Returns a list of all the Time Marker Ids in this Composition
	 *
	 * @example
	 * api.createTimeMarker(10);
	 * api.createTimeMarker(40);
	 * var markers = api.getTimeMarkers();
	 * for (let markerId of markers) {
	 *   console.log(markerId)
	 * }
	 */
	function getTimeMarkers(): string[]

	/**
	 * A convenience function for removing Time Markers. This forwards to
	 * `api.delete(layerId)`.
	 *
	 * @param markerId ID of the marker to be removed
	 */
	function removeTimeMarker(markerId: string): void

	/**
	 * Return the frame of the 'n'th beat from the Beat Marker settings. For
	 * example, an argument of 3 will return the frame number that the 3rd
	 * beat falls on.
	 *
	 * @param beat Number of the beat
	 *
	 * @example
	 * const frame = api.getNthBeat(3);
	 * console.log(frame);
	 */
	function getNthBeat(beat: integer): integer

	/**
	 * Add a Ruler Guide to the given Composition. This function returns an id
	 * which can be used to delete the Guide later.
	 *
	 * Note that 0, 0 is the centre of the Composition.
	 *
	 * @param compId The ID of the composition
	 * @param isVertical Is the guide vertical or not
	 * @param position Position of the guide
	 * @returns ID of the guide
	 *
	 * @example
	 * const id = api.addGuide(api.getActiveComp(), false, 100);
	 * console.log(id);
	 */
	function addGuide(
		compId: string,
		isVertical: boolean,
		position: integer
	): integer

	/**
	 * Delete a Ruler Guide with the corresponding id from the given Composition.
	 *
	 * @param compId The ID of the composition
	 * @param id The ID of the guide
	 *
	 * @example
	 * // If you run this in a new scene, there should be no guides.
	 * const id = api.addGuide(api.getActiveComp(), false, 100);
	 * console.log(id);
	 * api.deleteGuide(api.getActiveComp(), 1);
	 */
	function deleteGuide(compId: string, id: integer): void

	/**
	 * Clear all Ruler Guides from the given Composition.
	 *
	 * @param compId The ID of the composition
	 *
	 * @example
	 * // If you run this in a new scene, there should be no guides.
	 * api.addGuide(api.getActiveComp(), true, -100);
	 * api.addGuide(api.getActiveComp(), false, 100);
	 * api.clearGuides(api.getActiveComp());
	 */
	function clearGuides(compId: string): void

	/**
	 * Get the ids of all the Ruler Guides in the given Composition.
	 *
	 * @param compId The ID of the composition
	 *
	 * @example
	 * // If you run this in a new scene, there should be no guides.
	 * api.addGuide(api.getActiveComp(), true, -100);
	 * api.addGuide(api.getActiveComp(), false, 100);
	 * console.log(api.getGuides(api.getActiveComp()));
	 */
	function getGuides(compId: string): void

	type Primitive =
		| 'rectangle'
		| 'ellipse'
		| 'polygon'
		| 'star'
		| 'ring'
		| 'arc'
		| 'superEllipse'
		| 'arrow'
		| 'circle'
		| 'capsule'
		| 'superShape'

	// # Working with Layers
	/**
	 * Creates a Primitive Shape
	 *
	 * @param type Layer type
	 * @param name Preferred name of the new layer
	 *
	 * @example
	 * // Returns the layerId for the new shape
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * console.log(primId)
	 */
	function primitive(type: Primitive, name: string): string

	/**
	 * Creates and Editable Shape from a Path
	 *
	 * @param path Path to be made editable
	 * @param name Preferred name for the layer
	 *
	 * @example
	 * const path = new cavalry.Path();
	 * path.moveTo(0, 0);
	 * path.lineTo(0, -100);
	 * path.lineTo(300, -100);
	 * path.cubicTo(210, 110, 240, 140, 280, 260);
	 * path.close();
	 * api.createEditable(path, "My Path");
	 */
	function createEditable(path: cavalry.Path, name: string): string

	/**
	 * Creates a Layer of any type. The name argument specifies the name of the
	 * Layer in the Scene Window.
	 *
	 * @param layerType Layer type
	 * @param name Preferred name of the new layer
	 *
	 * @example
	 * api.create("null", "My Null");
	 */
	// TODO: Define allowed values for `layerType`
	function create(layerType: string, name: string): string

	/**
	 * Delete a Layer.
	 *
	 * @param layerId The ID of the layer
	 *
	 * @example
	 * // Delete all render queue items
	 * const items = api.getRenderQueueItems();
	 * for (let layer of items) {
	 *   api.deleteLayer(layer);
	 * }
	 */
	function deleteLayer(layerId: string): void

	/**
	 * Check if a layer with the given `layerId` exists.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layerId = api.create('basicShape', 'Layer');
	 * console.log(`Layer exists: ${api.layerExists(layerId)}.`);
	 * console.log(`Active Comp exists: ${api.layerExists(api.getActiveComp())}`);
	 */
	function layerExists(layerId: string): boolean

	/**
	 * Get the layer's type (which can be used to create new instances of this
	 * layer).
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layerId = api.create("null", "My Null");
	 * console.log(api.getLayerType(layerId));
	 */
	function getLayerType(layerId: string): string

	/**
	 * Reset all Attributes on a layer back to the default state.
	 *
	 * @param layerId ID of the layer
	 */
	function resetLayerAttributes(layerId: string): void

	/**
	 * Gets the currently selected Layers.
	 *
	 * @example
	 * const sel = api.getSelection();
	 * for (let layer of sel) {
	 *   console.log(api.getNiceName(layer));
	 * }
	 */
	function getSelection(): string[]

	/**
	 * Sets the selected layers.
	 *
	 * @param selection Array of layer IDs
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.select([primId]);
	 */
	function select(layers: string[]): void

	/**
	 * Deselect any selected Layers and select any deselected Layers.
	 *
	 * @example
	 * const rect1 = api.primitive("rectangle", "Selected");
	 * const rect2 = api.primitive("rectangle", "Not Selected");
	 * api.select([rect2]);
	 * api.invertSelection();
	 */
	function invertSelection(): void

	/**
	 * Gets the children of the specified layer.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const nullId = api.create("null", "My Null");
	 * api.parent(primId, nullId);
	 * const childIds = api.getChildren(nullId);
	 * console.log(childIds.length)
	 */
	function getChildren(layerId: string): string[]

	/**
	 * Make one Layer the child of another.
	 *
	 * @param layerId ID of the layer
	 * @param newParentId ID of the preferred parent layer
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const nullId = api.create("null", "My Null");
	 * api.parent(primId, nullId);
	 */
	function parent(layerId: string, newParentId: string): void

	/**
	 * Return the `layerId` of a Layer's parent.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const nullId = api.create("null", "My Null");
	 * api.parent(primId, nullId);
	 * console.log(api.getParent(primId));
	 */
	function getParent(layerId: string): string

	/**
	 * Return the human-readable ('nice name') of a Layer.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const nullId = api.create("null", "My Null");
	 * console.log(api.getNiceName(nullId));
	 */
	function getNiceName(layerId: string): string

	/**
	 * Rename a Layer.
	 *
	 * @param layerId ID of the layer
	 * @param name Preferred new name for the layer
	 *
	 * @example
	 * // Rename all selected items
	 * const sel = api.getSelection();
	 * sel.forEach((item, index) => {
	 *   api.rename(item, `My Name ${index}`)
	 * })
	 */
	function rename(layerId: string, name: string): void

	/**
	 * Offset a Layer's Visibility Clip and any related animation in time.
	 *
	 * @param layerId ID of the layer
	 * @param delta Amount of frames to offset the layer
	 *
	 * @example
	 * const layerId = api.primitive("rectangle", "Rectangle");
	 * api.setOutFrame(layerId, 50);
	 * api.offsetLayerTime(layerId, 100);
	 */
	function offsetLayerTime(layerId: string, delta: integer): void

	/**
	 * Enable/disable the Stroke for a Shape.
	 *
	 * @param layerId ID of the layer
	 * @param enabled Enables the stroke
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * api.setFill(primId, false);
	 * api.setStroke(primId, true);
	 * api.set(primId, { "stroke.strokeColor": "#049dd9", "stroke.width": 20 });
	 */
	function setStroke(layerId: string, enabled: boolean): void

	/**
	 * Returns `true` if a Shape has a Stroke.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * api.setStroke(primId, true);
	 * console.log(api.hasStroke(primId));
	 */
	function hasStroke(layerId: string): boolean

	/**
	 * Enable/disable the Fill for a Shape.
	 *
	 * @param layerId ID of the layer
	 * @param enabled Enables the fill
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * api.setFill(primId, false);
	 * api.setStroke(primId, true);
	 */
	function setFill(layerId: string, enabled: boolean): void

	/**
	 * Returns `true` if a Shape has a Fill.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * console.log(api.hasFill(primId));
	 */
	function hasFill(layerId: string): boolean

	/**
	 * Gets the bounding box of the specified layer.
	 *
	 * @param layerId ID of the layer
	 * @param worldSpace Get bounding box in world space
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const bbox = api.getBoundingBox(primId, true);
	 * console.log(JSON.stringify(bbox));
	 */
	function getBoundingBox(
		layerId: string,
		worldSpace: boolean
	): { x: float; y: float; width: float; height: float }

	// # Working with Attributes

	/**
	 * This will return an array containing the paths of the selected attributes.
	 *
	 * @example
	 * const selAttr = api.getSelectedAttributes();
	 * for (const [layerId, attr] of selAttr) {
	 *   console.log(`${layerId}.${attr}`);
	 * }
	 */
	function getSelectedAttributes(): [string, string][]

	/**
	 * Set values for a Layer's attributes.
	 *
	 * @param layerId ID of the layer
	 * @param arguments Object of attribute names and values
	 *
	 * @example
	 * // Create a Rectangle and set its Size, Position, Rotation and Fill Color
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.set(primId, {
	 * 	"generator.dimensions": [100,370],
	 * 	"position": [100, 200],
	 * 	"rotation": 50,
	 * 	"material.materialColor": "#8dc429"
	 * });
	 * // Create a Text Shape and set its Font Family and Style
	 * const textId = api.create("textShape", "My Text");
	 * api.set(textId, {
	 *   "font": {
	 *     "font": "Arial",
	 *     "style": "Bold"
	 *   }
	 * });
	 * // Collapse the hierarchy of a layer
	 * api.set("basicShape#1", { "hierarchy": false });
	 */
	function set(layerId: string, arguments: unknown): void

	/**
	 * Get the values for a Layer's attributes.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.set(primId, {
	 *   "material.materialColor": "#8dc429",
	 *   "generator.dimensions": [100,370],
	 *   "rotation": 50,
	 *   "position": [100, 200]
	 * });
	 * const obj = api.get(primId, "position");
	 * console.log(JSON.stringify(obj))
	 */
	// TODO: Return type depends on `attrId`
	// TODO: Confirm the return type is `string | object`?
	function get(layerId: string, attrId: string): unknown

	/**
	 * Some layers in Cavalry contain Generators, these are discrete feature
	 * blocks that are used to extend the functionality of layers. For example
	 * the Basic Shape layer has a Generator to determine the shape it creates
	 * (e.g Ellipse, Rectangle, etc). You can set Generators with this function.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param type Generator type
	 *
	 * @example
	 * // Create an Ellipse and set it up
	 * const ellipseId = api.primitive("ellipse", "Ellipse");
	 * api.set(ellipseId, {
	 *   "generator.radius.x": 10,
	 *   "generator.radius.y": 10,
	 *   "hidden": true
	 * });
	 * // Create a Duplicator
	 * const duplicatorId = api.create("duplicator", "Duplicator");
	 * // Connect the Ellipse to the Duplicator
	 * api.connect(ellipseId, "id", duplicatorId, "shapes");
	 * // Change the Distribution on the Duplicator to a Custom Distribution
	 * api.setGenerator(duplicatorId, "generator", "circleDistribution");
	 * // Set the Distribution count
	 * api.set(duplicatorId, { "generator.count": 10 });
	 */
	// TODO: Define allowed values for `type`
	function setGenerator(layerId: string, attrId: string, type: string): void

	/**
	 * Some layers in Cavalry contain Generators, these are discrete feature
	 * blocks that are used to extend the functionality of layers. For example
	 * the Basic Shape layer has a Generator to determine the shape it creates
	 * (e.g Ellipse, Rectangle). You can list the Generators on a layer with
	 * this command.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layerId = api.create("connectShape", "Connect Shape");
	 * const generatorId = api.getGenerators(layerId);
	 * for (id of generatorId) {
	 *   console.log(id);
	 * }
	 */
	function getGenerators(layerId: string): string[]

	/**
	 * Returns the current Generator type (which can be used with `setGenerator`).
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const ellipseId = api.primitive("ellipse", "My Ellipse")
	 * const generatorType = api.getCurrentGeneratorType(ellipseId, 'generator')
	 * console.log(generatorType)
	 */
	function getCurrentGeneratorType(layerId: string, attrId: string): string

	/**
	 * Set an attribute expression, this will take whatever the input value is
	 * in the expression, and manipulate it in some way (multiply, add to it etc.).
	 *
	 * Caution: Attributes require an in-connection for the expression to take
	 * effect.
	 *
	 * Caution: If the attribute is of type `int2` or `double2` the expression needs
	 * to be set on the `x` or `y` axis of the attribute.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param expression Expression to apply to the attribute
	 *
	 * @example
	 * const rectId = api.primitive("rectangle", "My Rectangle");
	 * api.set(rectId, {"position.x": 300});
	 * const starId = api.primitive("star", "Star");
	 * api.set(starId, { "position.x": -300 });
	 * // Connect the result of the Star to the Rectangle
	 * api.connect(starId, "position.y", rectId, "position.y");
	 * // Add an attribute expression
	 * api.setAttributeExpression(rectId, "position.y", "*2");
	 * api.setAttributeExpression(rectId, "position.y", "%50");
	 * api.setAttributeExpression(rectId, "position.y", "clamp(-45, value, 45)");
	 * api.setAttributeExpression(rectId, "position.y", "sqrt(value)");
	 * // Power the stars movement with an Oscillator
	 * const oscillatorId = api.create("oscillator", "Oscillator");
	 * api.set(oscillatorId, {"strength": 1500});
	 * api.connect(oscillatorId, "id", starId, "position.y");
	 * api.play();
	 */
	function setAttributeExpression(
		layerId: string,
		attrId: string,
		expression: string
	): void

	/**
	 * Connect one attribute to another. The result or output of a Layer is
	 * referred to as the `in` connection.
	 *
	 * @param fromLayerId ID of the sending layer
	 * @param fromAttrId ID of the sending attribute
	 * @param toLayerId ID of the receiving layer
	 * @param toAttrId ID of the receiving attribute
	 *
	 * @example
	 * const textId = api.create("textShape", "Text");
	 * const pathfinderId = api.create("pathfinder", "Pathfinder");
	 * const starId = api.primitive("star", "Star");
	 * api.set(starId, { "generator.radius": 300 });
	 * // Connect the result of the Star to the Pathfinder
	 * api.connect(starId, "id", pathfinderId, "inputShape");
	 * // Connect the result of the Pathfinder to the Text.Position
	 * api.connect(pathfinderId, "id", textId, "position");
	 */
	function connect(
		fromLayerId: string,
		fromAttrId: string,
		toLayerId: string,
		toAttrId: string
	): void

	/**
	 * Remove connections between attributes.
	 *
	 * @param fromLayerId ID of the sending layer
	 * @param fromAttrId ID of the sending attribute
	 * @param toLayerId ID of the receiving layer
	 * @param toAttrId ID of the receiving attribute
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * const oscillatorId = api.create("oscillator", "Oscillator");
	 * api.connect(oscillatorId, "id", primId, "rotation");
	 * console.log(api.getInConnection(primId, "rotation"));
	 * api.disconnect(oscillatorId, "id", primId, "rotation");
	 * console.log(api.getInConnection(primId, "rotation"));
	 */
	function disconnect(
		fromLayerId: string,
		fromAttrId: string,
		toLayerId: string,
		toAttrId: string
	): void

	/**
	 * Returns the input connection to an Attribute. An empty string is
	 * returned if there's no input on the Attribute in question.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "Rectangle");
	 * const oscillatorId = api.create("oscillator", "Oscillator");
	 * api.connect(oscillatorId, "id", primId, "rotation");
	 * console.log(api.getInConnection(primId, "rotation"));
	 */
	function getInConnection(layerId: string, attrId: string): string

	/**
	 * Returns all the output connections from an Attribute.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const primId = api.primitive('rectangle', 'Rectangle')
	 * const oscillatorId = api.create('oscillator', 'Oscillator')
	 * api.connect(oscillatorId, 'id', primId, 'rotation')
	 * console.log(api.getOutConnections(oscillatorId, 'id'))
	 */
	// TODO: Also takes in `keyframeId`
	function getOutConnections(layerId: string, attrId: string): string[]

	/**
	 * This returns the selected keyframes as an enumerable string-keyed object.
	 * Each string is an attribute path, and each key is an array of frame
	 * numbers on which a keyframe resides.
	 *
	 * @example
	 * const selKeys = api.getSelectedKeyframes();
	 * for (const [key, value] of Object.entries(selKeys)) {
	 *   console.log(`${key}: ${value}`);
	 * }
	 */
	function getSelectedKeyframes(): { [key: string]: integer[] }

	/**
	 * Set keyframes for Layers.
	 *
	 * @param layerId ID of the layer
	 * @param frame Preferred frame number
	 * @param value Preferred attribute value
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.keyframe(primId, 0, { "scale.x": 5 });
	 * api.keyframe(primId, 100, { "scale.x": 1 });
	 */
	function keyframe(
		layerId: string,
		frame: integer,
		value: { [attrPath: string]: number }
	): void

	/**
	 * Remove a Layer's keyframes.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param keyframe Frame number of the keyframe to be deleted
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.keyframe(primId, 0, {"scale.x": 5.});
	 * api.keyframe(primId, 50, {"scale.x": 7.});
	 * api.keyframe(primId, 100, {"scale.x": 1.});
	 * api.deleteKeyframe(primId, "scale.x", 50);
	 */
	// TODO: Confirm return type is correct
	function deleteKeyframe(
		layerId: string,
		attrId: string,
		keyframe: integer
	): void

	/**
	 * Modify the keyframe time (frame number) or value. The supplied object
	 * must include a `frame: integer` key.
	 *
	 * @param layerId ID of the layer
	 * @param data Object with keys `frame` and `newFrame`, `newValue` or `type`
	 *
	 * @example
	 * // Example of modifying keyframe values and frames:
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.keyframe(primId, 0, { "scale.x": 5 });
	 * api.keyframe(primId, 100, { "scale.x": 1 });
	 * api.modifyKeyframe(primId, {
	 *   "scale.x": {
	 *     "frame": 0,
	 *     "newValue": 3.5,
	 *     "newFrame": 10
	 *   }
	 * });
	 * // Example of setting all keyframes to step interpolation.
	 * const ellipseId = api.primitive("ellipse", "Ellipse");
	 * // Create some values to set as keyframes
	 * const keyValues = [ -200, 200, -300, 300 ]
	 * let keyTime = 0;
	 * // Set some keyframes for us to modify
	 * for (let value of keyValues) {
	 *   api.keyframe(ellipseId, keyTime, { "position.x": value });
	 *   keyTime += 40;
	 * }
	 * // Get the keyframe times
	 * const times = api.getKeyframeTimes("basicShape#1","position.x")
	 * for (let frame of times) {
	 *   // Set the keyframes to step interpolation
	 *   api.modifyKeyframe(ellipseId, {
	 *     "position.x": {
	 *       "frame": frame,
	 *       "type": 2
	 *     }
	 *   });
	 * }
	 */
	function modifyKeyframe(
		layerId: string,
		// TODO: Define as interface
		data: {
			frame: integer
			newFrame?: integer // Specify a new frame for the keyframe.
			newValue?: number // Specify a new value for the keyframe.
			// TODO: Replace with enum once implemented
			type?: 0 | 1 | 2 // The keyframe type as an integer 0 Bezier, 1 Linear, 2 Step.
		}
	): void

	/**
	 * Modify the keyframe tangents. The supplied object must include a `frame`
	 * key, in addition to this it can also include. Both the in and out handle
	 * will be affected by default, unless you specify a handle to affect and
	 * the handles are not weight and angle locked.
	 *
	 * @param layerId ID of the layer
	 * @param data Object with the keys `frame` and `inHandle`, `outHandle`, `angleLocked`, `weightLocked`, `angle` or `weight`
	 *
	 * @example
	 * // Example setting flat keyframes:
	 * // Make a new ellipse
	 * const ellipseId = api.primitive("ellipse", "Ellipse");
	 * // Create some values to set as keyframes
	 * const keyValues = [ -200, 200, -300, 300 ];
	 * let keyTime = 0;
	 * // Set some keyframes for us to modify
	 * for (let value of keyValues) {
	 *   api.keyframe(ellipseId, keyTime, { "position.x": value });
	 *   keyTime += 40;
	 * }
	 * // Get the keyframe times
	 * const times = api.getKeyframeTimes(ellipseId, "position.x")
	 * for (let frame of times) {
	 *   // Modify the tangents, giving them all a weight of 20 and an angle of 0 (flat)
	 *   api.modifyKeyframeTangent(ellipseId, {
	 *     "position.x": {
	 *       "angle": 0,
	 *       "frame": frame,
	 *       "weight": 20
	 *     }
	 *   });
	 * }
	 *
	 * @example
	 * // Example breaking tangents and weighting the outHandles.
	 * // Make a new ellipse
	 * const ellipseId = api.primitive("ellipse", "Ellipse");
	 * // Create some values to set as keyframes
	 * const keyValues = [ -200,200,-300, 300 ];
	 * let keyTime = 0;
	 * // Set some keyframes for us to modify
	 * for (let value of keyValues) {
	 *   api.keyframe(ellipseId, keyTime, { "position.x": value });
	 *   keyTime += 40;
	 * }
	 * // Get the keyframe times
	 * const times = api.getKeyframeTimes(ellipseId, "position.x")
	 * for (let frame of times) {
	 *   // Set the handles to bezier, but with a weight of 0 (so that we can then adjust one handle out)
	 *   api.modifyKeyframeTangent(ellipseId, {
	 *     "position.x": {
	 *       "angleLocked": false,
	 *       "weightLocked": false,
	 *       "frame": frame,
	 *       "weight":0
	 *     }
	 * 	});
	 *   // Now weight just the out handles
	 *   api.modifyKeyframeTangent(ellipseId, {
	 *     "position.x": {
	 *       "frame": frame,
	 *       "weight":20,
	 *       "outHandle": true,
	 *       "inHandle": false
	 *     }
	 *   });
	 * }
	 */
	// TODO: Create interface for object
	function modifyKeyframeTangent(
		layerId: string,
		data: {
			frame: integer
			inHandle?: boolean // An optional boolean value stating if you want the inHandle to be affected.
			outHandle?: boolean // An optional boolean value stating if you want the outHandle to be affected.
			angleLocked?: boolean // Boolean stating if the key tangents are angle locked or not (optional)..
			weightLocked?: boolean // Boolean stating if the key tangents are weight locked or not (optional)..
			angle?: integer // Set a new angle for the keyframe tangent, 0 is flat (optional).
			// TODO: Is `weight` int?
			weight?: integer // Set a new weight for the keyframe tangent (optional).
		}
	): void

	/**
	 * Get all keyframeIds for a particular layerId's attribute. This can be
	 * used in combination with `setUserData`.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const primId = api.primitive("rectangle", "My Rectangle");
	 * api.keyframe(primId, 0, { "position.x": 10 });
	 * console.log(api.getKeyframeIdsForAttribute(primId, "position.x"));
	 */
	function getKeyframeIdsForAttribute(
		layerId: string,
		attrId: string
	): string[]

	/**
	 * Get the ids for selected keyframes. This can be used in combination
	 * with `setUserData`.
	 *
	 * @example
	 * console.log(api.getSelectedKeyframeIds());
	 */
	function getSelectedKeyframeIds(): string[]

	type MagicEasing =
		| 'SlowIn'
		| 'SlowOut'
		| 'SlowInSlowOut'
		| 'VerySlowIn'
		| 'VerySlowOut'
		| 'VerySlowInVerySlowOut'
		| 'SpringIn'
		| 'SpringOut'
		| 'SpringInSpringOut'
		| 'SmallSpringIn'
		| 'SmallSpringOut'
		| 'SmallSpringInSmallSpringOut'
		| 'AnticipateIn'
		| 'OvershootOut'
		| 'AnticipateInOvershootOut'
		| 'BounceIn'
		| 'BounceOut'
		| 'BounceInBounceOut'

	/**
	 * Apply Magic Easing to a new or existing keyframe.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param frame Frame number
	 * @param easingName Name of the preferred easing type
	 *
	 * @example
	 * api.magicEasing("basicShape#1", "position.x", 25, "SlowIn");
	 */
	function magicEasing(
		layerId: string,
		attrId: string,
		frame: integer,
		easingName: MagicEasing
	): void

	/**
	 * TODO: Description
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 */
	function getKeyframeTimes(layerId: string, attrId: string): number[]

	/**
	 * Delete all keyframes on an attribute.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 */
	function deleteAnimation(layerId: string, attrId: string): void

	type AttributeType =
		| 'string'
		| 'int'
		| 'int2'
		| 'double'
		| 'double2'
		| 'bool'
		| 'enum'
		| 'nodeId'
		| 'assetId'
		| 'list'
		| 'color'
		| 'polyMesh'

	/**
	 * TODO: Description
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * // Get the data type of the Attribute
	 * const layerId = api.create("javaScript", "JS Layer");
	 * api.addDynamic(layerId, "array", "string");
	 * console.log(api.getAttrType(layerId, "array.1"));
	 */
	function getAttrType(layerId: string, attrId: string): AttributeType

	/**
	 * Reset an Attribute back to its default value.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 */
	function resetAttribute(layerId: string, attrId: string): void

	/**
	 * TODO: Description
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * 	// Add a new child to an array Attribute.
	 * const arrayId = api.create("valueArray", "My Value Array");
	 * api.addArrayIndex(arrayId, "array")
	 * api.addArrayIndex(arrayId, "array")
	 * api.set(arrayId, { "array.0": 10, "array.1": 20, "array.2": 30 });
	 */
	function addArrayIndex(layerId: string, attrId: string): integer

	/**
	 * Remove an Attribute from an array
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 */
	function removeArrayIndex(layerId: string, attrId: string): void

	/**
	 * Return the number of Attributes in the array
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const arrayId = api.create("valueArray", "My Value Array");
	 * api.addArrayIndex(arrayId, "array")
	 * api.addArrayIndex(arrayId, "array")
	 * console.log(api.getArrayCount(arrayId, "array"));
	 */
	function getArrayCount(layerId: string, attrId: string): integer

	// TODO: Define all available values
	type Dynamic =
		| 'double'
		| 'boolean'
		| 'string'
		| 'int2'
		| 'double2'
		| 'color'

	/**
	 * Add a Dynamic attribute to a layer. Dynamic attributes are a special
	 * kind of Array Attribute in that they can be of different types. Only
	 * certain special layers can have dynamic attributes added to them, for
	 * example the JavaScript layer.
	 *
	 * Once added these attributes can be renamed by using
	 * `api.renameAttribute()` command. The name of the attribute is used in
	 * the JavaScript execution, and in the UI, but getting and Setting these
	 * attributes is done by index - not the Attribute name.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param type Preferred type of the dynamic attribute
	 * @returns The ID of the dynamic attribute
	 *
	 * 	@example
	 * const layerId = api.create("javaScript", "JS Layer");
	 * api.addDynamic(layerId, "array", "double");
	 * api.addDynamic(layerId, "array", "boolean");
	 * api.addDynamic(layerId, "array", "string");
	 * api.addDynamic(layerId, "array", "int2");
	 * api.addDynamic(layerId, "array", "double2");
	 * api.addDynamic(layerId, "array", "color");
	 *
	 * @example
	 * // Example of setting and getting a Dynamic Attribute
	 * const layerId = api.create("javaScript", "JS Layer");
	 * api.addDynamic(layerId, "array", "double");
	 * api.set(layerId, {"array.1": 10});
	 * const value = api.get(layerId, "array.1");
	 * console.log(value);
	 */
	function addDynamic(layerId: string, attrId: string, type: string): string

	/**
	 * Rename dynamic or array Attributes. Array Attributes can be found on the
	 * Array Utilities such as the Color Array. Dynamic Attributes can be found
	 * on Layers like the JavaScript Utility. A type must be chosen for Dynamic
	 * Attributes when adding them.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param newName Preferred new name of the attribute
	 *
	 * @example
	 * const layer = api.primitive('ellipse', 'Ellipse')
	 * api.connect(layer, 'scale.x', layer, 'scale.y')
	 * api.connect(layer, 'position.x', layer, 'position.y')
	 * const outConn = api.getOutConnectedAttributes(layer)
	 * console.log(outConn)
	 */
	function renameAttribute(
		layerId: string,
		attrId: string,
		newName: string
	): void

	/**
	 * List the output connections from a Layer.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layer = api.primitive('ellipse', 'Ellipse')
	 * api.connect(layer, 'scale.x', layer, 'scale.y')
	 * api.connect(layer, 'position.x', layer, 'position.y')
	 * const outConn = api.getOutConnectedAttributes(layer)
	 * console.log(outConn)
	 */
	function getOutConnectedAttributes(layerId: string): string[]

	/**
	 * List the input connections to a Layer.
	 *
	 * @param layerId
	 *
	 * @example
	 * const layer = api.primitive('ellipse', 'Ellipse')
	 * api.connect(layer, 'scale.x', layer, 'scale.y')
	 * api.connect(layer, 'position.x', layer, 'position.y')
	 * const inConn = api.getInConnectedAttributes(layer)
	 * console.log(inConn)
	 */
	function getInConnectedAttributes(layerId: string): string[]

	/**
	 * Return a list of all the attributes that exist on a Layer.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layerId = api.create("null", "My Null");
	 * const attrIds = api.getAttributes(layerId);
	 * for (let id of attrIds) {
	 *   console.log(id);
	 * }
	 */
	function getAttributes(layerId: string): string[]

	/**
	 * Check to find out if a particular attribute exists on a Layer.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const layer = api.primitive("ellipse", "Ellipse")
	 * const attr = api.hasAttribute(layer, "position.x");
	 * console.log(attr);
	 */
	function hasAttribute(layerId: string, attrId: string): boolean

	/**
	 * Return a list of all the animated attributes that exist on a Layer.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const layerId = api.create("null", "My Null");
	 * api.keyframe(layerId, 0, { "scale.x": 5 });
	 * api.keyframe(layerId, 100, { "scale.x": 1 });
	 * const attrIds = api.getAnimatedAttributes(layerId);
	 * for (let id of attrIds) {
	 *   console.log(id);
	 * }
	 */
	function getAnimatedAttributes(layerId: string): string[]

	/**
	 * Check to find out if a particular attribute on a Layer is animated.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const layerId = api.create("null", "My Null");
	 * api.keyframe(layerId, 0, { "scale.x": 5 });
	 * api.keyframe(layerId, 100, { "scale.x": 1 });
	 * console.log(api.isAnimatedAttribute(layerId, "scale.x"));
	 */
	function isAnimatedAttribute(layerId: string, attrId: string): boolean

	/**
	 * Return the first frame of a visibility clip.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const sel = api.getSelection();
	 * for (let layerId of sel) {
	 *   console.log(api.getInFrame(layerId));
	 * }
	 */
	function getInFrame(layerId: string): integer

	/**
	 * Set the first frame of a visibility clip.
	 *
	 * @param layerId ID of the layer
	 * @param frame Frame number
	 *
	 * @example
	 * const layerId = api.primitive("rectangle", "Rectangle");
	 * api.setInFrame(layerId, 50);
	 */
	function setInFrame(layerId: string, frame: integer): void

	/**
	 * Return the last frame of a visibility clip.
	 *
	 * @param layerId ID of the layer
	 *
	 * @example
	 * const sel = api.getSelection();
	 * for (let layerId of sel) {
	 *   console.log(api.getOutFrame(layerId));
	 * }
	 */
	function getOutFrame(layerId: string): integer

	/**
	 * Set the last frame of a visibility clip.
	 *
	 * @param layerId ID of the layer
	 * @param frame Frame number
	 *
	 * @example
	 * const layerId = api.primitive("rectangle", "Rectangle");
	 * api.setOutFrame(layerId, 50);
	 */
	function setOutFrame(layerId: string, frame: integer): void

	/**
	 * Sets a preset for a Graph Attribute. The `presetIndex` can be
	 * 0: s-curve, 1: ramp, 2: linear, 3: flat
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param presetIndex One of `0` for s-curve, `1` for ramp, `2` for linear or `3` for flat
	 */
	// TODO: Replace with enum once implemented
	function graphPreset(
		layerId: string,
		attrId: string,
		presetIndex: 0 | 1 | 2 | 3
	): void

	/**
	 * Flips the points on a Graph Attribute - valid `direction` arguments are
	 * "horizontal" and "vertical".
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 * @param direction Either `horizontal` or `vertical`
	 *
	 * @example
	 * const staggerId = api.create("stagger", 'My Stagger');
	 * api.flipGraph(staggerId, "graph", "vertical");
	 */
	function flipGraph(
		layerId: string,
		attrId: string,
		direction: 'horizontal' | 'vertical'
	): void

	/**
	 * Add an attribute to the Control Centre.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const shapeId = api.create("null", "My Null");
	 * api.addToControlCentre(shapeId, "position.x");
	 */
	function addToControlCentre(layerId: string, attrId: string): void

	/**
	 * Remove an attribute from the Control Centre
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * // Create a Null and add `position.x` to Control Centre
	 * const shapeId = api.create("null", "My Null");
	 * api.addToControlCentre(shapeId, "position.x");
	 * // Then, assuming the null's LayerId is` null#1`, remove `position.x` from the Control Centre
	 * api.removeFromControlCentre("null#1", "position.x");
	 */
	function removeFromControlCentre(layerId: string, attrId: string): void

	// # Shapes

	/**
	 * Centre the Pivot of the specified layer. If `centroid` is `true` the Pivot
	 * will be moved to the centre of mass.
	 *
	 * @param layerId ID of the layer
	 * @param centroid Move to centre of mass
	 */
	function centrePivot(layerId: string, centroid: boolean): void

	/**
	 * Freeze the transform (position, rotation, scale, pivot, skew) of the
	 * specified layer. This can be used to make a Shape's current position
	 * its zero position.
	 *
	 * @param layerId ID of the layer
	 */
	function freezeTransform(layerId: string): void

	/**
	 * Reset a Shape's transform back to the default state (this will also clear
	 * any frozen transformations).
	 * @param layerId ID of the layer
	 */
	function resetTransform(layerId: string): void

	/**
	 * Copy the selected Shape(s) as code. The resulting code can be pasted into
	 * a new tab and run to create a new Editable Shape based on those copied.
	 *
	 * @example
	 * const path = api.getDrawInstructionsForSelection();
	 * console.log(path);
	 */
	function getDrawInstructionsForSelection(): string

	// Editable Shapes
	/**
	 * This will convert the selected Shape into an Editable Shape, which can
	 * then be edited with the `getEditablePath` and `setEditablePath`
	 * functions.
	 *
	 * @param layerId ID of the layer
	 * @param makeACopy Copy the layer instead
	 *
	 * @example
	 * const primId = api.primitive("ellipse", "Ellipse");
	 * const editableId = api.makeEditable(primId, false);
	 */
	function makeEditable(layerId: string, makeACopy: boolean): string

	/**
	 * This function returns an `Editable Path` object which can be edited and
	 * then set back to any `Editable Shape` layer.
	 *
	 * `Editable Paths` and ordinary Paths (like the one in the Cavalry Module
	 * are distinct. The `worldSpace` argument can be used to determine if path
	 * point coordinates are returned in **local** – unaware of the Editable
	 * Shape's position, rotation and scale – or **world** space where those
	 * transformations are applied.
	 *
	 * An `Editable Path`'s points have **in handles** and **out handles** just
	 * like the points that are edited in the Viewport. They also have weight
	 * and angle locking settings.
	 *
	 * Ordinary Paths are constructed using `moveTo`, `lineTo` and `cubicTo`.
	 *
	 * In an `Editable Path`, an extra point can be added to the Contour's
	 * `points` array.
	 *
	 * @param layerId ID of the layer
	 * @param worldSpace Get coordinates in world space
	 *
	 * @example
	 * // The inHandle and outHandle objects are optional (when they are
	 * // missing a linear point will be created).
	 * const multiplier = 1.5;
	 * const primId = api.primitive("ellipse", "Ellipse");
	 * const editableId = api.makeEditable(primId, false);
	 * const path = api.getEditablePath(editableId, false);
	 * for (let contour of path) {
	 *   for (let point of contour.points) {
	 *     point.inHandle.x *= multiplier;
	 *     point.outHandle.x *= multiplier;
	 *     point.inHandle.y *= multiplier;
	 *     point.outHandle.y *= multiplier;
	 *   }
	 * }
	 * api.setEditablePath(editableId, path);
	 */
	// TODO: Create interface
	function getEditablePath(
		layerId: string,
		worldSpace: boolean
	): {
		points: [
			{
				position: {
					x: number
					y: number
				}
				outHandle: {
					x: number
					y: number
					selected: boolean
				}
				inHandle: {
					x: number
					y: number
					selected: boolean
				}
				weightLocked: boolean
				angleLocked: boolean
				selected: boolean
			}
		]
		isClosed: boolean
	}[]

	/**
	 * This will set the Editable Path on an Editable Shape. Primitives are
	 * not supported.
	 *
	 * See `getEditablePath` for details on the Editable Path schema. The
	 * `worldSpace` argument will determine if path point coordinates are set in
	 * **local** space – unaware of the Editable Shape's position, rotation and
	 * scale – or **world** space where those transformations are applied.
	 *
	 * If the Editable Path is accessed in world space, it should also be set
	 * in world space.
	 *
	 * TODO: Mention `api.makeEditable` is needed on a primitive before passing
	 * it to `setEditablePath`
	 *
	 * @param layerId ID of the layer
	 * @param worldSpace Get coordinates in world space
	 * @param pathObject Editable Path object
	 *
	 * @example
	 * 	// This example will flatten the selected bezier points to 0 on the Y axis.
	 * const sel = api.getSelection();
	 * for (let layerId of sel) {
	 *   if (api.getLayerType(layerId) != "editableShape") {
	 *     continue;
	 *   }
	 *   const path = api.getEditablePath(layerId, true);
	 *   for (let contour of path) {
	 *     for (let point of contour.points) {
	 *       if (!point.selected) {
	 *         continue;
	 *       }
	 *       point.position.y = 0;
	 *       point.inHandle.y = 0;
	 *       point.outHandle.y = 0;
	 *     }
	 *   }
	 *   api.setEditablePath(layerId, true, path);
	 * }
	 */
	function setEditablePath(
		layerId: string,
		worldSpace: boolean,
		pathObject: cavalry.Path
	): void

	/**
	 * This will make the selected point the first point in an Editable Path.
	 * This is like running the command in the Shape menu.
	 *
	 * @param layerId ID of the layer
	 */
	function makeFirstPoint(layerId: string): void

	/**
	 * Move selected points by given X and Y values.
	 *
	 * @param x Amount to move on the X axis
	 * @param y Amount to move on the Y axis
	 * @param localSpace Use local space
	 *
	 * @example
	 * // First select some editable points
	 * api.movePoint(0, 50, true);
	 */
	function movePoint(x: float, y: float, localSpace: boolean): void

	/**
	 * Move selected points to given X and Y positions.
	 *
	 * Values in the `positionObject` are optional, i.e `{ x: 20 }` and
	 * `{ x: 20, y: 50 }` are both valid. Use the handles argument to specify
	 * if in/out handles should be moved instead of the point. To move both,
	 * run the command twice with handles set to `true` and `false`.
	 *
	 * @param positionObject The position to set. Object with `x` and/or `y` keys.
	 * @param localSpace Use local space
	 * @param handles Move handles with the point
	 *
	 * @example
	 * // First select some editable points
	 * api.setPointPosition({ "y": -50 }, false, false);
	 * api.setPointPosition({ "y": -50 }, false, true);
	 */
	function setPointPosition(
		positionObject: { x?: number; y?: number },
		localSpace: boolean,
		handles: boolean
	): void

	// # Rendering
	/**
	 * Render a specific Render Queue Item.
	 *
	 * @param renderQueueItemId ID of the render queue item
	 *
	 * @example
	 * const activeComp = api.getActiveComp();
	 * const itemId = api.addRenderQueueItem();
	 * api.render(itemId);
	 */
	function render(renderQueueItemId: string): void

	/**
	 * Render all Render Queue Items in the Render Manager.
	 *
	 * @example
	 * const activeComp = api.getActiveComp();
	 * api.addRenderQueueItem(activeComp);
	 * api.renderAll();
	 */
	function renderAll(): void

	/**
	 * Render the current frame out as a PNG with a given scale set by
	 * `scalePercent`. Rendering in this way will only render the visible layers
	 * (i.e any soloed layers). The render extension `.png` will be added to the
	 * filename for you.
	 *
	 * @param filePath Absolute path (`.png` will be added)
	 * @param scalePercent Scaling percentage. A value of `100` means no scaling.
	 *
	 * @example
	 * // This example will export each selected layer individually as a PNG at 100% and 200% scale.
	 * // Get the selection
	 * const sel = api.getSelection();
	 * for (let layerId of sel) {
	 *   // Solo each layer
	 *   api.soloLayers([layerId]);
	 *   // Build a file path to export the render to
	 *   let filePath = `${api.getRenderPath()}/${api.getNiceName(layerId)}`;
	 *   // Render out the image at 100% scale.
	 *   api.renderPNGFrame(filePath, 100);
	 *   // Add `@2x` to the file path
	 *   filePath += "@2x";
	 *   // Render out at 200% scale.
	 *   api.renderPNGFrame(filePath, 200);
	 *   // Log where we put the file
	 *   console.log(`Rendered layer: ${layerId} to: ${filePath}.png`);
	 * }
	 * // Clear soloing
	 * api.soloLayers([]);
	 */
	function renderPNGFrame(filePath: string, scalePercent: number): void

	/**
	 * Render the current frame out as an SVG with a given scale set by
	 * scalePercent. Setting `skipComps` to true will mean that Composition
	 * backgrounds do not get exported. Rendering in this way will only render
	 * the visible layers (i.e any soloed layers).
	 *
	 * The render extension `.svg` will be added to the filename.
	 *
	 * @param filePath Absolute path (`.svg` will be added)
	 * @param scalePercent Scaling percentage. A value of `100` means no scaling.
	 * @param skipComps Don't export backgrounds
	 */
	function renderSVGFrame(
		filePath: string,
		scalePercent: float,
		skipComps: boolean
	): void

	/**
	 * Return a list of the Render Queue Items in the Render Manager.
	 *
	 * @example
	 * api.addRenderQueueItem(api.getActiveComp());
	 * api.addRenderQueueItem(api.getActiveComp());
	 * const items = api.getRenderQueueItems();
	 * for (let item of items) {
	 *   console.log(item);
	 * }
	 */
	function getRenderQueueItems(): string[]

	/**
	 * Add a new Render Queue Item to the Render Manager.
	 *
	 * @example
	 * const activeComp = api.getActiveComp();
	 * const itemId = api.addRenderQueueItem(activeComp)
	 * console.log(itemId);
	 */
	function addRenderQueueItem(compId: string): string

	/**
	 * Connect the Render Manager's Dynamic Index to another attribute.
	 *
	 * @param layerId ID of the layer
	 * @param attrId ID of the attribute
	 *
	 * @example
	 * const spreadsheetId = api.create("spreadsheet", "My Spreadsheet");
	 * api.connectDynamicIndex(spreadsheetId, "rowIndex");
	 * api.set(spreadsheetId, { "useFixedRow": true });
	 */
	function connectDynamicIndex(layerId: string, attrId: string): void

	/**
	 * Return the current Dynamic Index.
	 *
	 * @example
	 * console.log(api.getDynamicIndex());
	 */
	function getDynamicIndex(): integer

	// # Working with the Scene
	/**
	 * Open a Scene at the given location, this may present a Save Changes
	 * dialog unless force is set to `true`.
	 *
	 * @param filePath Absolute path to a `.cv` file
	 * @param force Don't save changes when there's an unsaved scene
	 */
	function openScene(filePath: string, force: boolean): void

	/**
	 * Save the current Scene to a new location. It does not automatically add
	 * the `.cv` file extension.
	 *
	 * @param filePath Absolute path to save the scene to
	 */
	function saveSceneAs(filePath: string): void

	/**
	 * Save the current Scene file. If the current Scene has not yet been saved,
	 * a dialog will be presented asking where to save the scene.
	 */
	function saveScene(): void

	/**
	 * Import a Cavalry Scene (.cv) or Component (.cvc). A `.cv` file will be
	 * added to the Assets Window, a `.cvc` file will be added to the active
	 * Composition.
	 *
	 * @param path Absolute path to the `.cv` or `.cvc` file
	 *
	 * @example
	 * api.importScene("path/to/scene.cv");
	 */
	function importScene(path: string): void

	/**
	 * Load an asset with the given path. Set `isSequence` to `true` if you want
	 * Cavalry to attempt to load an image sequence from the file path.
	 *
	 * @param path Absolute path to the asset
	 * @param isSequence The asset is an image sequence
	 *
	 * @returns ID of the loaded asset
	 *
	 * @example
	 * // Load an image
	 * api.loadAsset("/Path/To/image.png", false);
	 * // Load an image sequence
	 * api.loadAsset("/Path/To/sequence.00000.png", true);
	 */
	function loadAsset(path: string, isSequence: boolean): string

	/**
	 * Reloads an Asset with the given `assetId`
	 *
	 * @param assetId ID of the asset
	 *
	 * @example
	 * // First load an Asset
	 * api.reloadAsset("asset#2");
	 */
	function reloadAsset(assetId: string): void

	/**
	 * Replace a file asset (e.g an image or CSV file).
	 *
	 * @param assetId ID of the asset
	 * @param newPath Absolute path to the asset replacing it
	 */
	function replaceAsset(assetId: string, newPath: string): void

	/**
	 * Given a Text Asset (which is a `.json` file) or a Spreadsheet Asset, get
	 * the JSON object that Asset represents.
	 *
	 * @param assetId ID of the asset
	 *
	 * @example
	 * // First select a Text Asset (a JSON file imported into Cavalry).
	 * const sel = api.getSelection();
	 * if (sel.length) {
	 *   if (api.getLayerType(sel[0]) == "asset") {
	 *     let data = api.jsonFromAsset(sel[0]);
	 *     console.log(Object.keys(data).length);
	 *   }
	 * }
	 * // It's also possible to use `jsonFromAsset` to query a .csv asset.
	 * // CSV Assets will contain three members. `rows` will provide access
	 * // to the row data. `min` will provide access to the minimum value of
	 * // the column (if there is one), and `max` will give the maximum value.
	 * // Return the first entry in the 'Text' column of a .csv asset (asset#2)
	 * const csv = api.jsonFromAsset("asset#2");
	 * const text = csv["Text"].rows[0]
	 * console.log(text);
	 */
	function jsonFromAsset(assetId: string): unknown

	/**
	 * Given a Text Asset, get the raw string that Asset represents.
	 *
	 * @param assetId ID of the asset
	 */
	function textFromAsset(assetId: string): string

	/**
	 * Load a Google Sheet Asset. If the `sheetId` argument is left blank then
	 * the first sheet will be loaded. This function returns the newly created
	 * `assetId`.
	 *
	 * The spreadsheetId and sheetId can be extracted from a Google Sheet's URL:
	 * https://docs.google.com/spreadsheets/d/[spreadsheetId]/edit#gid=[sheetId]
	 *
	 * @param spreadsheetId ID of the Google spreadsheet
	 * @param sheetId ID of the sheet inside the spreadsheet
	 */
	function loadGoogleSheet(spreadsheetId: string, sheetId: string): string

	/**
	 * Set the location of `projectDescription.json` in order to use
	 * relative filepaths.
	 *
	 * @param path Absolute path to where to save the project
	 *
	 * @example
	 * api.setProject(path/to/project/);
	 */
	function setProject(path: string): void

	/**
	 * Clear the Project.
	 *
	 * @example
	 * api.clearProject();
	 */
	function clearProject(): void

	/**
	 * Returns the currently active (open) Composition's id. This can be used to
	 * set Composition settings such as Resolution and Frame Range.
	 *
	 * @example
	 * console.log(api.getActiveComp());
	 */
	function getActiveComp(): string

	/**
	 * Returns an array containing all the Compositions in the Scene.
	 *
	 * @example
	 * const newCompId = api.createComp("Shiny New Comp");
	 * const allComps = api.getComps();
	 * for (let compId of allComps) {
	 *   console.log(compId);
	 * }
	 */
	function getComps(): string[]

	/**
	 * Create a new composition and return its ID.
	 *
	 * @param niceName Human readable name
	 *
	 * @returns ID of the asset
	 *
	 * @example
	 * api.createComp("Shiny New Comp");
	 */
	function createComp(niceName: string): string

	/**
	 * Set the currently active composition.
	 *
	 * @param compId ID of the composition
	 *
	 * @example
	 * const newCompId = api.createComp("Shiny New Comp");
	 * api.setActiveComp(newCompId);
	 */
	function setActiveComp(compId: string): void

	/**
	 * Take the current selection, create a Composition based on it, and then
	 * reference that new Composition into the active Composition. The result
	 * is the layerId of the newly created Composition Reference. To get the
	 * `compId` of the Composition itself, use `api.getCompFromReference`.
	 *
	 * @param name Name of the precomp
	 *
	 * @example
	 * // Create two Shapes.
	 * const shape1 = api.primitive("superEllipse", "Super Ellipse");
	 * const shape2 = api.primitive("rectangle", "Rectangle");
	 * // Select them both.
	 * api.select([shape1, shape2]);
	 * // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
	 * api.preCompose("New Pre-Comp");
	 */
	function preCompose(name: string): string

	/**
	 * Given the `layerId` of a Composition Reference, get the `compId` of the
	 * Composition it references from the Assets Window.
	 *
	 * @param layerId
	 *
	 * @example
	 * // Create a Shape and select it.
	 * const shape1 = api.primitive("superEllipse", "Super Ellipse");
	 * api.select([shape1]);
	 * // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
	 * const preCompId = api.preCompose("New Pre-Comp");
	 * // Rename the Composition in the Assets Window to match.
	 * const compId = api.getCompFromReference(preCompId);
	 * api.set(compId, { "niceName": "New Pre-Comp" });
	 */
	function getCompFromReference(layerId: string): string

	/**
	 * Create a Composition Reference from an existing Composition and add it
	 * to the active Composition.
	 *
	 * @param compId ID of the composition
	 *
	 * @example
	 * const newCompId = api.createComp("Shiny New Comp");
	 * api.createCompReference(newCompId);
	 */
	function createCompReference(compId: string): string

	/**
	 * This will return an array of all the layers in the Asset Window.
	 *
	 * If `topLevel` is true then only the top level layers will be returned.
	 *
	 * @param topLevel Only return layers in the top level
	 *
	 * @example
	 * const assetLayerIds = api.getAssetWindowLayers(false);
	 * for (let id of assetLayerIds) {
	 *   console.log(id);
	 * }
	 */
	function getAssetWindowLayers(topLevel: boolean): string[]

	/**
	 * Return the asset type (i.e image, audio, spreadsheet, movie, svg).
	 *
	 * @param assetId ID of the asset
	 *
	 * @example
	 * // First load an Asset
	 * console.log(api.getAssetType("asset#2"));
	 */
	function getAssetType(assetId: string): string

	/**
	 * Get the file path of a file asset such as a spreadsheet, image, or font.
	 *
	 * @param assetId ID of the asset
	 *
	 * @returns Absolute path of the asset
	 *
	 * @example
	 * const assets = api.getAssetWindowLayers(false);
	 * for (let assetId of assets) {
	 *   const type = api.getAssetType(assetId);
	 *   if (type != "unknown") {
	 *     const filePath = api.getAssetFilePath(assetId);
	 *     console.log(`Checking: ${filePath} of type ${type} exists: ${api.filePathExists(filePath)}`);
	 *   }
	 * }
	 */
	function getAssetFilePath(assetId: string): string

	/**
	 * Create a Group in the Assets Window, this will return the `layerId` of
	 * the new Group.
	 *
	 * @param niceName Name of the new group
	 *
	 * @returns Layer ID of the new group
	 *
	 * @example
	 * api.createAssetGroup("My Asset Group");
	 */
	function createAssetGroup(niceName: string): string

	/**
	 * This will solo the `layerIds` supplied in the array argument.
	 *
	 * @param layerIds Array of layer IDs
	 *
	 * @example
	 * // This example will export each selected layer individually as a PNG at 100% and 200% scale.
	 * // Get the selection
	 * const sel = api.getSelection();
	 * for (let layerId of sel) {
	 *   // Solo each layer
	 *   api.soloLayers([layerId]);
	 *   // Build a file path to export the render to
	 *   let filePath = `${api.getRenderPath()}/${api.getNiceName(layerId)}`;
	 *   // Render out the image at 100% scale.
	 *   api.renderPNGFrame(filePath, 100);
	 *   // Add `@2x` to the file path
	 *   filePath += "@2x";
	 *   // Render out at 200% scale.
	 *   api.renderPNGFrame(filePath, 200);
	 *   // Log where we put the file
	 *   console.log(`Rendered layer: ${layerId} to: ${filePath}.png`);
	 * }
	 * // Clear soloing
	 * api.soloLayers([]);
	 */
	function soloLayers(layerIds: string[]): void

	// # Files and Paths
	// Files and paths are absolute, use the methods in this section as the base path if you want to build paths relative to your project. If you're building a UI script you will have access to the `ui.scriptLocation` variable, which will allow you to build paths relative to your script.

	/**
	 * This will load and run a JavaScript file making the functions contained
	 * within it available to use in the current script. This is not a module
	 * loader. Scripts loaded in this way are not placed into a
	 * namespace/module and are free functions/objects.
	 *
	 * @param filePath Absolute path to the script file
	 *
	 * @example
	 * // Contents of script.js
	 * function helloWorld() {
	 *   console.log("Hello World.");
	 * }
	 * // Then in Cavalry
	 * api.load("path/to/script.js");
	 * helloWorld();
	 */
	function load(filePath: string): boolean

	/**
	 * Like `load`, `exec` will load and run JavaScript but it does not require
	 * a saved file.
	 *
	 * The first argument is a `scriptId`. The `scriptId` exists because Cavalry
	 * asks for permission to perform certain tasks (like using the WebAPIs or
	 * writing to the hard drive) on a per-script basis. This information is
	 * stored using the `scriptId` so that permission will only be requested
	 * once per Id.
	 *
	 * We recommend using reverse domain notation `com.<yourCompany>.<yourScript>`
	 * as a basis for `scriptId`s.
	 *
	 * @param scriptId ID of the script in reverse domain notation, ie: 'com.company.script'
	 * @param scriptSource Stringified contents of the script
	 *
	 * @example
	 * const myScript = "console.log('Hello World!')";
	 * api.exec("com.scenegroup.scriptName", myScript);
	 */
	function exec(scriptId: string, scriptSource: string): boolean

	/**
	 * Gets the Project path (if a Project is set). This path does not include
	 * a trailing `/`
	 *
	 * @returns Absolute path of the project, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getProjectPath());
	 */
	function getProjectPath(): string

	/**
	 * Gets the Render path (if a Project is set). This path does not include
	 * a trailing `/`
	 *
	 * @returns Absolute path of the render path, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getRenderPath());
	 */
	function getRenderPath(): string

	/**
	 * Gets the Project Asset path (if a Project is set). This path does not
	 * include a trailing `/`
	 *
	 * @returns Absolute path of the render path, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getAssetPath());
	 */
	function getAssetPath(): string

	/**
	 * Gets the Scenes path (if a Project is set). This path does not include
	 * a trailing `/`
	 *
	 * @returns Absolute path of the scenes path, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getScenesPath());
	 */
	function getScenesPath(): string

	/**
	 * If the current Scene has been saved this will return its filepath,
	 * otherwise it will return an empty string.
	 *
	 * @returns Absolute path of the current scene's path, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getSceneFilePath());
	 *
	 */
	function getSceneFilePath(): string

	/**
	 * Get the location of the Cavalry preferences folder.
	 *
	 * @returns Absolute path of the preferences path, excluding trailing slash
	 *
	 * @example
	 * console.log(api.getPreferencesPath());
	 */
	function getPreferencesPath(): string

	/**
	 * This will return whether a path to a file or folder exists.
	 *
	 * @param path Absolute path to file or folder
	 *
	 * @example
	 * console.log(api.filePathExists(api.getPreferencesPath()));
	 */
	function filePathExists(path: string): boolean

	/**
	 * This will return the file name from a path.
	 *
	 * @param path Absolute path to file
	 *
	 * @example
	 * // Will return `here`
	 * console.log(api.getFileNameFromPath("some/thing/here.png"));
	 */
	function getFileNameFromPath(path: string): string

	/**
	 * This will return the extension of a file.
	 *
	 * @param path Absolute path to file or folder
	 *
	 * @returns File extension including `.` ie. `.jpg`
	 *
	 * @example
	 * // Will return `.png`
	 * console.log(api.getFileNameFromPath("some/thing/here.png"));
	 */
	function getExtensionFromPath(path: string): string

	/**
	 * This will return the containing folder of a file.
	 *
	 * @param path Absolute path to file
	 *
	 * @example
	 * // Will return `some/thing`
	 * console.log(api.getFileNameFromPath("some/thing/here.png"));
	 */
	function getFolderFromPath(path: string): string

	/**
	 * This will create a folder at the location given in path and return if
	 * the operation was a success. Existing paths will not be overwritten.
	 * Paths have to be absolute and parent folders need to exist, they are
	 * not created.
	 *
	 * @param path Absolute path to the folder
	 *
	 * @example
	 * // Update the example path below and uncomment the line
	 * const newFolder = api.makeFolder("/path/to/newFolder");
	 * if (newFolder == true) {
	 *   console.log("New folder created.");
	 * } else {
	 *   console.log("New folder failed.");
	 * }
	 */
	function makeFolder(path: string): boolean

	/**
	 * Get the location of the App Assets (this is useful for accessing app icons
	 * for your scripts).
	 *
	 * @example
	 * console.log(api.getAppAssetsPath());
	 *
	 * @example
	 * // This example uses the native transform icon
	 * const icon = `${api.getAppAssetsPath()}/icons/transform@2x.png`
	 * const button = new ui.ImageButton(icon)
	 * button.setSize(32, 32)
	 * ui.add(button)
	 * ui.show()
	 */
	function getAppAssetsPath(): string

	/**
	 * Write a string to a file. Returns if the write was successful. You cannot
	 * write binary data from this API, for that, please use
	 * `writeEncodedToBinaryFile`.
	 *
	 * If a file already exists, an error is returned. Set the `overwrite`
	 * argument to `true` to override the error and replace the existing file
	 * - proceed with caution.
	 *
	 * JavaScript does not support single backslashes (`\`) in file paths (it is
	 * an escape character) but slashes (`/`) are valid on Windows. Alternatively,
	 * replace single backslashes with double backslashes (`\\`).
	 *
	 * @param filePath Absolute path to the file to be written
	 * @param content Preferred content of the file
	 * @param overwrite Overwrite the file. Default is `false`
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * const obj = api.get(primId, "polyMesh");
	 * let objContents = "#this exporter is incomplete and only works with QuickLook on macOS\n\n";
	 * objContents += "o testShape\n\n";
	 * let face = "f ";
	 * const meshes = obj.meshes;
	 * for (var mesh of meshes) {
	 *   var index = 1; // obj face index starts at 1
	 *   for (var pointData of mesh.path) {
	 *     // 0 = moveTo and 1 = lineTo
	 *     if (pointData.type == 0 || pointData.type == 1) {
	 *       objContents += `v ${pointData.points[0].x.toFixed(4)} ${pointData.points[0].y.toFixed(4)}\n`;
	 *       face += index + " ";
	 *     }
	 *     ++index;
	 *   }
	 * }
	 * objContents += "usemtl None\n"
	 * objContents += "s off\n"
	 * objContents += face;
	 * // This line is commented out as you will need to provide a file path
	 * //api.writeToFile("/some/folder/test.obj", objContents);
	 */
	function writeToFile(
		filePath: string,
		content: string,
		overwrite?: boolean
	): boolean

	/**
	 * Write an encoded string to a file and returns if the write was
	 * successful.
	 *
	 * Caution, this will overwrite any existing file.
	 *
	 * Please note, only files encoded using `encodeBinary` will be
	 * properly decoded.
	 *
	 * @param filePath Absolute path to the file to be written
	 * @param content Preferred content of the file encoded as `base64`
	 *
	 * @example
	 * const encoded = api.encodeBinary("/some/folder/original.png");
	 * api.writeEncodedToBinaryFile("/some/folder/copy.png", encoded);
	 */
	function writeEncodedToBinaryFile(
		filePath: string,
		content: string
	): boolean

	/**
	 * Read a file as a string.
	 *
	 * @param filePath Absolute path to the file to be read
	 *
	 * @example
	 * // Please note this file path will need to point to a real file (e.g a .txt, .json, .csv, .obj etc., etc.)
	 * const text = api.readFromFile("/some/folder/test.obj");
	 * console.log(text);
	 */
	function readFromFile(filePath: string): string

	/**
	 * Read a binary file (like an image), and encode it into `base64`. This can
	 * then be stored as a variable in JavaScript for use later (i.e with
	 * `writeEncodedToBinaryFile`).
	 *
	 * @param filePath
	 *
	 * @example
	 * // Please note this file path will need to point to a real file (e.g a .png, .jpg etc., etc.)
	 * const encoded = api.encodeBinary("/some/folder/test.png");
	 * api.writeToFile("/some/folder/encoderDump.txt", encoded);
	 */
	function encodeBinary(filePath: string): string

	// # Utilities
	/**
	 * Add a string to the clipboard.
	 *
	 * @param text
	 *
	 * @example
	 * setClipboardText("Copy test from Cavalry");
	 */
	function setClipboardText(text: string): void

	/**
	 * Return the contents of the clipboard as a string.
	 *
	 * @example
	 * 	api.setClipboardText("Copy test from Cavalry");
	 * console.log(api.getClipboardText());
	 */
	function getClipboardText(): string

	/**
	 * This runs a system process and waits for the result which is returned as
	 * a string. GUI scripts that try to run this function will trigger a
	 * warning asking for users to trust the script. This is a blocking action,
	 * the UI will freeze until the process completes. For non blocking processes
	 * see `runDetachedProcess`.
	 *
	 * Proceed with caution when running system processes to ensure scripts do not
	 * compromise system security.
	 *
	 * @param command Name of the process
	 * @param arguments Array of arguments to pass to the process
	 *
	 * @example
	 * // macOS example
	 * const res = api.runProcess('sh', ['-c', 'python3 --version'])
	 * if (res.error) {
	 * 	console.log(res.error)
	 * } else {
	 * 	console.log(res.output)
	 * }
	 * // on Windows the command to run (first argument) would be "cmd.exe"
	 * // or "path/to/powerShell.exe" and so forth.
	 * const res = api.runProcess('cmd.exe', ['/c echo hello world'])
	 * if (res.error) {
	 * 	console.log(res.error)
	 * } else {
	 * 	console.log(res.output)
	 * }
	 */
	function runProcess(
		command: string,
		arguments: string[]
	): { output: string; error: string }

	/**
	 * This runs a system process in a separate thread. GUI scripts that try to
	 * run this function will trigger a warning asking for users to trust the
	 * script. This is a non-blocking action.
	 *
	 * Proceed with caution when running system processes to ensure scripts do
	 * not compromise system security.
	 *
	 * @param command Name of the process
	 * @param arguments Array of arguments to pass to the process
	 *
	 * @example
	 * // macOS example
	 * const res = api.runDetachedProcess("sh", ["-c", "python3 --version"]);
	 * console.log(res);
	 * // on Windows the command to run (first argument) would be "cmd.exe" or "path/to/powerShell.exe" and so forth.
	 * const res = api.runDetachedProcess("cmd.exe", ["/c echo hello world"]);
	 * console.log(res);
	 */
	function runDetachedProcess(command: string, arguments: string[]): void

	/**
	 * Open a web URL in a browser or file URI in the OS finder.
	 *
	 * @param url Web URL or file URI i.e. `file://`
	 *
	 * @example
	 * api.openURL("http://cavalry.scenegroup.co");
	 * // On MacOS
	 * api.openURL("file:///Users/User/Desktop");
	 * // On Windows (note the slash before `c:/`)
	 * api.openURL("file:///c:/Users/User/Desktop");
	 */
	function openURL(url: string): void

	/**
	 * Returns `true` if this is a GUI session of the app,
	 * and `false` if not (e.g the CLI is running).
	 *
	 * @example
	 * console.log(api.isGuiSession());
	 */
	function isGuiSession(): boolean

	/**
	 * Get the current hardware platform. This will return
	 * either `macOS` or `Windows`
	 *
	 * @example
	 * console.log(api.getPlatform());
	 */
	function getPlatform(): 'macOS' | 'Windows'

	// 	 * @example
	//  * // Simple get request.
	//  * // Make a new WebClient
	//  * var client = new api.WebClient("https://www.boredapi.com");
	//  * // Send the Get Request (this returns a random activity to do if you're bored).
	//  * client.get("/api/activity");
	//  * // Check it succceded
	//  * if (client.status() == 200) {
	//  *   const obj = JSON.parse(client.body());
	//  *   // Safety check, and print the activity
	//  *   if ('activity' in obj) {
	//  *     console.log(`Random activity: ${obj.activity}`);
	//  *   }
	//  * }
	// Getting and saving an SVG file.
	// var client = new api.WebClient("https://cavalry.scenegroup.co");
	// client.get("/images/logo_cavalry-landscape-outline_001.svg");
	// if (client.status() == 200) {
	//     api.writeToFile("/Some/Path/Here/cavLogo.svg", client.body());
	// }

	/**
	 * Convert a list of Layers into their 'save file' representation.
	 *
	 * The first argument is an array of strings `[string]` containing the
	 * layers to be serialised. The second argument is `withConnections` - if
	 * this is `true`, any input connections will also be serialised. For
	 * example, if a **Shape** in the array is connected to a **Color Array**,
	 * setting `withConnections` to `true` will also serialise the
	 * **Color Array**.
	 *
	 * By saving serialised files with a `.cvc` extension, they can then be
	 * imported back into a Scene via the **File > Import Scene...** menu. Files
	 * saved with any other extension can be imported using the deserialised
	 * function.
	 *
	 * @param layerIds Array of layer IDs
	 * @param withConnections Include layers that are connected to layers in `layerIDs`
	 *
	 * @example
	 * const primId = api.primitive("polygon", "My Polygon");
	 * api.set(primId, {"material.materialColor": "#8dc429"});
	 * api.writeToFile("/Users/username/Desktop/textExport.txt", api.serialise([primId], false));
	 */
	function serialise(layerIds: string[], withConnections: boolean): string

	/**
	 * Deserialise a JSON string to Layers. This function is the opposite of `serialise`.
	 *
	 * @param filePath Absolute path to the file to be deserialised
	 *
	 * @example
	 * // Select a Layer
	 * const sel = api.getSelection();
	 * const str = api.serialise(sel, true);
	 * api.deserialise(str);
	 */
	function deserialise(filePath: string): void

	/**
	 * Save script preferences as an object
	 *
	 * TODO: Add info regarding the prefs file
	 * TODO: Note it doesn't work for native prefs
	 * TODO: Recommend reverse URL notation ie. com.scenery.scriptName
	 *
	 * @param key Name of preference key to be set
	 * @param preferences Object of keys and values
	 *
	 * @example
	 * const hello = { first: "Hello, ", second: "World", third: "!" };
	 * api.setPreferenceObject("testKey", hello);
	 */
	function setPreferenceObject(key: string, preferences: unknown): void

	/**
	 * Query to see if preference exists.
	 * TODO: Add info regarding the prefs file
	 *
	 * @param key Name of the preference key
	 *
	 * @example
	 * const hello = { first:"Hello, ", second: "World", third: "!" };
	 * api.setPreferenceObject("testKey", hello);
	 * console.log( api.hasPreferenceObject("testKey") );
	 */
	function hasPreferenceObject(key: string): boolean

	/**
	 * Return any existing preferences.
	 * TODO: Add info regarding the prefs file
	 *
	 * @param key Name of the preference key to be read
	 *
	 * @example
	 * const hello = { first: "Hello", second: "World", third: "!" };
	 * api.setPreferenceObject("testKey", hello);
	 * const myPrefs = api.getPreferenceObject("testKey");
	 * console.log(`${myPrefs.first}, ${myPrefs.second}${myPrefs.third});
	 */
	// TODO: Define return value
	function getPreferenceObject(key: string): object | undefined

	/**
	 * Save arbitrary data to a layer. This could be a string, or an object.
	 *
	 * @param layerId ID of the layer
	 * @param key Name of the user key
	 * @param value Object of key, value pairs
	 *
	 * @example
	 * const primId = api.primitive("star", "Star");
	 * api.setUserData(primId, "test", "Hello, World!");
	 */
	function setUserData(layerId: string, key: string, value: unknown): void

	// {@link TextDocument.uri TextDocument.uri.fsPath}
	// {@linkcode Uri.scheme}
	/**
	 * Query to see if user data with a given `key` exists.
	 *
	 * TODO: Link to `setUserData` see above
	 *
	 * @param key Name of the user key
	 *
	 * @example
	 * const primId = api.primitive("star", "Star");
	 * api.setUserData(primId, "test", "Hello, World!");
	 * console.log(api.hasUserDataKey(primId, "test"));
	 */
	function hasUserDataKey(key: string): boolean

	/**
	 * Return any existing user data for the given `key`.
	 *
	 * @param layerId ID of the layer
	 * @param key Name of the user key to be read
	 *
	 * @example
	 * const primId = api.primitive("star", "Star");
	 * api.setUserData(primId, "test", "Hello, World!");
	 * console.log(api.getUserDataKey(primId, "test"));
	 */
	function getUserDataKey(layerId: string, key: string): unknown

	/**
	 * Each layer in Cavalry has a unique identifier (a UUID). Layers based on
	 * the UUID can be identified with this API.
	 *
	 * See the example for how to get a UUID from a layer.
	 *
	 * @param uuid
	 *
	 * @example
	 * const primId = api.primitive("star", "Star")
	 * const uuid = api.get(primId, "uuid")
	 * const idCheck = api.getLayerFromUUID(uuid);
	 * console.log(`${primId} === ${idCheck}`);
	 */
	function getLayerFromUUID(uuid: string): string

	/**
	 * Cavalry provides a way to interact with API endpoints on the web by creating
	 * a WebClient object and interacting with its methods to `get`, `post` or `put`.
	 * These API calls are blocking meaning they must successfully complete before
	 * progressing to the next part of a script.
	 *
	 * Further to the WebClient, Cavalry also provides a simple WebServer. You can
	 * call `/get` to retrieve whatever response you have set on the server, or,
	 * for those of an adventurous persuasion, you can use `/post`. To aid when
	 * using `/post` the WebServer can poll for new data and will fire a callback
	 * function when a data drop has been detected.
	 */
	class WebClient {
		/**
		 * TODO: Description
		 *
		 * @param url Base URL of the API
		 */
		constructor(url: string)

		/**
		 * Sets basic authentication for any subsequent requests.
		 *
		 * @param username The username to authenticate with
		 * @param password The user's password
		 */
		setBasicAuthentication(username: string, password: string): void

		/**
		 * Sets digest authentication for any subsequent requests.
		 *
		 * @param username The username to authenticate with
		 * @param password The user's password
		 */
		setDigestAuthentication(username: string, password: string): void

		/**
		 * Sets token based authentication for any subsequent requests.
		 *
		 * @param token The token to authenticate with
		 */
		setTokenAuthentication(token: string): void

		/**
		 * Adds a header for any following requests. API keys, app keys, content
		 * types and so forth can be added in this way.
		 *
		 * @param key Name of the header
		 * @param value Value of the header
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
		 */
		addHeader(key: string, value: string): void

		/**
		 * TODO: Description
		 *
		 * @example
		 * const client = new api.WebClient("https://www.boredapi.com");
		 * client.get("/api/activity");
		 * if (client.status() == 200) {
		 *   let headers = client.getHeaders();
		 *   for (const [key, value] of Object.entries(headers)) {
		 *     console.log(`${key}: ${value}`);
		 *   }
		 * }
		 */
		// TODO: Create interface
		getHeaders(): { [key: string]: string }

		/**
		 * Returns the status of the request. For example 200 means OK.
		 */
		status(): integer

		/**
		 * The returned body. This is often in the form of JSON but you can check
		 * the Content-Type header with `getHeaders()` if you're unsure.
		 */
		body(): string

		/**
		 * Peforms a get request. Once done, `status()` and if successful, `body()`
		 * should be available.
		 *
		 * @param path Path relative to the base URL
		 */
		get(path: string): void

		/**
		 * Peforms a post request. Once done, `status()` and if successful, `body()`
		 * should be available.
		 *
		 * @param path Path relative to the base URL
		 * @param content Content of the request
		 * @param contentType Type of the content, i.e. `text/xml`
		 */
		post(path: string, content: string, contentType: string): void

		/**
		 * Peforms a put request. Once done, `status()` and if successful, `body()`
		 * should be available.
		 *
		 * @param path Path relative to the base URL
		 * @param content Content of the request
		 * @param contentType Type of the content, i.e. `text/xml`
		 */
		put(path: string, content: string, contentType: string): void

		/**
		 * A helper method for posting a file directly. This method is needed
		 * especially when uploading binary files (like images or movies).
		 *
		 * Peforms a post request. Once done, `status()` and if successful, `body()`
		 * should be available.
		 *
		 * @param path Path relative to the base URL
		 * @param filePath Absolute path to the file
		 * @param contentType Type of the content, i.e. `text/xml`
		 */
		postFromFile(path: string, filePath: string, contentType: string): void

		/**
		 * A helper method for posting a file directly. This method is needed
		 * especially when uploading binary files (like images or movies).
		 *
		 * Peforms a put request. Once done, `status()` and if successful, `body()`
		 * should be available.
		 *
		 * @param path Path relative to the base URL
		 * @param filePath Absolute path to the file
		 * @param contentType Type of the content, i.e. `text/xml`
		 */
		putFromFile(path: string, filePath: string, contentType: string): void

		/**
		 * If `get` has been used to retrieve binary data (i.e an image or a movie),
		 * this cannot be passed to the usual `api.writeToFile()` call. You must
		 * instead use this function to write the body data to file (which you can
		 * then pull into Cavalry as an Asset for example).
		 *
		 * @param path Absolute path to the file
		 */
		writeBodyToBinaryFile(path: string): boolean

		/**
		 * Enter a proxy server's IP and port number.
		 *
		 * @param hostAddress Address of the proxy server
		 * @param port Port of the proxy server
		 */
		setProxy(hostAddress: string, port: number): void

		/**
		 * Enter a username and password to authenticate to a proxy server.
		 *
		 * @param username Username for the proxy server
		 * @param password Password for the proxy server
		 */
		setProxyBasicAuthentication(username: string, password: string): void

		/**
		 * Enter a password for a proxy server that uses a bearer token.
		 *
		 * @param password Password for the proxy server
		 */
		setProxyBearerAuthentication(password: string): void
	}

	interface WebServerCallbacks {
		onPost(): void
	}

	/**
	 * TODO: Description
	 *
	 * @example
	 * const server = new api.WebServer();
	 * const button = new ui.Button("Start Server");
	 * button.onClick = function () {
	 *     if (!server.isRunning()) {
	 *         server.listen("localhost", 1234);
	 *         button.setText("Stop Server");
	 *     } else {
	 *         server.stop();
	 *         button.setText("Start Server");
	 *     }
	 * }
	 *
	 * function Callbacks() {
	 *     this.onPost = function () {
	 *         console.log(`Queue length: ${server.postCount()}`);
	 *         processButton.setEnabled(true);
	 *     }
	 * }
	 *
	 * const processButton = new ui.Button("Process Posts");
	 * processButton.setEnabled(false);
	 *
	 * processButton.onClick = function () {
	 *     while(server.postCount()) {
	 *         const obj = server.getNextPost();
	 *         console.log(`Process: ${obj.result}`);
	 *     }
	 *     processButton.setEnabled(false);
	 * }
	 *
	 * const callbackObj = new Callbacks();
	 * server.addCallbackObject(callbackObj);
	 *
	 * ui.add(button);
	 * ui.add(processButton);
	 * ui.show();
	 *
	 * // Once this script is running, run this in the JavaScript Editor, the `/post` text should print to the console.
	 * var client = new api.WebClient("http://localhost:1234");
	 * client.post("/post", "The Cavalry Needs You!", "text/plain");
	 * client.post("/post", "Join the Cavalry!", "text/plain");
	 */
	class WebServer {
		/**
		 * Start the server listening on the host address (e.g localhost) on the
		 * specified port number.
		 *
		 * @param host URL of the host to listen to
		 * @param port Port of the host
		 */
		listen(host: string, port: integer): void

		/**
		 * Stop the server, any polling will also stop.
		 */
		stop(): void

		/**
		 * Set the result for `/get` requests, only `text/plain` is currently
		 * supported.
		 *
		 * @param resultText
		 */
		setResultForGet(resultText: string): void

		/**
		 * As many `/post` events may happen before you have a chance to react,
		 * Cavalry will queue them for you. This function will get the next (the
		 * oldest) post and will pop the post from the queue meaning once you get
		 * it, you can no longer access it from the server. The object will contain
		 * a result string, and an headers array, each header is an object with a
		 * name and value. Please note only non binary data is supported for `/post`
		 * events.
		 */
		// TODO: Define return value
		getNextPost(): object

		/**
		 * This is just like `getNextPost`, only instead of getting the oldest
		 * unprocessed `/post`, it will skip to the newest and pop that from the queue.
		 */
		// TODO: Define return value
		getNewestPost(): object

		/**
		 * Returns the number of unprocessed `/post` events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		postCount(): integer

		/**
		 * Clear all unprocessed `/post` events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		clearPosts(): void

		/**
		 * Set a Callback object (much like the UI callback object). This is a
		 * JavaScript object with an `onPost` function implemented. Setting a
		 * Callback object will start the server polling for new information, by
		 * default we poll the server once every 3 seconds.
		 *
		 * @param callback
		 *
		 * @example
		 * const server = new api.WebServer();
		 * function Callbacks() {
		 *   this.onPost = function () {
		 *     console.log(`Check result: ${server.getResult()}`);
		 *   }
		 * }
		 * const callbackObj = new Callbacks();
		 * server.addCallbackObject(callbackObj);
		 */
		addCallbackObject(callback: WebServerCallbacks): void

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to once per second.
		 */
		setHighFrequency(): void

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to 60 times a second. This is useful for realtime
		 * communication with things like midi-controllers.
		 */
		setRealtime(): void
	}

	interface TimerCallbacks {
		onTimeout(): void
	}

	/**
	 * Timers can be used in UI scripts and can be useful for polling Web APIs.
	 * When the Timer is triggered it will call an `onTimeout()` function on
	 * the Timer object. Implement this function for a Timer to execute logic
	 * when this happens.
	 *
	 * Caution: Timers should not be used to detect changes to the scene,
	 * please use callbacks for this purpose.
	 */
	class Timer {
		/**
		 * TODO: Description
		 *
		 * @param callback
		 */
		constructor(callback: TimerCallbacks)

		/**
		 * Start the timer.
		 */
		start(): void

		/**
		 * Stop the timer.
		 */
		stop(): void

		/**
		 * Returns if the timer is currently running.
		 */
		isActive(): boolean

		/**
		 * Set how long the timer is (in milliseconds).
		 *
		 * @param interval Interval in milliseconds
		 */
		setInterval(interval: integer): void

		/**
		 * Set if the timer is repeating (`true` by default).
		 *
		 * @param repeat Repeat the timer
		 */
		setRepeating(repeat: boolean): void

		/**
		 * Implement this callback function on a timer object and it will be
		 * called when the timer runs out.
		 *
		 * @example
		 * // Define a callback class to be used by the timer
		 * function Callbacks() {
		 *   // This callback will be called whenever the timer times out
		 *   this.onTimeout = function () {
		 *     console.log("Timer Expired");
		 *   }
		 * }
		 * // Create the callback class
		 * const callbackObj = new Callbacks();
		 * // Make the timer and feed it the callback object
		 * const timer = new api.Timer(callbackObj);
		 */
		onTimeout(): void
	}
}
