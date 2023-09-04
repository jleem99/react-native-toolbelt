/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from 'react'

/**
 * 언마운트 되어야 하는 조건이 있을 때 언마운트를 지연시키기 위한 훅
 * - (언마운트 조건 초기값이 정확하지 않는 등 스크린 트랜지션이 매끄럽지 않은 것을 해결하기 위함)
 *
 * @returns
 * - unmountCondition이 `true`가 되면 `true`를 반환
 * - unmountCondition이 `false`가 되면 일정 시간이 지난 후 `false`를 반환
 */
export default function useDeferredUnmount(
	unmountCondition: boolean,
	delay = 500,
) {
	const [shouldUnmount, setShouldUnmount] = useState(false)

	useEffect(() => {
		if (unmountCondition) {
			const timeout = setTimeout(() => {
				setShouldUnmount(true)
			}, delay)
			return () => clearTimeout(timeout)
		} else {
			setShouldUnmount(false)
			return () => {}
		}
	}, [delay, unmountCondition])

	return shouldUnmount
}
