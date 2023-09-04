import { useRef, useState } from 'react'
import { FlatListProps, ViewabilityConfig } from 'react-native'

export type UseViewableItems = [
	number[],
	Required<
		Pick<FlatListProps<any>, 'onViewableItemsChanged' | 'viewabilityConfig'>
	>,
]

export default function useViewableItems(
	threshold = 100,
	config: ViewabilityConfig = {},
): UseViewableItems {
	const [indices, setIndices] = useState<number[]>([])

	const injectProps = useRef<UseViewableItems[1]>({
		onViewableItemsChanged: ({ viewableItems }) => {
			setIndices(viewableItems.map((item) => item.index ?? 0))
		},
		viewabilityConfig: { itemVisiblePercentThreshold: threshold, ...config },
	}).current

	return [indices, injectProps]
}
