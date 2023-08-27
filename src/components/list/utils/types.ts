import { RefObject } from 'react'
import { StyleProp, ViewStyle, VirtualizedListProps } from 'react-native'
import {
	FlatList,
	NativeViewGestureHandlerProps,
	ScrollView,
} from 'react-native-gesture-handler'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export type WithVirtualizedListBaseProps<T> = T & {
	/** BottomTabNavigator의 탭바 onPress시 VirtualizedList의 맨 위로 스크롤 */
	scrollToTopOnTabPress?: boolean

	/**
	 * @description `windowSize`와 무관하게 `initialNumToRender`에 지정된 수만큼의
	 * 초기 컴포넌트는 자동으로 언마운트되지 않는데,
	 * 해당 옵션 사용 시 window 바깥의 초기 컴포넌트들 또한 강제로 언마운트한다.
	 *
	 * @description 해당 옵션 사용 시 `scrollsToTop`가 `false`로 설정됨
	 */
	forceUnmountInitialComponents?: boolean

	/* ********************************************************************** */
	/*                          Style related props                           */
	/* ********************************************************************** */
	contentContainerStyle?: StyleProp<ViewStyle> | undefined
	paddingVertical?: number
	paddingHorizontal?: number
	extraPaddingBottom?: number
	useTransparentBottomSpace?: boolean

	/** useHeaderOptions의 useTransparentHeader 사용 시 발생하는 헤더 높이 차이를 보정 */
	isInsideTransparentHeader?: boolean
}

export type WithGestureHandlerVirtualizedListBaseProps<T> =
	WithVirtualizedListBaseProps<NativeViewGestureHandlerProps & T>

/** scrollViewRef / flatListRef 중 하나 사용 */
export type VirtualizedListRef = {
	scrollViewRef: RefObject<ScrollView>
	// keyboardAwareScrollViewRef: RefObject<KeyboardAwareScrollView>
	flatListRef: RefObject<FlatList>
}

export interface VirtualizedListHook<P> extends VirtualizedListRef {
	injectProps: P
}

export type VirtualizedListEnhancedProps =
	| WithVirtualizedListBaseProps<Partial<VirtualizedListProps<any>>>
	| WithGestureHandlerVirtualizedListBaseProps<
			Partial<VirtualizedListProps<any>>
	  >
