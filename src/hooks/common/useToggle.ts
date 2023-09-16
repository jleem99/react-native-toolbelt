import { useRef, useState } from 'react'

/**
 * 불리언 값을 토글하기 위한 훅
 *
 * @returns [value, toggleValue]
 * - value 현재 불리언 값
 * - toggleValue 불리언 값을 반전시킨다. 업데이트 된 불리언 값을 리턴
 */
export default function useToggle(initialValue: boolean = false): UseToggle {
	const [value, setValue] = useState(initialValue)
	// toggleValue의 레퍼런스 유지를 위해 사용
	const valueRef = useRef(initialValue)

	// 한 렌더링에 여러 번 호출해도 한번만 작동된다.
	const toggleValue = useRef(() => {
		valueRef.current = !valueRef.current
		setValue(valueRef.current)
		return valueRef.current
	}).current

	return [value, toggleValue]
}

export type UseToggle = [boolean, () => boolean]
