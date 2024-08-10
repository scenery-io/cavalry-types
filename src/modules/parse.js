import { readFileSync } from 'fs'
import { readdir } from 'fs/promises'
import groupBy from 'just-group-by'
import { join } from 'path'
import { readFile } from 'fs/promises'
import remarkParse from 'remark-parse'
import directive from 'remark-directive'
import markdownx from 'remark-mdx'
import group from './remark-group.js'
import { unified } from 'unified'
import { __dirname, Namespaces } from './const.js'
import { assert } from 'console'
import { cwd } from 'process'

export async function parseDefinitions(packageName = 'Cavalry') {
	const path = join(
		'/Applications',
		`${packageName}.app`,
		'Contents',
		'assets',
		'MetaData',
	)
	const files = await readdir(path)
	const defs = files.flatMap((file) => {
		const filePath = join(path, file)
		const data = readFileSync(filePath, 'utf-8')
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
			const path = join(cwd(), 'src', 'docs', file)
			console.log(path)
			const mdx = await readFile(path, 'utf-8')
			const ast = unified().use(remarkParse).parse(mdx)
			const content = await unified()
				.use(markdownx)
				.use(directive)
				.use(group)
				.run(ast)

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
							child.children.forEach((doc) => {
								descriptions.push(doc.value)
							})
						}
					})
					obj[name] = {
						docs_description: descriptions.join('\n\n'),
						examples,
					}
					// assert(
					// 	obj[name].examples.length,
					// 	`Missing example for ${name}`
					// )
				}
				return obj
			}, {})
			apis = { ...apis, ...docs }
		}
	}
	return apis
}
