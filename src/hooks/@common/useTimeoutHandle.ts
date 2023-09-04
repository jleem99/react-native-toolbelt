import { useEffect, useMemo, useRef } from 'react'

/**
 * 타임아웃 핸들링을 위한 유틸리티 훅
 *
 * 컴포넌트 언마운트 시 자동으로 예약된 Timeout을 클리어한다.
 *
 * @returns
 *  - `clear` 메소드를 통해서 기존의 핸들에 대해 `clearTimeout`을 수행할 수 있다.
 *  - `update` 메소드를 통해서 기존의 핸들에 대해 `clearTimeout`을 수행함과 동시에 업데이트 할 수 있다.
 */
export default function useTimeoutHandle() {
	const timeout = useRef<NodeJS.Timeout>()
	const handle = useMemo(
		() =>
			Object.assign(timeout, {
				/** 기존의 Timeout 핸들에 대해 `clearTimeout`을 수행한다. */
				clear: () => {
					handle.current && clearTimeout(handle.current)
				},
				/** 기존의 Timeout 핸들에 대해 `clearTimeout`을 수행하며 업데이트한다. */
				update: (callback: (args: void) => void, ms?: number) => {
					handle.current && clearTimeout(handle.current)
					handle.current = setTimeout(callback, ms)
				},
			}),
		[],
	)

	// Clear timeout on unmount
	useEffect(() => {
		return handle.clear
	}, [handle.clear])

	return handle
}
