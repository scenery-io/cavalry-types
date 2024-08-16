#!/usr/bin/env node
import { join, resolve } from 'path'
import { createTsDefinitions } from './modules/generate.js'
import { parseDefinitions, parseDocs } from './modules/parse.js'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { __dirname } from './modules/const.js'
import * as prettier from 'prettier'
import { cwd } from 'process'

const app = 'Cavalry Beta'
const defs = await parseDefinitions(app)
const docs = await parseDocs()

let merged = {}
for (const ns in defs) {
	const order = Object.keys(docs[ns])
	merged[ns] = defs[ns]
		.slice()
		.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
		.map((def) => {
			const doc = docs[ns][def.name]
			return Object.assign({}, def, doc)
		})
}

await writeFile(
	join(cwd(), `definitions.json`),
	JSON.stringify(merged, undefined, 2),
	'utf-8',
)

const ts = createTsDefinitions(merged)
for (const ns in ts) {
	const data = ts[ns]
	const path = join(cwd(), 'types')
	const file = join(path, `${ns}.d.ts`)
	const formatted = await prettier.format(data, {
		filepath: resolve(cwd(), '.prettierrc.json'),
		parser: 'typescript',
	})
	if (!existsSync(path)) {
		await mkdir(path)
	}
	await writeFile(file, formatted, 'utf-8')
}
