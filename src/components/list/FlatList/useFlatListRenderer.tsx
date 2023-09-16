import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { noop } from 'lodash'
import { FlatListIndexContext } from './FlatListIndexContext'
import { FlatListProps } from './types'
import { Pressable } from '../../button'
import { ListItemComponentProps } from '../types'

export default function useFlatListRenderer<
	T,
	P extends ListItemComponentProps<T>,
>({
	ListItemComponent,
	ListItemExtraProps,
	onListItemPress = noop,
	...props
}: FlatListProps<T, P>) {
	const renderItemPressable = useCallback<ListRenderItem<T>>(
		(info) => (
			<FlatListIndexContext.Provider value={info.index}>
				<Pressable onPress={() => onListItemPress(info)}>
					<ListItemComponent {...info} {...(ListItemExtraProps as P)} />
				</Pressable>
			</FlatListIndexContext.Provider>
		),
		[ListItemComponent, ListItemExtraProps, onListItemPress],
	)

	const renderItem = useCallback<ListRenderItem<T>>(
		(info) => (
			<FlatListIndexContext.Provider value={info.index}>
				<ListItemComponent {...info} {...(ListItemExtraProps as P)} />
			</FlatListIndexContext.Provider>
		),
		[ListItemComponent, ListItemExtraProps],
	)

	return {
		renderItem: onListItemPress !== noop ? renderItemPressable : renderItem,
		...props,
	}
}
