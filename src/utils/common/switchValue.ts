/**
 * 훅이 조건부로 사용되는 상황에 활용 (Ternary operator)
 *
 * @example
 * switchValue(condition, useFoo(), useBar()) // `condition ? useFoo() : useBar()`
 */
export default function switchValue<T, U>(
	condition: boolean | undefined,
	valueOnTrue: T,
	valueOnFalse: U,
) {
	return condition ? valueOnTrue : valueOnFalse
}
