import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const Namespaces = {
	'@JS_GUI_API': {
		name: 'api',
		files: ['api-module.mdx', 'web-apis.mdx'],
	},
	'@JS_CTX': {
		name: 'ctx',
		files: ['context-module.mdx'],
	},
	'@JS_DEFORMER': {
		name: 'def',
		files: ['deformer-module.mdx'],
	},
	'@JS_CORE_API': {
		name: 'cavalry',
		files: ['cavalry-module.mdx'],
	},
	'@JS_WIDGET_API': {
		name: 'ui',
		files: ['script-uis.mdx'],
	},
	// TODO: Render namespace
	// '@JS_RENDER': {
	// 	name: 'render',
	// 	files: ['render-scripts.mdx'],
	// },
}
