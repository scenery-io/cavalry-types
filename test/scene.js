/// <reference path="../index.d.ts" />
// @ts-check

var write = 'scene\n'

var layer = api.primitive('circle', 'circle')

var saveSceneAs = api.saveSceneAs('/Users/Remco/Desktop/test.cv')
log('saveSceneAs', saveSceneAs)
// TODO: Report crashes Cavalry regardles of `force` value
// var openScene = api.openScene('/Users/Remco/Desktop/test.cv', false)
// log('openScene', openScene)
var saveScene = api.saveScene()
log('saveScene', saveScene)
var loadAsset = api.loadAsset('/Users/Remco/Desktop/bun.jpg', false)
log('loadAsset', loadAsset)
var reloadAsset = api.reloadAsset(loadAsset)
log('reloadAsset', reloadAsset)
var replaceAsset = api.replaceAsset(loadAsset, '/Users/Remco/Desktop/book1.jpg')
log('replaceAsset', replaceAsset)
var jsonFromAsset = api.jsonFromAsset(loadAsset)
log('jsonFromAsset', jsonFromAsset)
var textFromAsset = api.textFromAsset(loadAsset)
log('textFromAsset', textFromAsset)
var loadGoogleSheet = api.loadGoogleSheet(
	'1NkcuipSPYmXHvVTzAj4rhdhixtF3mdSZiINlb3wFnfE',
	''
)
log('loadGoogleSheet', loadGoogleSheet)
var setProject = api.setProject('')
log('setProject', setProject)
var clearProject = api.clearProject()
log('clearProject', clearProject)
var getActiveComp = api.getActiveComp()
log('getActiveComp', getActiveComp)
var getComps = api.getComps()
log('getComps', getComps)
var createComp = api.createComp('comp')
log('createComp', createComp)
var setActiveComp = api.setActiveComp(createComp)
log('setActiveComp', setActiveComp)
var preCompose = api.preCompose('precomp')
log('preCompose', preCompose)
var getCompFromReference = api.getCompFromReference(createComp)
log('getCompFromReference', getCompFromReference)
var createCompReference = api.createCompReference(createComp)
log('createCompReference', createCompReference)
var getAssetWindowLayers = api.getAssetWindowLayers(true)
log('getAssetWindowLayers', getAssetWindowLayers)
var getAssetType = api.getAssetType(loadAsset)
log('getAssetType', getAssetType)
var getAssetFilePath = api.getAssetFilePath(loadAsset)
log('getAssetFilePath', getAssetFilePath)
var createAssetGroup = api.createAssetGroup('group')
log('createAssetGroup', createAssetGroup)
var soloLayers = api.soloLayers([layer])
log('soloLayers', soloLayers)

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
