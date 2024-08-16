import { assert } from 'console'
import { __dirname, Namespaces } from './const.js'

// TODO: Read Contents/info.plist > CFBundleVersion

export function createTsDefinitions(defs) {
	let outputs = {}
	for (const ns in defs) {
		if (!ns) {
			throw new Error('Unknown namespace')
		}
		const namespace = Namespaces[ns].name
		let data = [`declare namespace ${namespace} {`]
		for (const api of defs[ns]) {
			// data.push(`/**${api.description || api.name}*/`)
			// assert(
			// 	api.description,
			// 	`Missing description: ${namespace}.${api.name}`
			// )
			data.push(formatDocs(api))
			if (api.type === 'class') {
				data.push(`class ${api.name} {`)
				if (api.constructors?.arguments?.length) {
					const args = formatArgs(api.constructors.arguments)
					data.push(`constructor(${args})`)
				}
				api.properties?.forEach((prop) => {
					data.push(`/** ${getDescription(api)} */`)
					data.push(`${prop.name}: ${coerceTypes(prop.type)}`)
				})
				api.methods?.forEach((method) => {
					data.push(`/** ${getDescription(api)} */`)
					data.push(`${formatMethod(method)}`)
				})
				data.push(`}`)
			}
			if (api.type === 'function') {
				data.push(formatFunction(api))
			}
			if (api.type === 'property') {
				data.push(`const ${api.name}: ${coerceTypes(api.return_type)}`)
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
	// Doesn't solve the issue, just fixes formatting for now
	return value.replace(/[{}]/g, '')
}

function coerceTypes(type) {
	if (type === 'None' || type === undefined) {
		return 'void'
	}
	if (
		(type !== null && typeof type === 'object') ||
		type.toLowerCase() === 'object'
	) {
		return 'unknown'
	}
	if (type.toLowerCase().startsWith('array')) {
		const arrayType = type.match(/<.+>/)?.[0]?.replace(/<|>/g, '')
		return `${coerceTypes(arrayType)}[]`
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
	const params = args?.length && args?.[0] !== null ? args : []
	const list = params.map(({ name, type, required, default: def }) => {
		// assert(
		// 	required === true && def === undefined,
		// 	`${api.name}: ${name} is missing default value`
		// )
		name = fixInvalidValues(name)
		return `${name}${!required ? '?' : ''}: ${coerceTypes(type)}`
	})
	return list.join(', ')
}

function formatFunction(api) {
	const params = formatArgs(api, api.arguments)
	return `function ${formatCall(api, params)}`
}

function formatMethod(api) {
	const params = formatArgs(api, api.properties)
	return formatCall(api, params)
}

function formatCall(api, params) {
	let call = []
	call.push(`${api.name}(${params})`)
	call.push(`${coerceTypes(api.return_type)}`)
	return call.join(': ')
}
