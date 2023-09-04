import React from 'react'
import {
	FlatListProps as FlatListDefaultProps,
	ListRenderItemInfo,
} from 'react-native'
import { ListItemComponentProps } from '../types'
import { WithGestureHandlerVirtualizedListBaseProps } from '../utils/types'

export interface FlatListProps<T, P extends ListItemComponentProps<T>>
	extends WithGestureHandlerVirtualizedListBaseProps<
		Omit<FlatListDefaultProps<T>, 'renderItem'>
	> {
	ListItemComponent: (
		info: P & ListRenderItemInfo<T>,
	) => React.ReactElement | null

	onListItemPress?: (info: ListRenderItemInfo<T>) => void

	/**
	 * `ListItemComponent`로 추가로 전달할 props (레퍼런스 유지 필요)
	 */
	ListItemExtraProps?: Omit<P, 'item' | 'index' | 'separators'>

	/**
	 * @deprecated
	 *
	 * @description
	 * 인덱스를 키로 사용
	 *
	 * @example
	 * keyExtractor={(_: unknown, index: number) => index.toString()}
	 */
	useIndexAsKey?: boolean

	/**
	 * 성능 최적화를 위해 필수로 입력하도록 함
	 *
	 * How many items to render in the initial batch
	 */
	initialNumToRender: number

	/**
	 * 성능 최적화를 위해 필수로 입력하도록 함
	 *
	 * Determines the maximum number of items rendered outside of the visible area, in units of
	 * visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will
	 * render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
	 * this number will reduce memory consumption and may improve performance, but will increase the
	 * chance that fast scrolling may reveal momentary blank areas of unrendered content.
	 */
	windowSize: number

	/**
	 * FlatList로 사용할 컴포넌트
	 *
	 * @default
	 * Animated.createAnimatedComponent(RGNH_FlatList)
	 */
	FlatListComponent?: React.ComponentType<
		FlatListDefaultProps<any> & React.RefAttributes<any>
	>
}
