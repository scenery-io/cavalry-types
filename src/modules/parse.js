import { copyFileSync, existsSync, readFileSync } from 'fs'
import { mkdir, readdir } from 'fs/promises'
import groupBy from 'just-group-by'
import { basename, join } from 'path'
import { readFile } from 'fs/promises'
import remarkParse from 'remark-parse'
import directive from 'remark-directive'
import group from './remark-group.js'
import { unified } from 'unified'
import { __dirname, Namespaces } from './const.js'
import { assert } from 'console'
import { cwd } from 'process'
import { toMarkdown } from 'mdast-util-to-markdown'
import { removeNullValues } from './utils.js'

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
	// TODO: Fix issues in this layer
	// return fixIssues(namespaces)
	return removeNullValues(namespaces)
}

// TODO: Parse admonitions
export async function parseDocs() {
	let apis = {}
	for (const ns in Namespaces) {
		const { files } = Namespaces[ns]
		for (const file of files) {
			// TODO: Check Web APIs are merged correctly
			const path = join(cwd(), 'src', 'docs', file)
			console.log(path)
			const mdx = await readFile(path, 'utf-8')
			const ast = unified().use(directive).use(remarkParse).parse(mdx)
			const content = await unified().use(group).run(ast)
			// TODO: Turn this into a remark plugin?
			// @ts-ignore
			const docs = content.children.reduce((obj, curr) => {
				if (curr.type === 'api') {
					let name = ''
					let examples = []
					let descriptions = []
					curr.children.forEach((child) => {
						if (child.type === 'heading') {
							name = child.children[0].value.split(/\(|\s/)[0]
						}
						if (child.type === 'code') {
							examples.push(child.value)
						}
						if (child.type === 'paragraph') {
							descriptions.push(toMarkdown(child).trim())
						}
					})
					obj[name] = {
						// TODO: Check admonition issue here
						docs_description: descriptions.join('\n\n'),
						examples,
					}
					assert(
						obj[name].examples.length,
						`Missing example for ${name}`,
					)
				}
				return obj
			}, {})
			apis[ns] = Object.assign({}, apis[ns], docs)
		}
	}
	return apis
}
