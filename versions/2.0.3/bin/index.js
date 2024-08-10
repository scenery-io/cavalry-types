#!/usr/bin/env node
import { join, resolve } from 'path'
import { createTsDefinitions } from './modules/generate.js'
import { parseDefinitions, parseDocs } from './modules/parse.js'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { __dirname } from './modules/const.js'
import * as prettier from 'prettier'

const app = 'Cavalry Beta'
const defs = await parseDefinitions(app)
const docs = await parseDocs()

let merged = {}
for (const ns in defs) {
	merged[ns] = defs[ns].map((obj) => {
		return Object.assign({}, obj, docs[obj.name])
	})
}

const defsPath = resolve(__dirname, '..', '..', 'defs')
if (!existsSync(defsPath)) {
	await mkdir(defsPath)
}
const file = join(defsPath, `defs.json`)
await writeFile(file, JSON.stringify(merged, undefined, 2), 'utf-8')

const ts = createTsDefinitions(merged)
for (const ns in ts) {
	const data = ts[ns]
	const path = resolve(__dirname, '..', '..', 'output')
	const file = join(path, `${ns}.d.ts`)
	const formatted = await prettier.format(data, {
		filepath: resolve('.prettierrc.json'),
		parser: 'typescript',
	})
	if (!existsSync(path)) {
		await mkdir(path)
	}
	await writeFile(file, formatted, 'utf-8')
}
