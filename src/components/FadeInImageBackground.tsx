import React, { PropsWithChildren } from 'react'
import {
	ImageBackground,
	ImageBackgroundProps,
	Platform,
	StyleSheet,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { FadeInProps } from './FadeInImage'
import { useFadeInAnimation } from '../hooks'
import createStyledComponent from '../utils/createStyledComponent'

export type FadeInImageBackgroundProps =
	PropsWithChildren<ImageBackgroundProps> & FadeInProps

const FadeInImageBackground = ({
	backgroundColor = '#eee',
	style: styleIn,
	imageStyle: imageStyleIn,
	children,
	...props
}: FadeInImageBackgroundProps) => {
	const bgStyle = { backgroundColor }
	const { imageStyle, imageInjectProps } = useFadeInAnimation()

	return (
		<Animated.View style={[bgStyle, styleIn]}>
			<Animated.Image
				style={[StyleSheet.absoluteFill, bgStyle, imageStyle, imageStyleIn]}
				{...imageInjectProps}
				{...props}
			/>
			{children}
		</Animated.View>
	)
}

export default (Platform.OS === 'android'
	? createStyledComponent(ImageBackground, { backgroundColor: '#eee' })
	: FadeInImageBackground) as unknown as typeof FadeInImageBackground
