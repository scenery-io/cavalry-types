/// <reference path="../index.d.ts" />
// @ts-check

var write = 'utility\n'

var setClipboardText = api.setClipboardText('cavalry')
log('setClipboardText', setClipboardText)
var getClipboardText = api.getClipboardText()
log('getClipboardText', getClipboardText)
var runProcess = api.runProcess('echo', ['process'])
log('runProcess', runProcess)
var runDetachedProcess = api.runDetachedProcess('echo', ['detached'])
log('runDetachedProcess', runDetachedProcess)
var openURL = api.openURL('https://www.cavalry.scenegroup.co')
log('openURL', openURL)
var isGuiSession = api.isGuiSession()
log('isGuiSession', isGuiSession)
var getPlatform = api.getPlatform()
log('getPlatform', getPlatform)

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
