/**
 * 훅이 조건부로 사용되는 것을 방지하기 위해 사용 (Ternary operator)
 *
 * @example
 * switchValue(condition, useFoo(), useBar()) // Same as `condition ? useFoo() : useBar()`
 */
export const switchValue = <T, U>(
	condition: boolean | undefined,
	valueOnTrue: T,
	valueOnFalse: U,
) => (condition ? valueOnTrue : valueOnFalse)

/**
 * 훅이 조건부로 사용되는 것을 방지하기 위해 사용 (Nullish coalescing operator)
 *
 * @example
 * fallbackValue(value, useFoo()) // Same as `value ?? useFoo()`
 */
export const fallbackValue = <T, U>(value: T, fallback: U) => value ?? fallback

// TODO: Documentation
export const hasKey = <K extends string, T extends object>(
	k: K,
	o: T,
): o is T & Record<K, unknown> => k in o

export type BooleanProps<T extends string> = { [Key in T]?: boolean }

// TODO: Documentation
export const useBooleanProps = <
	Keys extends string,
	Value,
	Props extends Partial<BooleanProps<Keys>>,
>(
	valueMap: Record<Keys, Value>,
	props: Props,
): Value | undefined => {
	const keys = Object.keys(valueMap)
	const key = Object.entries(props).find(([k, v]) => keys.includes(k) && v)?.[0]
	return valueMap[key as Keys]
}
