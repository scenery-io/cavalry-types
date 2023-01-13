/// <reference path="../index.d.ts" />
// @ts-check

var write = 'render\n'

var compId = api.createComp('comp')
var comp = api.setActiveComp(compId)
var layer = api.primitive('circle', 'circle')

var addRenderQueueItem = api.addRenderQueueItem(compId)
log('addRenderQueueItem', addRenderQueueItem)
var render = api.render(addRenderQueueItem)
log('render', render)
var renderAll = api.renderAll()
log('renderAll', renderAll)
var renderPNGFrame = api.renderPNGFrame('/Users/Remco/Desktop/render.png', 100)
log('renderPNGFrame', renderPNGFrame)
var renderSVGFrame = api.renderSVGFrame(
	'/Users/Remco/Desktop/render.svg',
	100,
	false
)
log('renderSVGFrame', renderSVGFrame)
var getRenderQueueItems = api.getRenderQueueItems()
log('getRenderQueueItems', getRenderQueueItems)
var connectDynamicIndex = api.connectDynamicIndex(layer, '')
log('connectDynamicIndex', connectDynamicIndex)
var getDynamicIndex = api.getDynamicIndex()
log('getDynamicIndex', getDynamicIndex)

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
