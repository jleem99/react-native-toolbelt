import { useCallback } from 'react'
import {
	DebounceSettings,
	DebouncedFunc,
	ThrottleSettings,
	debounce,
	noop,
	throttle,
} from 'lodash'

/**
 * @param func 레퍼런스 변경이 적용되지 않으므로 변경이 필요한 데이터는 인자를 통해 전달
 * @param wait 기본값 500ms
 */
// prettier-ignore
export const useDebouncedCallback = <T extends (...args: any) => any>(
    func: T = noop as T, wait: number = 500, options?: DebounceSettings, 
): DebouncedFunc<T> =>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(debounce(func, wait, options), [])

/**
 * @param func 레퍼런스 변경이 적용되지 않으므로 변경이 필요한 데이터는 인자를 통해 전달
 * @param wait 기본값 500ms
 */
// prettier-ignore
export const useThrottledCallback = <T extends (...args: any) => any>(
    func: T = noop as T, wait: number = 500, options?: ThrottleSettings, 
): DebouncedFunc<T> =>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(throttle(func, wait, options), [])
