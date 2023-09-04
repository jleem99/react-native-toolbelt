import { useMemo } from 'react'
import { VirtualizedListEnhancedProps, VirtualizedListHook } from './types'
import useScrollToTopOnTabPress from './useScrollToTopOnTabPress'

export default function useVirtualizedListHooks<
	P extends VirtualizedListEnhancedProps,
>({
	scrollToTopOnTabPress,
	forceUnmountInitialComponents,
	...props
}: P): VirtualizedListHook<P> {
	const refs = useScrollToTopOnTabPress(scrollToTopOnTabPress)

	return useMemo<VirtualizedListHook<P>>(
		() => ({
			...refs,
			injectProps: {
				showsVerticalScrollIndicator: false,
				showsHorizontalScrollIndicator: false,
				maxToRenderPerBatch: props.initialNumToRender,
				scrollsToTop: forceUnmountInitialComponents && false,
				...props,
				initialNumToRender: forceUnmountInitialComponents
					? 0
					: props.initialNumToRender,
			} as P,
		}),
		[refs, props, forceUnmountInitialComponents],
	)
}
