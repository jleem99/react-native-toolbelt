import { RefObject, useCallback, useRef, useState } from 'react'
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	NativeSyntheticEvent,
	TextLayoutEventData,
	TextLayoutLine,
	View,
} from 'react-native'
import Animated from 'react-native-reanimated'

const INITIAL_LAYOUT = { x: 0, y: 0, width: 0, height: 0 }

/**
 * useLayout
 */

export type UseLayout = [LayoutRectangle, (e: LayoutChangeEvent) => void]

export default function useLayout(): UseLayout {
	const [layout, setLayout] = useState<LayoutRectangle>(INITIAL_LAYOUT)
	const onLayout = useCallback<UseLayout[1]>((e) => {
		setLayout(e.nativeEvent.layout)
	}, [])

	return [layout, onLayout]
}

/**
 * useTextLayout
 */

export type UseTextLayout = [
	TextLayoutLine[],
	(e: NativeSyntheticEvent<TextLayoutEventData>) => void,
]

export function useTextLayout(): UseTextLayout {
	const [layout, setLayout] = useState<TextLayoutLine[]>([])
	const onLayout = useCallback<UseTextLayout[1]>((e) => {
		setLayout(e.nativeEvent.lines)
	}, [])

	return [layout, onLayout]
}

export type UseMeasuredLayout = {
	ref: RefObject<Animated.View & View>
	layout: LayoutRectangle
	onLayout: () => void
}

export const useMeasuredLayout = (
	animationDuration = 300,
): UseMeasuredLayout => {
	const ref = useRef<Animated.View & View>(null)
	const [layout, setLayout] = useState<LayoutRectangle>(INITIAL_LAYOUT)

	const measureLayout = () => {
		ref.current?.measureInWindow((x, y, width, height) =>
			setLayout({ x, y, width, height }),
		)
	}

	const onLayout = useCallback(() => {
		measureLayout()
		/** 애니메이션 종료 이후 재측정 */
		setTimeout(measureLayout, animationDuration)
	}, [animationDuration])

	return { ref, layout, onLayout }
}
