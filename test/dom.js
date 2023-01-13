/// <reference path="../index.d.ts" />
// @ts-check

var output = ''

;[
    {
        name: 'cavalry',
        ns: cavalry,
    },
    {
        name: 'api',
        ns: api,
    },
    {
        name: 'ui',
        ns: ui,
    },
].forEach(({ name, ns }) => {
    output += `${name}\n`
    for (var key in ns) {
        output += `\t${key}\n`
        var regExp = /[A-Z]/
        var isClass = regExp.test(key.charAt(0))
        if (isClass) {
            var Classy = ns[key]
            var subKey = new Classy()
            console.log(subKey)
            // for (var sub in subKey) {
            //     output += `\t\t${sub}\n`
            // }
        }
    }
})

api.writeToFile('/Users/Remco/Desktop/dom.txt', output)
