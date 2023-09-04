import { useRef } from 'react'
import { Animated } from 'react-native'

export default function useAnimatedValue(initialValue: number) {
	return useRef(new Animated.Value(initialValue)).current
}
