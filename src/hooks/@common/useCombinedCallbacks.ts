import { useCallback } from 'react'

/**
 * 여러 개의 콜백을 합쳐 useCallback에 감싸 반환해주는 함수
 */
export default function useCombinedCallbacks<
	Args extends any[],
	Func extends (...args: Args) => unknown,
>(...callbacks: (Func | undefined)[]) {
	return useCallback(
		(...args: Args) => {
			callbacks.forEach((callback) => callback?.(...args))
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[...callbacks],
	)
}
