import { useRef } from 'react'
import { Animated } from 'react-native'
import useAnimatedValue from './useAnimatedValue'

export function useScrollX(useNativeDriver = true) {
	const scrollX = useAnimatedValue(0)
	const onScroll = useRef(
		Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
			useNativeDriver,
		}),
	).current

	return [scrollX, onScroll] as const
}

export function useScrollY(useNativeDriver = true) {
	const scrollY = useAnimatedValue(0)
	const onScroll = useRef(
		Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
			useNativeDriver,
		}),
	).current

	return [scrollY, onScroll] as const
}
