import { copyFileSync, existsSync, readFileSync } from 'fs'
import { selectAll } from 'unist-util-select'
import { mkdir, readdir } from 'fs/promises'
import groupBy from 'just-group-by'
import { basename, join } from 'path'
import { readFile } from 'fs/promises'
import remarkParse from 'remark-parse'
import directive from 'remark-directive'
import { unified } from 'unified'
import { __dirname, Namespaces } from './const.js'
import { cwd } from 'process'
import { toMarkdown } from 'mdast-util-to-markdown'
import { visit } from 'unist-util-visit'
import { findAfter } from 'unist-util-find-after'

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
		console.log(`Parsing ${basename(destPath)}`)
		const data = readFileSync(destPath, 'utf-8')
		return JSON.parse(data)
	})
	const namespaces = groupBy(defs, ({ namespace }) => namespace)
	return namespaces
}

// TODO: Parse admonitions
export async function parseDocs() {
	let apis = {}
	for (const ns in Namespaces) {
		const { files } = Namespaces[ns]
		for (const file of files) {
			// TODO: Check Web APIs are merged correctly
			if (file.includes('web-apis')) {
				continue
			}
			const path = join(cwd(), 'src', 'docs', file)
			console.log(`Parsing ${basename(path)}`)
			const mdx = await readFile(path, 'utf-8')
			const ast = unified().use(directive).use(remarkParse).parse(mdx)
			const tree = await unified().run(ast)
			const members = parseFunctions(tree)
			apis[ns] = Object.assign({}, apis[ns], members)
		}
	}
	return apis
}

export async function parseDefinitionsFromDocs() {
	let widgets = []
	for (const ns in Namespaces) {
		const { files } = Namespaces[ns]
		for (const file of files) {
			if (!file.includes('script-uis')) {
				continue
			}
			const path = join(cwd(), 'src', 'docs', file)
			console.log(`Parsing ${basename(path)}`)
			const mdx = await readFile(path, 'utf-8')
			const ast = unified().use(directive).use(remarkParse).parse(mdx)
			const tree = await unified().run(ast)
			widgets = parseWidgets(tree)
		}
	}
	return widgets
}

function parseFunctions(tree) {
	const ast = JSON.parse(JSON.stringify(tree))
	visit(
		ast,
		(node) => node.type === 'heading' && node.depth === 4,
		(node, index, parent) => {
			const start = node
			const startIndex = index
			const depth = start.depth
			const isEnd = (node) =>
				(node.type === 'heading' && node.depth <= depth) ||
				node.type === 'export'
			const end = findAfter(parent, start, isEnd)
			const endIndex = parent.children.indexOf(end)
			const between = parent.children.slice(
				startIndex,
				endIndex > 0 ? endIndex : undefined,
			)
			const group = {
				type: 'api',
				depth: depth,
				children: between,
				data: {
					hName: 'api',
				},
			}
			parent.children.splice(startIndex, group.children.length, group)
		},
	)
	return ast.children.reduce((obj, node) => {
		if (node.type === 'api') {
			let name = ''
			let examples = []
			let descriptions = []
			node.children.forEach((child) => {
				if (child.type === 'heading') {
					name = child.children[0].value.split(/\(|\s/)[0]
				}
				if (child.type === 'code') {
					// NOTE: Turns block comments into line comments
					// to avoid early termination of jsdoc comments
					if (child.value.includes('/*')) {
						const start = child.value.indexOf('/*')
						const end = child.value.indexOf('*/') + 2
						const blockComment = child.value.substring(start, end)
						const lineComments = blockComment
							.split('\n')
							.slice(1, -1)
							.map((str) => `// ${str}`)
							.join('\n')
						child.value = child.value.replace(
							blockComment,
							lineComments,
						)
					}
					examples.push(child.value)
				}
				// TODO: Debug `cavalry` class descriptions
				if (child.type === 'paragraph') {
					descriptions.push(toMarkdown(child).trim())
				}
			})
			obj[name] = {
				// TODO: Check admonition issue here
				docs_description: descriptions.join('\n\n'),
				examples,
			}
			// if (!obj[name].examples.length) {
			// 	console.log(`Code example missing for ${name}`)
			// }
		}
		return obj
	}, {})
}

function parseWidgets(tree) {
	const members = []
	const widgetClass = selectAll(
		'heading[depth="2"]:has([value="Widgets"]) ~ heading[depth="4"]:has([value="Common Functions"]) + paragraph + list',
		tree,
	)[0]
	members.push({
		name: 'Widget',
		type: 'class',
		constructors: {},
		properties: [],
		methods: [],
		examples: [],
		...parseList(widgetClass, 'Widget'),
	})
	const widgets = selectAll(
		'heading[depth="2"]:has([value="Widgets"]) ~ heading[depth="3"], heading[depth="3"] ~ list, heading[depth="3"] ~ code',
		tree,
	)
	const widgetNodes = groupWidgets(widgets)
	for (const { node, children } of widgetNodes) {
		const className = node.children[0].value
		if (className === 'FlowLayout') {
			break
		}
		let widget = {
			name: className,
			extends: 'Widget',
			type: 'class',
			constructors: {},
			properties: [],
			methods: [],
			examples: [],
		}
		for (const child of children) {
			if (child.type === 'list') {
				const { constructors, methods } = parseList(child, className)
				widget.constructors = Object.assign(
					widget.constructors,
					constructors,
				)
				widget.methods = widget.methods.concat(methods)
			}
			if (child.type === 'code') {
				widget.examples.push(child.value)
			}
		}
		members.push(widget)
	}
	const others = selectAll(
		'heading[depth="2"]:has([value="Layouts"]) ~ heading[depth="3"], heading[depth="3"] ~ list, heading[depth="3"] ~ code',
		tree,
	)
	const otherNodes = groupWidgets(others)
	for (const { node, children } of otherNodes) {
		const className = node.children[0].value
		let widget = {
			name: className,
			type: 'class',
			constructors: {},
			properties: [],
			methods: [],
			examples: [],
		}
		for (const child of children) {
			if (child.type === 'list') {
				const { constructors, methods } = parseList(child, className)
				if (className === 'VLayout') {
					console.log(methods)
				}
				widget.constructors = Object.assign(
					widget.constructors,
					constructors,
				)
				widget.methods = widget.methods.concat(methods)
			}
			if (child.type === 'code') {
				widget.examples.push(child.value)
			}
		}
		members.push(widget)
	}
	return members
}

function parseList(list, className) {
	const constructors = {}
	const methods = []
	for (const item of list.children) {
		const method = item.children[0].children[0].value
		const name = method.replace(/\(.+/, '')
		if (name.includes(' ')) {
			continue
		}
		const description =
			toMarkdown(item)
				.match(/\/\/.+/)?.[0]
				.replace('//', '')
				.trim() || ''
		const args = (method.match(/[A-Za-z]+:[A-Za-z]+/g) || []).map((arg) => {
			const [name, type] = arg.split(':')
			return {
				name,
				type,
				required: true,
			}
		})
		const result = (method.match(/→.+/)?.[0] || '').replace('→', '').trim()
		if (name === className) {
			constructors.arguments = args
		} else {
			methods.push({
				name,
				description,
				arguments: args,
				return_type: result,
			})
		}
	}
	return { constructors, methods }
}

function groupWidgets(nodes) {
	const result = []
	let currentGroup = null
	for (const node of nodes) {
		if (node.type === 'heading') {
			if (currentGroup) {
				result.push(currentGroup)
			}
			currentGroup = {
				node,
				children: [],
			}
		} else if (currentGroup) {
			currentGroup.children.push(node)
		}
	}
	if (currentGroup) {
		result.push(currentGroup)
	}
	return result
}
