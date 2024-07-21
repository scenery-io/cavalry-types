#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs'
import { mkdir, readdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import groupBy from 'just-group-by'
import { assert } from 'console'
import { __dirname } from './const.js'

const Namespaces = {
	'@JS_GUI_API': 'api',
	'@JS_CTX': 'ctx',
	'@JS_DEFORMER': 'def',
	'@JS_CORE_API': 'cavalry',
	'@JS_WIDGET_API': 'ui',
}

const cavalry = 'Cavalry'
const path = join(
	'/Applications',
	`${cavalry}.app`,
	'Contents',
	'assets',
	'MetaData'
)
const files = await readdir(path)
const defs = files.flatMap((file) => {
	const filePath = join(path, file)
	const data = readFileSync(filePath, 'utf-8')
	return JSON.parse(data)
})
const namespaces = groupBy(defs, ({ namespace }) => namespace)

let outputs = {}
for (const ns in namespaces) {
	const space = Namespaces[ns]
	if (!space) {
		throw new Error('Unknown namespace')
	}

	let data = []
	data.push(`declare namespace ${space} {`)
	for (const api of namespaces[ns]) {
		data.push(`/**${api.description || api.name}*/`)
		assert(api.description, `Missing description: ${space}.${api.name}`)
		if (api.type === 'class') {
			data.push(`class ${api.name} {`)
			if (api.constructors?.arguments?.length) {
				const args = formatArgs(api.constructors.arguments)
				data.push(`constructor(${args})`)
			}
			api.properties?.forEach((prop) => {
				data.push(`/**${prop.description}*/`)
				data.push(`${prop.name}: ${coerceTypes(prop.type)}`)
			})
			api.methods?.forEach((method) => {
				data.push(`/**${method.description}*/`)
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
	outputs[space] = data.join('\n')
}

for (const ns in outputs) {
	const data = outputs[ns]
	const path = resolve(__dirname, '..', 'defs')
	const file = join(path, `${ns}.d.ts`)
	if (!existsSync(path)) {
		await mkdir(path)
	}
	await writeFile(file, data, 'utf-8')
}

function coerceTypes(type) {
	if (type === 'None' || type === undefined) {
		return 'void'
	}
	if (
		(type !== null && typeof type === 'object') ||
		type.toLowerCase() === 'object'
	) {
		return '{}'
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
	return type
}

function formatArgs(api, args) {
	const params = args?.length && args?.[0] !== null ? args : []
	const list = params.map(({ name, type, required, default: def }) => {
		assert(
			required === true && def === undefined,
			`${api.name}: ${name} is missing default value`
		)
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
