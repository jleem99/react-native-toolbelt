import { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { VirtualizedListRef } from './types'
import { useNavigationOfType } from '../../../hooks'

export default function useScrollToTopOnTabPress(enabled: boolean = false) {
	const refs = useRef<VirtualizedListRef>({
		scrollViewRef: useRef(null),
		// keyboardAwareScrollViewRef: useRef(null),
		flatListRef: useRef(null),
	}).current
	const tabBarNavigation = useNavigationOfType('tab')

	useFocusEffect(
		useCallback(() => {
			if (!enabled) return

			const unsubscribe = tabBarNavigation?.addListener('tabPress', () => {
				refs.flatListRef.current?.scrollToOffset({ offset: 0 })
				refs.scrollViewRef.current?.scrollTo({ y: 0 })
				// refs.keyboardAwareScrollViewRef.current?.scrollToPosition(0, 0)
			})
			return unsubscribe
		}, [enabled, refs, tabBarNavigation]),
	)

	return refs
}
