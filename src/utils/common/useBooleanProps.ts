export type BooleanProps<T extends string> = { [Key in T]?: boolean }

/**
 * @example
 * getBooleanProps({ foo: 'hello', bar: 'world' }, { foo: true }) // Returns 'hello'
 */
export default function getBooleanProps<
	Keys extends string,
	Value,
	Props extends Partial<BooleanProps<Keys>>,
>(valueMap: Record<Keys, Value>, props: Props): Value | undefined {
	const keys = Object.keys(valueMap)
	const key = Object.entries(props).find(([k, v]) => keys.includes(k) && v)?.[0]
	return valueMap[key as Keys]
}
