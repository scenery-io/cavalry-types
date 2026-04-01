import { basename, join } from 'path'
import { color, Namespaces } from './const.js'
import { cwd } from 'process'
import { mkdir, readdir, readFile } from 'fs/promises'
import { unified } from 'unified'
import markdown from 'remark-parse'
import directive from 'remark-directive'
import { visit } from 'unist-util-visit'
import { findAfter } from 'unist-util-find-after'
import { toMarkdown } from 'mdast-util-to-markdown'
import { copyFileSync, existsSync, readFileSync } from 'fs'
import groupBy from 'just-group-by'

export async function parseDefinitions(packageName = 'Cavalry') {
	// TODO: Support Windows
	const path = join(
		'/Applications',
		`${packageName}.app`,
		'Contents',
		'assets',
		'MetaData',
	)
	const files = await readdir(path)
	const metadataPath = join(cwd(), 'src', 'metadata')
	if (!existsSync(metadataPath)) {
		await mkdir(metadataPath)
	}
	const defs = files.flatMap((file) => {
		const srcPath = join(path, file)
		const destPath = join(metadataPath, file)
		copyFileSync(srcPath, destPath)
		console.log(`Parsing ${color(basename(destPath))}`)
		const data = readFileSync(destPath, 'utf-8')
		return JSON.parse(data)
	})
	const namespaces = groupBy(
		defs,
		({ namespace }) => Namespaces[namespace].name,
	)
	return namespaces
}

export async function parseDocs() {
	let apis = {}
	for (const namespace in Namespaces) {
		const { name, files } = Namespaces[namespace]
		if (!apis[name]?.length) {
			apis[name] = []
		}
		for (const file of files) {
			console.log(`Parsing ${color(file)}`)
			const path = join(cwd(), 'src', 'docs', file)
			const mdx = await readFile(path, 'utf-8')
			const ast = unified().use(directive).use(markdown).parse(mdx)
			const tree = await unified().run(ast)
			if (
				file === 'api-module.mdx' ||
				file === 'context-module.mdx' ||
				file === 'deformer-module.mdx' ||
				file === 'render-scripts.mdx'
			) {
				apis[name] = apis[name].concat(parseMethods(tree))
			}
			if (file === 'cavalry-module.mdx') {
				apis[name] = apis[name].concat(parseClasses(tree))
			}
			if (file === 'web-apis.mdx') {
				apis[name] = apis[name].concat(parseWeb(tree))
			}
			if (file === 'script-uis.mdx') {
				apis[name] = apis[name].concat(parseScript(tree))
			}
		}
	}
	return apis
}

parseDocs()

function parseWeb(tree) {
	const apis = []
	visit(
		tree,
		(node) => node.type === 'heading' && node.depth === 2,
		(node, index, parent) => {
			const api = {}
			const classSection = getClass(node, index, parent)
			if (
				node.children[0].value === 'WebClient' ||
				node.children[0].value === 'WebServer'
			) {
				const descriptions = []
				const examples = []
				classSection.forEach((node) => {
					if (node.type === 'paragraph' || node.type === 'list') {
						descriptions.push(toMarkdown(node).trim())
					}
					if (node.type === 'code') {
						if (node.value.includes('/*')) {
							convertBlockComments(node)
						}
						examples.push(node.value)
					}
				})
				api.name = node.children[0].value.replace(/Class|\s/g, '')
				api.type = 'class'
				api.docs_description = descriptions.join('\n\n')
				api.constructors =
					// NOTE: Adds missing constructor for `WebClient`
					node.children[0].value === 'WebClient'
						? { arguments: [{ name: 'origin', type: 'string' }] }
						: {}
				api.examples = examples
				api.properties = []
				api.methods = []
			}

			const apisSection = getSection(node, index, parent)
			apisSection.forEach((child, childIndex) => {
				if (!(child.type === 'heading' && child.depth === 4)) {
					return
				}
				const descriptions = []
				const examples = []
				const methodSection = getSection(
					child,
					index + childIndex,
					parent,
				)
				methodSection.forEach((node) => {
					if (node.type === 'paragraph' || node.type === 'list') {
						descriptions.push(toMarkdown(node).trim())
					}
					if (node.type === 'code') {
						if (node.value.includes('/*')) {
							convertBlockComments(node)
						}
						examples.push(node.value)
					}
				})
				const value = toString(child)
				const name = value.split(/\(|\s/)[0]
				const type = value.includes('(') ? 'function' : 'property'
				const return_type =
					value.match(/→.+#/)?.[0].replace(/→|{#|\s/g, '') ||
					undefined
				const args = value.match(/\(.+\)/)?.[0].replace(/[()]/g, '')
				if (api.type === 'class') {
					const target =
						type === 'function' ? api.methods : api.properties
					target.push({
						name,
						arguments: parseArgs(args),
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				} else {
					apis.push({
						name,
						type,
						return_type,
						arguments: parseArgs(args),
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				}
			})
			if (api.name) {
				apis.push(api)
			}
		},
	)
	return apis
}

function parseScript(tree) {
	const apis = []
	visit(
		tree,
		(node) => node.type === 'heading' && node.depth === 2,
		(node, index, parent) => {
			if (node.children[0].value.includes('UI Module')) {
				const apisSection = getSection(node, index, parent)
				apisSection.forEach((child, childIndex) => {
					if (!(child.type === 'heading' && child.depth === 4)) {
						return
					}
					const descriptions = []
					const examples = []
					const methodSection = getSection(
						child,
						index + childIndex,
						parent,
					)
					methodSection.forEach((node) => {
						if (node.type === 'paragraph' || node.type === 'list') {
							descriptions.push(toMarkdown(node).trim())
						}
						if (node.type === 'code') {
							if (node.value.includes('/*')) {
								convertBlockComments(node)
							}
							examples.push(node.value)
						}
					})
					const value = toString(child)
					const name = value.split(/\(|\s/)[0]
					const type = value.includes('(') ? 'function' : 'property'
					const return_type =
						value.match(/→.+#/)?.[0].replace(/→|{#|\s/g, '') ||
						undefined
					apis.push({
						name,
						type,
						return_type,
						arguments: parseArgs(value),
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				})
			}

			if (
				node.children[0].value.includes('Widgets') ||
				node.children[0].value.includes('Layouts')
			) {
				const isWidget = node.children[0].value.includes('Widgets')
				if (isWidget) {
					const name = 'Widget'
					const list = findAfter(parent, node, 'list')
					const methods = parseList(list, name)
					apis.push({
						name,
						type: 'class',
						properties: [],
						examples: [],
						...methods,
					})
				}

				const classe = getSection(node, index, parent)
				classe.forEach((child, childIndex) => {
					if (!(child.type === 'heading' && child.depth === 3)) {
						return
					}
					const name = toString(child)
					const descriptions = []
					const examples = []
					const methods = []
					const constructors = {}
					const methodSection = getSection(
						child,
						index + childIndex,
						parent,
					)
					methodSection.forEach((node) => {
						if (node.type === 'paragraph') {
							descriptions.push(toMarkdown(node).trim())
						}
						if (node.type === 'list') {
							const list = parseList(node, name)
							methods.push(...list.methods)
							Object.assign(constructors, list.constructors)
						}
						if (node.type === 'code') {
							if (node.value.includes('/*')) {
								convertBlockComments(node)
							}
							examples.push(node.value)
						}
					})
					apis.push({
						name,
						extends: isWidget ? 'Widget' : undefined,
						type: 'class',
						constructors,
						methods,
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				})
			}
		},
	)
	return apis
}

function parseList(list, className) {
	const constructors = {}
	const methods = []
	for (const item of list.children) {
		const method = toString(item.children[0])
		const name = method.replace(/\(.+/, '')
		if (name.includes(' ')) {
			continue
		}
		const description =
			toMarkdown(item)
				.match(/\/\/.+/)?.[0]
				.replace('//', '')
				.trim() || ''
		const args = parseArgs(method)
		const result =
			method.match(/→[\sa-z]+/)?.[0]?.replace(/→|\s/g, '') || ''
		if (name === className && args.length) {
			constructors.arguments = args
		} else {
			methods.push({
				name,
				description,
				arguments: args,
				return_type: result.startsWith('{')
					? 'object'
					: result || undefined,
			})
		}
	}
	return { constructors, methods }
}

function parseArgs(value) {
	const arg = value.match(/\(.[^\/]+\)/)?.[0]?.replace(/[()]/g, '') || ''
	if (!arg) {
		return []
	}
	if (arg.includes('{')) {
		return 'object'
	}
	const args = arg.includes(',') ? arg.split(',').map((a) => a.trim()) : [arg]
	return args.map((arg) => ({
		name: arg.split(':')[0],
		type: arg.split(':')[1],
	}))
}

function toString(node) {
	return node.children.reduce((result, child) => {
		if (child.value) {
			result += child.value
		}
		if (child.name) {
			result += `:${child.name}`
		}
		return result
	}, '')
}

function parseClasses(tree) {
	const apis = []
	visit(
		tree,
		(node) => node.type === 'heading' && node.depth === 3,
		(node, index, parent) => {
			const api = {}
			const classSection = getClass(node, index, parent)
			if (node.children[0].value.includes('Class')) {
				const descriptions = []
				const examples = []
				classSection.forEach((node) => {
					if (node.type === 'paragraph' || node.type === 'list') {
						descriptions.push(toMarkdown(node).trim())
					}
					if (node.type === 'code') {
						if (node.value.includes('/*')) {
							convertBlockComments(node)
						}
						examples.push(node.value)
					}
				})
				api.name = node.children[0].value.replace(/Class|\s/g, '')
				api.type = 'class'
				api.docs_description = descriptions.join('\n\n')
				api.examples = examples
				api.properties = []
				api.methods = []
			}

			const apisSection = getSection(node, index, parent)
			apisSection.forEach((child, childIndex) => {
				if (!(child.type === 'heading' && child.depth === 4)) {
					return
				}
				const descriptions = []
				const examples = []
				const methodSection = getSection(
					child,
					index + childIndex,
					parent,
				)
				methodSection.forEach((node) => {
					if (node.type === 'paragraph' || node.type === 'list') {
						descriptions.push(toMarkdown(node).trim())
					}
					if (node.type === 'code') {
						if (node.value.includes('/*')) {
							convertBlockComments(node)
						}
						examples.push(node.value)
					}
				})
				const value = child.children[0].value
				const name = value.split(/\(|\s/)[0]
				const type = value.includes('(') ? 'function' : 'property'
				if (api.type === 'class') {
					const target =
						type === 'function' ? api.methods : api.properties
					target.push({
						name,
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				} else {
					apis.push({
						name,
						type,
						docs_description: descriptions.join('\n\n'),
						examples,
					})
				}
			})
			if (api.name) {
				apis.push(api)
			}
		},
	)
	return apis
}

function parseMethods(tree) {
	const apis = []
	visit(
		tree,
		(node) => node.type === 'heading' && node.depth === 4,
		(node, index, parent) => {
			const examples = []
			const descriptions = []
			const section = getSection(node, index, parent)
			const value = toString(node)
			const name = value.split(/\(|\s/)[0]
			section.forEach((child) => {
				if (name === 'Timer') {
					if (child.type === 'list') {
						const methods = parseList(child, 'Timer')
						apis.push({
							name,
							type: 'class',
							properties: [],
							examples,
							...methods,
							constructors: {
								arguments: parseArgs(value),
							},
						})
					}
					if (child.type === 'paragraph') {
						descriptions.push(toMarkdown(child).trim())
					}
					if (child.type === 'code') {
						if (child.value.includes('/*')) {
							convertBlockComments(child)
						}
						examples.push(child.value)
					}
					return
				}
				if (child.type === 'paragraph' || child.type === 'list') {
					descriptions.push(toMarkdown(child).trim())
				}
				if (child.type === 'code') {
					if (child.value.includes('/*')) {
						convertBlockComments(child)
					}
					examples.push(child.value)
				}
			})
			if (name === 'Timer') {
				return
			}
			apis.push({
				name,
				docs_description: descriptions.join('\n\n'),
				examples,
			})
		},
	)
	return apis
}

function getClass(node, index, parent) {
	const start = node
	const startIndex = index
	const depth = start.depth
	const isEnd = (node) =>
		(node.type === 'heading' && node.depth >= depth) ||
		node.type === 'export'
	const end = findAfter(parent, start, isEnd)
	const endIndex = parent.children.indexOf(end)
	const section = parent.children.slice(
		startIndex,
		endIndex > 0 ? endIndex : undefined,
	)
	return section
}

function getSection(node, index, parent) {
	const start = node
	const startIndex = index
	const depth = start.depth
	const isEnd = (node) =>
		(node.type === 'heading' && node.depth <= depth) ||
		node.type === 'export'
	const end = findAfter(parent, start, isEnd)
	const endIndex = parent.children.indexOf(end)
	const section = parent.children.slice(
		startIndex,
		endIndex > 0 ? endIndex : undefined,
	)
	return section
}

function convertBlockComments(node) {
	// NOTE: Turns block comments into line comments
	// to avoid early termination of jsdoc comments
	const start = node.value.indexOf('/*')
	const end = node.value.indexOf('*/') + 2
	const blockComment = node.value.substring(start, end)
	const lineComments = blockComment
		.split('\n')
		.slice(1, -1)
		.map((str) => `// ${str}`)
		.join('\n')
	node.value = node.value.replace(blockComment, lineComments)
}
