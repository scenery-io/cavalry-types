/// <reference path="../src/index.d.ts" />
// @ts-check

var write = 'cavalry\n'

var random = cavalry.random(1,1,1)
log('random', random)
var uniform = cavalry.uniform(1,1,1)
log('uniform', uniform)
var noise1d = cavalry.noise1d(1,1,1)
log('noise1d', noise1d)
var noise2d = cavalry.noise2d(1,1,1,1)
log('noise2d', noise2d)
var noise3d = cavalry.noise3d(1,1,1,1,1)
log('noise3d', noise3d)
var dist = cavalry.dist(1,1,1,1)
log('dist', dist)
var map = cavalry.map(1,1,10,1,10)
log('map', map)
var norm = cavalry.norm(1,1,10)
log('norm', norm)
var clamp = cavalry.clamp(1,1,1)
log('clamp', clamp)
var lerp = cavalry.lerp(1,1,1)
log('lerp', lerp)
// var angleToVector = cavalry.angleToVector(1)
// log('angleToVector', angleToVector)
// var vectorToAngle = cavalry.vectorToAngle(1,1)
// log('vectorToAngle', vectorToAngle)
var rgbToHsv = cavalry.rgbToHsv(1,1,1)
log('rgbToHsv', rgbToHsv)
var rgbToHex = cavalry.rgbToHex(1,1,1)
log('rgbToHex', rgbToHex)
var hsvToRgb = cavalry.hsvToRgb(1,1,1)
log('hsvToRgb', hsvToRgb)
var hsvToHex = cavalry.hsvToHex(1,1,1)
log('hsvToHex', hsvToHex)
var hexToRgb = cavalry.hexToRgb('#ffffff')
log('hexToRgb', hexToRgb)
var hexToHsv = cavalry.hexToHsv('#ffffff')
log('hexToHsv', hexToHsv)
var versionLessThan = cavalry.versionLessThan('1.4.0')
log('versionLessThan', versionLessThan)

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
