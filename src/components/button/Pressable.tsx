import React from 'react'
import { Insets, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable'
import { decomposeContainerStyle } from '../../utils'

export type PressableProps<
	T extends GenericTouchableProps = React.ComponentProps<
		typeof TouchableWithoutFeedback
	>,
> = Omit<T, 'hitSlop'> & {
	Component?: React.ComponentType<T>
	hitSlop?: Insets | number
}

/**
 * react-native-gesture-handler의 TouchableWithoutFeedback을 감싼 컴포넌트
 * @param hitSlop 인자로 숫자를 받을 수 있음
 */
const Pressable = <T extends GenericTouchableProps>({
	Component = TouchableWithoutFeedback as React.ComponentType<T>,
	hitSlop,
	style,
	disabled,
	...props
}: PressableProps<T>) => {
	if (disabled) return <View style={style} {...props} />

	const { contentStyle, containerStyle } = decomposeContainerStyle(style)

	return (
		<Component
			hitSlop={
				typeof hitSlop === 'number'
					? { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop }
					: hitSlop
			}
			style={contentStyle}
			containerStyle={containerStyle}
			{...(props as T)}
		/>
	)
}

export default Pressable
