import { useRef } from 'react'

export default function useIsOnMount() {
	const isOnMount = useRef(true)
	if (isOnMount.current) {
		isOnMount.current = false
		return true
	}
	return false
}
