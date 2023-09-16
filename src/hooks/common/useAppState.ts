import { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

/**
 * @param onChange `useCallback`에 감싸주어야 함
 */
export default function useAppState(
	onChange: (status: AppStateStatus) => void,
) {
	useEffect(() => {
		const subscription = AppState.addEventListener('change', onChange)
		return () => {
			subscription.remove()
		}
	}, [onChange])
}
