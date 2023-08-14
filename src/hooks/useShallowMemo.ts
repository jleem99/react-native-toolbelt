import { useRef } from 'react'
import { shallowEqual } from '../utils'

export default function useShallowMemo<T extends Record<string, any>>(
	value: T,
): T {
	const previousValue = useRef<T>(value)

	if (shallowEqual(value, previousValue.current)) {
		return previousValue.current
	} else {
		previousValue.current = value
		return value
	}
}
