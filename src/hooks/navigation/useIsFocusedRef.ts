import { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'

/**
 * 별도의 리렌더링이 필요하지 않은 경우 useIsFocused 대신 사용
 */
export default function useIsFocusedRef() {
	const isFocused = useRef(false)

	useFocusEffect(
		useCallback(() => {
			isFocused.current = true

			return () => {
				isFocused.current = false
			}
		}, []),
	)

	return isFocused
}
