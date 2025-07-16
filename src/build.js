#!/usr/bin/env node
import { basename, join, resolve } from 'path'
import { createTsDefinitions } from './modules/generate.js'
import { parseDefinitions, parseDocs } from './modules/parse.js'
import { existsSync, readFileSync } from 'fs'
import { readdir, writeFile } from 'fs/promises'
import { __dirname, contexts, Namespaces } from './modules/const.js'
import * as prettier from 'prettier'
import { cwd } from 'process'
import { mkdirp } from 'mkdirp'

const app = 'Cavalry Beta'
const defs = await parseDefinitions(app)
const docs = await parseDocs()

await writeFile(
	join(cwd(), `docs.json`),
	JSON.stringify(docs, undefined, 2),
	'utf-8',
)

let merged = {}
for (const ns in defs) {
	// TODO: Merge `cavalry` classes properly
	const order = Object.keys(docs[ns])
	const namespace = Namespaces[ns]?.name || ns
	if (!namespace) {
		throw new Error(`Unknown namespace ${ns}`)
	}
	merged[namespace] = defs[ns]
		.slice()
		.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
		.map((def) => {
			const doc = docs[ns][def.name]
			return Object.assign({}, def, doc)
		})
}

const extrasPath = join(cwd(), 'src', 'missing_metadata')
const extras = await readdir(extrasPath)
extras.forEach((file) => {
	console.log(`Parsing ${basename(file)}`)
	const content = readFileSync(join(extrasPath, file), 'utf-8')
	const data = JSON.parse(content)
	const ns = basename(file, '.json')
	merged[ns] = data
})

await writeFile(
	join(cwd(), `definitions.json`),
	JSON.stringify(merged, undefined, 2),
	'utf-8',
)

const ts = createTsDefinitions(merged)
for (const ns in ts) {
	const data = ts[ns]
	const path = join(cwd(), 'types', 'namespaces')
	const file = join(path, `${ns}.d.ts`)
	const formatted = await prettier.format(data, {
		filepath: resolve(cwd(), '.prettierrc.json'),
		parser: 'typescript',
	})
	if (!existsSync(path)) {
		await mkdirp(path)
	}
	await writeFile(file, formatted, 'utf-8')
}

for (const { name, namespaces } of contexts) {
	const file = join(cwd(), 'types', `${name}.d.ts`)
	const baseLibs = [`no-default-lib="true"`, `lib="es2021"`]
	const cavalryLibs = namespaces.map(
		(lib) => `path="./namespaces/${lib}.d.ts"`,
	)
	const libs = baseLibs
		.concat(cavalryLibs)
		.map((lib) => `/// <reference ${lib} />`)
		.join('\n')
	await writeFile(file, libs, 'utf-8')
}
