import { StyleProp, StyleSheet } from 'react-native'
import { isUndefined, omitBy } from 'lodash-es'
import { Style } from './types'

export default function sanitizeContainerStyle<
	T extends Style & { elevation?: number },
>(style: StyleProp<T>) {
	const {
		flex,
		margin,
		marginLeft,
		marginRight,
		marginBottom,
		marginTop,
		marginHorizontal,
		marginVertical,
		position,
		left,
		right,
		bottom,
		top,
		zIndex,
		shadowColor,
		shadowOffset,
		shadowOpacity,
		shadowRadius,
		elevation,
		...sanitizedStyle
	} = StyleSheet.flatten(style) ?? {}

	const containerStyle = omitBy(
		{
			flex,
			margin,
			marginLeft,
			marginRight,
			marginBottom,
			marginTop,
			marginHorizontal,
			marginVertical,
			position,
			left,
			right,
			bottom,
			top,
			zIndex,
			shadowColor,
			shadowOffset,
			shadowOpacity,
			shadowRadius,
			elevation,
			borderRadius: sanitizedStyle.borderRadius,
			alignSelf: sanitizedStyle.alignSelf,
		},
		isUndefined,
	)

	return { sanitizedStyle, containerStyle }
}
