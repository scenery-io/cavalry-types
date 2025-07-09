export function removeNullValues(obj) {
	if (Array.isArray(obj)) {
		return obj
			.map((item) => (isObject(item) ? removeNullValues(item) : item))
			.filter((item) => item !== null)
	} else if (isObject(obj)) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => {
				if (value === null) {
					return [key, []]
				}
				return [key, removeNullValues(value)]
			}),
		)
	} else {
		return obj
	}
}

function isObject(obj) {
	return typeof obj === 'object' && obj !== null
}
