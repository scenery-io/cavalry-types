var write = 'path\n'

var path = new cavalry.Path()
var path2 = new cavalry.Path()
var moveTo = path.moveTo(1, 1)
log('moveTo', moveTo)
// api.writeToFile('/Users/Remco/Desktop/path.txt', `'moveTo', ${moveTo}, ${typeof moveTo}`)
var lineTo = path.lineTo(1, 1)
log('lineTo', lineTo)
var cubicTo = path.cubicTo(1, 1, 1, 1, 1, 1)
log('cubicTo', cubicTo)
var close = path.close()
log('close', close)
var addText = path.addText('hey', 12, 1, 1)
log('addText', addText)
var addRect = path.addRect(1, 1, 1, 1)
log('addRect', addRect)
var addEllipse = path.addEllipse(1, 1, 1, 1)
log('addEllipse', addEllipse)
var clear = path.clear()
log('clear', clear)
var isClosed = path.isClosed
log('isClosed', isClosed)
var length = path.length
log('length', length)
var translate = path.translate(1, 1)
log('translate', translate)
var rotate = path.rotate(90)
log('rotate', rotate)
var scale = path.scale(1, 1)
log('scale', scale)
var append = path.append(path2)
log('append', append)
var intersect = path.intersect(path2)
log('intersect', intersect)
var unite = path.unite(path2)
log('unite', unite)
var difference = path.difference(path2)
log('difference', difference)
var convertToCurves = path.convertToCurves()
log('convertToCurves', convertToCurves)
var convertToLines = path.convertToLines(1)
log('convertToLines', convertToLines)
var toObject = path.toObject()
log('toObject', toObject)
var fromObject = path.fromObject({})
log('fromObject', fromObject)

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
