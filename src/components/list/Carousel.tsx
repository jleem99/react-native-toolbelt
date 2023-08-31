/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo } from 'react'
import {
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
	useWindowDimensions,
} from 'react-native'
import FlatList, { FlatListProps } from './FlatList'
import { ListItemComponentProps } from './types'
import { useItemLayout } from '../../hooks/useItemLayout'
import { SubPartial } from '../../utils'

interface CarouselProps<T, P extends ListItemComponentProps<T>>
	extends SubPartial<FlatListProps<T, P>, 'initialNumToRender' | 'windowSize'> {
	itemWidth: number
	itemMargin: number
	itemWrapperStyle?: StyleProp<ViewStyle>
}

const Carousel = <T, P extends ListItemComponentProps<T>>({
	itemWidth,
	itemMargin,
	itemWrapperStyle,
	ListItemComponent: ListItemComponentProp,
	style,
	paddingHorizontal = 16,
	windowSize = 3,
	...flatListProps
}: CarouselProps<T, P>) => {
	const interval = itemWidth + itemMargin

	const ListItemComponent = useCallback<typeof ListItemComponentProp>(
		(info) => (
			<View
				style={[
					{ width: itemWidth, marginLeft: info.index !== 0 ? itemMargin : 0 },
					itemWrapperStyle,
				]}
			>
				<ListItemComponentProp {...info} />
			</View>
		),
		[ListItemComponentProp, itemMargin, itemWidth, itemWrapperStyle],
	)

	return (
		<FlatList
			style={useMemo(() => [styles.overflowVisible, style], [style])}
			horizontal
			ListItemComponent={ListItemComponent}
			getItemLayout={useItemLayout(interval)}
			snapToInterval={interval}
			snapToAlignment="start"
			decelerationRate="fast"
			paddingHorizontal={paddingHorizontal}
			windowSize={windowSize}
			initialNumToRender={Math.ceil(
				useWindowDimensions().width / (itemWidth + itemMargin),
			)}
			{...flatListProps}
		/>
	)
}

const styles = StyleSheet.create({
	overflowVisible: { overflow: 'visible', zIndex: 1 },
})

export default React.memo(Carousel)
