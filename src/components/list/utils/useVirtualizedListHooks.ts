import { useMemo } from 'react'
import { VirtualizedListEnhancedProps, VirtualizedListHook } from './types'
import useScrollToTopOnTabPress from './useScrollToTopOnTabPress'
import useVirtualizedListStyle from './useVirtualizedListStyle'

export default function useVirtualizedListHooks<
	P extends VirtualizedListEnhancedProps,
>({
	scrollToTopOnTabPress,
	forceUnmountInitialComponents,
	...props
}: P): VirtualizedListHook<P> {
	/** `scroolToTopOnTabPress` 처리 */
	const refs = useScrollToTopOnTabPress(scrollToTopOnTabPress)

	/** `forceUnmountInitialComponents` 처리 */
	const props2 = {
		maxToRenderPerBatch: props.initialNumToRender,
		scrollsToTop: forceUnmountInitialComponents && false,
		...props,
		initialNumToRender: forceUnmountInitialComponents
			? 0
			: props.initialNumToRender,
	}

	/** VirtualizedList 관련 스타일 처리 */
	const { style, contentContainerStyle, restProps } =
		useVirtualizedListStyle(props2)

	return useMemo<VirtualizedListHook<P>>(
		() => ({
			...refs,
			injectProps: {
				style,
				contentContainerStyle,
				showsVerticalScrollIndicator: false,
				showsHorizontalScrollIndicator: false,
				...restProps,
			} as P,
		}),
		[refs, style, contentContainerStyle, restProps],
	)
}
