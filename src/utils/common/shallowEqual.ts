/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
export default function shallowEqual(a: any, b: any) {
	if (a === b) return true
	if (!(a instanceof Object) || !(b instanceof Object)) return false

	const keys = Object.keys(a)
	const length = keys.length

	for (let i = 0; i < length; i++) {
		// @ts-ignore
		if (!(keys[i] in b)) return false
	}

	for (let i = 0; i < length; i++) {
		// @ts-ignore
		if (a[keys[i]] !== b[keys[i]]) return false
	}

	return length === Object.keys(b).length
}
