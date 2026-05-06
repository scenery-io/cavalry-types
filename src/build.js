#!/usr/bin/env node
import { basename, join, resolve } from 'path'
import { createTsDefinitions } from './modules/generate.js'
import { existsSync, readFileSync } from 'fs'
import { readdir, writeFile } from 'fs/promises'
import { __dirname, color, contexts } from './modules/const.js'
import * as prettier from 'prettier'
import { cwd } from 'process'
import { mkdirp } from 'mkdirp'
// import { fix } from './modules/fix.js'
import { parseDocs, parseDefinitions } from './modules/parse.js'
import groupBy from 'just-group-by'

const app = 'Cavalry'
const defs = await parseDefinitions(app)
const docs = await parseDocs()
const intermediatePath = join(cwd(), 'intermediate')

// await writeFile(
// 	join(intermediatePath, `defs.json`),
// 	JSON.stringify(defs, undefined, 2),
// 	'utf-8',
// )

// await writeFile(
// 	join(intermediatePath, `docs.json`),
// 	JSON.stringify(docs, undefined, 2),
// 	'utf-8',
// )

let merged = {}

for (const namespace in defs) {
	const docapis = groupBy(docs[namespace], ({ name }) => name)
	const defapis = groupBy(defs[namespace], ({ name }) => name)

	merged = Object.assign(merged, {
		[namespace]: {},
	})

	for (const api in defapis) {
		if (!docapis[api]?.[0]) {
			console.log('Missing docs', color(`${namespace}.${api}`))
			merged[namespace][api] = defapis[api][0]
			continue
		}
		// merged[namespace][api] = Object.assign(docapis[api][0], defapis[api][0])
	}
	for (const api in docapis) {
		if (!defapis[api]?.[0]) {
			console.log('Missing defs', color(`${namespace}.${api}`))
			merged[namespace][api] = docapis[api][0]
			continue
		}
		merged[namespace][api] = Object.assign(defapis[api][0], docapis[api][0])
	}
}

// await writeFile(
// 	join(intermediatePath, `merged.json`),
// 	JSON.stringify(merged, undefined, 2),
// 	'utf-8',
// )

// throw new Error('')

let final = {}
for (const namespace in merged) {
	final[namespace] = []
	for (const api in merged[namespace]) {
		final[namespace].push(merged[namespace][api])
	}
}

// await writeFile(
// 	join(intermediatePath, `merged.json`),
// 	JSON.stringify(final, undefined, 2),
// 	'utf-8',
// )

const extrasPath = join(cwd(), 'src', 'missing_metadata')
const extrasFiles = await readdir(extrasPath)
const extras = {}
extrasFiles.forEach((file) => {
	console.log(`Parsing ${color(basename(file))}`)
	const content = readFileSync(join(extrasPath, file), 'utf-8')
	const data = JSON.parse(content)
	Object.assign(extras, data)
})

final = Object.assign({}, final, extras)

// await writeFile(
// 	join(intermediatePath, `merged.json`),
// 	JSON.stringify(final, undefined, 2),
// 	'utf-8',
// )

// const fixed = fix(final)

await writeFile(
	join(intermediatePath, `definitions.json`),
	JSON.stringify(final, undefined, 2),
	'utf-8',
)

const ts = createTsDefinitions(final)
for (const ns in ts) {
	const data = ts[ns]
	// await writeFile(join(intermediatePath, `${ns}.d.ts`), data, 'utf-8')
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
