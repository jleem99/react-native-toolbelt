import { useState } from 'react'
import useUpdateEffect from './useUpdateEffect'
import { UseState } from '../../utils'

export default function useTrackedState<T>(trackingValue: T): UseState<T> {
	const [state, setState] = useState<T>(trackingValue)

	useUpdateEffect(() => {
		setState(trackingValue)
	}, [trackingValue])

	return [state, setState]
}
