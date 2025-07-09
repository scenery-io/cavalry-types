import { __dirname, Namespaces, color } from './const.js'

// TODO: Read Contents/info.plist > CFBundleVersion to add `@since` to jsdoc

export function createTsDefinitions(defs) {
	let outputs = {}
	for (const ns in defs) {
		if (!ns) {
			throw new Error('Unknown namespace')
		}
		const namespace = Namespaces[ns].name
		let data = [`declare namespace ${namespace} {`]
		for (const api of defs[ns]) {
			if (!api.docs_description) {
				console.log(
					`📕 Missing docs ${color(`${namespace}.${api.name}`)}`,
				)
			}
			data.push(formatDocs(api))
			if (api.type === 'class') {
				data.push(`class ${api.name} {`)
				if (api.constructors?.arguments?.length) {
					const args = formatArgs(api.constructors.arguments)
					data.push(`constructor(${args})`)
				}
				api.properties?.forEach((prop) => {
					data.push(`/** ${getDescription(prop)} */`)
					data.push(
						`${prop.name}: ${coerceTypes(prop.type, api.name)}`,
					)
				})
				api.methods?.forEach((method) => {
					data.push(`/** ${getDescription(method)} */`)
					data.push(`${formatMethod(method)}`)
				})
				data.push(`}`)
			}
			if (api.type === 'function') {
				data.push(formatFunction(api))
			}
			if (api.type === 'property') {
				data.push(
					`const ${api.name}: ${coerceTypes(api.return_type, api.name)}`,
				)
			}
		}
		data.push(`}`)
		outputs[namespace] = data.join('\n')
	}
	return outputs
}

function getDescription(api) {
	return api.docs_description || api.description || 'TODO: Description'
}

function formatDocs(api) {
	const docs = ['']
	docs.push(getDescription(api))
	docs.push()
	api.examples?.forEach((example) => {
		docs.push('@example')
		docs.push(example.split('\n').join('\n\t* '))
	})
	return `/**${docs.join('\n\t* ')}\n\t*/`
}

function fixInvalidValues(value) {
	// TODO: Follow up on upstream bug report
	// NOTE: Because some values have invalid/incorrect values
	// See definitions for `cavalry.translate` and `def.setTransformAtDepthAtIndex`
	if (value.includes('Mesh')) {
		return value.replace('Mesh', 'cavalry.Mesh')
	}
	if (value.includes('Matrix')) {
		return value.replace('Matrix', 'cavalry.Matrix')
	}
	if (value === 'string/array') {
		return 'string | string[]'
	}
	if (value.startsWith('{x')) {
		return value.replace('{x', 'x')
	}
	if (value === 'x') {
		return 'unknown'
	}
	if (value.startsWith('number')) {
		return 'number'
	}
	return value
}

function coerceTypes(type, name) {
	if (type === 'None' || type === undefined) {
		return 'void'
	}
	if (
		(type !== null && typeof type === 'object') ||
		type.toLowerCase() === 'object'
	) {
		console.log(`🔹 Missing types ${color(name)}`)
		return 'Record<string, any> & { length?: never }'
		// return 'unknown'
	}
	if (type.toLowerCase().startsWith('array')) {
		const arrayType = type.match(/<.+>/)?.[0]?.replace(/<|>/g, '')
		return `${coerceTypes(arrayType, name)}[]`
	}
	const arrayType = /\[.+\]/
	if (arrayType.test(type)) {
		return `${coerceTypes(type.replace(/\[|\]/g, ''), name)}[]`
	}
	if (type === 'int' || type === 'double') {
		return 'number'
	}
	if (type === 'bool') {
		return 'boolean'
	}
	return fixInvalidValues(type)
}

function formatArgs(api, args) {
	if (!Array.isArray(args)) {
		return ''
	}
	const list = args.reduce(
		(items, { name, type, required, default: def }) => {
			// if (required === false && def === undefined) {
			// 	console.log(`${api.name}: ${name} is missing default value`)
			// }
			const invalid = name.startsWith('{x')
			if (invalid) {
				// NOTE: Issue in the metadata definitions
				name = 'x'
				type = 'number'
				required = true
			}
			if (type === '{x') {
				type = 'unknown'
			}
			items.push(
				`${name}${!required ? '?' : ''}: ${coerceTypes(type, `${api.name}(${name})`)}`,
			)
			if (invalid) {
				items.push(`y: number`)
			}
			return items
		},
		[],
	)
	return list.join(', ')
}

function formatFunction(api) {
	const params = formatArgs(api, api.arguments)
	return `function ${formatCall(api, params)}`
}

function formatMethod(api) {
	const params = formatArgs(api, api.properties || api.arguments)
	return formatCall(api, params)
}

function formatCall(api, params) {
	let call = []
	call.push(`${api.name}(${params})`)
	call.push(`${coerceTypes(api.return_type, api.name)}`)
	return call.join(': ')
}
