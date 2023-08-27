import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { FlatList as RGNHFlatList } from 'react-native-gesture-handler'
import { FlatListLayoutContext } from './FlatListLayoutContext'
import { FlatListProps } from './types'
import useFlatListRenderer from './useFlatListRenderer'
import { useLayout } from '../../../hooks'
import { indexExtractor, propsAreShallowEqual } from '../../../utils'
import { ListItemComponentProps } from '../types'
import useVirtualizedListHooks from '../utils/useVirtualizedListHooks'

const FlatListAnimated = Animated.createAnimatedComponent(RGNHFlatList)

const FlatList = <T, P extends ListItemComponentProps<T>>({
	useIndexAsKey,
	columnWrapperStyle,
	keyExtractor,
	FlatListComponent = FlatListAnimated,
	...props
}: FlatListProps<T, P>) => {
	const { flatListRef, injectProps } = useVirtualizedListHooks(props)
	const [layout, onLayout] = useLayout()

	return (
		<FlatListLayoutContext.Provider value={layout}>
			<FlatListComponent
				ref={flatListRef}
				onLayout={onLayout}
				keyExtractor={useIndexAsKey ? indexExtractor : keyExtractor}
				columnWrapperStyle={
					(props.numColumns ?? 1) > 1
						? [styles.columnWrapper, columnWrapperStyle]
						: undefined
				}
				{...useFlatListRenderer(injectProps)}
			/>
		</FlatListLayoutContext.Provider>
	)
}

const styles = StyleSheet.create({
	columnWrapper: { justifyContent: 'space-between' },
})

export default React.memo(
	FlatList,
	propsAreShallowEqual(['ListItemExtraProps']),
) as typeof FlatList
