var write = 'fs\n'

var load = api.load('/Users/Remco/Desktop/hey.js')
log('load', load)
var getProjectPath = api.getProjectPath()
log('getProjectPath', getProjectPath)
var getRenderPath = api.getRenderPath()
log('getRenderPath', getRenderPath)
var getAssetPath = api.getAssetPath()
log('getAssetPath', getAssetPath)
var getScenesPath = api.getScenesPath()
log('getScenesPath', getScenesPath)
var getSceneFilePath = api.getSceneFilePath()
log('getSceneFilePath', getSceneFilePath)
var getPreferencesPath = api.getPreferencesPath()
log('getPreferencesPath', getPreferencesPath)
var filePathExists = api.filePathExists('/Users/Remco/Desktop/hey.js')
log('filePathExists', filePathExists)
var getFileNameFromPath = api.getFileNameFromPath('/Users/Remco/Desktop/hey.js')
log('getFileNameFromPath', getFileNameFromPath)
var getExtensionFromPath = api.getExtensionFromPath(
	'/Users/Remco/Desktop/hey.js'
)
log('getExtensionFromPath', getExtensionFromPath)
var getFolderFromPath = api.getFolderFromPath('/Users/Remco/Desktop/hey.js')
log('getFolderFromPath', getFolderFromPath)
var makeFolder = api.makeFolder('/Users/Remco/Desktop/Cavalry')
log('makeFolder', makeFolder)
var getAppAssetsPath = api.getAppAssetsPath()
log('getAppAssetsPath', getAppAssetsPath)
var writeToFile = api.writeToFile(
	'/Users/Remco/Desktop/hey.js',
	'console.log("hey")'
)
log('writeToFile', writeToFile)
var writeEncodedToBinaryFile = api.writeEncodedToBinaryFile(
	'/Users/Remco/Desktop/binary.png',
	'png'
)
log('writeEncodedToBinaryFile', writeEncodedToBinaryFile)
var readFromFile = api.readFromFile('/Users/Remco/Desktop/hey.js')
log('readFromFile', readFromFile)
var encodeBinary = api.encodeBinary('/Users/Remco/Desktop/hey.js')
log('encodeBinary', encodeBinary)

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
