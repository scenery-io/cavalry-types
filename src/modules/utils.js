import { color } from './const.js'

function deepTraverse(obj, callback) {
	function traverse(currentObj, path = []) {
		for (const key in currentObj) {
			const currentPath = [...path, key]
			if (
				typeof currentObj[key] === 'object' &&
				currentObj[key] !== null
			) {
				traverse(currentObj[key], currentPath)
			}
			const result = callback(key, currentObj[key], currentPath)
			if (result !== undefined) {
				currentObj[key] = result
			}
		}
	}
	traverse(obj)
	return obj
}

// NOTE: Because some values have incorrect values
export function fix(obj) {
	return deepTraverse(obj, (key, value, path) => {
		if (typeof value === 'object' && value !== null) {
			// NOTE: Makes `return_type` explicit
			const method = path.slice(-2, -1).toString() === 'methods'
			if ((method || value.type === 'function') && !value.return_type) {
				console.log('⏵ Implicit return_type', color(value.name))
				value.return_type = 'unknown'
			}
			// NOTE: Removes `namespace` in favor of grouping
			if (value.namespace) {
				delete value.namespace
			}
		}
		let replace = value
		// NOTE: Removes null values in `arguments` arrays
		if (key === 'arguments') {
			if (value === null) {
				replace = []
			}
			if (Array.isArray(value)) {
				replace = value.filter((item) => item !== null)
			}
		}
		if (key === 'return_type' || key === 'type') {
			// NOTE: Prefixes classes with their namespace
			if (value?.includes?.('Point')) {
				replace = value.replace('Point', 'cavalry.Point')
			}
			if (value?.includes?.('Mesh')) {
				replace = value.replace('Mesh', 'cavalry.Mesh')
			}
			if (value?.includes?.('Matrix')) {
				replace = value.replace('Matrix', 'cavalry.Matrix')
			}
			if (value === 'None' || value === undefined) {
				replace = 'void'
			}
			if (value === 'int' || value === 'double') {
				replace = 'number'
			}
			if (value === 'bool') {
				replace = 'boolean'
			}
			if (value === 'string/array') {
				replace = 'string | string[]'
			}
			// NOTE: Fixes `listDirectory` and `listDirectoryRecursive` return type
			if (value === 'array') {
				replace = 'string[]'
			}
			// NOTE: Fixes `Array<type>` array
			if (replace?.toLowerCase?.().startsWith('array')) {
				let arrayType = replace.match(/<.+>/)?.[0]?.replace(/<|>/g, '')
				if (arrayType === 'String') {
					arrayType = 'string'
				}
				if (arrayType === 'int') {
					arrayType = 'number'
				}
				replace = `${arrayType}[]`
			}
			// NOTE: Fixes `[string]` array
			if (value?.test?.(/\[.+\]/)) {
				replace = `${replace.replace(/\[|\]/g, '')}[]`
			}
			// NOTE: Only lowercase `object`s
			if (value?.toLowerCase?.().includes('object')) {
				replace = replace.toLowerCase()
			}
		}
		// NOTE: Fixes vector arguments eg. in `cavalry.translate`
		if (key === 'name' && value?.startsWith?.('{x')) {
			setValue(obj, path.slice(0, -1), {
				name: 'vector',
				type: 'object',
				required: true,
			})
		}
		// NOTE: Fixes vector arguments in `def.setTransformAtDepthAtIndex`
		if (key === 'type' && value?.startsWith?.('{x')) {
			const itemPath = path.slice(0, -1)
			const item = getValue(obj, itemPath)
			setValue(obj, itemPath, {
				name: item.name,
				type: 'object',
				required: false,
			})
		}
		return replace
	})
}

function getValue(record, path) {
	return path.reduce((record, item) => record[item], record)
}

function setValue(record, path, value) {
	const parent = path.slice(0, -1).reduce((acc, key) => acc[key], record)
	parent[path[path.length - 1]] = value
	return record
}
