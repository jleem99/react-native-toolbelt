import { useRef } from 'react'

export default function useHasValueChanged<T>(value: T) {
	const prevValue = useRef(value)

	const hasValueChanged = prevValue.current === value
	prevValue.current = value

	return hasValueChanged
}
