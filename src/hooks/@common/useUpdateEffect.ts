import { EffectCallback, useEffect, useRef } from 'react'

/**
 * 마운트 시를 제외하고 useEffect와 동일하게 작동하는 훅
 *
 * @param watchList 업데이트를 관찰할 대상 값 목록
 */
export default function useUpdateEffect(
	effect: EffectCallback,
	watchList: unknown[],
) {
	const isOnMount = useRef(true)

	useEffect(() => {
		if (!isOnMount.current) return effect()
		else isOnMount.current = false
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, watchList)
}
