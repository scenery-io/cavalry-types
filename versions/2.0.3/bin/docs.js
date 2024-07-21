import { readFile } from 'fs/promises'
import { extname, resolve } from 'path'
import remarkParse from 'remark-parse'
import group from './remark-group.js'
import { unified } from 'unified'
import { __dirname } from './const.js'
import { assert } from 'console'

const files = [
	'api-module.mdx',
	'cavalry-module.mdx',
	'context-module.mdx',
	'deformer-module.mdx',
	'render-scripts.mdx',
	'script-uis.mdx',
	'web-apis.mdx',
]

let apis = {}
for (const file of files) {
	if (extname(file) !== '.mdx') {
		continue
	}
	const path = resolve(__dirname, '..', 'docs', file)
	console.log(path)
	const mdx = await readFile(path, 'utf-8')
	const ast = unified().use(remarkParse).parse(mdx)
	const content = await unified().use(group).run(ast)
	const docs = content.children.reduce((obj, curr) => {
		if (curr.type === 'api') {
			let name = ''
			curr.children.forEach((child) => {
				if (child.type === 'heading') {
					name = child.children[0].value.split(/\(|\s/)[0]
					obj[name] = {
						examples: [],
						docs: [],
					}
				}
				if (child.type === 'code') {
					obj[name].examples.push(child.value)
				}
				if (child.type === 'paragraph') {
					child.children.forEach((doc) => {
						obj[name].docs.push(doc.value)
					})
				}
			})
			assert(obj[name].examples.length, `Missing example for ${name}`)
		}
		return obj
	}, {})
	apis = { ...apis, ...docs }
}
// console.log(apis)
