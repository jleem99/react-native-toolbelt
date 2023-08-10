import React from 'react'
import { Image, ImageProps, Platform, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { pick } from 'lodash-es'
import { useFadeInAnimation } from '../hooks'
import { decomposeContainerStyle } from '../utils'

export interface FadeInProps {
	/**
	 * 이미지 로드 시 백그라운드 색상, defaults to `#eee`
	 * 안드로이드에서는 `#eee`값으로 고정됨
	 */
	backgroundColor?: string
}

export type FadeInImageProps = ImageProps & FadeInProps

const BORDER_RADIUS_KEYS = [
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
]

/**
 * iOS의 경우 안드로이드와 달리 이미지가 로딩되었을 때 페이드 효과가 존재하지 않는다.
 * 직접 페이드 효과를 구현한 이미지 컴포넌트
 */
const FadeInImage = ({
	backgroundColor = '#eee',
	style,
	...props
}: FadeInImageProps) => {
	const { imageStyle, backgroundStyle, imageInjectProps } = useFadeInAnimation()
	const { containerStyle, contentStyle } = decomposeContainerStyle(style)
	const { width, height } = contentStyle

	const borderRadiusStyle = pick(contentStyle, BORDER_RADIUS_KEYS)

	return (
		<View style={[{ width, height }, containerStyle]}>
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					{ backgroundColor },
					borderRadiusStyle,
					backgroundStyle,
				]}
			/>
			{Platform.OS === 'android' ? (
				<Image style={contentStyle} {...props} />
			) : (
				<Animated.Image
					style={[imageStyle, contentStyle]}
					{...imageInjectProps}
					{...props}
				/>
			)}
		</View>
	)
}

export default Object.assign(React.memo(FadeInImage), {
	// setImageComponent: (component: typeof Image) => {
})
