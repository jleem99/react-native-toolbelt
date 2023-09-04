import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg'
import { useLayout } from '../hooks'
import { propsAreEqualExcept } from '../utils'

export type GradientProfile = [number, number][]

export interface GradientTintProps {
	/**
	 * Gradient Profile - 튜플 `[오프셋(%), 투명도]`의 배열로 전달
	 * 해당 프로퍼티의 레퍼런스 변화로 리렌더링 되지 않음
	 *
	 * @example
	 * [[0, 0], [50, 0], [100, 0.5]]
	 */
	profile: GradientProfile

	/** 프로필 보간 (t^2) 사용 */
	interpolateProfile?: boolean

	/** Tint color - Defaults to `'#000'` */
	color?: string

	/** x1 - Defaults to `0` */
	x1?: number

	/** y1 - Defaults to `0` */
	y1?: number

	/** x2 - Defaults to `0` */
	x2?: number

	/** y2 - Defaults to `1` */
	y2?: number

	/** 레이아웃 로드 시 호출 */
	onLayoutLoad?: () => void
}

const GradientTint = ({
	profile: rawProfile,
	interpolateProfile,
	color = '#000',
	x1 = 0,
	x2 = 0,
	y1 = 0,
	y2 = 1,
	onLayoutLoad,
}: GradientTintProps) => {
	const profile = useMemo(
		() => (interpolateProfile ? interpolateProfileX2(rawProfile) : rawProfile),
		[interpolateProfile, rawProfile],
	)
	const [layout, onLayout] = useLayout()
	const ratio = layout.width ? layout.height / layout.width : 1

	useEffect(() => {
		if (layout.width) onLayoutLoad?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [layout.width])

	return (
		<View
			style={StyleSheet.absoluteFill}
			pointerEvents="none"
			onLayout={onLayout}
		>
			<Svg viewBox={`0 0 1 ${ratio}`}>
				<Defs>
					{/* @ts-ignore */}
					<LinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
						{profile.map(([offset, opacity], index) => (
							<Stop
								key={index}
								offset={`${offset}%`}
								stopOpacity={opacity}
								stopColor={color}
							/>
						))}
					</LinearGradient>
				</Defs>
				<Rect x="0" y="0" width="1" height={ratio} fill="url(#grad)" />
			</Svg>
		</View>
	)
}

function interpolateProfileX2(profile: [number, number][]) {
	const interpolatedProfile = []
	let profileIndex = 0

	for (let i = 0; i <= 100; i += 5) {
		while (
			profileIndex + 1 < profile.length &&
			profile[profileIndex + 1]![0] < i
		)
			profileIndex++

		const from = profile[profileIndex]!
		const to = profile[profileIndex + 1]!
		const stop = to
			? [i, lerp(from[1], to[1], easing(inverseLerp(i, from[0], to[0])))]
			: from
		interpolatedProfile.push(stop)
	}

	return interpolatedProfile
}

const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b
const inverseLerp = (x: number, a: number, b: number) => (x - a) / (b - a)
const easing = (t: number) => t * t

export default React.memo(GradientTint, propsAreEqualExcept(['profile']))
