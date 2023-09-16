import {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated'

const MIN_DELAY = 0

/**
 * @param duration 애니메이션 시간
 */
export default function useFadeInAnimation(duration: number = 300) {
	const animValue = useSharedValue(0)

	// 백그라운드 색상을 투명하게 만들지 않으면 Spill이 발생
	const animBackgroundStyle = useAnimatedStyle(() => ({
		opacity: withDelay(duration, withTiming(1 - animValue.value)),
	}))
	const animImageStyle = useAnimatedStyle(() => ({
		opacity: withTiming(animValue.value, { duration }),
	}))

	const onLoadStart = () => {
		animValue.value = 0
	}
	const onLoadEnd = () => {
		setTimeout(() => (animValue.value = 1), MIN_DELAY)
	}

	return {
		backgroundStyle: animBackgroundStyle,
		imageStyle: animImageStyle,
		imageInjectProps: { onLoadStart, onLoadEnd },
	}
}
