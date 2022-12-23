/// <reference path="../index.d.ts" />
// @ts-check

var write = 'web\n'

log('\nCLIENT', '')
var client = new api.WebClient('https://www.boredapi.com')
log('client', client)
var setBasicAuthentication = client.setBasicAuthentication('user', 'pass')
log('setBasicAuthentication', setBasicAuthentication)
var setDigestAuthentication = client.setDigestAuthentication('user', 'pass')
log('setDigestAuthentication', setDigestAuthentication)
var setTokenAuthentication = client.setTokenAuthentication('token')
log('setTokenAuthentication', setTokenAuthentication)
var addHeader = client.addHeader('Content-Type', 'text/xml')
log('addHeader', addHeader)
var getHeaders = client.getHeaders()
log('getHeaders', getHeaders)
var status = client.status()
log('status', status)
var body = client.body()
log('body', body)
var get = client.get('https://google.com')
log('get', get)
var post = client.post('/hello', 'content', 'text/plain')
log('post', post)
var put = client.put('/hello', 'content', 'text/plain')
log('put', put)
var postFromFile = client.postFromFile('/hello', '/Users/Remco/Desktop/hey.js', 'text/plain')
log('postFromFile', postFromFile)
var putFromFile = client.putFromFile('/hello', '/Users/Remco/Desktop/hey.js', 'text/plain')
log('putFromFile', putFromFile)
var writeBodyToBinaryFile = client.writeBodyToBinaryFile('/Users/Remco/Desktop/server.bin')
log('writeBodyToBinaryFile', writeBodyToBinaryFile)

log('\nSERVER', '')
var server2 = new api.WebServer()
log('server', server2)
var listen = server2.listen('127.0.0.1', 8000)
log('listen', listen)
var stop = server2.stop()
log('stop', stop)
var setResultForGet = server2.setResultForGet('result')
log('setResultForGet', setResultForGet)
var getNextPost = server2.getNextPost()
log('getNextPost', getNextPost)
var getNewestPost = server2.getNewestPost()
log('getNewestPost', getNewestPost)
var postCount = server2.postCount()
log('postCount', postCount)
var clearPosts = server2.clearPosts()
log('clearPosts', clearPosts)
var addCallbackObject = server2.addCallbackObject({})
log('addCallbackObject', addCallbackObject)
var setHighFrequency = server2.setHighFrequency()
log('setHighFrequency', setHighFrequency)
var setRealtime = server2.setRealtime()
log('setRealtime', setRealtime)

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
