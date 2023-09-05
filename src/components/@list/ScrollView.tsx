import React from 'react'
import {
	Animated,
	ScrollViewProps as ScrollViewDefaultProps,
} from 'react-native'
import { ScrollView as ScrollViewDefault } from 'react-native-gesture-handler'
import { WithVirtualizedListBaseProps } from './utils/types'
import useVirtualizedListHooks from './utils/useVirtualizedListHooks'

const ScrollViewDefaultAnimated = Animated.createAnimatedComponent(
	ScrollViewDefault,
) as typeof ScrollViewDefault

export type ScrollViewProps =
	WithVirtualizedListBaseProps<ScrollViewDefaultProps>

const ScrollView = (props: ScrollViewProps) => {
	const { scrollViewRef, injectProps } = useVirtualizedListHooks(props)

	return <ScrollViewDefaultAnimated ref={scrollViewRef} {...injectProps} />
}

export default React.memo(ScrollView)
