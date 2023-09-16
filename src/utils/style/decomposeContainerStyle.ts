import { StyleProp, StyleSheet } from 'react-native'
import { difference, omit, pick } from 'lodash-es'
import { Style } from '../types'

const CONTAINER_STYLE_KEYS = [
	/** @see {@link module:react-native/ViewStyle} */
	'backfaceVisibility',
	'borderBlockColor',
	'borderBlockEndColor',
	'borderBlockStartColor',
	'borderBottomColor',
	'borderBottomEndRadius',
	'borderBottomLeftRadius',
	'borderBottomRightRadius',
	'borderBottomStartRadius',
	'borderColor',
	'borderCurve',
	'borderEndColor',
	'borderEndEndRadius',
	'borderEndStartRadius',
	'borderLeftColor',
	'borderRadius',
	'borderRightColor',
	'borderStartColor',
	'borderStartEndRadius',
	'borderStartStartRadius',
	'borderStyle',
	'borderTopColor',
	'borderTopEndRadius',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderTopStartRadius',
	'opacity',
	'elevation',
	'pointerEvents',

	/** @see {@link module:react-native/FlexStyle} */
	'alignSelf',
	'aspectRatio',
	'borderBottomWidth',
	'borderEndWidth',
	'borderLeftWidth',
	'borderRightWidth',
	'borderStartWidth',
	'borderTopWidth',
	'borderWidth',
	'bottom',
	'display',
	'end',
	'flex',
	'flexBasis',
	'flexGrow',
	'flexShrink',
	// 'height',
	'left',
	'margin',
	'marginBottom',
	'marginEnd',
	'marginHorizontal',
	'marginLeft',
	'marginRight',
	'marginStart',
	'marginTop',
	'marginVertical',
	// 'maxHeight',
	// 'maxWidth',
	// 'minHeight',
	// 'minWidth',
	'overflow',
	'position',
	'right',
	'start',
	'top',
	// 'width',
	'zIndex',

	/** @see {@link module:react-native/ShadowStyleIOS} */
	'shadowColor',
	'shadowOffset',
	'shadowOpacity',
	'shadowRadius',

	/** @see {@link module:react-native/TransformsStyle} */
	'transform',
	'transformMatrix',
	'rotation',
	'scaleX',
	'scaleY',
	'translateX',
	'translateY',
]

const INHERITED_STYLE_KEYS = [
	/** @see {@link module:react-native/ViewStyle} */
	'borderBottomEndRadius',
	'borderBottomLeftRadius',
	'borderBottomRightRadius',
	'borderBottomStartRadius',
	'borderCurve',
	'borderEndEndRadius',
	'borderEndStartRadius',
	'borderRadius',
	'borderStartEndRadius',
	'borderStartStartRadius',
	'borderTopEndRadius',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderTopStartRadius',

	/** @see {@link module:react-native/FlexStyle} */
	'alignSelf',
	'aspectRatio',
	// 'flex',
	// 'flexBasis',
	// 'flexGrow',
	// 'flexShrink',

	// 'height',
	// 'maxHeight',
	// 'maxWidth',
	// 'minHeight',
	// 'minWidth',
	// 'width',
]

const CONTENT_STYLE_OMIT_KEYS = difference(
	CONTAINER_STYLE_KEYS,
	INHERITED_STYLE_KEYS,
)

/**
 * 단일 style 객체로부터 containerStyle과 contentStyle로 분리
 */
export default function decomposeContainerStyle<
	T extends Style & { elevation?: number },
>(style: StyleProp<T>) {
	const flattenedStyle = StyleSheet.flatten(style)

	const containerStyle = pick(flattenedStyle, CONTAINER_STYLE_KEYS)
	const contentStyle = omit(flattenedStyle, CONTENT_STYLE_OMIT_KEYS)

	return { containerStyle, contentStyle }
}
