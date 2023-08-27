import { hasKey } from '../common'

export const defaultKeyExtractor = (item: unknown, index: number) => {
	if (typeof item === 'object' && item !== null) {
		let key: unknown
		if (hasKey('key', item)) key = item.key
		if (hasKey('id', item)) key = item.id
		if (typeof key === 'string') return key
		if (typeof key === 'number') return key.toString()
	}
	return index.toString()
}

export const indexExtractor = (_: unknown, index: number) => index.toString()
