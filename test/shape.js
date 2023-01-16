var write = 'shape\n'
var layer = api.primitive('circle', 'circle')
var path = new cavalry.Path()

var centrePivot = api.centrePivot(layer, true)
log('centrePivot', centrePivot)
var freezeTransform = api.freezeTransform(layer)
log('freezeTransform', freezeTransform)
var resetTransform = api.resetTransform(layer)
log('resetTransform', resetTransform)
var getDrawInstructionsForSelection = api.getDrawInstructionsForSelection()
log('getDrawInstructionsForSelection', getDrawInstructionsForSelection)
var makeEditable = api.makeEditable(layer, true)
log('makeEditable', makeEditable)
log('LAYERTYPE', api.getLayerType(makeEditable))
var getEditablePath = api.getEditablePath(makeEditable, true)
log('getEditablePath', getEditablePath)
var setEditablePath = api.setEditablePath(makeEditable, true, getEditablePath)
log('setEditablePath', setEditablePath)
// TODO: Report crashes Cavalry because `layer` is not editable
// var setEditablePath = api.setEditablePath(layer, true, path)
// log('setEditablePath', setEditablePath)
var makeFirstPoint = api.makeFirstPoint(layer)
log('makeFirstPoint', makeFirstPoint)
var movePoint = api.movePoint(10, 10, true)
log('movePoint', movePoint)
var setPointPosition = api.setPointPosition({ x: 10, y: 10 }, true, true)
log('setPointPosition', setPointPosition)

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
