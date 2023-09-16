import { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VirtualizedListEnhancedProps } from './types'
import { useShallowMemo } from '../../../hooks'

export default function useVirtualizedListStyle({
	contentContainerStyle,
	extraPaddingBottom = 24,
	useTransparentBottomSpace,
	style,
	...props0
}: VirtualizedListEnhancedProps) {
	const { bottom: bottomInset } = useSafeAreaInsets()

	const { paddingVertical = 0, paddingHorizontal = 0, ...props1 } = props0

	let paddingBottom = paddingVertical
	if (useTransparentBottomSpace) {
		paddingBottom += bottomInset
	}
	if (!props1.horizontal) {
		paddingBottom += extraPaddingBottom
	}

	const restProps = useShallowMemo(props1)

	return useMemo(
		() => ({
			style,
			contentContainerStyle: [
				{
					paddingHorizontal,
					paddingTop: paddingVertical,
					paddingBottom,
				},
				contentContainerStyle,
			],
			restProps,
		}),
		[
			style,
			paddingHorizontal,
			paddingVertical,
			paddingBottom,
			contentContainerStyle,
			restProps,
		],
	)
}
