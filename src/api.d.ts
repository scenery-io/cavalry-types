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
// These Ids can then be used within a script. In the example below, basicShape#1 is the layerId and position.x is the attrId.
// api.get("basicShape#1", "position.x");

// Working with the Composition

declare namespace api {
	/**
	 * TODO: Description
	 * @param frame
	 */
	function setFrame(frame: integer)

	// api.setFrame(100);
	// console.log(api.getFrame());

	/**
	 * TODO: Description
	 */
	function getFrame(): integer

	// api.setFrame(100);
	// console.log(api.getFrame());

	/**
	 * Start playback.
	 */
	function play()

	/**
	 * TODO: Description
	 * @param topLevel
	 */
	function getCompLayers(topLevel: boolean): string[]

	// var primId = api.primitive("polygon", "My Polygon");
	// var nullId = api.create("null", "My Null");
	// api.parent(primId, nullId);
	// // The boolean indicates top level layers only (ie. ignore all children)
	// var topLevelIds = api.getCompLayers(false);
	// // Prints: 1
	// console.log(topLevelIds.length)
	// // Get all the layers in the composition
	// var allIds = api.getCompLayers(true);
	// // Prints: 2
	// console.log(allIds.length)

	/**
	 * TODO: Description
	 * @param topLevel
	 * @param type
	 */
	function getCompLayersOfType(topLevel: boolean, type: string): string[]

	// api.create("null", "My Null");
	// api.create("null", "My Other Null");
	// api.create("group", "My Folder");
	// api.create("spreadsheet", "My Spreadsheet");
	// let nulls = api.getCompLayersOfType(false, "null");
	// for (var layer of nulls) {
	//   console.log(api.getNiceName(layer));
	// }

	/**
	 * Adds a new Time Marker. The second example sets up a Time Marker as a controller for a Scheduling Group.
	 * @param time
	 */
	function createTimeMarker(time: integer)

	// let markerId = api.createTimeMarker(10);
	// api.set(markerId, {"label": "Hello, World", "drawColor": "Pink", "useRelPlacement": true});

	// /// After running this script, move the Time Marker around
	// let rectId = api.primitive("rectangle", "My Rectangle");
	// let ellipseId = api.primitive("ellipse", "My Ellipse");

	// let scheduleGroup = api.create("schedulingGroup", "Marker Controlled Group");
	// api.parent(rectId, scheduleGroup);
	// api.parent(ellipseId, scheduleGroup);

	// let markerId = api.createTimeMarker(10);
	// api.set(markerId, {"label": "Hello, World", "drawColor": "Pink", "useRelPlacement": true});

	// api.connect(markerId, "id", scheduleGroup, "childOffset");

	/**
	 * Returns a list of all the Time Marker Ids in this Composition
	 */
	function getTimeMarkers(): string[]

	// api.createTimeMarker(10);
	// api.createTimeMarker(40);
	// var markers = api.getTimeMarkers();
	// for (let markerId of markers) {
	//     console.log(markerId)
	// }

	/**
	 * A convenience function for removing Time Markers. This forwards to `api.delete(layerId)`.
	 * @param markerId
	 */
	function removeTimeMarker(markerId: string)

	// Working with Layers

	/**
	 * Creates a Primitive Shape
	 * @param type
	 * @param name
	 */
	function primitive(type: string, name: string): string

	// /// returns the layerId for the new shape
	// var primId = api.primitive("rectangle", "My Rectangle");

	/**
	 * Creates and Editable Shape from a Path
	 * @param path
	 * @param name
	 */
	function createEditable(path: string, name: string): string

	// var path = new cavalry.Path();
	// path.moveTo(0.,0.);
	// path.lineTo(0.,-100.);
	// path.lineTo(300.,-100.);
	// path.cubicTo(210., 110., 240., 140., 280., 260);
	// path.close();
	// api.createEditable(path, "My Path");

	/**
	 * Creates a Layer of any type. The name argument specifies the name of the Layer in the Scene Window.
	 * @param layerType
	 * @param name
	 */
	function create(layerType: string, name: string): string

	// api.create("null", "My Null");

	/**
	 * TODO: Description
	 * @param layerId
	 */
	// TODO: Reserved word
	// @ts-ignore
	// function delete(layerId: string)

	// /// Delete all render queue items
	// var items = api.getRenderQueueItems();
	// for (var layer of items) {
	//   api.delete(layer);
	// }

	/**
	 * Returns `true` if a layer with the given layerId exists.
	 * @param layerId
	 */
	function exists(layerId: string): boolean

	// console.log("Made up id exists:" + api.exists("madeUpId#1") + ". Active Comp exists: " + api.exists(api.getActiveComp()));

	/**
	 * Get the layer's type (which can be used to create new instances of this layer).
	 * @param layerId
	 */
	function getLayerType(layerId: string): string

	// var layerId = api.create("null", "My Null");
	// console.log(api.getLayerType(layerId));

	/**
	 * Reset all Attributes on a layer back to the default state.
	 * @param layerId
	 */
	function resetLayerAttributes(layerId: string)

	/**
	 * Gets the currently selected Layers.
	 */
	function getSelection(): string[]

	// /// returns an array of layerId strings
	// var sel = api.getSelection();
	// for (var layer of sel) {
	//   console.log(api.getNiceName(layer));
	// }

	/**
	 * Sets the selected layers.
	 * @param selection
	 */
	function select(selection: string[])

	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.select([primId]);

	/**
	 * Gets the children of the specified layer.
	 * @param layerId
	 */
	function getChildren(layerId: string): string[]

	// var primId = api.primitive("polygon", "My Polygon");
	// var nullId = api.create("null", "My Null");
	// api.parent(primId, nullId);
	// var childIds = api.getChildren(nullId);
	// console.log(childIds.length)

	/**
	 * TODO: Description
	 * @param layerId
	 * @param newParentId
	 */
	function parent(layerId: string, newParentId: string)

	// var primId = api.primitive("polygon", "My Polygon");
	// var nullId = api.create("null", "My Null");
	// api.parent(primId, nullId);
	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getParent(layerId: string): string

	// var primId = api.primitive("polygon", "My Polygon");
	// var nullId = api.create("null", "My Null");
	// api.parent(primId, nullId);
	// console.log(api.getParent(primId));
	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getNiceName(layerId: string): string

	// var nullId = api.create("null", "My Null");
	// console.log(api.getNiceName(nullId));
	/**
	 * TODO: Description
	 * @param layerId
	 * @param name
	 */
	function rename(layerId: string, name: string)

	// /// rename all selected items
	// var sel = api.getSelection();
	// sel.forEach(function (item, index) {
	//   api.rename(item, "My Name "+index);
	// });

	function offsetLayerTime(layerId: string, delta: integer)

	/**
	 * TODO: Description
	 * @param layerId
	 * @param isOn
	 */
	// TODO: Rename `isOn` to `enabled`?
	function setStroke(layerId: string, isOn: boolean)

	// var primId = api.primitive("rectangle", "Rectangle");
	// api.setFill(primId, false);
	// api.setStroke(primId, true);
	// api.set(primId, {"stroke.strokeColor": "#049dd9", "stroke.width": 20});

	/**
	 * Returns true if a layer has a Stroke.
	 * @param layerId
	 */
	function hasStroke(layerId: string): boolean

	// var primId = api.primitive("rectangle", "Rectangle");
	// api.setStroke(primId, true);
	// console.log(api.hasStroke(primId));

	/**
	 * TODO: Description
	 * @param layerId
	 * @param isOn
	 */
	function setFill(layerId, isOn)

	// var primId = api.primitive("rectangle", "Rectangle");
	// api.setFill(primId, false);
	// api.setStroke(primId, true);

	/**
	 * Returns `true` if a layer has a Fill.
	 * @param layerId
	 */
	function hasFill(layerId: string): boolean

	// var primId = api.primitive("rectangle", "Rectangle");
	// console.log(api.hasFill(primId));

	/**
	 * Gets the bounding box of the specified layer.
	 * @param layerId
	 * @param worldSpace
	 */
	function getBoundingBox(
		layerId: string,
		worldSpace: boolean
		// TODO: Create interface?
	): { x: float; y: float; width: float; height: float }

	// var primId = api.primitive("polygon", "My Polygon");
	// var bbox = api.getBoundingBox(primId, true);
	// console.log(JSON.stringify(bbox));

	// Working with Attributes

	/**
	 * This will return an array containing the paths of the selected attributes.
	 */
	function getSelectedAttributes(): [string, string][]

	// var selAttr = api.getSelectedAttributes();
	// for (const [layerId, attr] of selAttr) {
	//     console.log(layerId+"."+attr);
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 * @param arguments
	 */
	function set(layerId: string, arguments: object)

	// // Create a Rectangle and set its Size, Position, Rotation and Fill Color
	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.set(primId, {"generator.dimensions":[100,370], "position": [100, 200], "rotation": 50, "material.materialColor": "#8dc429"});

	// // Create a Text Shape and set its Font Family and Style
	// var textId = api.create("textShape", "My Text");
	// api.set(textId, {"font":{"font":"Arial", "style":"Bold"}});

	// // Collapse the hierarchy of a layer
	// api.set("basicShape#1", {"hierarchy": false});

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	// TODO: Return type depends on `attrId`
	function get(layerId: string, attrId: string): any

	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.set(primId, {"material.materialColor": "#8dc429", "generator.dimensions":[100,370], "rotation": 50, "position": [100, 200]});
	// var obj = api.get(primId, "position");
	// console.log(JSON.stringify(obj))

	/**
	 * Some layers in Cavalry contain Generators, these are discrete feature blocks that are used to extend the functionality of layers. For example the Basic Shape layer has a Generator to determine the shape it creates (e.g Ellipse, Rectangle...). You can set Generators with this function.
	 * @param layerId
	 * @param attrId
	 * @param type
	 */
	function setGenerator(layerId: string, attrId: string, type: string)

	// // Create an Ellipse and set it up
	// var ellipseId = api.primitive("ellipse", "Ellipse");
	// api.set(ellipseId, {"generator.radius.x": 10, "generator.radius.y": 10, "hidden": true});
	// // Create a Duplicator
	// var duplicatorId = api.create("duplicator", "Duplicator");
	// // Connect the Ellipse to the Duplicator
	// api.connect(ellipseId, "id", duplicatorId, "shapes");
	// // Change the Distribution on the Duplicator to a Custom Distribution
	// api.setGenerator(duplicatorId, "generator", "circleDistribution");
	// // Set the Distribution count
	// api.set(duplicatorId, {"generator.count": 10});

	/**
	 * Some layers in Cavalry contain Generators, these are discrete feature blocks that are used to extend the functionality of layers. For example the Basic Shape layer has a Generator to determine the shape it creates (e.g Ellipse, Rectangle). You can list the Generators on a layer with this command.
	 * @param layerId
	 */
	function getGenerators(layerId: string)

	// var layerId = api.create("connectShape", "Connect Shape");
	// var generatorId = api.getGenerators(layerId);
	// for (gId of generatorId) {
	//     console.log(gId);
	// }

	/**
	 * Returns the current Generator type (that can be used with setGenerator).
	 * @param layerId
	 */
	function getCurrentGeneratorType(layerId: string)

	// var ellipseId = api.primitive("ellipse", "My Ellipse")
	// console.log(api.getCurrentGeneratorType(ellipseId, "generator"))

	/**
	 * Set an attribute expression, this will take whatever the input value is in the expression, and manipulate it in some way (multiply, add to it etc.).
	 * @param layerId
	 * @param attrId
	 * @param expression
	 */
	function setAttributeExpression(
		layerId: string,
		attrId: string,
		expression: string
	)

	// var rectId = api.primitive("rectangle", "My Rectangle");
	// api.set(rectId, {"position.x": 300});

	// var starId = api.primitive("star", "Star");
	// api.set(starId, {"position.x": -300});

	// Connect the result of the Star to the Rectangle
	// api.connect(starId, "position.y", rectId, "position.y");

	// Add an attribute expression
	// api.setAttributeExpression(rectId, "position.y", "*2");
	//api.setAttributeExpression(rectId, "position.y", "%50");
	//api.setAttributeExpression(rectId, "position.y", "clamp(-45, value, 45)");
	//api.setAttributeExpression(rectId, "position.y", "sqrt(value)");

	// Power the stars movement with an Oscillator
	// var oscillatorId = api.create("oscillator", "Oscillator");
	// api.set(oscillatorId, {"strength": 1500});

	// api.connect(oscillatorId, "id", starId, "position.y");
	// api.play();

	/**
	 * Connect one layer to another. When you want to connect the result of a Layer (the output), you connect the id connection.
	 * @param fromLayerId
	 * @param fromAttrId
	 * @param toLayerId
	 * @param toAttrId
	 */
	function connect(
		fromLayerId: string,
		fromAttrId: string,
		toLayerId: string,
		toAttrId: string
	)

	// var textId = api.create("textShape", "Text");
	// var pathfinderId = api.create("pathfinder", "Pathfinder");
	// var starId = api.primitive("star", "Star");
	// api.set(starId, {"generator.radius": 300});
	// // Connect the result of the Star to the Pathfinder
	// api.connect(starId, "id", pathfinderId, "inputShape");
	// // Connect the result of the Pathfinder to the Text.Position
	// api.connect(pathfinderId, "id", textId, "position");

	/**
	 * TODO: Description
	 * @param fromLayerId
	 * @param fromAttrId
	 * @param toLayerId
	 * @param toAttrId
	 */
	function disconnect(
		fromLayerId: string,
		fromAttrId: string,
		toLayerId: string,
		toAttrId: string
	)

	// var primId = api.primitive("rectangle", "Rectangle");
	// var oscillatorId = api.create("oscillator", "Oscillator");
	// api.connect(oscillatorId, "id", primId, "rotation");
	// console.log(api.getInConnection(primId, "rotation"));
	// api.disconnect(oscillatorId, "id", primId, "rotation");
	// console.log(api.getInConnection(primId, "rotation"));

	/**
	 * Returns an empty string if there's no input on the Attribute in question.
	 * @param layerId
	 * @param attrId
	 */
	function getInConnection(layerId: string, attrId: string): string

	// var primId = api.primitive("rectangle", "Rectangle");
	// var oscillatorId = api.create("oscillator", "Oscillator");
	// api.connect(oscillatorId, "id", primId, "rotation");
	// console.log(api.getInConnection(primId, "rotation"));

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function getOutConnections(layerId: string, attrId: string): string[]

	/**
	 * This returns the selected keyframes as an enumerable string-keyed object. Each string is an attribute path, and each key is an array of frame numbers on which a keyframe resides.
	 */
	function getSelectedKeyframes(): object
	// TODO: Create interface
	// {
	// 	"basicShape#3.pivot.x": [33,1],
	// 	"basicShape#6.pivot.y": [1],
	// 	"basicShape#6.skew.x": [1]
	// }

	// let selKeys = api.getSelectedKeyframes();
	// for (const [key, value] of Object.entries(selKeys)) {
	//     console.log(key+": "+value);
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 * @param frame
	 * @param value
	 */
	function keyframe(
		layerId: string,
		frame: integer,
		value: { [key: string]: number }
	)

	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.keyframe(primId, 0, {"scale.x": 5.});
	// api.keyframe(primId, 100, {"scale.x": 1.});

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 * @param keyframe
	 */
	function deleteKeyframe(layerId: string, attrId: string, keyframe: integer)

	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.keyframe(primId, 0, {"scale.x": 5.});
	// api.keyframe(primId, 50, {"scale.x": 7.});
	// api.keyframe(primId, 100, {"scale.x": 1.});
	// api.deleteKeyframe(primId, "scale.x", 50);

	/**
	 * Modify the keyframe time (frame number) or value. The supplied object must include a `frame: integer` key, in addition to this it can also include:
	 * @param layerId
	 * @param data
	 */
	function modifyKeyframe(layerId: string, data: object)
	// TODO: Add as part of above object interface
	// frame integer
	// newFrame integer? // Specify a new frame for the keyframe (optional).
	// newValue float? // Specify a new value for the keyframe (optional).
	// TODO: Should provide an enum
	// type // The keyframe type as an integer 0 Bezier, 1 Linear, 2 Step (optional).

	// Example of modifying keyframe values and frames:

	// var primId = api.primitive("rectangle", "My Rectangle");
	// api.keyframe(primId, 0, {"scale.x": 5.});
	// api.keyframe(primId, 100, {"scale.x": 1.});
	// api.modifyKeyframe(primId, {"scale.x": {"frame": 0, "newValue": 3.5, "newFrame": 10}});

	// Example of setting all keyframes to step interpolation.

	// let ellipseId = api.primitive("ellipse", "Ellipse");
	// // Create some values to set as keyframes
	// let keyValues = [-200,200,-300, 300]
	// let keyTime = 0;
	// // Set some keyframes for us to modify
	// for (let value of keyValues) {
	//     api.keyframe(ellipseId, keyTime, {"position.x":value});
	//     keyTime+=40;
	// }

	// // Get the keyframe times
	// let times = api.getKeyframeTimes("basicShape#1","position.x")
	// for (let frame of times) {
	//     // Set the keyframes to step interpolation
	//     api.modifyKeyframe(ellipseId, {"position.x":{"frame": frame, "type":2}});
	// }

	/**
	 * Modify the keyframe tangents. The supplied object must include a `frame` key, in addition to this it can also include. Both the in and out handle will be affected by default, unless you specify a handle to affect and the handles are not weight and angle locked.
	 * @param layerId
	 * @param data
	 */
	function modifyKeyframeTangent(layerId: string, data: object)
	// TODO: Create interface for object
	// frame: integer?
	// inHandle: boolean // An optional boolean value stating if you want the inHandle to be affected.
	// outHandle: boolean // An optional boolean value stating if you want the outHandle to be affected.
	// angleLocked: boolean // Boolean stating if the key tangents are angle locked or not (optional)..
	// weightLocked: boolean // Boolean stating if the key tangents are weight locked or not (optional)..
	// angle: integer // Set a new angle for the keyframe tangent, 0 is flat (optional).
	// weight: ? // Set a new weight for the keyframe tangent (optional).

	// Example setting flat keyframes:

	// // Make a new ellipse
	// let ellipseId = api.primitive("ellipse", "Ellipse");
	// // Create some values to set as keyframes
	// let keyValues = [-200,200,-300, 300]
	// let keyTime = 0;
	// // Set some keyframes for us to modify
	// for (let value of keyValues) {
	//     api.keyframe(ellipseId, keyTime, {"position.x":value});
	//     keyTime+=40;
	// }

	// // Get the keyframe times
	// let times = api.getKeyframeTimes(ellipseId,"position.x")
	// for (let frame of times) {
	//     // Modify the tangents, giving them all a weight of 20 and an angle of 0 (flat)
	//     api.modifyKeyframeTangent(ellipseId, {"position.x":{"angle":0, "frame": frame, "weight":20}});
	// }

	// Example breaking tangents and weighting the outHandles.

	// // Make a new ellipse
	// let ellipseId = api.primitive("ellipse", "Ellipse");
	// // Create some values to set as keyframes
	// let keyValues = [-200,200,-300, 300]
	// let keyTime = 0;
	// // Set some keyframes for us to modify
	// for (let value of keyValues) {
	//     api.keyframe(ellipseId, keyTime, {"position.x":value});
	//     keyTime+=40;
	// }

	// // Get the keyframe times
	// let times = api.getKeyframeTimes(ellipseId, "position.x")
	// for (let frame of times) {
	//     // Set the handles to bezier, but with a weight of 0 (so that we can then adjust one handle out)
	//     api.modifyKeyframeTangent(ellipseId, {"position.x":{"angleLocked": false, "weightLocked": false, "frame": frame, "weight":0}});
	//     // Now weight just the out handles
	//     api.modifyKeyframeTangent(ellipseId, {"position.x":{"frame": frame, "weight":20, "outHandle": true, "inHandle": false}});
	// }

	/**
	 * Apply Magic Easing to a new or existing keyframe.
	 * @param layerId
	 * @param attrId
	 * @param frame
	 * @param easingName
	 */
	function magicEasing(
		layerId: string,
		attrId: string,
		frame: integer,
		easingName: string
	)

	// api.magicEasing("basicShape#1", "position.x", 25, "SlowIn");

	// TODO: Valid Magic Easing names are:
	// "SlowIn"
	// "SlowOut"
	// "SlowInSlowOut"
	// "VerySlowIn"
	// "VerySlowOut"
	// "VerySlowInVerySlowOut"
	// "SpringIn"
	// "SpringOut"
	// "SpringInSpringOut"
	// "SmallSpringIn"
	// "SmallSpringOut"
	// "SmallSpringInSmallSpringOut"
	// "AnticipateIn"
	// "OvershootOut"
	// "AnticipateInOvershootOut"
	// "BounceIn"
	// "BounceOut"
	// "BounceInBounceOut"

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function getKeyframeTimes(layerId: string, attrId: string)

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function deleteAnimation(layerId: string, attrId: string)

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function getAttrType(layerId: string, attrId: string): string

	// Get the data type of the Attribute
	// var layerId = api.create("javaScript", "JS Layer");
	// api.addDynamic(layerId, "array", "string");
	// console.log(api.getAttrType(layerId, "array.1"));

	/**
	 * Reset an Attribute back to its default value.
	 * @param layerId
	 * @param attrId
	 */
	function resetAttribute(layerId: string, attrId: string)

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function addArrayIndex(layerId: string, attrId: string): integer

	// Add a new child to an array Attribute.
	// var arrayId = api.create("valueArray", "My Value Array");
	// api.addArrayIndex(arrayId, "array")
	// api.addArrayIndex(arrayId, "array")
	// api.set(arrayId, {"array.0": 10, "array.1": 20, "array.2": 30});

	/**
	 * Remove an Attribute from an array
	 * @param layerId
	 * @param attrId
	 */
	function removeArrayIndex(layerId: string, attrId: string)

	/**
	 * Return the number of Attributes in the array
	 * @param layerId
	 * @param attrId
	 */
	function getArrayCount(layerId: string, attrId: string): integer

	// var arrayId = api.create("valueArray", "My Value Array");
	// api.addArrayIndex(arrayId, "array")
	// api.addArrayIndex(arrayId, "array")
	// console.log(api.getArrayCount(arrayId, "array"));

	/**
	 * Add a Dynamic attribute to a layer. Dynamic attributes are a special kind of Array Attribute in that they can be of different types. Only certain special layers can have dynamic attributes added to them, for example the JavaScript layer. Once added you can rename these attributes by using the `api.renameAttribute()` command. The name of the attribute is used in the JavaScript execution, and in the UI, but getting and Setting these attributes is done by index - not the Attribute name.
	 * @param layerId
	 * @param attrId
	 * @param type
	 */
	function addDynamic(layerId: string, attrId: string, type: string)

	// var layerId = api.create("javaScript", "JS Layer");
	// api.addDynamic(layerId, "array", "double");
	// api.addDynamic(layerId, "array", "boolean");
	// api.addDynamic(layerId, "array", "string");
	// api.addDynamic(layerId, "array", "int2");
	// api.addDynamic(layerId, "array", "double2");
	// api.addDynamic(layerId, "array", "color");

	// /// an example of setting and getting a Dynamic Attribute
	// var layerId = api.create("javaScript", "JS Layer");
	// api.addDynamic(layerId, "array", "double");
	// api.set(layerId, {"array.1": 10});
	// var value = api.get(layerId, "array.1");
	// console.log(value);

	/**
	 * Rename dynamic or array Attributes. Array Attributes can be found on the Array Utilities such as 'Color Array'. Dynamic Attributes can be found for example on the JavaScript layer. Dynamic Attributes are the Attributes that you need to choose a type for when adding them.
	 * @param layerId
	 * @param attrId
	 * @param newName
	 */
	function renameAttribute(layerId: string, attrId: string, newName: string)

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getOutConnectedAttributes(layerId: string)

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getInConnectedAttributes(layerId: string)

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getAttributes(layerId: string): string[]

	// var layerId = api.create("null", "My Null");
	// var attrIds = api.getAttributes(layerId);
	// for (aId of attrIds) {
	//     console.log(aId);
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getAnimatedAttributes(layerId: string): string[]

	// var layerId = api.create("null", "My Null");
	// api.keyframe(layerId, 0, {"scale.x": 5.});
	// api.keyframe(layerId, 100, {"scale.x": 1.});
	// var attrIds = api.getAnimatedAttributes(layerId);
	// for (aId of attrIds) {
	//     console.log(aId);
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function isAnimatedAttribute(layerId: string, attrId: string): boolean

	// var layerId = api.create("null", "My Null");
	// api.keyframe(layerId, 0, {"scale.x": 5.});
	// api.keyframe(layerId, 100, {"scale.x": 1.});
	// console.log(api.isAnimatedAttribute(layerId, "scale.x"));

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getInFrame(layerId: string): integer

	// var sel = api.getSelection();
	// for (let layerId of sel) {
	//     console.log(api.getInFrame(layerId));
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 * @param frame
	 */
	function setInFrame(layerId: string, frame: integer)

	/**
	 * TODO: Description
	 * @param layerId
	 */
	function getOutFrame(layerId: string): integer

	// var sel = api.getSelection();
	// for (let layerId of sel) {
	//     console.log(api.getOutFrame(layerId));
	// }

	/**
	 * TODO: Description
	 * @param layerId
	 * @param frame
	 */
	function setOutFrame(layerId: string, frame: integer)

	/**
	 * Sets a preset for a Graph Attribute. The `presetIndex` can be 0: s-curve, 1: ramp, 2: linear, 3: flat
	 * @param layerId
	 * @param attrId
	 * @param presetIndex
	 */
	function graphPreset(
		layerId: string,
		attrId: string,
		presetIndex: 0 | 1 | 2 | 3
	)

	/**
	 * Flips the points on a Graph Attribute - valid `direction` arguments are "horizontal" and "vertical".
	 * @param layerId
	 * @param attrId
	 * @param direction
	 */
	function flipGraph(
		layerId: string,
		attrId: string,
		direction: 'horizontal' | 'vertical'
	)

	// let staggerId = api.create("stagger", prefix+"Stagger");
	// api.flipGraph(staggerId, "graph", "vertical");

	// Shapes

	/**
	 * Centre the Pivot of the specified layer. If `centroid` is `true` the Pivot will be moved to the centre of mass.
	 * @param layerId
	 * @param centroid
	 */
	function centrePivot(layerId: string, centroid: boolean)

	/**
	 * Freeze the transform (position, rotation, scale, pivot, skew) of the specified layer. For example you can use this if you want to make a Shape's current position its zero position.
	 * @param layerId
	 */
	function freezeTransform(layerId: string)

	/**
	 * Reset a Shape's transform back to the default state (this will also clear any frozen transformations).
	 * @param layerId
	 */
	function resetTransform(layerId: string)

	/**
	 * Copy the selected Shape(s) as code. The resulting code can be pasted into a new tab and run to create a new Editable Shape based on those copied.
	 */
	function getDrawInstructionsForSelection()

	// var path = api.getDrawInstructionsForSelection();
	// console.log(path);

	// Editable Shapes
	/**
	 * This will convert the selected Shape into an Editable Shape, which you can then edit with the getEditablePath and setEditablePath functions. If makeACopy is set to false the original layer will be deleted.
	 * @param layerId
	 * @param makeACopy
	 */
	function makeEditable(layerId: string, makeACopy: boolean): string

	// var primId = api.primitive("ellipse", "Ellipse");
	// var editableId = api.makeEditable(primId, false);

	/**
	 * This function returns an Editable Path object which you can edit and then set back to any Editable Shape layer.
	 * @param layerId
	 * @param worldSpace
	 */
	function getEditablePath(layerId: string, worldSpace: boolean): object

	// TODO: Create interface
	// Editable Paths and ordinary Paths (like the one in the Cavalry Module) are distinct. The worldSpace argument will determine if path point coordinates are returned in local (unaware of the Editable Shape's position, rotation and scale) or world space where those transformations are applied. An Editable Path's points have in handles and out handles just like the points you edit in the viewport. They also have weight and angle locking settings. Ordinary Paths construct paths using moveTo, lineTo and cubicTo for example. In an Editable Path, you just add an extra point to the Contour's points array. The schema is as follows:
	// [
	//   {
	//     "points": [
	//       {
	//         "position": {
	//           "x": 0.0,
	//           "y": 0.0
	//         },
	//         "outHandle": {
	//           "x": 0.0,
	//           "y": 0.0,
	//           "selected": boolean
	//         },
	//         "inHandle": {
	//           "x": 0.0,
	//           "y": 0.0,
	//           "selected": boolean
	//         },
	//         "weightLocked": boolean,
	//         "angleLocked": boolean,
	//         "selected": boolean
	//       }
	//     ],
	//     "isClosed": boolean
	//   }
	// ]

	// The inHandle and outHandle objects are optional (when they are missing a linear point will be created). Values marked boolean need to be true or false.

	// var multiplier = 1.5;
	// var primId = api.primitive("ellipse", "Ellipse");
	// var editableId = api.makeEditable(primId, false);

	// let path = api.getEditablePath(editableId, false);
	// for (let contour of path) {
	//     for (let point of contour.points) {
	//         point.inHandle.x *= multiplier;
	//         point.outHandle.x *= multiplier;
	//         point.inHandle.y *= multiplier;
	//         point.outHandle.y *= multiplier;
	//     }
	// }
	// api.setEditablePath(editableId, path);

	/**
	 * This will set the Editable Path on an Editable Shape. See getEditablePath for details on the Editable Path schema. The worldSpace argument will determine if you set path point coordinates in local (unaware of the Editable Shape's position, rotation and scale) or world space where those transformations are applied. If you get the Editable Path in world space, you should also set it in world space.
	 * @param layerId
	 * @param worldSpace
	 * @param pathObject
	 */
	function setEditablePath(
		layerId: string,
		worldSpace: boolean,
		pathObject: object
	)

	// This example will flatten the selected bezier points to 0 on the Y axis.

	// var sel = api.getSelection();

	// for (let layerId of sel) {
	//     if (api.getLayerType(layerId) != "editableShape") {
	//         continue;
	//     }
	//     let path = api.getEditablePath(layerId, true);
	//     for (let contour of path) {
	//         for (let point of contour.points) {
	//             if (!point.selected) {
	//                 continue;
	//             }
	//             point.position.y = 0;
	//             point.inHandle.y = 0;
	//             point.outHandle.y = 0;
	//         }
	//     }
	//     api.setEditablePath(layerId, true, path);
	// }

	/**
	 * This will make the selected point the first point in an Editable Path. This is like running the command in the Shape menu.
	 * @param layerId
	 */
	function makeFirstPoint(layerId: string)

	/**
	 * Move selected points by given X and Y values.
	 * @param x
	 * @param y
	 * @param localSpace
	 */
	function movePoint(x: float, y: float, localSpace: boolean)

	// //select some editable points
	// api.movePoint(0,50, true);

	/**
	 * Move selected points to given X and Y positions. Values in the positionObject are optional, i.e {"x":20} and {"x":20, "y":50} are both valid. Use the handles argument to specify if in/out handles should be moved instead of the point. To move both, run the command twice with handles set to true and false.
	 * @param positionObject
	 * @param localSpace
	 * @param handles
	 */
	function setPointPosition(
		positionObject: object,
		localSpace: boolean,
		handles: boolean
	)

	// //select some editable points
	// api.setPointPosition({"y":-50}, false, false)
	// api.setPointPosition({"y":-50}, false, true)

	// Rendering

	/**
	 * TODO: Description
	 * @param renderQueueItemId
	 */
	function render(renderQueueItemId: string)

	// auto itemId = api.addRenderQueueItem(api.getActiveComp());
	// api.render(itemId);

	/**
	 * TODO: Description
	 */
	function renderAll()

	// api.addRenderQueueItem(api.getActiveComp());
	// api.renderAll();

	/**
	 * Render the current frame out as a PNG with a given scale set by scalePercent. Rendering in this way will only render the visible layers (i.e any soloed layers). The render extension (.png) will be added to the filename for you.
	 * @param filePath
	 * @param scalePercent
	 */
	function renderPNGFrame(filePath: string, scalePercent: float)

	// // This example will export each selected layer individually as a PNG at 100% and 200% scale.
	// // Get the selection
	// let sel = api.getSelection();
	// for (let layerId of sel) {
	//     // Solo each layer
	//     api.soloLayers([layerId]);
	//     // Build a file path to export the render to
	//     let filePath = api.getRenderPath() + "/" + api.getNiceName(layerId);
	//     // Render out the image at 100% scale.
	//     api.renderPNGFrame(filePath, 100);
	//     // Add @2x to the file path
	//     filePath += "@2x";
	//     // Render out at 200% scale.
	//     api.renderPNGFrame(filePath, 200);
	//     // Log where we put the file
	//     console.log("Rendered layer: "+layerId+" to: "+filePath+".png");
	// }
	// // Clear soloing
	// api.soloLayers([]);

	/**
	 * Render the current frame out as an SVG with a given scale set by scalePercent. Setting skipComps to true will mean that Composition backgrounds do not get exported. Rendering in this way will only render the visible layers (i.e any soloed layers). The render extension (.svg) will be added to the filename for you.
	 * @param filePath
	 * @param scalePercent
	 * @param skipComps
	 */
	function renderSVGFrame(
		filePath: string,
		scalePercent: float,
		skipComps: boolean
	)

	/**
	 * TODO: Description
	 */
	function getRenderQueueItems(): string[]

	// api.addRenderQueueItem(api.getActiveComp());
	// api.addRenderQueueItem(api.getActiveComp());
	// var items = api.getRenderQueueItems();
	// for (var item of items) {
	//   console.log(item);
	// }

	/**
	 * TODO: Description
	 */
	// TODO: Define allowed objects
	function addRenderQueueItem(comp: object): string

	// var itemId = api.addRenderQueueItem(api.getActiveComp());
	// console.log(itemId);

	/**
	 * TODO: Description
	 * @param layerId
	 * @param attrId
	 */
	function connectDynamicIndex(layerId: string, attrId: string)

	// var spreadsheetId = api.create("spreadsheet", "My Spreadsheet");
	// api.connectDynamicIndex(spreadsheetId, "rowIndex");
	// api.set(spreadsheetId, {"useFixedRow": true});

	/**
	 * TODO: Description
	 */
	function getDynamicIndex(): integer

	// console.log(api.getDynamicIndex());

	// Working with the Scene

	/**
	 * Open a Scene at the given location, this may present a Save Changes dialog unless force is set to `true`.
	 * @param filePath
	 * @param force
	 */
	function openScene(filePath: string, force: boolean)

	/**
	 * Save the current Scene to a new location.
	 * @param filePath
	 */
	function saveSceneAs(filePath: string)

	/**
	 * Save the current Scene file. If the current Scene has not yet been saved, a dialog will be presented asking where to save the scene.
	 */
	function saveScene()

	/**
	 * Load an asset with the given path. Set `isSequence` to `true` if you want Cavalry to attempt to load an image sequence from the file path.
	 * @param path
	 * @param isSequence
	 */
	function loadAsset(path: string, isSequence: boolean)

	// // Load an image
	// api.loadAsset("/Path/To/image.png", false);

	// // Load an image sequence
	// api.loadAsset("/Path/To/sequence.00000.png", true);

	/**
	 * Reloads an Asset with the given `assetId`
	 * @param assetId
	 */
	function reloadAsset(assetId: string)

	// // First load an Asset, then run:
	// api.reloadAsset("asset#2");

	/**
	 * Replace a file asset (e.g an image or CSV file).
	 * @param assetId
	 * @param newPath
	 */
	function replaceAsset(assetId: string, newPath: string)

	/**
	 * Given a Text Asset (which is a `.json` file) or a Spreadsheet Asset, get the JSON object that Asset represents.
	 * @param assetId
	 */
	function jsonFromAsset(assetId: string): object

	// For the following example, first select a Text Asset (a JSON file imported into Cavalry).

	// let sel = api.getSelection();
	// if (sel.length) {
	//     if (api.getLayerType(sel[0]) == "asset") {
	//         let data = api.jsonFromAsset(sel[0]);
	//         console.log(Object.keys(data).length);
	//     }
	// }

	// It's also possible to use jsonFromAsset to query a .csv asset. CSV Assets will contain three members. rows will give you access to the row data. min will give you access to the minimum value of the column (if there is one), and max will give the maximum value.

	// // Return the first entry in the 'Text' column of a .csv asset (asset#2)
	// const csv = api.jsonFromAsset("asset#2");
	// const text = csv["Text"].rows[0]
	// console.log(text);

	/**
	 * Given a Text Asset, get the raw string that Asset represents.
	 * @param assetId
	 */
	function textFromAsset(assetId: string): string

	/**
	 * Load a Google Sheet Asset. If the `sheetId` argument is left blank then the first sheet will be loaded. This function returns the newly created assetId.
	 * @param spreadsheetId
	 * @param sheetId
	 */
	function loadGoogleSheet(spreadsheetId: string, sheetId: string)

	// The spreadsheetId and sheetId can be extracted from a Google Sheet's URL:
	// https://docs.google.com/spreadsheets/d/[spreadsheetId]/edit#gid=[sheetId]

	/**
	 * TODO: Description
	 * @param path
	 */
	function setProject(path: string)

	/**
	 * TODO: Description
	 */
	function clearProject()

	/**
	 * Returns the currently active (open) Composition's id. You can then use this to set Composition settings such as resolution and frame range.
	 */
	function getActiveComp(): string

	// console.log(api.getActiveComp());

	/**
	 * Returns an array containing all the Compositions in the Scene.
	 */
	function getComps(): string[]

	// let newCompId = api.createComp("Shiny New Comp");
	// let allComps = api.getComps();
	// for (let compId of allComps) {
	//     console.log(compId);
	// }

	/**
	 * Create a new composition and return its id.
	 * @param niceName
	 */
	function createComp(niceName: string): string

	// api.createComp("Shiny New Comp");

	/**
	 * Set the currently active composition.
	 * @param compId
	 */
	function setActiveComp(compId: string)

	// let newCompId = api.createComp("Shiny New Comp");
	// api.setActiveComp(newCompId);

	/**
	 * Take the current selection, create a Composition based on it, and then reference that new Composition into the active Composition. The result is the layerId of the newly created Composition Reference. To get the compId of the Composition itself, use getCompFromReference.
	 * @param name
	 */
	function preCompose(name: string): string

	// // Create two Shapes.
	// var shape1 = api.primitive("superEllipse", "Super Ellipse");
	// var shape2 = api.primitive("rectangle", "Rectangle");
	// // Select them both.
	// api.select([shape1, shape2]);
	// // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
	// api.preCompose("New Pre-Comp");

	/**
	 * Given the `layerId` of a Composition Reference, get the `compId` of the Composition it references from the Assets Window.
	 * @param layerId
	 */
	function getCompFromReference(layerId: string): string

	// // Create a Shape and select it.
	// var shape1 = api.primitive("superEllipse", "Super Ellipse");
	// api.select([shape1]);
	// // Add the selection to a Pre-Comp (Composition Reference) called 'New Pre-Comp'.
	// var preCompId = api.preCompose("New Pre-Comp");
	// // Rename the Composition in the Assets Window to match.
	// var compId = api.getCompFromReference(preCompId);
	// api.set(compId, {"niceName": "New Pre-Comp"});

	/**
	 * Create a Composition Reference from an existing Composition and add it to the active Composition.
	 * @param compId
	 */
	function createCompReference(compId: string): string

	// let newCompId = api.createComp("Shiny New Comp");
	// api.createCompReference(newCompId);

	/**
	 * Set the currently active composition.
	 * @param compId
	 */
	function setActiveComp(compId: string)

	// let newCompId = api.createComp("Shiny New Comp");
	// api.setActiveComp(newCompId);

	/**
	 * This will return an array of all the layers in the Asset Window. If `topLevel` is true then only the top level layers will be returned.
	 * @param topLevel
	 */
	function getAssetWindowLayers(topLevel: boolean): string[]

	// let assetLayerIds = api.getAssetWindowLayers(false);
	// for (let alId of assetLayerIds) {
	//     console.log(alId);
	// }

	/**
	 * Return the asset type (i.e image, audio, spreadsheet, movie, svg).
	 * @param assetId
	 */
	function getAssetType(assetId: string): string

	// // First load an Asset, then run:
	// console.log(api.getAssetType("asset#2"));

	/**
	 * Get the file path of a file asset such as a spreadsheet, image, or font.
	 * @param assetId
	 */
	function getAssetFilePath(assetId: string): string

	// var assets = api.getAssetWindowLayers(false);
	// for (let assetId of assets) {
	//     let type = api.getAssetType(assetId);
	//     if (type != "unknown") {
	//         let filePath = api.getAssetFilePath(assetId);
	//         console.log("Checking: "+filePath+" of type "+type+" exists: "+api.filePathExists(filePath));
	//     }
	// }

	/**
	 * Create a Group in the Assets Window, this will return the `layerId` of the new Group.
	 * @param niceName
	 */
	function createAssetGroup(niceName: string): string

	// api.createAssetGroup("My Asset Group");

	/**
	 * This will solo the `layerIds` supplied in the array argument.
	 * @param layerIds
	 */
	function soloLayers(layerIds: string[])

	// // This example will export each selected layer individually as a PNG at 100% and 200% scale.
	// // Get the selection
	// let sel = api.getSelection();
	// for (let layerId of sel) {
	//     // Solo each layer
	//     api.soloLayers([layerId]);
	//     // Build a file path to export the render to
	//     let filePath = api.getRenderPath() + "/" + api.getNiceName(layerId);
	//     // Render out the image at 100% scale.
	//     api.renderPNGFrame(filePath, 100);
	//     // Add @2x to the file path
	//     filePath += "@2x";
	//     // Render out at 200% scale.
	//     api.renderPNGFrame(filePath, 200);
	//     // Log where we put the file
	//     console.log("Rendered layer: "+layerId+" to: "+filePath+".png");
	// }
	// // Clear soloing
	// api.soloLayers([]);

	// Files and Paths

	// Files and paths are absolute, use the methods in this section as the base path if you want to build paths relative to your project. If you're building a UI script you will have access to the `ui.scriptLocation` variable, which will allow you to build paths relative to your script.

	/**
	 * This will load and run a JavaScript file, thus making the functions contained within it available for you to use in your current script. This is not a module loader. Scripts loaded in this way are not placed into a namespace/module and are free functions/objects.
	 * @param filePath
	 */
	function load(filePath: string): boolean

	// // Contents of script.js
	// function helloWorld() {
	//     console.log("Hello World.");
	// }

	// // Then in Cavalry
	// api.load("path/to/script.js");
	// helloWorld();

	/**
	 * Gets the Project path (if a Project is set). This path does not include a trailing `/`
	 */
	function getProjectPath(): string

	// console.log(api.getProjectPath());

	/**
	 * Gets the Render path (if a Project is set). This path does not include a trailing `/`
	 */
	function getRenderPath(): string

	// console.log(api.getRenderPath());

	/**
	 * Gets the Project Asset path (if a Project is set). This path does not include a trailing `/`
	 */
	function getAssetPath(): string

	// console.log(api.getAssetPath());

	/**
	 * Gets the Scene's path (if a Project is set). This path does not include a trailing `/`
	 */
	function getScenesPath(): string

	// console.log(api.getScenesPath());

	/**
	 * If the current Scene has been saved this will return its filepath, otherwise it will return an empty string.
	 */
	function getSceneFilePath(): string

	// console.log(api.getSceneFilePath());

	/**
	 * Get the location of the Cavalry preferences folder.
	 */
	function getPreferencesPath(): string

	// console.log(api.getPreferencesPath());

	/**
	 * This will return whether a path to a file or folder exists.
	 * @param path
	 */
	function filePathExists(path: string): boolean

	// console.log(api.filePathExists(api.getPreferencesPath()));

	/**
	 * This will return the file name from a path.
	 * @param path
	 */
	function getFileNameFromPath(path: string): string

	// /// will return `here`
	// console.log(api.getFileNameFromPath("some/thing/here.png"));

	/**
	 * This will return the extension of a file.
	 * @param path
	 */
	function getExtensionFromPath(path: string): string

	// /// will return `.png`
	// console.log(api.getFileNameFromPath("some/thing/here.png"));

	/**
	 * This will return the containing folder of a file.
	 * @param path
	 */
	function getFolderFromPath(path: string): string

	// /// will return `some/thing`
	// console.log(api.getFileNameFromPath("some/thing/here.png"));

	/**
	 * This will create a folder at the location given in path and return if the operation was a success.
	 * @param path
	 */
	function makeFolder(path: string): boolean

	/**
	 * Get the location of the App Assets (this is useful for accessing app icons for your scripts).
	 */
	function getAppAssetsPath(): string

	// console.log(api.getAppAssetsPath());

	/**
	 * Write a string to a file. Returns if the write was successful. You cannot write binary data from this API, for that, please use `writeEncodedToBinaryFile`.
	 * @param filePath
	 * @param content
	 */
	function writeToFile(filePath: string, content: string): boolean

	// var primId = api.primitive("polygon", "My Polygon");
	// var obj = api.get(primId, "polyMesh");

	// var objContents = "#this exporter is incomplete and only works with QuickLook on macOS\n\n";
	// objContents += "o testShape\n\n";
	// var face = "f ";

	// var meshes = obj.meshes;
	// for (var mesh of meshes) {
	//     var index = 1; // obj face index starts at 1
	//     for (var pointData of mesh.path) {
	//         // 0 = moveTo and 1 = lineTo
	//         if (pointData.type == 0 || pointData.type == 1) {
	//           objContents+="v "+pointData.points[0].x.toFixed(4)+" "+pointData.points[0].y.toFixed(4)+"\n";
	//           face += index + " ";
	//         }
	//         ++index;
	//     }

	// }

	// objContents += "usemtl None\n"
	// objContents += "s off\n"
	// objContents += face;

	// // This line is commented out as you will need to provide a file path
	// //api.writeToFile("/some/folder/test.obj", objContents);

	/**
	 * Write an encoded string to a file. Returns if the write was successful. Please note, only files encoded using `encodeBinary` will be properly decoded.
	 * @param filePath
	 * @param content
	 */
	function writeEncodedToBinaryFile(
		filePath: string,
		content: string
	): boolean

	// var encoded = api.encodeBinary("/some/folder/original.png");
	// api.writeEncodedToBinaryFile("/some/folder/copy.png", encoded);

	/**
	 * Read a file as a string.
	 * @param filePath
	 */
	function readFromFile(filePath: string): string

	//// Please note this file path will need to point to a real file (e.g a .txt, .json, .csv, .obj etc., etc.)
	// var text = api.readFromFile("/some/folder/test.obj");
	// console.log(text);

	/**
	 * Read a binary file (like an image), and encode it into base64, this will allow you to store it as a variable in JavaScript for use later (i.e with `writeEncodedToBinaryFile`).
	 * @param filePath
	 */
	function encodeBinary(filePath: string): string

	// // Please note this file path will need to point to a real file (e.g a .png, .jpg etc., etc.)
	// var encoded = api.encodeBinary("/some/folder/test.png");
	// api.writeToFile("/some/folder/encoderDump.txt", encoded);

	// Utilities

	/**
	 * TODO: Description
	 * @param text
	 */
	function setClipboardText(text: string)

	// setClipboardText("Copy test from Cavalry");

	/**
	 * TODO: Description
	 */
	function getClipboardText(): string

	// api.setClipboardText("Copy test from Cavalry");
	// console.log(api.getClipboardText());

	/**
	 * This runs a system process and waits for the result which is returned as a string. GUI scripts that try to run this function will trigger a warning asking for users to trust the script. This is a blocking action, the UI will freeze until the process completes; for non blocking processes see runDetachedProcess below.
	 * Proceed with caution when running system processes to ensure scripts do not compromise system security.
	 * @param command
	 * @param arguments
	 */
	function runProcess(command: string, arguments: string[]): string

	// // macOS example
	// var res = api.runProcess("sh", ["-c", "python3 --version"]);
	// console.log(res);
	// // on Windows the command to run (first argument) would be "cmd.exe" or "path/to/powerShell.exe" and so forth.
	// var res = api.runProcess("cmd.exe", ["/c echo hello world"]);
	// console.log(res);

	/**
	 * This runs a system process in a separate thread. GUI scripts that try to run this function will trigger a warning asking for users to trust the script. This is a non-blocking action.
	 * caution Proceed with caution when running system processes to ensure scripts do not compromise system security.
	 * @param command
	 * @param arguments
	 */
	function runDetachedProcess(command: string, arguments: string[])

	// // macOS example
	// var res = api.runProcess("sh", ["-c", "python3 --version"]);
	// console.log(res);
	// // on Windows the command to run (first argument) would be "cmd.exe" or "path/to/powerShell.exe" and so forth.
	// var res = api.runProcess("cmd.exe", ["/c echo hello world"]);
	// console.log(res);

	/**
	 * TODO: Description + Opens files and folder when prefixed with `file:///`
	 * @param url
	 */
	function openURL(url: string): void

	// api.openURL("http://cavalry.scenegroup.co");
	// api.openURL("file:///Users/User/Desktop");

	/**
	 * Returns `true` if this is a GUI session of the app, and `false` if not (e.g the CLI is running).
	 */
	function isGuiSession(): boolean

	// console.log(api.isGuiSession());

	/**
	 * Get the current hardware platform. This will return either `macOS` or `Windows`
	 */
	function getPlatform(): string

	// console.log(api.getPlatform());
	// Simple get request.
	// // Make a new WebClient
	// var client = new api.WebClient("https://www.boredapi.com");
	// // Send the Get Request (this returns a random activity to do if you're bored).
	// client.get("/api/activity");
	// // Check it succceded
	// if (client.status() == 200) {
	//     let obj = JSON.parse(client.body());
	//     // Safety check, and print the activity
	//     if ('activity' in obj) {
	//         console.log("Random activity: "+obj.activity);
	//     }
	// }

	// Getting and saving an SVG file.

	// var client = new api.WebClient("https://cavalry.scenegroup.co");
	// client.get("/images/logo_cavalry-landscape-outline_001.svg");
	// if (client.status() == 200) {
	//     api.writeToFile("/Some/Path/Here/cavLogo.svg", client.body());
	// }

	/**
	 * Cavalry provides a way to interact with API endpoints on the web by creating
	 * a WebClient object and interacting with its methods to `get`, `post` or `put`.
	 * These API calls are blocking meaning they must successfully complete before
	 * progressing to the next part of a script.
	 *
	 * Further to the WebClient, Cavalry also provides a simple WebServer. You can
	 * call `/get` to retrieve whatever response you have set on the server, or,
	 * for those of an adventurous persuasion, you can use `/post`. To aid when using
	 * `/post` the WebServer can poll for new data and will fire a callback
	 * function when a data drop has been detected.
	 */
	class WebClient {
		/**
		 * Sets basic authentication for any subsequent requests.
		 * @param username
		 * @param password
		 */
		setBasicAuthentication(username: string, password: string)

		/**
		 * Sets digest authentication for any subsequent requests.
		 * @param username
		 * @param password
		 */
		setDigestAuthentication(username: string, password: string)

		/**
		 * Sets token based authentication for any subsequent requests.
		 * @param token
		 */
		setTokenAuthentication(token: string)

		/**
		 * Adds a header for any following requests. API keys, app keys, content types and so forth can be added in this way.
		 * @param key
		 * @param value
		 */
		addHeader(key: string, value: string)

		/**
		 * TODO: Description
		 */
		// TODO: Create interface
		getHeaders(): object
		// var client = new api.WebClient("https://www.boredapi.com");
		// client.get("/api/activity");
		// if (client.status() == 200) {
		//     let headers = client.getHeaders();
		//     for (const [key, value] of Object.entries(headers)) {
		//       console.log(`${key}: ${value}`);
		//     }
		// }

		/**
		 * Returns the status of the request. For example 200 means OK.
		 */
		status(): integer

		/**
		 * The returned body. This is often in the form of JSON but you can check the Content-Type header with getHeaders() if you're unsure.
		 */
		body(): string

		/**
		 * Peforms a get request. Once done, status() and if successful, body() should be available.
		 */
		get(path: string)

		/**
		 * Peforms a post request. Once done, status() and if successful, body() should be available.
		 */
		post(path: string, content: string, contentType: string)

		/**
		 * Peforms a put request. Once done, status() and if successful, body() should be available.
		 */
		put(path: string, content: string, contentType: string)

		/**
		 * A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies). Peforms a post request. Once done, status() and if successful, body() should be available.
		 */
		postFromFile(path: string, filePath: string, contentType: string)

		/**
		 * A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies). Peforms a put request. Once done, status() and if successful, body() should be available.
		 */
		putFromFile(path: string, filePath: string, contentType: string)

		/**
		 * If get has been used to retrieve binary data (i.e an image or a movie), this cannot be passed to the usual api.writeToFile() call. You must instead use this function to write the body data to file (which you can then pull into Cavalry as an Asset for example).
		 */
		writeBodyToBinaryFile(path: string)
	}

	/**
	 * A complete example of a UI script which implements a Cavalry Server. Please save this into the Cavalry Scripts folder Help > Scripts and then load it via the Window > Scripts menu.
	 */
	class WebServer {
		// var server = new api.WebServer();
		// var button = new ui.Button("Start Server");
		// button.onClick = function () {
		//     if (!server.isRunning()) {
		//         server.listen("localhost", 1234);
		//         button.setText("Stop Server");
		//     } else {
		//         server.stop();
		//         button.setText("Start Server");
		//     }
		// }

		// function Callbacks() {
		//     this.onPost = function () {
		//         console.log("Queue length: "+server.postCount());
		//         processButton.setEnabled(true);
		//     }
		// }

		// var processButton = new ui.Button("Process Posts");
		// processButton.setEnabled(false);

		// processButton.onClick = function () {
		//     while(server.postCount()) {
		//         let obj = server.getNextPost();
		//         console.log("Process: "+obj.result);
		//     }
		//     processButton.setEnabled(false);
		// }

		// var callbackObj = new Callbacks();
		// server.addCallbackObject(callbackObj);

		// ui.add(button);
		// ui.add(processButton);
		// ui.show();

		// Once this script is running, run this in the JavaScript Editor, the /post text should print to the console.

		// var client = new api.WebClient("http://localhost:1234");
		// client.post("/post", "The Cavalry Needs You!", "text/plain");
		// client.post("/post", "Join the Cavalry!", "text/plain");

		/**
		 * Start the server listening on the host address (e.g localhost) on the
		 * specified port number.
		 *
		 * @param host
		 * @param port
		 */
		listen(host: string, port: integer)

		/**
		 * Stop the server, any polling will also stop.
		 */
		stop()

		/**
		 * Set the result for `/get` requests, only `text/plain` is currently supported.
		 *
		 * @param resultText
		 */
		setResultForGet(resultText: string)

		/**
		 * As many `/post` events may happen before you have a chance to react,
		 * Cavalry will queue them for you. This function will get the next (the
		 * oldest) post and will pop the post from the queue meaning once you get
		 * it, you can no longer access it from the server. The object will contain
		 * a result string, and an headers array, each header is an object with a
		 * name and value. Please note only non binary data is supported for `/post`
		 * events.
		 */
		// TODO: Create interface
		getNextPost(): object

		/**
		 * This is just like the above method, only instead of getting the oldest
		 * unprocessed /post, it will skip to the newest and pop that from the queue.
		 */
		// TODO: Create interface
		getNewestPost(): object

		/**
		 * Returns the number of unprocessed /post events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		postCount(): integer

		/**
		 * Clear all unprocessed `/post` events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		clearPosts()

		/**
		 * Set a Callback object (much like the UI callback object). This is a
		 * JavaScript object with an onPost function implemented. Setting a
		 * Callback object will start the server polling for new information, by
		 * default we poll the server once every 3 seconds.
		 * @param callback
		 */
		// TODO: Create interface
		addCallbackObject(callback: object)
		// var server = new api.WebServer();
		// function Callbacks() {
		//     this.onPost = function () {
		//         console.log("Check result: "+server.getResult());
		//     }
		// }
		// var callbackObj = new Callbacks();
		// server.addCallbackObject(callbackObj);

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to once per second.
		 */
		setHighFrequency()

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to 60 times a second. This is useful for realtime
		 * communication with things like midi-controllers.
		 */
		setRealtime()
	}
}
