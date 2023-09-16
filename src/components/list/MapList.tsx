import React from 'react'
import {
	FlatListProps,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { ListItemComponentProps, ListItemExtraPropsType } from './types'
import {
	defaultKeyExtractor,
	isReactComponent,
	propsAreShallowEqual,
} from '../../utils'

export type MapListProps<T, P extends ListItemComponentProps<T>> = Pick<
	FlatListProps<T>,
	| 'data'
	| 'ListHeaderComponent'
	| 'ListFooterComponent'
	| 'ListEmptyComponent'
	| 'ItemSeparatorComponent'
	| 'keyExtractor'
> & {
	ListItemComponent: (info: P) => React.ReactElement | null
	containerStyle?: StyleProp<ViewStyle>
	wrapRow?: boolean
} & ListItemExtraPropsType<T, P>

const MapList = <T, P extends ListItemComponentProps<T>>({
	data,
	containerStyle,
	ListItemComponent,
	ListItemExtraProps,
	ListHeaderComponent: Header,
	ListFooterComponent: Footer,
	ListEmptyComponent: Empty,
	ItemSeparatorComponent: Separator,
	keyExtractor = defaultKeyExtractor,
	wrapRow,
}: MapListProps<T, P>) => {
	const dataArray = Array.from(data ?? [])

	const renderItem = (props: P) => <ListItemComponent {...props} />

	return (
		<View style={[containerStyle, wrapRow && styles.wrapRow]}>
			{isReactComponent(Header) ? <Header /> : Header}
			{dataArray.length === 0 &&
				(typeof Empty === 'function' ? <Empty /> : Empty)}
			{dataArray.map((item: T, index: number) => (
				<React.Fragment key={keyExtractor(item, index)}>
					{index !== 0 && Separator && <Separator />}
					{renderItem({ item, index, ...ListItemExtraProps } as P)}
				</React.Fragment>
			))}
			{isReactComponent(Footer) ? <Footer /> : Footer}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
})

export default React.memo(
	MapList,
	propsAreShallowEqual(['ListItemExtraProps']),
) as typeof MapList
