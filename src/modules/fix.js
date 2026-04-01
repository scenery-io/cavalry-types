import { color } from './const.js'

export function fix(obj) {
	return deepTraverse(obj, (key, value, path) => {
		if (typeof value === 'object' && value !== null) {
			// NOTE: Makes `return_type` explicit
			const method = path.slice(-2, -1).toString() === 'methods'
			if ((method || value.type === 'function') && !value.return_type) {
				console.log('⏵ Implicit return_type', color(value.name))
				value.return_type = 'void'
			}
			// NOTE: Fixes `LineEdit.getText` return type
			if (method && value.name === 'getText') {
				value.return_type = 'string'
			}
			// NOTE: Fix `ctx.positionX` and `ctx.positionY` from docs
			if (
				(value.name === 'positionX' || value.name === 'positionY') &&
				value.type === 'property' &&
				!value.return_type
			) {
				value.return_type = 'number'
			}
			if (value.name === 'getAllLayerTypes') {
				value.arguments = [
					{ name: 'includeExperimentalTypes', type: 'boolean' },
				]
			}
			if (value.name === 'get' && value.type === 'function') {
				value.return_type = 'unknown'
			}
			if (value.name === 'set' && value.type === 'function') {
				value.arguments[1].type = 'unknown'
			}
			if (value.name === 'dashWidth' || value.name === 'dashGap') {
				value.required = false
			}
			if (value.name === 'Menu') {
				value.constructors = {
					arguments: [
						{
							name: 'name',
							type: 'string',
							required: false,
						},
					],
				}
			}
			if (value.name === 'onDrop') {
				value.arguments = [{ name: 'info', type: 'unknown' }]
			}
			// NOTE: Removes `namespace` in favor of grouping
			if (value.namespace) {
				delete value.namespace
			}
		}
		let replace = value
		if (key === 'arguments') {
			// NOTE: Removes null values in `arguments` arrays.
			// Some null values represent missing arguments.
			if (value === null) {
				replace = []
			}
			if (Array.isArray(value)) {
				replace = value.filter((item) => item !== null)
			}
			if (Array.isArray(value)) {
				// NOTE: Fixes issues with docs
				// console.log({ value })
				replace = replace.map(({ name, type, ...keys }) => {
					if (name === 'widget') {
						return {
							name: '...widgets',
							type: 'object[]',
							...keys,
						}
					}
					if (name === 'string' && type === 'void') {
						return { name: 'tooltip', type: name, ...keys }
					}
					if (name === 'string') {
						// NOTE: Flips argument type and name
						return { name: type, type: name, ...keys }
					}
					if (name === 'int') {
						return { name: type, type: 'number', ...keys }
					}
					if (name === 'transparent=false') {
						return { name: 'transparent', type: 'boolean', ...keys }
					}
					return { name, type, ...keys }
				})
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
			// NOTE: Coerces invalid types
			if (value === 'None' || value === undefined) {
				replace = 'void'
			}
			if (value === 'int' || value === 'double' || value === 'index') {
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
			// NOTE: Fixes `[type]` array
			if (typeof value === 'string' && /\[.+\]/.test(value)) {
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
		if (key === 'type' && value === '{x') {
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

function getValue(record, path) {
	return path.reduce((record, item) => record[item], record)
}

function setValue(record, path, value) {
	const parent = path.slice(0, -1).reduce((acc, key) => acc[key], record)
	parent[path[path.length - 1]] = value
	return record
}
