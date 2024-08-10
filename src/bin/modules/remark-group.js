// NOTE: Based on https://github.com/jake-low/remark-sectionize

import { findAfter } from 'unist-util-find-after'
import { visit } from 'unist-util-visit'

export default function plugin() {
	return transform
}

function transform(tree) {
	visit(tree, (node) => node.type === 'heading' && node.depth === 4, group)
}

function group(node, index, parent) {
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
		endIndex > 0 ? endIndex : undefined
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
}
