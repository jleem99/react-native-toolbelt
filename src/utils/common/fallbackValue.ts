/**
 * 훅이 조건부로 사용되는 상황에 활용 (Nullish coalescing operator)
 *
 * @example
 * fallbackValue(value, useFoo()) // `value ?? useFoo()`
 */
export default function fallbackValue<T, U>(value: T, fallback: U) {
	return value ?? fallback
}
