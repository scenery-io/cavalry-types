/// <reference path="../src/index.d.ts" />
// @ts-check

var write = 'attribute\n'

var layer = api.primitive('circle', 'circle')
var layer2 = api.primitive('circle', 'circle2')

var getSelectedAttributes = api.getSelectedAttributes()
log('getSelectedAttributes', getSelectedAttributes)
var set = api.set(layer, {})
log('set', set)
var get = api.get(layer, 'position.x')
log('get', get)

api.set(layer, {"generator.radius.x": 10, "generator.radius.y": 10, "hidden": true})
// Create a Duplicator
var duplicator = api.create("duplicator", "Duplicator")
// Connect the Ellipse to the Duplicator
api.connect(layer, "id", duplicator, "shapes")
// Change the Distribution on the Duplicator to a Custom Distribution
var setGenerator = api.setGenerator(duplicator, "generator", "circleDistribution")
log('setGenerator', setGenerator)

var getGenerators = api.getGenerators(layer)
log('getGenerators', getGenerators)
// TODO: Report error
// var getCurrentGeneratorType = api.getCurrentGeneratorType(layer)
// log('getCurrentGeneratorType', getCurrentGeneratorType)
var setAttributeExpression = api.setAttributeExpression(layer, 'position.x', '0')
log('setAttributeExpression', setAttributeExpression)
var connect = api.connect(layer, 'position.x', layer2, 'position.x')
log('connect', connect)
var getInConnection = api.getInConnection(layer, 'position.x')
log('getInConnection', getInConnection)
var getOutConnections = api.getOutConnections(layer2, 'position.x')
log('getOutConnections', getOutConnections)
var disconnect = api.disconnect(layer, 'position.x', layer2, 'position.x')
log('disconnect', disconnect)
var keyframe = api.keyframe(layer, 10, { 'position.x': 300 })
log('keyframe', keyframe)
var getSelectedKeyframes = api.getSelectedKeyframes()
log('getSelectedKeyframes', getSelectedKeyframes)
var modifyKeyframe = api.modifyKeyframe(layer, { frame: 10, newValue: 100})
log('modifyKeyframe', modifyKeyframe)
var modifyKeyframeTangent = api.modifyKeyframeTangent(layer, {frame: 10, angle: 5})
log('modifyKeyframeTangent', modifyKeyframeTangent)
var magicEasing = api.magicEasing(layer, 'position.x', 10, 'SlowInSlowOut')
log('magicEasing', magicEasing)
var getKeyframeTimes = api.getKeyframeTimes(layer, 'position.x')
log('getKeyframeTimes', getKeyframeTimes)
// TODO: Report crashes Cavalry
// var deleteKeyframe = api.deleteKeyframe(layer, 'position.x', 1)
// log('deleteKeyframe', deleteKeyframe)
var deleteAnimation = api.deleteAnimation(layer, 'position.x')
log('deleteAnimation', deleteAnimation)
var getAttrType = api.getAttrType(layer, 'position.x')
log('getAttrType', getAttrType)
var resetAttribute = api.resetAttribute(layer, 'position.x')
log('resetAttribute', resetAttribute)
var addArrayIndex = api.addArrayIndex(layer, 'position.x')
log('addArrayIndex', addArrayIndex)
var removeArrayIndex = api.removeArrayIndex(layer, 'position.x')
log('removeArrayIndex', removeArrayIndex)
var getArrayCount = api.getArrayCount(layer, 'position.x')
log('getArrayCount', getArrayCount)
var addDynamic = api.addDynamic(layer, 'position.x', "string")
log('addDynamic', addDynamic)
var renameAttribute = api.renameAttribute(layer, 'position.x', 'hello')
log('renameAttribute', renameAttribute)
var getOutConnectedAttributes = api.getOutConnectedAttributes(layer)
log('getOutConnectedAttributes', getOutConnectedAttributes)
var getInConnectedAttributes = api.getInConnectedAttributes(layer)
log('getInConnectedAttributes', getInConnectedAttributes)
var getAttributes = api.getAttributes(layer)
log('getAttributes', getAttributes)
var getAnimatedAttributes = api.getAnimatedAttributes(layer)
log('getAnimatedAttributes', getAnimatedAttributes)
var isAnimatedAttribute = api.isAnimatedAttribute(layer, 'position.x')
log('isAnimatedAttribute', isAnimatedAttribute)
var getInFrame = api.getInFrame(layer)
log('getInFrame', getInFrame)
var setInFrame = api.setInFrame(layer, 10)
log('setInFrame', setInFrame)
var getOutFrame = api.getOutFrame(layer)
log('getOutFrame', getOutFrame)
var setOutFrame = api.setOutFrame(layer, 20)
log('setOutFrame', setOutFrame)
// TODO: Report crashes Cavalry
// var graphPreset = api.graphPreset(layer, 'position.x', 2)
// log('graphPreset', graphPreset)
var flipGraph = api.flipGraph(layer, 'position.x', 'vertical')
log('flipGraph', flipGraph)

/**
 * @param {any} item
 */
function getTypeof(item) {
    return Array.isArray(item) ? 'array' : typeof item
}

/**
 * @param {any} item
 */
function getValue(item) {
    return getTypeof(item) === 'object' ? JSON.stringify(item) : item
}

/**
 * @param {string} itemName
 * @param {any} item
 */
function log(itemName, item) {
    var value = `${itemName}, ${getTypeof(item)}, ${getValue(item)}`
    console.log(value)
    write += `${value}\n`
}
api.writeToFile('/Users/Remco/Desktop/test.csv', write)
