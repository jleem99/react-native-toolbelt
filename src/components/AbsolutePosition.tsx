import React from 'react'
import { LayoutRectangle, StyleSheet, View, ViewProps } from 'react-native'
import { useLayout } from '../hooks'

export interface AbsolutePositionProps {
	/**
	 * Position relative to a layout.
	 *
	 * @example
	 * ```tsx
	 * { x: 0, y: 0 } // Top-left corner of the layout
	 * { x: 0.5, y: 0.5 } // Center of the layout
	 * { x: 1, y: 1 } // Bottom-right corner of the layout
	 * ```
	 */
	position: { x: number; y: number }

	/**
	 * Anchor point of the component.
	 *
	 * @default { x: 0.5, y: 0.5 }
	 */
	anchor?: { x: number; y: number }

	/**
	 * Layout of a relative component.
	 */
	relativeLayout: LayoutRectangle

	/**
	 * Additional offset to the position.
	 */
	offset?: { x: number; y: number }

	children?: React.ReactElement<Pick<ViewProps, 'onLayout'>>
}

const AbsolutePosition = ({
	position,
	anchor = { x: 0.5, y: 0.5 },
	relativeLayout,
	offset = { x: 0, y: 0 },
	children,
}: AbsolutePositionProps) => {
	const [contentLayout, onContentLayout] = useLayout()

	return (
		<View
			onLayout={onContentLayout}
			style={[
				styles.absolute,
				{
					translateX:
						relativeLayout.x +
						position.x * relativeLayout.width -
						contentLayout.width * anchor.x +
						offset.x,
				},
				{
					translateY:
						relativeLayout.y +
						position.y * relativeLayout.height -
						contentLayout.height * anchor.y +
						offset.y,
				},
			]}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	absolute: { position: 'absolute' },
})

export default AbsolutePosition
