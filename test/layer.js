/// <reference path="../index.d.ts" />
// @ts-check

var write = 'layer\n'

var primitive = api.primitive('circle', 'circle')
log('primitive', primitive)
// TODO: Find out what type of object `createEditable` requires
// var createEditable = api.createEditable(primitive, 'hello')
// log('createEditable', createEditable)
var create = api.create('null', 'my null')
log('create', create)
var exists = api.exists(create)
log('exists', exists)
var getLayerType = api.getLayerType(create)
log('getLayerType', getLayerType)
var resetLayerAttributes = api.resetLayerAttributes(create)
log('resetLayerAttributes', resetLayerAttributes)
var getSelection = api.getSelection()
log('getSelection', getSelection)
var select = api.select([create])
log('select', select)
var parent = api.parent(create, primitive)
log('parent', parent)
var getChildren = api.getChildren(primitive)
log('getChildren', getChildren)
var getParent = api.getParent(create)
log('getParent', getParent)
var getNiceName = api.getNiceName(create)
log('getNiceName', getNiceName)
var rename = api.rename(create, 'new name')
log('rename', rename)
var offsetLayerTime = api.offsetLayerTime(create, 1)
log('offsetLayerTime', offsetLayerTime)
var setStroke = api.setStroke(create, true)
log('setStroke', setStroke)
var hasStroke = api.hasStroke(create)
log('hasStroke', hasStroke)
var setFill = api.setFill(create, true)
log('setFill', setFill)
var hasFill = api.hasFill(create)
log('hasFill', hasFill)
var getBoundingBox = api.getBoundingBox(primitive, true)
log('getBoundingBox', getBoundingBox)

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
