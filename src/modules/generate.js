import { __dirname, color } from './const.js'

// TODO: Read Contents/info.plist > CFBundleVersion to add `@since` to jsdoc

export function createTsDefinitions(defs) {
	let outputs = {}
	for (const namespace in defs) {
		let data = [`declare namespace ${namespace} {`]
		for (const api of defs[namespace]) {
			if (!api.docs_description) {
				console.log(
					`📕 Missing docs ${color(`${namespace}.${api.name}`)}`,
				)
			}
			data.push(formatDocs(api))
			if (api.type === 'class') {
				data.push(
					`class ${api.name} ${api.extends ? `extends ${api.extends}` : ''} {`.trim(),
				)
				if (api.constructors?.arguments?.length) {
					const args = formatArgs(api.constructors.arguments)
					data.push(`constructor(${args})`)
				}
				api.properties?.forEach((prop) => {
					data.push(`/** ${getDescription(prop)} */`)
					data.push(
						`${prop.name}: ${explicitObject(prop.type, api.name)}`,
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
				if (api.name.startsWith('on')) {
					data.push(
						`let ${formatCall(api, formatArgs(api.arguments))}`,
					)
				} else {
					data.push(
						`const ${api.name}: ${explicitObject(api.return_type, api.name)}`,
					)
				}
			}
		}
		data.push(`}`)
		outputs[namespace] = data.join('\n')
	}
	return outputs
}

function getDescription(api) {
	return api.docs_description || api.description || ''
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

function explicitObject(type, name) {
	if ((type !== null && typeof type === 'object') || type === 'object') {
		console.log(`🔹 Missing type ${color(name)}`)
		return 'Record<string, any> & { length?: never }'
	}
	return type
}

function formatArgs(args) {
	if (!Array.isArray(args)) {
		return ''
	}
	const list = args.map(({ name, type, required }) => {
		if (required === undefined) {
			console.log('⏵ Implicit required', color(name))
		}
		return `${name}${required === false ? '?' : ''}: ${explicitObject(type, name)}`
	})
	return list.join(', ')
}

function formatFunction(api) {
	const params = formatArgs(api.arguments)
	return `function ${formatCall(api, params)}`
}

function formatMethod(api) {
	const params = formatArgs(api.arguments)
	return formatCall(api, params)
}

function formatCall(api, params) {
	if (api.name.startsWith('on')) {
		return `${api.name}: (${params}) => ${explicitObject(api.return_type, api.name)}`
	}
	let call = []
	call.push(`${api.name}(${params})`)
	call.push(`${explicitObject(api.return_type, api.name)}`)
	return call.join(': ')
}
