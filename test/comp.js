/// <reference path="../index.d.ts" />
// @ts-check

var write = 'composition\n'

var setFrame = api.setFrame(10)
log('setFrame', setFrame)
var getFrame = api.getFrame()
log('getFrame', getFrame)
var play = api.play()
log('play', play)
var getCompLayers = api.getCompLayers(true)
log('getCompLayers', getCompLayers)
var getCompLayersOfType = api.getCompLayersOfType(true, 'null')
log('getCompLayersOfType', getCompLayersOfType)
var createTimeMarker = api.createTimeMarker(10)
log('createTimeMarker', createTimeMarker)
var getTimeMarkers = api.getTimeMarkers()
log('getTimeMarkers', getTimeMarkers)
var removeTimeMarker = api.removeTimeMarker(createTimeMarker)
log('removeTimeMarker', removeTimeMarker)

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
