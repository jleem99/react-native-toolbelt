import { ListRenderItemInfo } from 'react-native'

type UnknownExtraProps = Record<string, unknown>

/* ------------------------- ListItemComponentProps ------------------------- */
export type ListItemComponentProps<T, ExtraProps = UnknownExtraProps> = Pick<
	ListRenderItemInfo<T>,
	'item'
> &
	Partial<ListRenderItemInfo<T>> &
	ExtraProps

// FIXME
/** ExtraProps의 지정 여부에 따라 ListItemExtraProps의 optional 여부를 결정 */
export type ListItemExtraPropsType<T, P> = P extends ListItemComponentProps<
	T,
	infer ExtraProps
>
	? UnknownExtraProps extends ExtraProps
		? ListItemExtraPropsOptional
		: ListItemExtraPropsRequired<ExtraProps>
	: ListItemExtraPropsOptional

type ListItemExtraPropsRequired<T> = {
	/** ListItemComponent로 추가로 전달할 props (레퍼런스 유지 필요) */
	ListItemExtraProps: T
}
type ListItemExtraPropsOptional = {
	/** ListItemComponent로 추가로 전달할 props (레퍼런스 유지 필요) */
	ListItemExtraProps?: UnknownExtraProps
}

/* ------------------------- GridItemComponentProps ------------------------- */
export type GridItemComponentProps<
	T,
	ExtraProps = UnknownExtraProps,
> = ListItemComponentProps<T, ExtraProps & { gridStyle: GridStyle }>

// prettier-ignore
export type GridStyle = |
	{ width: number; height: number } |
	{ aspectRatio: number; width: number } |
	{ aspectRatio: number; height: number }

// FIXME
// export type GridItemExtraPropsType<T, P> = P extends GridItemComponentProps<
// 	T,
// 	infer ExtraProps
// >
// 	? UnknownExtraProps extends ExtraProps
// 		? ListItemExtraPropsOptional
// 		: ListItemExtraPropsRequired<ExtraProps>
// 	: ListItemExtraPropsOptional
