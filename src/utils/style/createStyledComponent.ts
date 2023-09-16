import React from 'react'
import { StyleProp } from 'react-native'
import { Merge } from 'type-fest'
import { Style } from '../types'

/**
 * Creates styled (and/or proped) component
 * @param Component Base component to use
 * @param baseStyle Style to use for the component
 * @param baseProps Base props to be used except the style prop
 */
export default function createStyledComponent<
	P extends { style?: StyleProp<Style> },
	BaseProps extends Partial<Omit<P, 'style'>> = Record<never, never>,
>(
	Component: React.ComponentType<P>,
	baseStyle: P['style'],
	baseProps: BaseProps = {} as BaseProps,
) {
	return function StyledComponent(props: Merge<P, Partial<BaseProps>>) {
		const { style: styleOverride, ...restProps } = props as unknown as P
		const style = [baseStyle, styleOverride]
		// @ts-ignore
		return React.createElement(Component, { ...baseProps, style, ...restProps })
	}
}
