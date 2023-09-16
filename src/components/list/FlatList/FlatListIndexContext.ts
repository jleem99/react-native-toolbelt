import { createContext, useContext } from 'react'

export const FlatListIndexContext = createContext<number | null>(null)

export const useFlatListIndex = () => {
	const context = useContext(FlatListIndexContext)
	if (context === null) {
		throw new Error(
			'useFlatListIndex must be used within a FlatListIndexContext',
		)
	}
	return context
}
