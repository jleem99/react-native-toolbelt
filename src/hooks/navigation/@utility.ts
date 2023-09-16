import { EffectCallback, useCallback, useEffect } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	NavigationProp,
	ParamListBase,
	useFocusEffect,
	useNavigation,
	useNavigationState,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type NavigationPropFromType<
	Type extends 'stack' | 'tab' | 'drawer',
	ParamList extends ParamListBase = ParamListBase,
> = Type extends 'stack'
	? StackNavigationProp<ParamList>
	: Type extends 'tab'
	? BottomTabNavigationProp<ParamList>
	: NavigationProp<ParamList>

/**
 * @description
 * 특정 타입에 대한 네비게이션을 상위 네비게이션들에서 찾아서 반환한다.
 * 상위 네비게이션들에서 해당 타입의 네비게이션을 찾지 못할 시에는 null을 반환
 */
export const useNavigationOfType = <
	Type extends 'stack' | 'tab' | 'drawer',
	ParamList extends ParamListBase = ParamListBase,
>(
	type: Type,
): NavigationPropFromType<Type, ParamList> | null => {
	for (let nav = useNavigation(); nav; nav = nav.getParent())
		if (nav.getState().type === type)
			return nav as unknown as NavigationPropFromType<Type, ParamList>
	return null
}

/**
 * @description
 * Use this hook if you need better control of event listeners' trigger order
 * (useFocusEffect 보다 트리거 우선순위가 낮은 훅)
 *
 * @param callback useCallback에 감싸주어야 함
 */
export const useNavigationFocus = (callback: EffectCallback) => {
	const navigation = useNavigation()
	useEffect(() => {
		// callback cleanup을 위해 클로저에서 사용될 변수
		let cleanup: ReturnType<EffectCallback>
		const unsubscribeFocus = navigation.addListener('focus', () => {
			cleanup = callback()
		})
		const unsubscribeBlur = navigation.addListener('blur', () => {
			cleanup?.()
		})
		return () => {
			unsubscribeFocus()
			unsubscribeBlur()
		}
	}, [navigation, callback])
}

/**
 * @description
 * 네비게이션 중첩 단계를 고려하는 버전의 useFocusEffect
 * 중첩되는 경우 effect 함수의 cleanup이 실행되지 않음
 *
 * @param effect useCallback에 감싸주어야 함
 */
export const useDepthAwareFocusEffect = (
	effect: EffectCallback,
	isNestedOverride?: boolean,
) => {
	const isNestedDefault = useNavigationState((state) => state.index) > 1
	const isNested = isNestedOverride ?? isNestedDefault

	useFocusEffect(
		useCallback(() => {
			if (isNested) return
			const cleanup = effect()
			return cleanup
		}, [effect, isNested]),
	)

	// 중첩된 네비게이션 안에서는 클린업 함수를 반환하지 않아야함
	useNavigationFocus(
		useCallback(() => {
			if (!isNested) return
			effect()
		}, [effect, isNested]),
	)
}
