/**
 * Check if an object has a key, used to help type narrowing
 */
export default function hasKey<K extends string, T extends object>(
	k: K,
	o: T,
): o is T & Record<K, unknown> {
	return k in o
}
